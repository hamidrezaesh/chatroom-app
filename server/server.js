import { WebSocketServer } from "ws"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import https from "https"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 8080

const privateKey = fs.readFileSync("ssl-certs/key.pem", "utf8")
const certificate = fs.readFileSync("ssl-certs/cert.pem", "utf8")
const credentials =  {key: privateKey, cert: certificate}

const window = new JSDOM("").window
const DOMPurify = createDOMPurify(window)

app.use(express.static(path.join(__dirname, "../client/dist")))

const server = https.createServer(credentials, app)

server.listen(PORT, ()=>{
    console.log("HTTP server running on port 8080")
})

const wss = new WebSocketServer({server})

const messagesCount = new Map()
const messageHistory = []
const MAX_HISTORY = 100

console.log("Server Started on port 8080...")

wss.on("connection", (socket) => {
    console.log("Client joined")

    socket.send(JSON.stringify({
        type: "history",
        messages: messageHistory
    }))

    socket.on("message", (data) => {
        const message = JSON.parse(data.toString())

        const cleanText = DOMPurify.sanitize(message.text, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
        })

        if (!cleanText.trim()) return

        const clientId = socket._socket.remoteAddress
        const now = Date.now()

        let userStats = messagesCount.get(clientId)
        if (!userStats){
            userStats = {perSecond: [], perMinute: []}
            messagesCount.set(clientId, userStats)
        }

        // clean old entries
        userStats.perSecond = userStats.perSecond.filter(t => now - t < 1_000)
        userStats.perMinute = userStats.perMinute.filter(t => now - t < 60_000)

        if (userStats.perSecond.length >= 4){
            socket.send(JSON.stringify({
                type: "error",
                message: "Calm down! Max 4 messages per second"
            }))
            return
        }


        if (userStats.perMinute.length >= 60){
            socket.send(JSON.stringify({
                type: "error",
                message: "Rate limit! 60 messsager per minute"
            }))
            return
        }

        userStats.perSecond.push(now)
        userStats.perMinute.push(now)
        messagesCount.set(clientId, userStats)


        const cleanMessage = {
            username: message.username,
            text: cleanText,
            timestamp: message.timestamp || Date.now()
        }

        messageHistory.push(cleanMessage)

        const remaining = MAX_HISTORY - messageHistory.length
        if (remaining === 25) console.log("NOTICE: Only 25 messages left")
        if (remaining === 10) console.log("WARNING: Only 10 messsages left")

        if (messageHistory.length > MAX_HISTORY){
            messageHistory.shift()
            console.log("NOTICE: History Reset.")
        }

        // Broadcast to all connected clients
        for (const client of wss.clients) {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type:"message",
                    message: cleanMessage
                }))
            }
        }
    })

    socket.on("close", () => {
        console.log("Client left")
    })
})

console.log("Waiting for connections...")

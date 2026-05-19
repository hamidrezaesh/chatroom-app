import { WebSocketServer } from "ws"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 8080

app.use(express.static(path.join(__dirname, "../client/dist")))


const server = app.listen(PORT, ()=>{
    console.log("HTTP server running on port 8080")
})

const ws = new WebSocketServer({server})

const messageHistory = []
const MAX_HISTORY = 100

console.log("Server Started on port 8080...")

ws.on("connection", (socket) => {
    console.log("Client joined")

    socket.send(JSON.stringify({
        type: "history",
        messages: messageHistory
    }))

    socket.on("message", (data) => {
        messageHistory.push(JSON.parse(data.toString()))
        
        const remaining = MAX_HISTORY - messageHistory.length
        if (remaining === 25) console.log("NOTICE: Only 25 messages left")
        if (remaining === 10) console.log("WARNING: Only 10 messsages left")

        if (messageHistory.length > MAX_HISTORY){
            messageHistory.shift()
            console.log("NOTICE: History Reset.")
        } 
        
        // Broadcast to all connected clients
        for (const client of ws.clients) {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type:"message",
                    message: JSON.parse(data.toString())
                }))
                console.log("Message sent to client")
            }
        }
    })

    socket.on("close", () => {
        console.log("Client left")
    })
})

console.log("Waiting for connections...")

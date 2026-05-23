import {useState, useRef, useEffect} from "react"
import "./App.css"
import Chatroom from "./Components/Chatroom/chatroom"
import Login from "./Components/Login/login"
import type {Message} from "./types"
import Navbar from "./Components/Navbar/navbar"


export default function App(){
  const [messages, setMessages] = useState<Message[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [input, setInput] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [isJoined, setIsJoined] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)


  const joinChat = () =>{
    if (!username.trim()) return

    const socket = new WebSocket("wss://localhost:8080")

    socket.onopen = ()=>{
      const joinMessage = {username, text: "Joined the chat", timestamp: Date.now()}
      socket.send(JSON.stringify(joinMessage))
    }

    socket.onmessage = (event) => {
      try{
        const data = JSON.parse(event.data)

        if (data.type === "history"){
          setMessages(data.messages)
        }else if(data.type === "message"){
          setMessages(prev => [...prev, data.message])
        }else{
          alert(data.message)
        }
      }catch(err){
        console.log("ERROR WITH MESSAGES: ", err)
      }

      }

      socket.onclose = () =>{
        setIsJoined(false)
      }

      setWs(socket)
      setIsJoined(true)
    }

  const sendMessage = () =>{
    if (!input.trim() || !ws) return

    const message: Message ={
      username,
      text: input,
      timestamp: Date.now()
    }

    ws.send(JSON.stringify(message))
    setInput("")
  }

  useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  if (isJoined){
    return(
      <>
        <Navbar info={` - ${username}`}/>
        <Chatroom
        username={username}
        messages={messages}
        messagesEndRef={messagesEndRef}
        input={input}
        sendMessage={sendMessage}
        setInput={setInput}
        />
      </>
    )

  }else{
    return(
      <>
        <Navbar info=""/>
        <Login setUsername={setUsername} joinChat={joinChat}/>
      </>
    )
  }
  
}

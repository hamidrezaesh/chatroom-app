import "./chatroom.css"
import type {ChatroomProps} from "../../types"


export default function Chatroom({username, messages, messagesEndRef, input, sendMessage, setInput}:ChatroomProps){
    return(
      <div className="chatroom">
        <div className="messages">
          {messages.map((msg, indx)=>{
            const isOwnMessage = msg.username === username
            const time = new Date(msg.timestamp).toLocaleTimeString([],{hour: "2-digit", minute: "2-digit"})

            return(
              <div className={`message ${isOwnMessage ? 'own' : ''}`} key={indx}>
                <strong>{msg.username}:</strong>{msg.text}<br></br>
                <small>{time}</small>
              </div>
            )
          })}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="send-msg">
          <input
           type="text" 
           placeholder="Type message..."
           value={input}
           onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
           onChange={(e)=> setInput(e.target.value)}/>
           <button className="send-msg-btn" onClick={sendMessage}>Send</button>
        </div>
      </div>
    )
}



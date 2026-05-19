import "./login.css"
import type { LoginProps } from "../../types"

export default function Login({setUsername, joinChat}:LoginProps){
    return(
      <div className="login-div">
        <div className="title">Sign in</div>
        <div className="login">
          <input type="text" 
          className="input"
          placeholder="Enter a Username..." 
          onChange={(e)=> setUsername(e.target.value)} 
          onKeyDown={(e)=> e.key==="Enter" && joinChat()}/>
          <button className="join-btn" onClick={joinChat}>Join</button>
          </div>
      </div>
    )
}
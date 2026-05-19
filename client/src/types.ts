export interface Message{
  username: string,
  text: string,
  timestamp: number
}

export interface ChatroomProps {
    username: string,
    messages: Message[],
    messagesEndRef: React.RefObject<HTMLDivElement | null>,
    input: string,
    sendMessage: () => void,
    setInput: (value: string) => void
}

export interface LoginProps{
    setUsername: (value:string) => void,
    joinChat: () => void
}

export interface ThemeContextType {
    theme: "light" | "dark",
    toggleTheme: () => void
}

export interface NavbarProps{
    info: string
}

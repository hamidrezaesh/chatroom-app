// components/ThemeToggle.tsx (rename to Navbar.tsx)
import { useTheme } from "../../context/ThemeContext"
import "./navbar.css"
import type { NavbarProps } from "../../types"

export default function Navbar({info}:NavbarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <strong>💬 Chatroom {info}</strong>
      <p
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </p>
    </nav>
  )
}
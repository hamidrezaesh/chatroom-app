import { createContext, useContext, useEffect, useState } from "react"
import type { ThemeContextType } from "../types"

type Theme = "light" | "dark"


const ThemeContext = createContext<ThemeContextType | undefined>(undefined)


export function ThemeProvider({children} : {children: React.ReactNode}) {
    const [theme, setTheme] = useState<Theme>(()=>{
        const saved = localStorage.getItem("theme") as Theme
        if (saved) return saved

        if (window.matchMedia("(prefers-color-schem: dark)").matches){
            return "dark"
        }

        return "light"
    })

    useEffect(()=>{
        localStorage.setItem("theme", theme)

        if (theme === "dark"){
            document.documentElement.classList.add("dark")
        }else{
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const toggleTheme = () =>{
        setTheme(prev => prev === "light" ? "dark" : "light")
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const context = useContext(ThemeContext)
    if (!context){
        throw new Error("useTheme Error")
    }
    return context
}

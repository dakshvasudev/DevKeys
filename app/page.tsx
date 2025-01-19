"use client"

import { useState, useEffect } from "react"
import { LanguageSelector } from "@/components/language-selector"
import { CodeDisplay } from "@/components/code-display"
import { StatsDisplay } from "@/components/stats-display"
import { Keyboard } from 'lucide-react'

const sampleCode = {
  javascript: `function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}`,
  python: `def factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)`,
}

export default function Home() {
  const [language, setLanguage] = useState("javascript")
  const [typedCode, setTypedCode] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, time: 0 })

  const currentCode = sampleCode[language as keyof typeof sampleCode] || ""

  useEffect(() => {
    setTypedCode("")
    setIsTyping(false)
    setStartTime(null)
    setStats({ wpm: 0, accuracy: 0, time: 0 })
  }, [language])

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!isTyping) {
      setIsTyping(true)
      setStartTime(Date.now())
    }

    if (e.key === "Backspace") {
      setTypedCode(prev => prev.slice(0, -1))
      return
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      setTypedCode(prev => {
        const newTyped = prev + e.key
        
        // Calculate stats when typing is complete
        if (newTyped.length === currentCode.length) {
          const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000
          const correctChars = [...newTyped].filter((char, i) => char === currentCode[i]).length
          const accuracy = Math.round((correctChars / currentCode.length) * 100)
          const wpm = Math.round((newTyped.length / 5) / (timeElapsed / 60))
          
          setStats({
            wpm,
            accuracy,
            time: Math.round(timeElapsed)
          })
        }
        
        return newTyped
      })
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isTyping, startTime])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        <header className="flex justify-between items-center px-4">
          <h1 className="text-xl font-bold flex items-center">
            <Keyboard className="mr-2 h-6 w-6" />
            DevKeys
          </h1>
          <LanguageSelector 
            selected={language} 
            onSelect={setLanguage} 
          />
        </header>
        
        <main className="flex flex-col items-center gap-8">
          <CodeDisplay 
            code={currentCode} 
            typedCode={typedCode}
            onUpdate={setTypedCode}
          />
          <StatsDisplay {...stats} />
        </main>
      </div>
    </div>
  )
}


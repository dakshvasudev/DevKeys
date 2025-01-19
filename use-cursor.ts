import { useEffect, useState } from "react"

export function useCursor(text: string, manualPosition?: number) {
  const [cursorPosition, setCursorPosition] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530) // Match common terminal cursor blink rate

    return () => clearInterval(interval)
  }, [])

  // Update cursor position
  useEffect(() => {
    setCursorPosition(manualPosition !== undefined ? manualPosition : text.length)
  }, [text, manualPosition])

  return {
    cursorPosition,
    showCursor,
    setCursorPosition
  }
}


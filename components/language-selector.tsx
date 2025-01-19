"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code2 } from 'lucide-react'

const languages = [
  { name: "JavaScript", value: "javascript" },
  { name: "Python", value: "python" },
  { name: "Java", value: "java" },
  { name: "TypeScript", value: "typescript" },
  { name: "C++", value: "cpp" },
]

interface LanguageSelectorProps {
  selected: string
  onSelect: (language: string) => void
}

export function LanguageSelector({ selected, onSelect }: LanguageSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-40 justify-between">
          <Code2 className="mr-2 h-4 w-4" />
          {languages.find(l => l.value === selected)?.name || "Select Language"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.value}
            onClick={() => onSelect(language.value)}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


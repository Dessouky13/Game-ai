"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type GameState = "landing" | "game" | "end"

interface Character {
  id: string
  name: string
  role: string
  alliance: "ally" | "enemy" | "neutral"
  avatar?: string
}

interface Chapter {
  id: string
  title: string
  body: string
  hook: string
}

interface PlayerChoice {
  id: string
  text: string
  action: string
}

export default function ChronicleBuilder() {
  const [gameState, setGameState] = useState<GameState>("landing")
  const [subtitleText, setSubtitleText] = useState("")
  const fullSubtitle =
    "Live inside a story that writes itself. Every choice shapes your destiny in an ever-evolving tale of power, betrayal, and ancient mysteries."

  // Mock game data
  const [characters] = useState<Character[]>([
    {
      id: "1",
      name: "Ser Marcus",
      role: "Knight Commander",
      alliance: "ally",
      avatar: "/medieval-knight-commander.png",
    },
    {
      id: "2",
      name: "Lady Vex",
      role: "Court Spy",
      alliance: "neutral",
      avatar: "/court-spy.png",
    },
    {
      id: "3",
      name: "Lord Blackwood",
      role: "Rival Noble",
      alliance: "enemy",
      avatar: "/sinister-noble-lord.png",
    },
    {
      id: "4",
      name: "Mystic Zara",
      role: "Oracle",
      alliance: "ally",
      avatar: "/mystical-oracle-woman.png",
    },
  ])

  const [chapters] = useState<Chapter[]>([
    {
      id: "1",
      title: "The Gathering Storm",
      body: "The great hall of Ravenshollow Castle echoed with whispered conspiracies as nobles gathered for the harvest feast. You stand at the threshold, knowing that tonight's choices will determine the fate of the realm. The candlelight flickers across faces both familiar and treacherous, each harboring secrets that could topple kingdoms.",
      hook: "But as you step forward, a hooded figure approaches with urgent news...",
    },
    {
      id: "2",
      title: "Shadows and Whispers",
      body: "The messenger's words chill your blood: 'The northern armies march at dawn, my lord. They bear the banner of the Crimson Wolf.' Around you, the feast continues in blissful ignorance, but you know the truth. War comes whether the realm is ready or not. The question now is not if conflict will arrive, but whose side you will choose when it does.",
      hook: "A scream pierces the night air from the castle courtyard...",
    },
  ])

  const [currentChoices] = useState<PlayerChoice[]>([
    { id: "1", text: "Confront Lord Blackwood about his treachery", action: "confront" },
    { id: "2", text: "Seek counsel from the Oracle in private", action: "oracle" },
    { id: "3", text: "Rally the loyal knights to your cause", action: "rally" },
  ])

  useEffect(() => {
    if (gameState === "landing") {
      let index = 0
      const timer = setInterval(() => {
        if (index < fullSubtitle.length) {
          setSubtitleText(fullSubtitle.slice(0, index + 1))
          index++
        } else {
          clearInterval(timer)
        }
      }, 50)
      return () => clearInterval(timer)
    }
  }, [gameState])

  const getAllianceColor = (alliance: Character["alliance"]) => {
    switch (alliance) {
      case "ally":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "enemy":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "neutral":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const handlePlayerChoice = (choice: PlayerChoice) => {
    console.log("[v0] Player chose:", choice.action)
    // TODO: Send to backend API
  }

  const renderLandingPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="fog-animation opacity-40" />
        <div className="fog-animation opacity-25" style={{ animationDelay: "7s", animationDuration: "25s" }} />
        <div className="fog-animation opacity-30" style={{ animationDelay: "14s", animationDuration: "30s" }} />
      </div>

      <div className="absolute inset-0 opacity-30">
        {[...Array(100)].map((_, i) => {
          const size = Math.random() * 3 + 1
          const glowIntensity = Math.random() * 0.8 + 0.2
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, oklch(0.75 0.15 60 / ${glowIntensity}) 0%, transparent 70%)`,
                boxShadow: `0 0 ${size * 2}px oklch(0.75 0.15 60 / ${glowIntensity * 0.5})`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 text-center space-y-12 px-4 max-w-4xl mx-auto">
        <div className="space-y-6">
          <h1 className="font-title text-6xl md:text-8xl lg:text-9xl font-bold text-primary drop-shadow-2xl animate-in fade-in duration-1000">
            Chronicle Builder
          </h1>

          <div className="h-24 md:h-20 flex items-center justify-center">
            <p className="font-story text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed animate-in fade-in duration-1000 delay-500">
              {subtitleText}
              <span className="animate-pulse text-primary">|</span>
            </p>
          </div>
        </div>

        <div className="animate-in fade-in duration-1000 delay-1000">
          <Button
            onClick={() => setGameState("game")}
            size="lg"
            className="font-title text-xl px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:shadow-primary/25 transition-all duration-500 hover:scale-105 border border-primary/20"
          >
            Begin Your Chronicle
          </Button>
        </div>

        <div className="animate-in fade-in duration-1000 delay-1500">
          <p className="font-story text-sm text-muted-foreground/70 italic">
            "In the realm where stories breathe and choices echo through eternity..."
          </p>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border border-primary/10 shadow-inner shadow-primary/5" />
      </div>
    </div>
  )

  const renderGameScreen = () => (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-title text-2xl text-primary">Chronicle Builder</h1>
          <Button variant="ghost" onClick={() => setGameState("end")} className="font-story text-sm">
            End Chronicle
          </Button>
        </div>
      </div>

      {/* Main Game Layout */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Panel - Story */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="h-full flex flex-col">
            <h2 className="font-title text-xl text-primary mb-4">Your Chronicle</h2>
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {chapters.map((chapter, index) => (
                <Card
                  key={chapter.id}
                  className="parchment p-6 animate-in fade-in duration-500"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="font-title text-lg text-primary mb-3">
                    Chapter {index + 1}: {chapter.title}
                  </h3>
                  <p className="font-story text-foreground leading-relaxed mb-4">{chapter.body}</p>
                  <p className="font-story text-primary italic font-semibold">{chapter.hook}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Characters */}
        <div className="w-80 border-l border-border p-4">
          <h2 className="font-title text-xl text-primary mb-4">Characters</h2>
          <div className="space-y-3">
            {characters.map((character) => (
              <Card key={character.id} className="p-4 bg-card/80 backdrop-blur-sm hover:bg-card transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="w-20 h-20 border-2 border-primary/20 shadow-lg">
                    <AvatarImage src={character.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary font-title text-lg">
                      {character.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-title text-sm font-semibold text-foreground truncate">{character.name}</h3>
                    <p className="font-story text-xs text-muted-foreground truncate">{character.role}</p>
                    <Badge variant="outline" className={`mt-1 text-xs ${getAllianceColor(character.alliance)}`}>
                      {character.alliance}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex flex-col gap-3">
            <h3 className="font-title text-lg text-primary">Choose Your Path</h3>
            <div className="flex flex-wrap gap-3">
              {currentChoices.map((choice) => (
                <Button
                  key={choice.id}
                  onClick={() => handlePlayerChoice(choice)}
                  className="font-story flex-1 min-w-0 bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-primary/20 hover:border-primary/40 transition-all duration-300"
                  size="lg"
                >
                  {choice.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEndScreen = () => (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h2 className="font-title text-4xl text-primary">Your Chronicle is Complete</h2>
        <div className="space-x-4">
          <Button onClick={() => setGameState("landing")}>Play Again</Button>
          <Button variant="outline">Download Chronicle</Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {gameState === "landing" && renderLandingPage()}
      {gameState === "game" && renderGameScreen()}
      {gameState === "end" && renderEndScreen()}
    </>
  )
}

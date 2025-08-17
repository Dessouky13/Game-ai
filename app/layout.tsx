import type React from "react"
import type { Metadata } from "next"
import { Cinzel } from "next/font/google"
import { Crimson_Text } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
})

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  title: "Chronicle Builder",
  description: "Live inside a story that writes itself",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonText.variable}`}>
      <body className="dark">{children}</body>
    </html>
  )
}

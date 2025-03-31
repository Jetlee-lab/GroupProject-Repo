"use client"

import type React from "react"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider } from "@/components/sidebar/sidebar-context"

// Import the provider from HeroUI - adjust the actual import based on the library's exports
import * as HeroUI from "@heroui/react"

export function Providers({ children }: { children: React.ReactNode }) {
  // Use the Provider component from HeroUI, whatever it's named
  const HeroProvider = HeroUI.Provider || HeroUI.HeroUIProvider || HeroUI.HeroProvider

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <SidebarProvider>{children}</SidebarProvider>
    </NextThemesProvider>
  )
}


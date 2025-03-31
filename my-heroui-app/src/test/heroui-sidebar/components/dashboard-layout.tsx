"use client"

import type React from "react"

import { Sidebar } from "../components/sidebar/sidebar"
import { SidebarToggle } from "../components/sidebar/sidebar-toggle"
import { useSidebar } from "../components/sidebar/sidebar-context"
import { motion } from "framer-motion"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar />
      <motion.main
        className="flex-1 overflow-auto"
        initial={false}
        animate={{
          marginLeft: "0px",
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <header className="p-4 flex items-center">
          <SidebarToggle />
          <h1 className="ml-4 text-xl font-semibold">Dashboard</h1>
        </header>
        {children}
      </motion.main>
    </div>
  )
}


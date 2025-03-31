"use client"

import type React from "react"

import { cn } from "../../lib/utils"
// import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href?: string
  isActive?: boolean
  endContent?: React.ReactNode
  showLabel?: boolean
}

export function NavItem({ icon, label, href = "#", isActive = false, endContent, showLabel = true }: NavItemProps) {
  return (
    <div className="h-10 px-3 relative">
      {/* <Link href={href} passHref> */}
      <a href={href}>
        <motion.div
          className={cn(
            "absolute inset-0 mx-3 flex items-center rounded-sm",
            isActive ? "bg-gray-800 text-white" : "bg-transparent text-gray-300 hover:bg-gray-800/50",
          )}
          title={!showLabel ? label : undefined}
          animate={{
            width: showLabel ? "calc(100% - 24px)" : "40px",
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          {/* Fixed position for the icon */}
          <div className="flex items-center justify-center w-10 h-10">{icon}</div>

          {/* Text slides in/out from the icon */}
          <AnimatePresence initial={false}>
            {showLabel && (
              <motion.span
                initial={{ opacity: 0, width: 0, x: -20 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: -20 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="whitespace-nowrap overflow-hidden"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
        {/* </Link> */}
      </a>

      <AnimatePresence initial={false}>
        {showLabel && endContent && (
          <motion.div
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            {endContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


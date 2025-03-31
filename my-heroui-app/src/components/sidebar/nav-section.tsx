"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"

interface NavSectionProps {
  title: string
  children: React.ReactNode
  showTitle?: boolean
}

export function NavSection({ title, children, showTitle = true }: NavSectionProps) {
  return (
    <div className="py-2">
      <div className="h-6 relative px-4 mb-2">
        <AnimatePresence initial={false}>
          {showTitle && (
            <motion.h3
              className="text-gray-400 text-xs uppercase font-semibold absolute left-4 top-0 overflow-hidden whitespace-nowrap"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              {title}
            </motion.h3>
          )}
        </AnimatePresence>
      </div>
      <div>{children}</div>
    </div>
  )
}


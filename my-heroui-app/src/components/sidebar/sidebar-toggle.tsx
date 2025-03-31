"use client";

import { PanelRightClose, PanelRightOpen } from "lucide-react"
// import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

import { useSidebar } from "./sidebar-context";

export function SidebarToggle() {
  const { toggle, isOpen } = useSidebar();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md hover:bg-gray-800 text-white transition-colors relative w-8 h-8 flex items-center justify-center"
      aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
    >
      <AnimatePresence initial={false} mode="wait">
        {isOpen ? (
          <motion.div
            key="chevron-left"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <PanelRightOpen size={20} />
            {/* <Icon
              className="pointer-events-none text-2xl text-default-400"
              icon="solar:eye-closed-linear"
            /> */}
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <PanelRightClose size={20} />
            {/* <Icon
              className="pointer-events-none text-2xl text-default-400"
              icon="solar:eye-closed-linear"
            /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}


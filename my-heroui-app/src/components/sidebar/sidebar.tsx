"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  LayoutGrid,
  ClipboardList,
  Users,
  LineChart,
  PieChart,
  Gift,
  Receipt,
  Settings,
  Plus,
  Timer,
  Search,
} from "lucide-react"
import { Icon } from "@iconify/react";

import { cn } from "../../lib/utils";

import { useSidebar } from "./sidebar-context";
import { NavItem } from "./nav-item";
import { NavSection } from "./nav-section";
// import Image from "next/image"

export function Sidebar() {
  const { isOpen } = useSidebar();

  return (
    <motion.aside
      className="h-screen bg-black border-r border-gray-800 overflow-hidden flex flex-col"
      initial={false}
      animate={{
        width: isOpen ? "280px" : "64px",
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {/* Logo section - fixed height and positioning */}
      <div className="h-[72px] flex items-center px-4">
        <div className="flex-shrink-0 bg-white rounded-full w-10 h-10 flex items-center justify-center">
          <span className="text-black font-bold">A</span>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.span
              className="font-bold text-lg overflow-hidden whitespace-nowrap ml-3"
              initial={{ opacity: 0, width: 0, x: -20 }}
              animate={{ opacity: 1, width: "auto", x: 0 }}
              exit={{ opacity: 0, width: 0, x: -20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              ACME
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* User profile section - fixed height and positioning */}
      <div className="h-[72px] flex items-center px-4">
        <div className="flex-shrink-0 relative w-10 h-10 rounded-full overflow-hidden border border-gray-600">
          {/* <Image src="/placeholder.svg?height=40&width=40" alt="User avatar" width={40} height={40} /> */}
          <img src="#" alt="hello" />
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="flex flex-col overflow-hidden ml-3"
              initial={{ opacity: 0, width: 0, x: -20 }}
              animate={{ opacity: 1, width: "auto", x: 0 }}
              exit={{ opacity: 0, width: 0, x: -20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <span className="font-semibold whitespace-nowrap">John Doe</span>
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Product Designer
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search icon (only in collapsed mode) */}
      <AnimatePresence initial={false}>
        {!isOpen && (
          <motion.div
            className="flex justify-center py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button className="text-gray-400 hover:text-white">
              <Search size={20} />
              {/* <Icon
                className="pointer-events-none text-2xl text-default-400"
                icon="solar:eye-closed-linear"
              /> */}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation with conditional scrollbar */}
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          !isOpen && "scrollbar-hide", // Hide scrollbar when collapsed
        )}
      >
        <NavSection title="Overview" showTitle={isOpen}>
          <NavItem
            icon={
              <Home size={18} />
              // <Icon
              //   className="pointer-events-none text-2xl text-default-400"
              //   icon="solar:eye-closed-linear"
              // />
            }
            label="Home"
            isActive
            showLabel={isOpen}
          />
          <NavItem
            icon={
              <LayoutGrid size={18} />
            }
            label="Projects"
            showLabel={isOpen}
            endContent={
              <button className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                {/* <Plus size={14} /> */}
                <Icon
                  className="pointer-events-none text-2xl text-default-400"
                  icon="solar:eye-closed-linear"
                />
              </button>
            }
          />
          <NavItem
            icon={
              <ClipboardList size={18} />
            }
            label="Tasks"
            showLabel={isOpen}
            endContent={
              <button className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                <Plus size={14} />
              </button>
            }
          />
          <NavItem
            icon={
              <Users size={18} />
            }
            label="Team"
            showLabel={isOpen}
          />
          <NavItem
            icon={
              <Timer size={18} />
            }
            label="Tracker"
            showLabel={isOpen}
            endContent={
              <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded-md">
                New
              </span>
            }
          />
        </NavSection>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-gray-800" />

        <NavSection title="Organization" showTitle={isOpen}>
          <NavItem
            icon={
              <PieChart size={18} />
            }
            label="Cap Table"
            showLabel={isOpen}
          />
          <NavItem
            icon={
              <LineChart size={18} />
            }
            label="Analytics"
            showLabel={isOpen}
          />
          <NavItem
            icon={
              <Gift size={18} />
            }
            label="Perks"
            showLabel={isOpen}
            endContent={
              <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded-md">
                3
              </span>
            }
          />
          <NavItem
            icon={
              <Receipt size={18} />
            }
            label="Expenses"
            showLabel={isOpen}
          />
          <NavItem
            icon={
              <Settings size={18} />
            }
            label="Settings"
            showLabel={isOpen}
          />
        </NavSection>
      </div>
    </motion.aside>
  );
}

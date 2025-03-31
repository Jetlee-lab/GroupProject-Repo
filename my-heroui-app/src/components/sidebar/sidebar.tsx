"use client";

import { motion, AnimatePresence, delay } from "framer-motion";
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
      animate={{
        width: isOpen ? "280px" : "64px",
      }}
      className="h-screen bg-gray-500 border-r border-gray-800 overflow-hidden flex flex-col"
      initial={false}
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
              animate={{ opacity: 1, width: "auto", x: 0 }}
              className="font-bold text-lg overflow-hidden whitespace-nowrap ml-3"
              exit={{ opacity: 0, width: 0, x: -20 }}
              initial={{ opacity: 0, width: 0, x: -20 }}
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
          <img alt="hello" src="#" />
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              animate={{ opacity: 1, width: "auto", x: 0 }}
              className="flex flex-col overflow-hidden ml-3"
              exit={{ opacity: 0, width: 0, x: -20 }}
              initial={{ opacity: 0, width: 0, x: -20 }}
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
        {(
          <motion.div
            animate={{ opacity: 1 }}
            className="flex justify-center py-2"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button className="text-gray-400 hover:text-white">
              <Search size={20} />
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
        <NavSection showTitle={isOpen} title="Overview">
          <NavItem
            isActive
            icon={<Home size={18} />}
            label="Home"
            showLabel={isOpen}
          />
          <ANavItem
            isActive
            icon={<Home size={18} />}
            label="Home"
            showLabel={isOpen}
          />
          <BNavItem
          isActive
          icon={<Home size={18} />}
          label="Home"
          showLabel={isOpen}
        />
          <NavItem
            endContent={
              <button className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                <Plus size={14} />
              </button>
            }
            icon={<LayoutGrid size={18} />}
            label="Projects"
            showLabel={isOpen}
          /><CNavItem
          isOpen={isOpen}
          icon={<Home size={32} strokeWidth={2} />}
          label="Home"
        />
          <NavItem
            endContent={
              <button className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                <Plus size={14} />
              </button>
            }
            icon={<ClipboardList size={18} />}
            label="Tasks"
            showLabel={isOpen}
          />
          <NavItem icon={<Users size={18} />} label="Team" showLabel={isOpen} />
          <NavItem
            endContent={
              <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded-md">
                New
              </span>
            }
            icon={<Timer size={18} />}
            label="Tracker"
            showLabel={isOpen}
          />
        </NavSection>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-gray-800" />

        <NavSection showTitle={isOpen} title="Organization">
          <NavItem
            icon={<PieChart size={18} />}
            label="Cap Table"
            showLabel={isOpen}
          />
          <NavItem
            icon={<LineChart size={18} />}
            label="Analytics"
            showLabel={isOpen}
          />
          <NavItem
            endContent={
              <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded-md">
                3
              </span>
            }
            icon={<Gift size={18} />}
            label="Perks"
            showLabel={isOpen}
          />
          <NavItem
            icon={<Receipt size={18} />}
            label="Expenses"
            showLabel={isOpen}
          />
          <NavItem
            icon={<Settings size={18} />}
            label="Settings"
            showLabel={isOpen}
          />
        </NavSection>
      </div>
    </motion.aside>
  );
}


const ANavItem = ({ isActive, icon, label, showLabel }) => {
  const variants = {
    expanded: { opacity: 1, width: "100%", transition: { duration: 0.5 } },
    collapsed: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="collapsed"
      animate={showLabel ? "expanded" : "collapsed"}
      variants={variants}
      // style={{ overflow: "hidden" }}
    >
      {/* <div className={`nav-item flex felx-row bg-red-200 ${isActive ? "active" : ""}`}>
        {icon}
        {showLabel && <span>{label}</span>}
      </div> */}
      <div className="h-10 px- flex flex-row w-full">
        <div className="flex items-center justify-center w-10 h-10 mx-3 bg-green-200">
          {icon}
        </div>
        <div className="">Heelo</div>
        </div>

    </motion.div>
  );
};

export function BNavItem({ icon, label, href = "#", isActive = false, endContent, showLabel = true }: NavItemProps) {
  const variants = {
    expanded: { opacity: 1, width: "100%", transition: { duration: 0.5 } },
    collapsed: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
  };

  return (
    <div className="h-10 px-3 relative">
      {/* <Link href={href} passHref> */}
      <a href={href}>
        <motion.div
          initial="collapsed"
          // animate={{
          //   width: showLabel ? "calc(100% - 24px)" : "40px",
          // }}
          animate={showLabel ? "expanded" : "collapsed"}
          variants={variants}
          className={cn(
            "absolute inset-0 mx-3 flex items-center rounded-sm",
            isActive ? "bg-gray-800 text-white" : "bg-transparent text-gray-300 hover:bg-gray-800/50",
          )}
          title={!showLabel ? label : undefined}
          // transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          {/* Fixed position for the icon */}
          <div className="flex items-center justify-center w-10 h-10">{icon}</div>

          {/* Text slides in/out from the icon */}
          {/* <AnimatePresence initial={false}>
            {showLabel && (
              <motion.span
                animate={{ opacity: 1, width: "100%", x: 0 }}
                className="whitespace-nowrap overflow-hidden"
                exit={{ opacity: 0, width: 0, x: -20 }}
                initial={{ opacity: 0, width: 0, x: -20 }}
                transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence> */}
        </motion.div>
        {/* </Link> */}
      </a>

      {/* <AnimatePresence initial={false}>
        {showLabel && endContent && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10"
            exit={{ opacity: 0, x: -20 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            {endContent}
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}

// NavItem component: Icon remains fixed while the text label animates.
const CNavItem = ({ isOpen, icon, label }) => {
  const variants = {
    collapsed: { opacity: 0}, // left: "-100%"}, //scaleX: 0, marginLeft: 0 },
    expanded: { opacity: 1}, // left: 0} //scaleX: 1, marginLeft: 8 },
  };

  return (
    <div className="flex items-start min-h-14 mx-1 py-2 pl-2 rounded-md bg-red-100">
      {/* Icon is always visible */}
      <div className="felx items-centerjustify-center border-red-900 border-4">
        {icon}
      </div>
      {/* The label animates using a scale transform.
          transformOrigin left ensures the label expands from left-to-right without pushing the icon. */}
      <div className="flex justify-between">
        <motion.span
        animate={isOpen ? "expanded" : "collapsed"}
        className="ml-4 orign-left whitespace-nowrap block"
        initial="collapsed"
        transition={{ duration: 0.3 }}
        variants={variants}
      >
        {label}
      </motion.span>
      <span className="">H</span>
      </div>
    </div>
  );
};

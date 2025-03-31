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
} from "lucide-react";

import { cn } from "../../lib/utils";

import { useSidebar } from "./sidebar-context";
import { NavSection } from "./nav-section";
// import Image from "next/image"

export function Sidebar() {
  const { isOpen } = useSidebar();

  const overview = [
    {
      // isActive
      icon: <Home size={32} />,
      label: "Home",
      showLabel: isOpen,
    },
    {
      endContent: (
        <button className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
          <Plus size={14} />
        </button>
      ),
      icon: <LayoutGrid size={32} />,
      label: "Projects",
      showLabel: isOpen,
    },
    {
      endContent: (
        <button className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
          <Plus size={32} />
        </button>
      ),
      icon: <ClipboardList size={32} />,
      label: "Tasks",
      showLabel: isOpen,
    },
    { icon: <Users size={32} />, label: "Team", showLabel: isOpen },
    {
      endContent: (
        <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded-md">
          New
        </span>
      ),
      icon: <Timer size={32} />,
      label: "Tracker",
      showLabel: isOpen,
    },
  ];

  const organization = [
    {
      icon: <PieChart size={32} />,
      label: "Cap Table",
      showLabel: isOpen,
    },
    {
      icon: <LineChart size={32} />,
      label: "Analytics",
      showLabel: isOpen,
    },
    {
      endContent: (
        <span className="text-xs bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded-md">
          3
        </span>
      ),
      icon: <Gift size={32} />,
      label: "Perks",
      showLabel: isOpen,
    },
    {
      icon: <Receipt size={32} />,
      label: "Expenses",
      showLabel: isOpen,
    },
    {
      icon: <Settings size={32} />,
      label: "Settings",
      showLabel: isOpen,
    },
  ];

  return (
    <motion.aside
      animate={{
        width: isOpen ? "280px" : "64px",
      }}
      className="h-screen border-r border-gray-800 overflow-hidden flex flex-col"
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
              AITS
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
        {
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
        }
      </AnimatePresence>

      {/* Navigation with conditional scrollbar */}
      <div
        className="flex-1 overflow-y-auto scrollbar-hide" // Hide scrollbar when collapsed
      >
        <NavSection showTitle={isOpen} title="Overview">
          {overview.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </NavSection>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-gray-800" />

        <NavSection showTitle={isOpen} title="Organization">
        {organization.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </NavSection>
      </div>
    </motion.aside>
  );
}

// NavItem component: Icon remains fixed while the text label animates.
const NavItem = ({
  isOpen,
  icon,
  label,
  href,
  endContent,
  isActive = false,
  showLabel = true,
}) => {
  const variants = {
    collapsed: { opacity: 0 }, // left: "-100%"}, //scaleX: 0, marginLeft: 0 },
    expanded: { opacity: 1 }, // left: 0} //scaleX: 1, marginLeft: 8 },
  };
console.log({label,href,isActive, isOpen})
  return (
    <a href={href}>
      <div
        className={cn(
          "flex items-start min-h-14 mx-1 py-2 pl-2 rounded-md g-red-100",
          isActive,
          // ? "bg-gray-800 text-white"
          // : "bg-transparent text-gray-300 hover:bg-gray-800/50",
        )}
      >
        {/* Icon is always visible */}
        <div className="felx items-centerjustify-center border-red-900border-4">
          {icon}
        </div>
        {/* The label animates using a scale transform.
          transformOrigin left ensures the label expands from left-to-right without pushing the icon. */}
        <motion.div
          animate={isOpen ? "expanded" : "collapsed"}
          className="mx-4 orign-left whitespace-nowrap inline-bloc flex flex-row justify-between w-full bg-blue-100"
          initial="collapsed"
          transition={{ duration: 0.3 }}
          variants={variants}
        >
          <div className="text-white-100x">{label}</div>
          {showLabel && endContent}
        </motion.div>
      </div>
    </a>
  );
};

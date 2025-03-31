"use client";

// import DefaultLayout from "@/layouts/default";

import type React from "react";

import { Sidebar } from "@/components/sidebar/sidebar";
import { SidebarToggle } from "@/components/sidebar/sidebar-toggle";
import { useSidebar } from "@/components/sidebar/sidebar-context";
import { SidebarProvider } from "@/components/sidebar/sidebar-context";
import DefaultLayout from "@/layouts/default";

import { motion } from "framer-motion";

export default function WithSidebar() {
  return (
    // <DefaultLayout>
    // <Sidebar />
    // </DefaultLayout>
    <SidebarProvider>
      <DashboardLayout><DefaultLayout /></DashboardLayout>
    </SidebarProvider>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <motion.main
        className="flex-1 overflow-auto"
        initial={false}
        animate={{
          marginLeft: "0px",
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
       
        {children}
      </motion.main>
    </div>
  );
}

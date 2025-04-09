"use client";

import React, { useEffect, useState } from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  LayoutGrid,
  NotebookPen,
  BellDot,
  Settings,
  CircleHelp,
  LogOut,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NavMain } from "@/components/dashboard/components/nav-main";
import { NavProjects } from "@/components/dashboard/components/nav-projects";
import { NavUser } from "@/components/dashboard/components/nav-user";
import { TeamSwitcher } from "@/components/dashboard/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/auth";

function getData(role) {
// This is sample data.
const data = {
   teams: [
    {
      name: "AITS",
      logo: GalleryVerticalEnd,
      plan: "system",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
      items: [
        // {
        //   title: "Genesis",
        //   url: "#",
        // },
        // {
        //   title: "Explorer",
        //   url: "#",
        // },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    /*{
      title: "Reports",
      url: "/student-reports",
      icon: NotebookPen,
      isActive: true,
      items: [
        // {
        //   title: "History",
        //   url: "#",
        // },
        // {
        //   title: "Starred",
        //   url: "#",
        // },
        // {
        //   title: "Settings",
        //   url: "#",
        // },
      ],
    },*/
    {
      title: "Notifications",
      url: "/notifications",
      icon: BellDot,
      items: [
        // {
        //   title: "Introduction",
        //   url: "#",
        // },
        // {
        //   title: "Get Started",
        //   url: "#",
        // },
        // {
        //   title: "Tutorials",
        //   url: "#",
        // },
        // {
        //   title: "Changelog",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        // {
        //   title: "General",
        //   url: "/",
        // },
        // {
        //   title: "Team",
        //   url: "vv",
        // },
        // {
        //   title: "Billing",
        //   url: "#",
        // },
        // {
        //   title: "Limits",
        //   url: "#",
        // },
      ],
    },
  ],
  projects: [
    // {
    //   name: "Dashboard",
    //   url: "/dashboard",
    //   icon: Frame,
    // },
    // {
    //   name: "Reports",
    //   url: `/${role}-reports`,
    //   icon: PieChart,
    // },
    // {
    //   name: "Notifications",
    //   url: "/notifications",
    //   icon: Map,
    // },{
    //   name: "Settings",
    //   url: "/notifications",
    //   icon: Settings2,
    // },
    {
      name: "Help & Support",
      url: "/help",
      icon: Settings2,
    },
    {
      name: "Logout",
      url: "/account/logout",
      icon: LogOut,
    },
  ],
}
return data
}

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
export function AppSidebar({ userRole, ...props }) {
  const [data, setData] = useState(null);
  const user = useUser();

  useEffect(() => setData(getData(userRole)), [userRole]);
  // console.log({ userRole });
  // const data = getData(userRole)
  return (
    (data && (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    )) || <></>
  );
}

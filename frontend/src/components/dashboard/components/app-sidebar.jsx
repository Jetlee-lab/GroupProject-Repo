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
  LifeBuoy,
  Send,
  HelpCircle,
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
import { NavSecondary } from "@/components/dashboard/components/nav-secondary";
import { NavUser } from "@/components/dashboard/components/nav-user";
import { RoleSwitcher } from "@/components/dashboard/components/role-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/features/auth";
import { useActiveRole } from "@/hooks/use-auth";

function getData(role) {
  // This is sample data.
  const data = {
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
      {
        title: "Reports",
        url: `/dashboard/${role}-reports`,
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
      },
      {
        title: "Notifications",
        url: "/dashboard/notifications",
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
        url: "/dashboard/settings",
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
    navSecondary: [
      {
        title: "Help & Support",
        url: "/help",
        icon: HelpCircle,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
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
      //   url: `/dashboard/${role}-reports`,
      //   icon: PieChart,
      // },
      // {
      //   name: "Notifications",
      //   url: "/dashboard/notifications",
      //   icon: Map,
      // },{
      //   name: "Settings",
      //   url: "/dashboard/notifications",
      //   icon: Settings2,
      // },
      // {
      //   name: "Help & Support",
      //   url: "/help",
      //   icon: Settings2,
      // },
      // {
      //   name: "Logout",
      //   url: "/account/logout",
      //   icon: LogOut,
      // },
    ],
  };
  return data;
}

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
export function AppSidebar({ userRoles, onRoleChange = () => void(0), ...props }) {
  const [data, setData] = useState(null);
  const user = useUser();
  const [activeRole] = useActiveRole() 

  useEffect(() => setData(getData(activeRole.name)), [activeRole]);
  // console.log({ userRole, data });
  // const data = getData(userRole)
  return (
    // (data && (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <RoleSwitcher roles={userRoles} onRoleChange={onRoleChange} />
      </SidebarHeader>
      <SidebarContent>
        {data && (
          <>
            <NavMain items={data.navMain} />
            <NavProjects projects={data?.projects} />
            <NavSecondary items={data?.navSecondary} className="mt-auto" />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
    // )) || <></>
  );
}

"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, GalleryVerticalEnd, UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useActiveRole } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

// export function TeamSwitcher({
//     teams,
//   }: {
//     teams: {
//       name: string
//       logo: React.ElementType
//       plan: string
//     }[]
//   }) {
export function RoleSwitcher({ roles, onRoleChange }) {
  const { isMobile } = useSidebar();
  // const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  const [activeRole, setActiveRole] = useActiveRole()
  
  // Fix useState(teams[0]) not updating correctly
  // useEffect(() => setActiveTeam(teams[0]), [activeTeam])

  if (!activeRole) {
    return null;
  }
  // console.log({activeTeam, teams, })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <activeTeam.logo className="size-4" /> */}
                <GalleryVerticalEnd />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {/* {activeTeam.name} */}
                  AITS
                </span>
                <span className="truncate text-xs">{activeRole.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Your Roles
            </DropdownMenuLabel>
            {roles.map((role, index) => (
              <DropdownMenuItem
                key={role.name}
                onClick={() => {
                  if (activeRole != role) {
                    // setActiveRole(role);
                    onRoleChange(role);
                  }
                }}
                className="gap-2 p-2"
              >
                <div className={cn("flex size-6 items-center justify-center rounded-sm border", activeRole === role ? "border-2 border-sidebar-primary" : null)}>
                  {/* <team.logo className="size-4 shrink-0" /> */}
                  <UserRound />
                </div>
                {role.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add role</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

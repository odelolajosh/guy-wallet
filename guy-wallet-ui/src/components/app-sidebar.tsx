import { Cog, File, Flag, Gift, Home, PieChart, Wallet } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { SwitchThemeButton } from "./switch-theme"
import { GuyLogo } from "./guy-logo"

// Menu items.
const generalItems = [
  {
    title: "Overview",
    url: "",
    icon: Home,
  },
  {
    title: "Wallet",
    url: "/wallet",
    icon: Wallet,
  },
  {
    title: "Events",
    url: "/events",
    icon: Flag,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: PieChart,
  },
  {
    title: "Invoices",
    url: "/invoices",
    icon: File,
  },
]

const acquisitionItems = [
  {
    title: "Referrals",
    url: "/referrals",
    icon: Gift,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Cog,
  }
]

const linksItems = [
  {
    title: "Get code",
    url: "http://github.com/odelolajosh/guy-wallet",
    icon: GitHubLogoIcon
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="py-3 flex items-center">
          <GuyLogo showText />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GENERAL</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton asChild isActive={isActive}>
                        <span>
                          <item.icon className={cn(isActive && "text-tertiary")} />
                          <span>{item.title} {isActive}</span>
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>ACQUISITION</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {acquisitionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton asChild isActive={isActive}>
                        <span>
                          <item.icon className={cn(isActive && "text-tertiary")} />
                          <span>{item.title} {isActive}</span>
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {linksItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton asChild isActive={isActive}>
                        <span>
                          <item.icon className={cn(isActive && "text-tertiary")} />
                          <span>{item.title} {isActive}</span>
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className="gap-4">
          <SwitchThemeButton />
          <small className="text-muted-foreground">
            &copy; 2024 Guy Wallet. All rights reserved.
          </small>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

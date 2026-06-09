
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Tag,
  Send,
  Activity,
  Settings,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Ofertas Diárias",
    url: "/offers",
    icon: Tag,
  },
  {
    title: "Disparos",
    url: "/history",
    icon: Send,
  },
  {
    title: "Distribuição",
    url: "/groups",
    icon: Activity,
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/50 bg-sidebar/50 backdrop-blur-sm">
      <SidebarHeader className="p-4">
        <div className={cn(
          "flex items-center gap-3 transition-all duration-300",
          state === "collapsed" ? "justify-center" : "px-2"
        )}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Zap className="h-6 w-6 text-primary-foreground fill-current" />
          </div>
          {state !== "collapsed" && (
            <div className="flex flex-col">
              <span className="text-xl font-headline font-bold text-foreground tracking-tight leading-none">
                Oferta<span className="text-primary">Hub</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-tighter">
                Descubra. Dispare. Venda.
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-headline font-semibold text-[10px] uppercase tracking-wider text-muted-foreground/60 px-4 mt-4">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {navMain.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-11 px-3 rounded-lg transition-all duration-200",
                        isActive 
                          ? "bg-primary/10 text-primary font-semibold" 
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-primary"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                        <span className="ml-3 text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

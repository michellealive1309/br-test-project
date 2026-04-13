"use client"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { logout } from "@/app/actions/logout"

const data = {
  navMain: [
    {
      title: "Menu",
      url: "#",
      items: [
        {
          title: "Order",
          url: "/order",
          isActive: false,
        },
        {
          title: "Customer",
          url: "/customer",
          isActive: false,
        },
      ],
    },
  ],
}

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: { email: string } | null }) {

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {user && (
          <div className="mt-2 px-4 py-2 rounded-md">
            <p className="text-gray-400">Signed in as</p>
            <p className="font-medium">{user.email}</p>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-base">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className="text-xl">{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <a onClick={logout} className="text-xl text-red-400 hover:text-red-600">
                  Logout
                </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

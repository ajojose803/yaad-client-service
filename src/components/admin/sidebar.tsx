"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Calendar, Store, CreditCard, DollarSign, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import useAdminAuthStore from "@/service/store/AdminAuthStore" // Correct store import

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Events",
    icon: Calendar,
    href: "/admin/events",
  },
  {
    title: "Vendors",
    icon: Store,
    href: "/admin/vendors",
  },
  {
    title: "Pricing Tiers",
    icon: CreditCard,
    href: "/admin/pricing",
  },
  {
    title: "Revenue",
    icon: DollarSign,
    href: "/admin/revenue",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { adminLogout } = useAdminAuthStore() // Correct hook for logout

  const handleLogout = () => {
    adminLogout() // Call the logout function
    // Optional: Redirect to login page or clear session data here if needed
    window.location.href = "/admin/login"; // This will redirect to the login page (optional)
  }

  return (
    <Sidebar className="border-r bg-black ">
      <SidebarHeader className="border-b border-white/10 px-6 py-4 bg-black">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-white">Yaad</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4 py-2 bg-black">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "w-full text-white/70 hover:text-white hover:bg-white/10",
                  pathname === item.href && "bg-pink-600 text-white hover:bg-pink-700",
                )}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {/* Logout Button at the end */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full text-white/70 hover:text-white hover:bg-white/10 mt-auto"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

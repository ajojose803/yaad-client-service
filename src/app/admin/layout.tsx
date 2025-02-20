"use client"
import {usePathname } from "next/navigation";
import DashboardLayout from "@/components/layouts/AdminDashBoardLayout";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>; // No sidebar for login page
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

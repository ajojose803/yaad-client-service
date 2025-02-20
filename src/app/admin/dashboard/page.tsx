"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Stats } from "@/components/admin/Stats";
import { Charts } from "@/components/admin/Charts";
import useAdminAuthStore from "@/service/store/AdminAuthStore";

export default function DashboardPage() {
  const router = useRouter();
  const loggedIn = useAdminAuthStore((state) => state.loggedIn);
  
  // useEffect(() => {
  //   // If the admin is not logged in, redirect to the login page
  //   if (!loggedIn) {
  //     router.push("/admin/login");
  //   }
  // }, [loggedIn, router]);

  // // If loggedIn is false, the content won't be rendered, and the redirect happens
  // if (!loggedIn) {
  //   return null; // Or a loading spinner until the check is completed
  // }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <Stats />
      <Charts />
    </div>
  );
}

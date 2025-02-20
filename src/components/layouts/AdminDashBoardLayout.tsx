import { DashboardSidebar } from "@/components/admin/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <DashboardSidebar />
          <SidebarTrigger />
        <main className="flex-1 overflow-y-auto bg-background px-4 py-6 lg:px-8">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

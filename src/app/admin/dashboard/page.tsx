import { Stats } from "@/components/admin/stats"
import { Charts } from "@/components/admin/charts"

export default function DashboardPage() {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <Stats />
        <Charts />
      </div>
    )
  }
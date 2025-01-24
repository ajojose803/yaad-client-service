import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Store, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Users",
    value: "1,500",
    icon: Users,
  },
  {
    title: "Events",
    value: "80",
    icon: Calendar,
  },
  {
    title: "Vendors",
    value: "25",
    icon: Store,
  },
  {
    title: "Revenue",
    value: "₹150,000",
    icon: DollarSign,
  },
]

export function Stats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
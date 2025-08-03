import { StatsCard } from "@/components/common/StatsCard"
import { useDashboard } from "@/hooks/useDashboard"
import { TrendingUp, Users, DollarSign, Target } from "lucide-react"

const iconMap = {
  "Total Leads": <Users className="h-4 w-4 text-muted-foreground" />,
  "Active Deals": <Target className="h-4 w-4 text-muted-foreground" />,
  "Revenue": <DollarSign className="h-4 w-4 text-muted-foreground" />,
  "Conversion Rate": <TrendingUp className="h-4 w-4 text-muted-foreground" />
}

export function DashboardStats() {
  const { stats } = useDashboard()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={iconMap[stat.title as keyof typeof iconMap]}
        />
      ))}
    </div>
  )
}
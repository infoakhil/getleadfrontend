import { DashboardStats } from "./components/DashboardStats"
import { RecentLeadsTable } from "./components/RecentLeadsTable"
import { useData } from "@/contexts/DataContext"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardPage() {
  const { isLoading } = useData()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your CRM.</p>
      </div>

      <DashboardStats />
      <RecentLeadsTable />
    </div>
  )
}
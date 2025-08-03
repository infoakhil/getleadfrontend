import { useState } from "react"
import { DashboardPage } from "@/features/dashboard/DashboardPage"
import { LeadsPage } from "@/features/leads/LeadsPage"

type Route = "/" | "/leads" | "/companies" | "/deals" | "/calendar" | "/reports" | "/settings"

interface AppRouterProps {
  currentPath: Route
}

export function AppRouter({ currentPath }: AppRouterProps) {
  switch (currentPath) {
    case "/":
      return <DashboardPage />
    case "/leads":
      return <LeadsPage />
    case "/companies":
      return <div>Companies Page (Coming Soon)</div>
    case "/deals":
      return <div>Deals Page (Coming Soon)</div>
    case "/calendar":
      return <div>Calendar Page (Coming Soon)</div>
    case "/reports":
      return <div>Reports Page (Coming Soon)</div>
    case "/settings":
      return <div>Settings Page (Coming Soon)</div>
    default:
      return <DashboardPage />
  }
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<Route>("/")
  
  return {
    currentPath,
    navigate: (path: Route) => setCurrentPath(path)
  }
}
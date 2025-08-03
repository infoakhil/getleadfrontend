import { DashboardPage } from "@/features/dashboard/DashboardPage"
import { LeadsPage } from "@/features/leads/LeadsPage"
import { LoginPage } from "@/features/auth/LoginPage"

interface AppRouterProps {
  currentPath: string
  isAuthenticated: boolean
}

export function AppRouter({ currentPath, isAuthenticated }: AppRouterProps) {
  // If not authenticated and trying to access protected route, show login
  if (!isAuthenticated && currentPath !== "/login") {
    return <LoginPage />
  }

  // If authenticated and trying to access login, redirect to dashboard
  if (isAuthenticated && currentPath === "/login") {
    return <DashboardPage />
  }

  switch (currentPath) {
    case "/login":
      return <LoginPage />
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
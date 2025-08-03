import { DashboardPage } from "@/features/dashboard/DashboardPage"
import { LeadsPage } from "@/features/leads/LeadsPage"
import { LoginPage } from "@/features/auth/LoginPage"
import { ForgotPasswordPage } from "@/features/auth/ForgotPasswordPage"

interface AppRouterProps {
  currentPath: string
  isAuthenticated: boolean
}

export function AppRouter({ currentPath, isAuthenticated }: AppRouterProps) {
  // Allow access to login and forgot password without authentication
  const publicRoutes = ["/login", "/forgot-password"]
  
  // If not authenticated and trying to access protected route, show login
  if (!isAuthenticated && !publicRoutes.includes(currentPath)) {
    return <LoginPage />
  }

  // If authenticated and trying to access login, redirect to dashboard
  if (isAuthenticated && publicRoutes.includes(currentPath)) {
    return <DashboardPage />
  }

  switch (currentPath) {
    case "/login":
      return <LoginPage />
    case "/forgot-password":
      return <ForgotPasswordPage />
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
import { useState } from "react"
import { SimpleSidebar } from "@/components/SimpleSidebar"
import { DataProvider } from "@/contexts/DataContext"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { RouterProvider, useRouter } from "@/contexts/RouterContext"
import { AppRouter } from "@/components/AppRouter"
import { APP_CONFIG } from "@/config"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

function AppContent() {
  const { currentPath, navigate } = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // If not authenticated, show only the router (which will show login)
  if (!isAuthenticated) {
    return <AppRouter currentPath={currentPath} isAuthenticated={false} />
  }

  // If authenticated, show the full app layout
  return (
    <div className="flex h-screen bg-background">
      <SimpleSidebar 
        currentPath={currentPath} 
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-semibold">{APP_CONFIG.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <AppRouter currentPath={currentPath} isAuthenticated={true} />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </RouterProvider>
  )
}

export default App
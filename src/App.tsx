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
        <header className="border-b bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50">
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
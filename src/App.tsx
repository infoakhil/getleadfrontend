import { useState } from "react"
import { SimpleSidebar } from "@/components/SimpleSidebar"
import { DataProvider } from "@/contexts/DataContext"
import { AppRouter, useRouter } from "@/components/AppRouter"
import { APP_CONFIG } from "@/config"

function App() {
  const { currentPath, navigate } = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <DataProvider>
      <div className="flex h-screen bg-background">
        <SimpleSidebar 
          currentPath={currentPath} 
          onNavigate={navigate}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <div className="flex-1 flex flex-col lg:ml-64">
          <header className="border-b bg-card">
            <div className="flex h-16 items-center px-4">
              <h1 className="text-xl font-semibold">{APP_CONFIG.name}</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <AppRouter currentPath={currentPath} />
          </main>
        </div>
      </div>
    </DataProvider>
  )
}

export default App
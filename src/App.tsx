import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DataProvider } from "@/contexts/DataContext"
import { AppRouter, useRouter } from "@/components/AppRouter"
import { APP_CONFIG } from "@/config"

function App() {
  const { currentPath, navigate } = useRouter()

  return (
    <DataProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar currentPath={currentPath} onNavigate={navigate} />
          <div className="flex-1 flex flex-col">
            <header className="border-b">
              <div className="flex h-16 items-center px-4">
                <SidebarTrigger />
                <h1 className="ml-4 text-xl font-semibold">{APP_CONFIG.name}</h1>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">
              <AppRouter currentPath={currentPath} />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </DataProvider>
  )
}

export default App
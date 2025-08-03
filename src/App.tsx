import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Dashboard from "@/pages/Dashboard"

function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b">
            <div className="flex h-16 items-center px-4">
              <SidebarTrigger />
              <h1 className="ml-4 text-xl font-semibold">Getlead CRM</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Dashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default App
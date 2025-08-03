import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Users, 
  Building2, 
  FileText, 
  Calendar,
  BarChart3,
  Settings,
  Menu
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Leads",
    icon: Users,
    url: "/leads",
  },
  {
    title: "Companies",
    icon: Building2,
    url: "/companies",
  },
  {
    title: "Deals",
    icon: FileText,
    url: "/deals",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "/calendar",
  },
  {
    title: "Reports",
    icon: BarChart3,
    url: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
]

interface SimpleSidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
  isOpen: boolean
  onToggle: () => void
}

export function SimpleSidebar({ currentPath, onNavigate, isOpen, onToggle }: SimpleSidebarProps) {
  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={onToggle}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform bg-card border-r transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-lg font-semibold">Getlead CRM</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item) => {
              const isActive = currentPath === item.url
              return (
                <button
                  key={item.url}
                  onClick={() => {
                    onNavigate(item.url)
                    if (window.innerWidth < 1024) {
                      onToggle()
                    }
                  }}
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.title}
                </button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  )
}
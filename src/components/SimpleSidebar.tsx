import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { 
  Home, 
  Users, 
  Building2, 
  FileText, 
  Calendar,
  BarChart3,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

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
  isCollapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
}

export function SimpleSidebar({ currentPath, onNavigate, isOpen, onToggle, isCollapsed: controlledCollapsed, onCollapse }: SimpleSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  
  // Use controlled state if provided, otherwise use internal state
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed
  const setIsCollapsed = onCollapse || setInternalCollapsed

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
          "fixed left-0 top-0 z-40 h-screen transform bg-[#1E1E2E] text-white transition-all duration-200 ease-in-out lg:translate-x-0 shadow-2xl",
          isCollapsed ? "w-16" : "w-60",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-gray-700 px-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">G</span>
              </div>
              {!isCollapsed && <span className="text-lg font-semibold">Getlead</span>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex text-gray-400 hover:text-white hover:bg-gray-700"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className={cn(
            "flex-1 space-y-1 py-4",
            isCollapsed ? "px-2" : "px-4"
          )}>
            <TooltipProvider delayDuration={0}>
              {menuItems.map((item) => {
                const isActive = currentPath === item.url
                const menuButton = (
                  <button
                    onClick={() => {
                      onNavigate(item.url)
                      if (window.innerWidth < 1024) {
                        onToggle()
                      }
                    }}
                    className={cn(
                      "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-red-500 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 flex-shrink-0", !isCollapsed && "mr-3")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </button>
                )

                if (isCollapsed) {
                  return (
                    <Tooltip key={item.url}>
                      <TooltipTrigger asChild>
                        {menuButton}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  )
                }

                return <div key={item.url}>{menuButton}</div>
              })}
            </TooltipProvider>
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
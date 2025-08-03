import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  Home, 
  Users, 
  Building2, 
  FileText, 
  Calendar,
  BarChart3,
  Settings
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

interface AppSidebarProps {
  currentPath: string
  onNavigate: (path: any) => void
}

export function AppSidebar({ currentPath, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">Getlead CRM</h2>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onNavigate(item.url)}
                    isActive={currentPath === item.url}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
import { useState } from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target,
  Calendar,
  Phone,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ArrowRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts"

// Generate chart data
const generateLeadsData = () => {
  const data = []
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      leads: Math.floor(Math.random() * 30) + 10,
      deals: Math.floor(Math.random() * 15) + 5
    })
  }
  return data
}

const COLORS = {
  primary: "#3b82f6",
  secondary: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#8b5cf6",
  muted: "#64748b",
  new: "#10B981",
  qualified: "#F59E0B",
  sent: "#8B5CF6"
}

export function DashboardPage() {
  const [dateRange, setDateRange] = useState("all")
  
  const leadsData = generateLeadsData()

  const stats = [
    {
      title: "Today",
      value: "19",
      bgColor: "bg-[#47B7B8]",
      textColor: "text-white",
      icon: ArrowRight
    },
    {
      title: "Month",
      value: "171",
      bgColor: "bg-[#F86642]",
      textColor: "text-white",
      icon: ArrowRight
    },
    {
      title: "Total",
      value: "69",
      bgColor: "bg-[#E94B9C]",
      textColor: "text-white",
      icon: ArrowRight
    },
    {
      title: "Total",
      value: "19661",
      bgColor: "bg-[#6C63FF]",
      textColor: "text-white",
      icon: ArrowRight
    }
  ]

  const leadStatusData = [
    { name: "Converted", value: 41, color: "#10B981" },
    { name: "None", value: 4, color: "#8B5CF6" },
    { name: "Hot Business", value: 11, color: "#F59E0B" },
    { name: "New", value: 37, color: "#3B82F6" },
    { name: "Demo Completed-I", value: 37, color: "#06B6D4" },
    { name: "Dead", value: 12, color: "#EF4444" },
    { name: "Proposal Sent", value: 4, color: "#84CC16" },
    { name: "Cold", value: 12, color: "#F97316" },
    { name: "Warm", value: 12, color: "#A855F7" },
    { name: "Demo Scheduled-I", value: 1, color: "#EC4899" }
  ]

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "created a new lead",
      target: "Acme Corporation",
      time: "2 minutes ago",
      avatar: "JD"
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "closed a deal with",
      target: "Tech Startup Inc",
      time: "1 hour ago",
      avatar: "JS"
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "scheduled a meeting with",
      target: "Global Corp",
      time: "3 hours ago",
      avatar: "MJ"
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "sent a proposal to",
      target: "Innovation Ltd",
      time: "5 hours ago",
      avatar: "SW"
    }
  ]

  const leadSourceData = [
    { name: "New", value: 70, color: COLORS.new },
    { name: "Qualified Sent", value: 20, color: COLORS.qualified },
    { name: "Sent", value: 10, color: COLORS.sent }
  ]
  
  const leadPurposeData = [
    { name: "Agency", value: 40, color: COLORS.primary },
    { name: "Direct", value: 35, color: COLORS.secondary },
    { name: "Partnership", value: 25, color: COLORS.warning }
  ]

  const callStatusData = [
    { name: "Total task", value: 4530, color: "#3B82F6" },
    { name: "Pending", value: 401, color: "#10B981" },
    { name: "Overdue", value: 63, color: "#EF4444" },
    { name: "Completed", value: 4066, color: "#8B5CF6" }
  ]
  
  const dealsData = [
    { name: "Adelina", inProgress: 60, color: "#F59E0B" },
    { name: "Name Name", inProgress: 80, color: "#3B82F6" }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">77 Open Deals</div>
          <div className="text-sm text-muted-foreground">₹2019885 Pipeline amount</div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="branch1">Branch 1</SelectItem>
              <SelectItem value="branch2">Branch 2</SelectItem>
            </SelectContent>
          </Select>
          <Select value="last30" onValueChange={() => {}}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="last90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-6 ${stat.textColor} relative overflow-hidden`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.title}</div>
              </div>
              <stat.icon className="h-6 w-6 opacity-50" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Last 30 days added Leads Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Last 30 days added Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsData}>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="leads" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Status */}
        <Card>
          <CardHeader>
            <CardTitle>Lead status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leadStatusData.map((status) => (
                <div key={status.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                    <span>{status.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{status.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Task status */}
        <Card>
          <CardHeader>
            <CardTitle>Task status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {callStatusData.map((status) => (
                <div key={status.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                    <span className="text-sm">{status.name}</span>
                  </div>
                  <span className="text-sm font-medium">{status.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deals in progress */}
        <Card>
          <CardHeader>
            <CardTitle>Deals in progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dealsData.map((deal) => (
                <div key={deal.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{deal.name}</span>
                    <span className="text-sm text-muted-foreground">{deal.inProgress}%</span>
                  </div>
                  <Progress value={deal.inProgress} className="h-2" style={{ backgroundColor: '#E5E7EB' }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Third Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Deal pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Deal pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>New</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Qualified Sent</span>
                <span className="font-medium">4</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lead source */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lead source</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead purpose */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Lead purpose</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width={150} height={150}>
              <PieChart>
                <Pie
                  data={leadPurposeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  dataKey="value"
                >
                  {leadPurposeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
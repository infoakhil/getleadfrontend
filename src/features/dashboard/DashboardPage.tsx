import { useState } from "react"
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Phone,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Activity
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts"

// Generate chart data
const generateLeadsData = () => {
  const data = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
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
  const [activeTab, setActiveTab] = useState("leads")
  
  const leadsData = generateLeadsData()

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

  const leadSourceData = [
    { name: "Direct", value: 45, color: COLORS.primary },
    { name: "Social Media", value: 30, color: COLORS.secondary },
    { name: "Email Campaign", value: 15, color: COLORS.warning },
    { name: "Referral", value: 10, color: COLORS.info }
  ]
  
  const callStatusData = [
    { name: "Total task", value: 4530, color: "#3B82F6" },
    { name: "Pending", value: 401, color: "#10B981" },
    { name: "Overdue", value: 63, color: "#EF4444" },
    { name: "Completed", value: 4066, color: "#8B5CF6" }
  ]
  
  const dealStageData = [
    { name: "Qualification", value: 15, amount: "₹2,50,000", color: "#3B82F6" },
    { name: "Proposal", value: 8, amount: "₹5,80,000", color: "#10B981" },
    { name: "Negotiation", value: 5, amount: "₹3,20,000", color: "#F59E0B" },
    { name: "Closed Won", value: 23, amount: "₹12,50,000", color: "#8B5CF6" },
    { name: "Closed Lost", value: 7, amount: "₹1,80,000", color: "#EF4444" }
  ]


  const latestLeads = [
    { id: 1, name: "John Smith", company: "Acme Corporation", email: "john@acme.com", phone: "+1 234-567-8900", status: "New", source: "Website", time: "5 minutes ago" },
    { id: 2, name: "Sarah Johnson", company: "Tech Startup Inc", email: "sarah@techstartup.com", phone: "+1 234-567-8901", status: "Hot", source: "Referral", time: "1 hour ago" },
    { id: 3, name: "Mike Williams", company: "Global Corp", email: "mike@globalcorp.com", phone: "+1 234-567-8902", status: "Warm", source: "Email Campaign", time: "2 hours ago" },
    { id: 4, name: "Emily Davis", company: "Innovation Ltd", email: "emily@innovation.com", phone: "+1 234-567-8903", status: "New", source: "Social Media", time: "3 hours ago" },
    { id: 5, name: "David Brown", company: "Enterprise Solutions", email: "david@enterprise.com", phone: "+1 234-567-8904", status: "Cold", source: "Direct", time: "4 hours ago" }
  ]

  const latestDeals = [
    { id: 1, name: "Website Redesign", company: "Acme Corporation", amount: "₹2,50,000", stage: "Proposal", probability: 75, closeDate: "2024-02-15", owner: "John Doe" },
    { id: 2, name: "Mobile App Development", company: "Tech Startup Inc", amount: "₹5,80,000", stage: "Negotiation", probability: 60, closeDate: "2024-02-20", owner: "Jane Smith" },
    { id: 3, name: "CRM Implementation", company: "Global Corp", amount: "₹3,20,000", stage: "Qualification", probability: 30, closeDate: "2024-03-01", owner: "Mike Johnson" },
    { id: 4, name: "Cloud Migration", company: "Innovation Ltd", amount: "₹4,50,000", stage: "Proposal", probability: 80, closeDate: "2024-02-18", owner: "Sarah Williams" }
  ]

  const todaysTasks = [
    { id: 1, title: "Follow up with Acme Corp", type: "call", priority: "high", dueTime: "10:00 AM", status: "pending", assignee: "John Doe", related: "Lead - John Smith" },
    { id: 2, title: "Send proposal to Tech Startup", type: "email", priority: "medium", dueTime: "2:00 PM", status: "completed", assignee: "Jane Smith", related: "Deal - Mobile App Development" },
    { id: 3, title: "Product demo for Global Corp", type: "meeting", priority: "high", dueTime: "4:00 PM", status: "pending", assignee: "Mike Johnson", related: "Lead - Mike Williams" },
    { id: 4, title: "Review contract terms", type: "task", priority: "low", dueTime: "5:00 PM", status: "pending", assignee: "Sarah Williams", related: "Deal - Cloud Migration" },
    { id: 5, title: "Update CRM records", type: "task", priority: "medium", dueTime: "3:00 PM", status: "overdue", assignee: "David Brown", related: "General" }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
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

      {/* Compact Tab Navigation */}
      <div className="flex items-center gap-1 border-b">
        <button
          onClick={() => setActiveTab("leads")}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "leads" 
              ? "text-primary border-primary" 
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          <Users className="h-4 w-4" />
          Leads
        </button>
        <button
          onClick={() => setActiveTab("deals")}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "deals" 
              ? "text-primary border-primary" 
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          <DollarSign className="h-4 w-4" />
          Deals
        </button>
        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "tasks" 
              ? "text-primary border-primary" 
              : "text-muted-foreground border-transparent hover:text-foreground"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          Tasks
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {/* Leads Tab */}
        {activeTab === "leads" && (
          <div className="space-y-6">
          {/* Lead Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">171</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New This Week</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37</div>
                <p className="text-xs text-muted-foreground">+23% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Converted</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">41</div>
                <p className="text-xs text-muted-foreground">23.9% conversion rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11</div>
                <p className="text-xs text-muted-foreground">Ready to convert</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Lead Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Generation Trend</CardTitle>
                <CardDescription>New leads over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leadsData}>
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Lead Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Status</CardTitle>
                <CardDescription>Current distribution of all leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {leadStatusData.slice(0, 8).map((status) => (
                    <div key={status.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                        <span className="text-sm">{status.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{status.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Lead Source */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Where your leads are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-around">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {leadSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {leadSourceData.map((source) => (
                      <div key={source.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                        <span className="text-sm">{source.name}: {source.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Latest Leads */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Latest Leads</CardTitle>
                    <CardDescription>Recently added leads</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {latestLeads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{lead.name}</p>
                          <Badge variant={
                            lead.status === "Hot" ? "destructive" :
                            lead.status === "Warm" ? "default" :
                            lead.status === "New" ? "secondary" :
                            "outline"
                          } className="text-xs">
                            {lead.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{lead.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">{lead.source} • {lead.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        )}

        {/* Deals Tab */}
        {activeTab === "deals" && (
          <div className="space-y-6">
          {/* Deal Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Deals</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">77</div>
                <p className="text-xs text-muted-foreground">Worth ₹20,18,885</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Won This Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">₹12,50,000 revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹54,348</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76.7%</div>
                <p className="text-xs text-muted-foreground">23 won out of 30</p>
              </CardContent>
            </Card>
          </div>

          {/* Deal Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Deal Pipeline</CardTitle>
              <CardDescription>Deals by stage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dealStageData.map((stage) => (
                  <div key={stage.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                        <span className="font-medium">{stage.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{stage.value} deals</span>
                        <span className="text-sm text-muted-foreground ml-2">{stage.amount}</span>
                      </div>
                    </div>
                    <Progress 
                      value={(stage.value / dealStageData.reduce((acc, curr) => acc + curr.value, 0)) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Deal Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Closure Trend</CardTitle>
                <CardDescription>Deals closed over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={leadsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="deals" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Latest Deals */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Latest Deals</CardTitle>
                    <CardDescription>Recently updated deals</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {latestDeals.map((deal) => (
                    <div key={deal.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{deal.name}</p>
                        <p className="font-semibold text-sm">{deal.amount}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{deal.company}</span>
                          <Badge variant={
                            deal.stage === "Proposal" ? "default" :
                            deal.stage === "Negotiation" ? "secondary" :
                            "outline"
                          } className="text-xs">
                            {deal.stage}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground">Close:</span>
                          <span>{deal.closeDate}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Probability</span>
                          <span>{deal.probability}%</span>
                        </div>
                        <Progress value={deal.probability} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
          {/* Task Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,530</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">401</div>
                <p className="text-xs text-muted-foreground">Needs attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">63</div>
                <p className="text-xs text-muted-foreground">Requires immediate action</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">Great progress!</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Task Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Task Status Overview</CardTitle>
                <CardDescription>Distribution of all tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {callStatusData.map((status) => (
                    <div key={status.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                        <span className="text-sm">{status.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold">{status.value}</span>
                        <span className="text-xs text-muted-foreground">
                          ({((status.value / 4530) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Tasks</CardTitle>
                    <CardDescription>Tasks scheduled for today</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`p-2 rounded-lg ${
                        task.type === 'call' ? 'bg-blue-100' :
                        task.type === 'email' ? 'bg-green-100' :
                        task.type === 'meeting' ? 'bg-purple-100' :
                        'bg-gray-100'
                      }`}>
                        {task.type === 'call' && <Phone className="h-4 w-4 text-blue-600" />}
                        {task.type === 'email' && <FileText className="h-4 w-4 text-green-600" />}
                        {task.type === 'meeting' && <Users className="h-4 w-4 text-purple-600" />}
                        {task.type === 'task' && <CheckCircle2 className="h-4 w-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{task.title}</p>
                          <Badge variant={
                            task.status === 'completed' ? 'secondary' :
                            task.status === 'overdue' ? 'destructive' :
                            'outline'
                          } className="text-xs">
                            {task.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{task.dueTime}</span>
                          <span>•</span>
                          <span>{task.assignee}</span>
                          <span>•</span>
                          <span>{task.related}</span>
                        </div>
                      </div>
                      <Badge variant={
                        task.priority === 'high' ? 'destructive' :
                        task.priority === 'medium' ? 'default' :
                        'secondary'
                      } className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Completion Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Task Completion Trend</CardTitle>
              <CardDescription>Tasks completed over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={leadsData.map(d => ({ ...d, tasks: Math.floor(Math.random() * 50) + 20 }))}>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          </div>
        )}
      </div>
    </div>
  )
}
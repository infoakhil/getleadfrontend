import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Generate chart data for last 30 days
const generateLeadsData = () => {
  const data = []
  for (let i = 1; i <= 30; i++) {
    data.push({
      day: i,
      leads: Math.floor(Math.random() * 30) + 5
    })
  }
  return data
}

const COLORS = {
  primary: "#5B93FF",
  secondary: "#50CD89",
  warning: "#FFC700",
  danger: "#F1416C",
  info: "#7239EA",
  success: "#00A3FF",
  cyan: "#00D4FF",
  pink: "#FF5E97"
}

export function DashboardPage() {
  const [branchFilter, setBranchFilter] = useState("all")
  const [dateRange, setDateRange] = useState("last30")
  
  const leadsData = generateLeadsData()

  const leadStatusData = [
    { name: "Interested", value: 41, color: COLORS.warning },
    { name: "None", value: 4, color: "#3F4254" },
    { name: "Got Business", value: 11, color: COLORS.secondary },
    { name: "New", value: 37, color: COLORS.danger },
    { name: "Demo Completed-1", value: 37, color: COLORS.cyan },
    { name: "Case Closed", value: 79, color: "#B5B5C3" },
    { name: "Proposal Sent", value: 4, color: COLORS.primary },
    { name: "Cool", value: 12, color: COLORS.danger },
    { name: "Warm", value: 12, color: COLORS.warning },
    { name: "Demo Scheduled-1", value: 6, color: COLORS.cyan }
  ]

  const taskStatusData = [
    { name: "Total task", value: 111, color: COLORS.secondary },
    { name: "Pending", value: 2, color: COLORS.cyan },
    { name: "Overdue", value: 30, color: COLORS.info },
    { name: "Completed", value: 79, color: COLORS.warning }
  ]

  const callStatusData = [
    { name: "Total task", value: 4530, color: COLORS.secondary },
    { name: "Pending", value: 401, color: COLORS.cyan },
    { name: "Overdue", value: 63, color: COLORS.info },
    { name: "Completed", value: 4066, color: COLORS.warning }
  ]

  const dealPipelineData = [
    { name: "New", value: 2, color: COLORS.secondary },
    { name: "Quotation Sent", value: 4, color: COLORS.danger },
    { name: "Follow Up", value: 3, color: COLORS.warning },
    { name: "Converted", value: 2, color: COLORS.primary }
  ]

  const dealsInProgressData = [
    { name: "Aathira", value: 0 },
    { name: "Abhishek", value: 142000 },
    { name: "Akhil Anil", value: 18000 },
    { name: "Ajesh Shaji", value: 18000 }
  ]

  const leadSourceData = [
    { name: "Other", value: 30, color: COLORS.secondary },
    { name: "Google", value: 70, color: COLORS.primary }
  ]

  const leadPurposeData = [
    { name: "Business", value: 60, color: COLORS.primary },
    { name: "Job", value: 20, color: COLORS.secondary },
    { name: "Others", value: 10, color: COLORS.danger },
    { name: "Not Defined", value: 10, color: COLORS.warning }
  ]

  return (
    <div className="space-y-6 bg-gray-50 -m-6 p-8 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#00D4FF] text-white p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">15</div>
              <div className="text-sm opacity-90">Today</div>
            </div>
            <ChevronRight className="h-6 w-6 opacity-70" />
          </div>
        </div>

        <div className="bg-[#FF8A65] text-white p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">171</div>
              <div className="text-sm opacity-90">Week</div>
            </div>
            <ChevronRight className="h-6 w-6 opacity-70" />
          </div>
        </div>

        <div className="bg-[#E91E63] text-white p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">69</div>
              <div className="text-sm opacity-90">Month</div>
            </div>
            <ChevronRight className="h-6 w-6 opacity-70" />
          </div>
        </div>

        <div className="bg-[#7E57C2] text-white p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">19661</div>
              <div className="text-sm opacity-90">Total</div>
            </div>
            <ChevronRight className="h-6 w-6 opacity-70" />
          </div>
        </div>

        <div className="bg-white border p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-800">77</div>
              <div className="text-sm text-gray-600">Open Deals</div>
            </div>
            <div className="bg-pink-100 p-2 rounded">
              <ChevronRight className="h-6 w-6 text-pink-500" />
            </div>
          </div>
        </div>

        <div className="bg-white border p-4 rounded-lg lg:col-start-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-800">₹3018885</div>
              <div className="text-sm text-gray-600">Pipeline amount</div>
            </div>
            <div className="bg-yellow-100 p-2 rounded">
              <ChevronRight className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="main">Main Branch</SelectItem>
            <SelectItem value="secondary">Secondary Branch</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last30">Last 30 days</SelectItem>
            <SelectItem value="last7">Last 7 days</SelectItem>
            <SelectItem value="today">Today</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Last 30 days added Leads</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsData}>
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="leads" fill="#FF5E97" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Lead status</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {leadStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Task status</h3>
          <div className="space-y-3">
            {taskStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4 mt-6">Call status</h3>
          <div className="space-y-3">
            {callStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Deal Pipeline */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Deal pipeline</h3>
          <div className="space-y-3">
            {dealPipelineData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deals in Progress */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Deals in progress</h3>
          <div className="space-y-3">
            {dealsInProgressData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm font-semibold">₹{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Source */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Lead source</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
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
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {leadSourceData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Purpose */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Lead purpose</h3>
          <div className="flex justify-center">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={leadPurposeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {leadPurposeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {leadPurposeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
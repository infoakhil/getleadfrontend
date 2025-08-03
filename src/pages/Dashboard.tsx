import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Dashboard = () => {
  const stats = [
    { title: "Total Leads", value: "1,234", change: "+12%" },
    { title: "Active Deals", value: "567", change: "+8%" },
    { title: "Revenue", value: "$89,234", change: "+15%" },
    { title: "Conversion Rate", value: "23.5%", change: "+2.3%" },
  ]

  const recentLeads = [
    { id: 1, name: "John Doe", company: "Acme Corp", email: "john@acme.com", status: "new", value: "$5,000" },
    { id: 2, name: "Jane Smith", company: "Tech Inc", email: "jane@tech.com", status: "qualified", value: "$12,000" },
    { id: 3, name: "Bob Johnson", company: "Sales Co", email: "bob@sales.com", status: "contacted", value: "$8,500" },
    { id: 4, name: "Alice Brown", company: "Marketing Ltd", email: "alice@marketing.com", status: "new", value: "$3,200" },
    { id: 5, name: "Charlie Wilson", company: "Design Studio", email: "charlie@design.com", status: "qualified", value: "$7,800" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "default"
      case "contacted":
        return "secondary"
      case "qualified":
        return "success"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your CRM.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Badge variant={stat.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
                {stat.change}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Latest leads added to your CRM</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`} />
                        <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {lead.name}
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{lead.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
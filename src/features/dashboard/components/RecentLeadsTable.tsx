import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable } from "@/components/common/DataTable"
import { useDashboard } from "@/hooks/useDashboard"
import { Lead, LeadStatus } from "@/types"

const getStatusColor = (status: LeadStatus) => {
  const colors: Record<LeadStatus, string> = {
    new: "default",
    contacted: "secondary",
    qualified: "success",
    lost: "destructive",
    converted: "default"
  }
  return colors[status] as any
}

export function RecentLeadsTable() {
  const { recentLeads } = useDashboard()

  const columns = [
    {
      key: "name",
      header: "Name",
      accessor: (lead: Lead) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`} />
            <AvatarFallback>{lead.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{lead.name}</span>
        </div>
      )
    },
    {
      key: "company",
      header: "Company"
    },
    {
      key: "email",
      header: "Email"
    },
    {
      key: "status",
      header: "Status",
      accessor: (lead: Lead) => (
        <Badge variant={getStatusColor(lead.status)}>
          {lead.status}
        </Badge>
      )
    },
    {
      key: "value",
      header: "Value",
      accessor: (lead: Lead) => `$${lead.value.toLocaleString()}`,
      className: "text-right"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Leads</CardTitle>
        <CardDescription>Latest leads added to your CRM</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable 
          data={recentLeads} 
          columns={columns}
          onRowClick={(lead) => console.log('Lead clicked:', lead)}
        />
      </CardContent>
    </Card>
  )
}
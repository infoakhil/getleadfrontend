import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable } from "@/components/common/DataTable"
import { useLeads } from "@/hooks/useLeads"
import type { Lead, LeadStatus } from "@/types"
import { Search, Plus } from "lucide-react"

const getStatusColor = (status: LeadStatus) => {
  const colors: Record<LeadStatus, "default" | "secondary" | "destructive" | "outline"> = {
    new: "default",
    contacted: "secondary",
    qualified: "default",
    lost: "destructive",
    converted: "outline"
  }
  return colors[status]
}

export function LeadsPage() {
  const { leads, searchLeads, leadStats } = useLeads()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLeads = searchQuery ? searchLeads(searchQuery) : leads

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
          <div>
            <div className="font-medium">{lead.name}</div>
            <div className="text-sm text-muted-foreground">{lead.position}</div>
          </div>
        </div>
      )
    },
    {
      key: "company",
      header: "Company"
    },
    {
      key: "email",
      header: "Email",
      accessor: (lead: Lead) => (
        <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
          {lead.email}
        </a>
      )
    },
    {
      key: "phone",
      header: "Phone"
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
    },
    {
      key: "source",
      header: "Source"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">Manage and track your sales leads</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {leadStats.byStatus.map((stat) => (
          <Card key={stat.status}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium capitalize">
                {stat.status}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <p className="text-xs text-muted-foreground">
                {stat.percentage.toFixed(0)}% of total
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            {filteredLeads.length} of {leads.length} leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={filteredLeads} 
            columns={columns}
            onRowClick={(lead) => console.log('Lead clicked:', lead)}
          />
        </CardContent>
      </Card>
    </div>
  )
}
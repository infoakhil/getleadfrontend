export const APP_CONFIG = {
  name: "Getlead CRM",
  version: "1.0.0",
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    timeout: 30000
  },
  features: {
    leads: true,
    companies: true,
    deals: true,
    calendar: true,
    reports: true,
    settings: true
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100]
  },
  theme: {
    defaultMode: "light" as "light" | "dark",
    enableSystemMode: true
  }
}

export const LEAD_STATUSES = [
  { value: "new", label: "New", color: "default" },
  { value: "contacted", label: "Contacted", color: "secondary" },
  { value: "qualified", label: "Qualified", color: "success" },
  { value: "lost", label: "Lost", color: "destructive" },
  { value: "converted", label: "Converted", color: "default" }
] as const

export const DEAL_STAGES = [
  { value: "prospecting", label: "Prospecting", color: "default" },
  { value: "qualification", label: "Qualification", color: "secondary" },
  { value: "proposal", label: "Proposal", color: "warning" },
  { value: "negotiation", label: "Negotiation", color: "info" },
  { value: "closed-won", label: "Closed Won", color: "success" },
  { value: "closed-lost", label: "Closed Lost", color: "destructive" }
] as const

export const ACTIVITY_TYPES = [
  { value: "call", label: "Call", icon: "Phone" },
  { value: "email", label: "Email", icon: "Mail" },
  { value: "meeting", label: "Meeting", icon: "Calendar" },
  { value: "task", label: "Task", icon: "CheckSquare" }
] as const
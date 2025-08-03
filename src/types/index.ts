export interface Lead {
  id: number
  name: string
  email: string
  phone: string
  company: string
  position: string
  status: LeadStatus
  value: number
  source: string
  createdAt: string
  lastContact: string
  notes: string
}

export interface Company {
  id: number
  name: string
  industry: string
  size: string
  website: string
  address: string
  city: string
  country: string
  leads: number[]
  deals: number[]
}

export interface Deal {
  id: number
  title: string
  value: number
  stage: DealStage
  probability: number
  leadId: number
  companyId: number
  expectedCloseDate: string
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: number
  type: ActivityType
  subject: string
  description: string
  leadId?: number
  dealId?: number
  dueDate: string
  completed: boolean
  createdAt: string
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'lost' | 'converted'
export type DealStage = 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
export type ActivityType = 'call' | 'email' | 'meeting' | 'task'

export interface DashboardStats {
  totalLeads: number
  activeDeals: number
  revenue: number
  conversionRate: number
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'viewer'
}
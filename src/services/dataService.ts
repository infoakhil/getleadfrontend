import { Lead, Company, Deal, Activity, DashboardStats } from '@/types'

class DataService {
  private leads: Lead[] = []
  private companies: Company[] = []
  private deals: Deal[] = []
  private activities: Activity[] = []
  private listeners: Set<() => void> = new Set()

  constructor() {
    this.initializeData()
  }

  // Subscribe to data changes
  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  // Notify all listeners of data changes
  private notifyListeners() {
    this.listeners.forEach(listener => listener())
  }

  // Initialize with dummy data
  private initializeData() {
    this.leads = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@acmecorp.com",
        phone: "+1 (555) 123-4567",
        company: "Acme Corporation",
        position: "CEO",
        status: "qualified",
        value: 50000,
        source: "Website",
        createdAt: "2024-01-15",
        lastContact: "2024-02-28",
        notes: "Interested in enterprise plan"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@techstartup.io",
        phone: "+1 (555) 234-5678",
        company: "Tech Startup Inc",
        position: "CTO",
        status: "contacted",
        value: 25000,
        source: "LinkedIn",
        createdAt: "2024-01-20",
        lastContact: "2024-02-25",
        notes: "Looking for scalable solution"
      },
      {
        id: 3,
        name: "Robert Johnson",
        email: "robert.j@globalcorp.com",
        phone: "+1 (555) 345-6789",
        company: "Global Corp",
        position: "VP Sales",
        status: "new",
        value: 75000,
        source: "Referral",
        createdAt: "2024-02-01",
        lastContact: "",
        notes: "High priority lead"
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@innovate.co",
        phone: "+1 (555) 456-7890",
        company: "Innovate Co",
        position: "Product Manager",
        status: "qualified",
        value: 35000,
        source: "Conference",
        createdAt: "2024-01-25",
        lastContact: "2024-02-20",
        notes: "Needs demo next week"
      },
      {
        id: 5,
        name: "Michael Chen",
        email: "m.chen@fintech.com",
        phone: "+1 (555) 567-8901",
        company: "FinTech Solutions",
        position: "Director of IT",
        status: "converted",
        value: 100000,
        source: "Website",
        createdAt: "2023-12-10",
        lastContact: "2024-01-30",
        notes: "Closed deal - Enterprise package"
      }
    ]

    this.companies = [
      {
        id: 1,
        name: "Acme Corporation",
        industry: "Manufacturing",
        size: "1000-5000",
        website: "www.acmecorp.com",
        address: "123 Business St",
        city: "New York",
        country: "USA",
        leads: [1],
        deals: [1]
      },
      {
        id: 2,
        name: "Tech Startup Inc",
        industry: "Technology",
        size: "50-100",
        website: "www.techstartup.io",
        address: "456 Innovation Ave",
        city: "San Francisco",
        country: "USA",
        leads: [2],
        deals: [2]
      },
      {
        id: 3,
        name: "Global Corp",
        industry: "Consulting",
        size: "5000+",
        website: "www.globalcorp.com",
        address: "789 Enterprise Blvd",
        city: "London",
        country: "UK",
        leads: [3],
        deals: []
      }
    ]

    this.deals = [
      {
        id: 1,
        title: "Acme Corp Enterprise Deal",
        value: 50000,
        stage: "proposal",
        probability: 60,
        leadId: 1,
        companyId: 1,
        expectedCloseDate: "2024-03-30",
        createdAt: "2024-01-20",
        updatedAt: "2024-02-28"
      },
      {
        id: 2,
        title: "Tech Startup Growth Package",
        value: 25000,
        stage: "negotiation",
        probability: 80,
        leadId: 2,
        companyId: 2,
        expectedCloseDate: "2024-03-15",
        createdAt: "2024-01-25",
        updatedAt: "2024-02-25"
      },
      {
        id: 3,
        title: "FinTech Enterprise Solution",
        value: 100000,
        stage: "closed-won",
        probability: 100,
        leadId: 5,
        companyId: 5,
        expectedCloseDate: "2024-01-30",
        createdAt: "2023-12-15",
        updatedAt: "2024-01-30"
      }
    ]

    this.activities = [
      {
        id: 1,
        type: "call",
        subject: "Follow-up call with John Doe",
        description: "Discuss enterprise pricing options",
        leadId: 1,
        dueDate: "2024-03-05",
        completed: false,
        createdAt: "2024-02-28"
      },
      {
        id: 2,
        type: "meeting",
        subject: "Product demo for Tech Startup",
        description: "Show new features and integrations",
        leadId: 2,
        dealId: 2,
        dueDate: "2024-03-10",
        completed: false,
        createdAt: "2024-02-25"
      },
      {
        id: 3,
        type: "email",
        subject: "Send proposal to Robert Johnson",
        description: "Enterprise package details and pricing",
        leadId: 3,
        dueDate: "2024-03-02",
        completed: false,
        createdAt: "2024-02-01"
      }
    ]
  }

  // Lead operations
  getLeads(): Lead[] {
    return [...this.leads]
  }

  getLeadById(id: number): Lead | undefined {
    return this.leads.find(lead => lead.id === id)
  }

  addLead(lead: Omit<Lead, 'id'>): Lead {
    const newLead = {
      ...lead,
      id: Math.max(...this.leads.map(l => l.id), 0) + 1
    }
    this.leads.push(newLead)
    this.notifyListeners()
    return newLead
  }

  updateLead(id: number, updates: Partial<Lead>): Lead | undefined {
    const index = this.leads.findIndex(lead => lead.id === id)
    if (index !== -1) {
      this.leads[index] = { ...this.leads[index], ...updates }
      this.notifyListeners()
      return this.leads[index]
    }
    return undefined
  }

  deleteLead(id: number): boolean {
    const index = this.leads.findIndex(lead => lead.id === id)
    if (index !== -1) {
      this.leads.splice(index, 1)
      this.notifyListeners()
      return true
    }
    return false
  }

  // Company operations
  getCompanies(): Company[] {
    return [...this.companies]
  }

  getCompanyById(id: number): Company | undefined {
    return this.companies.find(company => company.id === id)
  }

  // Deal operations
  getDeals(): Deal[] {
    return [...this.deals]
  }

  getDealById(id: number): Deal | undefined {
    return this.deals.find(deal => deal.id === id)
  }

  getDealsByLeadId(leadId: number): Deal[] {
    return this.deals.filter(deal => deal.leadId === leadId)
  }

  // Activity operations
  getActivities(): Activity[] {
    return [...this.activities]
  }

  getActivitiesByLeadId(leadId: number): Activity[] {
    return this.activities.filter(activity => activity.leadId === leadId)
  }

  // Dashboard statistics
  getDashboardStats(): DashboardStats {
    const totalLeads = this.leads.length
    const activeDeals = this.deals.filter(deal => 
      !['closed-won', 'closed-lost'].includes(deal.stage)
    ).length
    const revenue = this.deals
      .filter(deal => deal.stage === 'closed-won')
      .reduce((sum, deal) => sum + deal.value, 0)
    const convertedLeads = this.leads.filter(lead => lead.status === 'converted').length
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0

    return {
      totalLeads,
      activeDeals,
      revenue,
      conversionRate
    }
  }

  // Search functionality
  searchLeads(query: string): Lead[] {
    const lowercaseQuery = query.toLowerCase()
    return this.leads.filter(lead =>
      lead.name.toLowerCase().includes(lowercaseQuery) ||
      lead.email.toLowerCase().includes(lowercaseQuery) ||
      lead.company.toLowerCase().includes(lowercaseQuery)
    )
  }
}

// Create singleton instance
export const dataService = new DataService()
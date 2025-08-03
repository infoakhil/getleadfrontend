import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Lead, Company, Deal, Activity, DashboardStats } from '@/types'
import { dataService } from '@/services/dataService'

interface DataContextType {
  // Data
  leads: Lead[]
  companies: Company[]
  deals: Deal[]
  activities: Activity[]
  dashboardStats: DashboardStats

  // Lead operations
  getLeadById: (id: number) => Lead | undefined
  addLead: (lead: Omit<Lead, 'id'>) => Lead
  updateLead: (id: number, updates: Partial<Lead>) => Lead | undefined
  deleteLead: (id: number) => boolean
  searchLeads: (query: string) => Lead[]

  // Company operations
  getCompanyById: (id: number) => Company | undefined

  // Deal operations
  getDealById: (id: number) => Deal | undefined
  getDealsByLeadId: (leadId: number) => Deal[]

  // Activity operations
  getActivitiesByLeadId: (leadId: number) => Activity[]

  // Loading state
  isLoading: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalLeads: 0,
    activeDeals: 0,
    revenue: 0,
    conversionRate: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load initial data and subscribe to changes
  useEffect(() => {
    const loadData = () => {
      setLeads(dataService.getLeads())
      setCompanies(dataService.getCompanies())
      setDeals(dataService.getDeals())
      setActivities(dataService.getActivities())
      setDashboardStats(dataService.getDashboardStats())
      setIsLoading(false)
    }

    loadData()

    // Subscribe to data changes
    const unsubscribe = dataService.subscribe(() => {
      loadData()
    })

    return unsubscribe
  }, [])

  const contextValue: DataContextType = {
    // Data
    leads,
    companies,
    deals,
    activities,
    dashboardStats,

    // Lead operations
    getLeadById: (id: number) => dataService.getLeadById(id),
    addLead: (lead: Omit<Lead, 'id'>) => dataService.addLead(lead),
    updateLead: (id: number, updates: Partial<Lead>) => dataService.updateLead(id, updates),
    deleteLead: (id: number) => dataService.deleteLead(id),
    searchLeads: (query: string) => dataService.searchLeads(query),

    // Company operations
    getCompanyById: (id: number) => dataService.getCompanyById(id),

    // Deal operations
    getDealById: (id: number) => dataService.getDealById(id),
    getDealsByLeadId: (leadId: number) => dataService.getDealsByLeadId(leadId),

    // Activity operations
    getActivitiesByLeadId: (leadId: number) => dataService.getActivitiesByLeadId(leadId),

    // Loading state
    isLoading
  }

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
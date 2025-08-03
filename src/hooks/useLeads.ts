import { useMemo } from 'react'
import { useData } from '@/contexts/DataContext'
import { LeadStatus } from '@/types'

export function useLeads() {
  const { leads, addLead, updateLead, deleteLead, searchLeads } = useData()

  const leadsByStatus = useMemo(() => {
    const grouped: Record<LeadStatus, typeof leads> = {
      new: [],
      contacted: [],
      qualified: [],
      lost: [],
      converted: []
    }

    leads.forEach(lead => {
      grouped[lead.status].push(lead)
    })

    return grouped
  }, [leads])

  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [leads])

  const leadStats = useMemo(() => {
    const total = leads.length
    const byStatus = Object.entries(leadsByStatus).map(([status, statusLeads]) => ({
      status,
      count: statusLeads.length,
      percentage: total > 0 ? (statusLeads.length / total) * 100 : 0
    }))

    return {
      total,
      byStatus
    }
  }, [leads, leadsByStatus])

  return {
    leads,
    leadsByStatus,
    recentLeads,
    leadStats,
    addLead,
    updateLead,
    deleteLead,
    searchLeads
  }
}
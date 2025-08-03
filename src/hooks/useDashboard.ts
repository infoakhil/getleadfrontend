import { useMemo } from 'react'
import { useData } from '@/contexts/DataContext'

export function useDashboard() {
  const { dashboardStats, leads, deals, activities } = useData()

  const stats = useMemo(() => [
    { 
      title: "Total Leads", 
      value: dashboardStats.totalLeads.toString(), 
      change: "+12%" 
    },
    { 
      title: "Active Deals", 
      value: dashboardStats.activeDeals.toString(), 
      change: "+8%" 
    },
    { 
      title: "Revenue", 
      value: `$${dashboardStats.revenue.toLocaleString()}`, 
      change: "+15%" 
    },
    { 
      title: "Conversion Rate", 
      value: `${dashboardStats.conversionRate.toFixed(1)}%`, 
      change: "+2.3%" 
    },
  ], [dashboardStats])

  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  }, [leads])

  const upcomingActivities = useMemo(() => {
    return [...activities]
      .filter(activity => !activity.completed)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5)
  }, [activities])

  const dealsPipeline = useMemo(() => {
    const pipeline = {
      prospecting: 0,
      qualification: 0,
      proposal: 0,
      negotiation: 0,
      'closed-won': 0,
      'closed-lost': 0
    }

    deals.forEach(deal => {
      pipeline[deal.stage] += deal.value
    })

    return Object.entries(pipeline).map(([stage, value]) => ({
      stage,
      value,
      count: deals.filter(d => d.stage === stage).length
    }))
  }, [deals])

  return {
    stats,
    recentLeads,
    upcomingActivities,
    dealsPipeline
  }
}
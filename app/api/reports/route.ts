import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import prisma from '../../lib/prisma'

// Define interfaces for better type safety
interface DonationReport {
  summary: {
    totalAmount: number
    donationCount: number
    avgDonation: number
    dateRange: {
      startDate: string | null
      endDate: string | null
    }
  }
  categoryBreakdown: Record<string, number>
  monthlyBreakdown: Record<string, number>
  donations: Array<{
    id: string
    amount: number
    currency: string
    date: Date
    project?: string
    category?: string
    status: string
  }>
}

interface ImpactReport {
  summary: {
    totalDonated: number
    projectsSupported: number
    totalDonations: number
    dateRange: {
      startDate: string | null
      endDate: string | null
    }
  }
  estimatedImpact: {
    peopleHelped: number
    treesPlanted: number
    mealsProvided: number
    educationHours: number
  }
  projects: Array<{
    id: string
    title: string
    category: string
    totalDonated: number
    impactMetrics?: any
  }>
}

interface FinancialReport {
  summary: {
    totalDonated: number
    totalDonations: number
    averagePerMonth: number
    dateRange: {
      startDate: string | null
      endDate: string | null
    }
  }
  monthlyBreakdown: Array<{
    month: string
    total: number
    count: number
    average: number
  }>
  donations: Array<{
    id: string
    amount: number
    currency: string
    date: Date
    paymentMethod: string
    status: string
  }>
}

// GET /api/reports - Generate reports
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'donation'
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const format = searchParams.get('format') || 'json'

    let reportData: DonationReport | ImpactReport | FinancialReport

    switch (type) {
      case 'donation':
        reportData = await generateDonationReport(session.user.id, startDate, endDate)
        break
      case 'impact':
        reportData = await generateImpactReport(session.user.id, startDate, endDate)
        break
      case 'financial':
        reportData = await generateFinancialReport(session.user.id, startDate, endDate)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid report type' },
          { status: 400 }
        )
    }

    // Format response based on requested format
    if (format === 'csv') {
      const csv = convertToCSV(reportData)
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="report-${type}-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      })
    }

    if (format === 'pdf') {
      // In production, you'd use a PDF library like pdfkit or puppeteer
      // For now, return JSON with a message
      return NextResponse.json({
        ...reportData,
        message: 'PDF generation would be implemented with a PDF library in production',
        format: 'pdf'
      })
    }

    return NextResponse.json(reportData)
  } catch (error) {
    console.error('Reports GET error:', error)
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}

// Helper functions for report generation
async function generateDonationReport(
  userId: string, 
  startDate?: string | null, 
  endDate?: string | null
): Promise<DonationReport> {
  const where: any = {
    donorId: userId,
    status: 'COMPLETED'
  }

  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = new Date(startDate)
    if (endDate) where.createdAt.lte = new Date(endDate)
  }

  const donations = await prisma.donation.findMany({
    where,
    include: {
      project: {
        select: {
          title: true,
          category: true,
          location: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const totalAmount = donations.reduce((sum: number, d: any) => sum + d.amount.toNumber(), 0)
  const donationCount = donations.length
  const avgDonation = donationCount > 0 ? totalAmount / donationCount : 0

  // Group by category
  const categoryBreakdown = donations.reduce((acc: Record<string, number>, donation: any) => {
    const category = donation.project?.category || 'Unknown'
    acc[category] = (acc[category] || 0) + donation.amount.toNumber()
    return acc
  }, {})

   // Group by month
  const monthlyBreakdown = donations.reduce((acc: Record<string, number>, donation: any) => {
    const month = donation.createdAt.toISOString().slice(0, 7) // YYYY-MM
    acc[month] = (acc[month] || 0) + donation.amount.toNumber()
    return acc
  }, {})

  return {
    summary: {
      totalAmount,
      donationCount,
      avgDonation,
      dateRange: { 
        startDate: startDate || null,
        endDate: endDate || null
      }
    },
    categoryBreakdown,
    monthlyBreakdown,
    donations: donations.map((d: any) => ({
      id: d.id,
      amount: d.amount.toNumber(),
      currency: d.currency,
      date: d.createdAt,
      project: d.project?.title,
      category: d.project?.category,
      status: d.status
    }))
  }
}


async function generateImpactReport(
  userId: string, 
  startDate?: string | null, 
  endDate?: string | null
): Promise<ImpactReport> {
  // Get projects that user has donated to
  const donations = await prisma.donation.findMany({
    where: {
      donorId: userId,
      status: 'COMPLETED',
      ...(startDate || endDate ? {
        createdAt: {
          ...(startDate ? { gte: new Date(startDate) } : {}),
          ...(endDate ? { lte: new Date(endDate) } : {})
        }
      } : {})
    },
    include: {
      project: {
        include: {
          impactMetrics: true
        }
      }
    }
  })

  // Get unique projects
  const projectIds = [...new Set(donations.map((d: any) => d.projectId))]
  const projects = await prisma.project.findMany({
    where: {
      id: { in: projectIds }
    },
    include: {
      impactMetrics: true
    }
  })

  // Calculate total impact
  const totalDonated = donations.reduce((sum: number, d: any) => sum + d.amount.toNumber(), 0)
  
  // Simple impact calculation (in production, this would be more sophisticated)
  const estimatedImpact = {
    peopleHelped: Math.floor(totalDonated / 100), // $100 helps 1 person
    treesPlanted: Math.floor(totalDonated / 10), // $10 plants 1 tree
    mealsProvided: Math.floor(totalDonated / 5), // $5 provides 1 meal
    educationHours: Math.floor(totalDonated / 20), // $20 provides 1 hour of education
  }

  return {
    summary: {
      totalDonated,
      projectsSupported: projects.length,
      totalDonations: donations.length,
      dateRange: { 
        startDate: startDate || null,
        endDate: endDate || null
      }
    },
    estimatedImpact,
    projects: projects.map((project: any) => ({
      id: project.id,
      title: project.title,
      category: project.category,
      totalDonated: donations
        .filter((d: any) => d.projectId === project.id)
        .reduce((sum: number, d: any) => sum + d.amount.toNumber(), 0),
      impactMetrics: project.impactMetrics
    }))
  }
}

async function generateFinancialReport(
  userId: string, 
  startDate?: string | null, 
  endDate?: string | null
): Promise<FinancialReport> {
  const where: any = {
    donorId: userId,
    status: 'COMPLETED'
  }

  if (startDate || endDate) {
    where.createdAt = {}
    if (startDate) where.createdAt.gte = new Date(startDate)
    if (endDate) where.createdAt.lte = new Date(endDate)
  }

  const donations = await prisma.donation.findMany({
    where,
    orderBy: {
      createdAt: 'asc'
    }
  })

  // Calculate monthly totals
  const monthlyData = donations.reduce((acc: Record<string, any>, donation: any) => {
    const month = donation.createdAt.toISOString().slice(0, 7)
    if (!acc[month]) {
      acc[month] = {
        total: 0,
        count: 0,
        donations: []
      }
    }
    acc[month].total += donation.amount.toNumber()
    acc[month].count += 1
    acc[month].donations.push({
      amount: donation.amount.toNumber(),
      currency: donation.currency,
      date: donation.createdAt
    })
    return acc
  }, {})

  const total = donations.reduce((sum: number, d: any) => sum + d.amount.toNumber(), 0)
  const avgPerMonth = Object.values(monthlyData).length > 0 
    ? (Object.values(monthlyData) as any[]).reduce((sum: number, month: any) => sum + month.total, 0) / Object.values(monthlyData).length
    : 0

  return {
    summary: {
      totalDonated: total,
      totalDonations: donations.length,
      averagePerMonth: avgPerMonth,
      dateRange: { 
        startDate: startDate || null,
        endDate: endDate || null
      }
    },
    monthlyBreakdown: Object.entries(monthlyData).map(([month, data]: [string, any]) => ({
      month,
      total: data.total,
      count: data.count,
      average: data.total / data.count
    })),
    donations: donations.map((d: any) => ({
      id: d.id,
      amount: d.amount.toNumber(),
      currency: d.currency,
      date: d.createdAt,
      paymentMethod: d.paymentMethod,
      status: d.status
    }))
  }
}

function convertToCSV(data: any): string {
  // Simple CSV conversion (you'd want a more robust solution in production)
  if (data.donations && Array.isArray(data.donations)) {
    const headers = Object.keys(data.donations[0] || {}).join(',')
    const rows = data.donations.map((row: any) => 
      Object.values(row).map((val: any) => 
        typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
      ).join(',')
    )
    return [headers, ...rows].join('\n')
  }
  return 'No data to export'
}
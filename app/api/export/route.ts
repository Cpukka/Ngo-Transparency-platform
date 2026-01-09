import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import  prisma  from '../../lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, dateRange, format, sections } = await request.json()

    // Fetch data based on report type
    let data: any = {}

    switch (type) {
      case 'donation':
        data = await prisma.donation.findMany({
          where: {
            donorId: session.user.id,
            createdAt: getDateRangeFilter(dateRange),
          },
          include: {
            project: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })
        break

      case 'financial':
        // Generate financial report
        const donations = await prisma.donation.findMany({
          where: {
            donorId: session.user.id,
            status: 'COMPLETED',
            createdAt: getDateRangeFilter(dateRange),
          },
        })

        const totalAmount = donations.reduce((sum, d) => sum + d.amount.toNumber(), 0)
        
        data = {
          summary: {
            totalDonations: donations.length,
            totalAmount,
            averageDonation: totalAmount / donations.length,
            dateRange,
          },
          donations,
        }
        break

      case 'impact':
        // Generate impact report
        const projects = await prisma.project.findMany({
          where: {
            donations: {
              some: {
                donorId: session.user.id,
              },
            },
          },
          include: {
            impactMetrics: true,
          },
        })

        data = {
          projects,
          totalProjects: projects.length,
          totalImpact: calculateTotalImpact(projects),
        }
        break

      default:
        return NextResponse.json({ error: 'Invalid report type' }, { status: 400 })
    }

    // Generate report based on format
    let report: string
    
    switch (format) {
      case 'pdf':
        report = generatePDFReport(data, sections)
        break
      case 'excel':
        report = generateExcelReport(data)
        break
      case 'csv':
        report = generateCSVReport(data)
        break
      case 'json':
        report = JSON.stringify(data, null, 2)
        break
      default:
        return NextResponse.json({ error: 'Invalid format' }, { status: 400 })
    }

    return new NextResponse(report, {
      headers: {
        'Content-Type': getContentType(format),
        'Content-Disposition': `attachment; filename="report-${type}-${new Date().toISOString().split('T')[0]}.${format}"`,
      },
    })

  } catch (error) {
    console.error('Report generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    )
  }
}

function getDateRangeFilter(dateRange: string) {
  const now = new Date()
  let from = new Date()

  switch (dateRange) {
    case 'last-week':
      from.setDate(now.getDate() - 7)
      break
    case 'last-month':
      from.setMonth(now.getMonth() - 1)
      break
    case 'last-quarter':
      from.setMonth(now.getMonth() - 3)
      break
    case 'last-year':
      from.setFullYear(now.getFullYear() - 1)
      break
    default:
      from = new Date(0) // All time
  }

  return {
    gte: from,
    lte: now,
  }
}

function calculateTotalImpact(projects: any[]) {
  return projects.reduce((acc, project) => {
    return acc + (project.impactMetrics?.reduce((sum: number, metric: any) => sum + metric.value.toNumber(), 0) || 0)
  }, 0)
}

function generatePDFReport(data: any, sections: string[]): string {
  // In a real implementation, you would use a PDF generation library like pdfkit
  // For now, return a simple text representation
  return `PDF Report\n\n${JSON.stringify(data, null, 2)}`
}

function generateExcelReport(data: any): string {
  // In a real implementation, you would use a library like exceljs
  return 'Excel report would be generated here'
}

function generateCSVReport(data: any): string {
  if (Array.isArray(data)) {
    const headers = Object.keys(data[0] || {}).join(',')
    const rows = data.map(row => Object.values(row).join(','))
    return [headers, ...rows].join('\n')
  }
  return Object.entries(data).map(([key, value]) => `${key},${value}`).join('\n')
}

function getContentType(format: string): string {
  switch (format) {
    case 'pdf':
      return 'application/pdf'
    case 'excel':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    case 'csv':
      return 'text/csv'
    case 'json':
      return 'application/json'
    default:
      return 'text/plain'
  }
}
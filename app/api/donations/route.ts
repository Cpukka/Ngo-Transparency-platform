import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import prisma from '../../lib/prisma'

// GET /api/donations - Get user's donations
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
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') as 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | null
    const projectId = searchParams.get('projectId')
    
    const skip = (page - 1) * limit
    
    const where: any = {
      donorId: session.user.id,
      ...(status && { status }),
      ...(projectId && { projectId }),
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        include: {
          project: {
            select: {
              id: true,
              title: true,
              // Use ngo relation instead of organization field
              ngo: {
                select: {
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.donation.count({ where })
    ])

    // Transform donations to include organization name
    const transformedDonations = donations.map(donation => ({
      ...donation,
      project: donation.project ? {
        id: donation.project.id,
        title: donation.project.title,
        organization: donation.project.ngo?.name || 'Unknown Organization'
      } : null
    }))

    return NextResponse.json({
      donations: transformedDonations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Donations GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    )
  }
}

// POST /api/donations - Create a new donation
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { amount, projectId, paymentMethod, currency = 'USD', notes } = body

    // Validate required fields
    if (!amount || !projectId || !paymentMethod) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Create donation
    const donation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount), // Convert to number/Decimal
        currency,
        donorId: session.user.id,
        projectId,
        paymentMethod,
        status: 'PENDING', // Will be updated by webhook
        notes,
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            ngo: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    // Transform to include organization name
    const transformedDonation = {
      ...donation,
      project: donation.project ? {
        id: donation.project.id,
        title: donation.project.title,
        organization: donation.project.ngo?.name || 'Unknown Organization'
      } : null
    }

    // Update project amount (will be finalized when payment completes)
    await prisma.project.update({
      where: { id: projectId },
      data: {
        currentAmount: {
          increment: parseFloat(amount)
        }
      }
    })

    // In production, this would create a Stripe checkout session
    // For now, we'll simulate successful payment
    setTimeout(async () => {
      await prisma.donation.update({
        where: { id: donation.id },
        data: { status: 'COMPLETED' }
      })
    }, 1000)

    return NextResponse.json({
      success: true,
      donation: transformedDonation,
      message: 'Donation created successfully'
    })
  } catch (error) {
    console.error('Donation POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    )
  }
}

// PATCH /api/donations - Update donation (e.g., cancel, refund)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { donationId, status, refundReason } = body

    if (!donationId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if donation belongs to user
    const existingDonation = await prisma.donation.findUnique({
      where: { id: donationId }
    })

    if (!existingDonation || existingDonation.donorId !== session.user.id) {
      return NextResponse.json(
        { error: 'Donation not found or access denied' },
        { status: 404 }
      )
    }

    // Update donation
    const donation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: status as 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED',
        ...(refundReason && { notes: refundReason })
      }
    })

    // If refunding, update project amount
    if (status === 'REFUNDED') {
      await prisma.project.update({
        where: { id: existingDonation.projectId || '' },
        data: {
          currentAmount: {
            decrement: existingDonation.amount
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      donation,
      message: 'Donation updated successfully'
    })
  } catch (error) {
    console.error('Donation PATCH error:', error)
    return NextResponse.json(
      { error: 'Failed to update donation' },
      { status: 500 }
    )
  }
}
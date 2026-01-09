import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import  prisma  from '../../lib/prisma'

// GET /api/projects - Get all projects with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const location = searchParams.get('location')
    const minProgress = searchParams.get('minProgress')
    const maxProgress = searchParams.get('maxProgress')
    
    const skip = (page - 1) * limit
    
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (status && status !== 'all') {
      where.status = status
    }
    
    if (location && location !== 'all') {
      where.location = location
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { organization: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    if (minProgress || maxProgress) {
      where.progress = {}
      if (minProgress) where.progress.gte = parseInt(minProgress)
      if (maxProgress) where.progress.lte = parseInt(maxProgress)
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          _count: {
            select: { donations: true }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.project.count({ where })
    ])

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Projects GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project (NGO admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'NGO_ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      description,
      targetAmount,
      category,
      location,
      startDate,
      endDate,
      images,
    } = body

    // Validate required fields
    if (!title || !description || !targetAmount || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        title,
        description,
        targetAmount,
        category,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        images: images || [],
        ngoId: session.user.id,
        currentAmount: 0,
        status: 'ACTIVE',
      }
    })

    return NextResponse.json({
      success: true,
      project,
      message: 'Project created successfully'
    })
  } catch (error) {
    console.error('Project POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

// PATCH /api/projects - Update project
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'NGO_ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { projectId, ...updateData } = body

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    // Check if project belongs to user's NGO
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!existingProject || existingProject.ngoId !== session.user.id) {
      return NextResponse.json(
        { error: 'Project not found or access denied' },
        { status: 404 }
      )
    }

    // Update project
    const project = await prisma.project.update({
      where: { id: projectId },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      project,
      message: 'Project updated successfully'
    })
  } catch (error) {
    console.error('Project PATCH error:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}
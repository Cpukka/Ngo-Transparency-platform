// lib/actions/user.actions.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import prisma from '../prisma'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return null

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        donations: {
          where: {
            status: 'COMPLETED'
          },
          include: {
            project: {
              select: {
                id: true,
                title: true,
                category: true,
                images: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        },
        projects: {
          where: {
            status: 'ACTIVE'
          },
          include: {
            _count: {
              select: {
                donations: {
                  where: {
                    status: 'COMPLETED'
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        }
      }
    })

    if (!user) return null

    // Calculate user stats
    const totalDonations = user.donations.length;
    const totalDonated = user.donations.reduce((sum, donation) => {
      if (typeof donation.amount === 'number') {
        return sum + donation.amount;
      }
      return sum + (donation.amount?.toNumber?.() || 0);
    }, 0);

    const activeProjects = user.projects.length;
    
    // Get bookmarked projects (you'll need to implement bookmarks separately)
    const bookmarkedProjects: string[] = []; // Empty for now

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      
      // Stats
      totalDonations,
      totalDonated,
      activeProjects,
      
      // Bookmarks (placeholder - you need to implement this)
      bookmarkedProjects,
      
      // Donations data
      donations: user.donations.map(donation => ({
        id: donation.id,
        amount: donation.amount,
        currency: donation.currency,
        status: donation.status,
        paymentMethod: donation.paymentMethod,
        createdAt: donation.createdAt,
        project: donation.project
      })),
      
      // Projects data (for NGO_ADMIN users)
      projects: user.projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        category: project.category,
        location: project.location,
        status: project.status,
        currentAmount: project.currentAmount,
        targetAmount: project.targetAmount,
        totalDonors: project._count?.donations || 0,
        image: project.images?.[0] || null,
        createdAt: project.createdAt
      })),
      
      // Check if user has bookmarked a project
      hasBookmarked: (projectId: string) => bookmarkedProjects.includes(projectId)
    }
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
})

// Additional user-related functions you might need:

export const getUserById = cache(async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            donations: {
              where: {
                status: 'COMPLETED'
              }
            },
            projects: {
              where: {
                status: 'ACTIVE'
              }
            }
          }
        }
      }
    })

    if (!user) return null

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
      stats: {
        totalDonations: user._count.donations,
        activeProjects: user._count.projects
      }
    }
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    return null
  }
})

export const getUserDonations = cache(async (userId: string, limit: number = 10) => {
  try {
    const donations = await prisma.donation.findMany({
      where: {
        donorId: userId,
        status: 'COMPLETED'
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            category: true,
            location: true,
            images: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return donations.map(donation => ({
      id: donation.id,
      amount: donation.amount,
      currency: donation.currency,
      status: donation.status,
      paymentMethod: donation.paymentMethod,
      notes: donation.notes,
      createdAt: donation.createdAt,
      project: donation.project
    }))
  } catch (error) {
    console.error('Error fetching user donations:', error)
    return []
  }
})

export const getUserProjects = cache(async (userId: string, limit: number = 10) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        ngoId: userId,
        status: 'ACTIVE'
      },
      include: {
        _count: {
          select: {
            donations: {
              where: {
                status: 'COMPLETED'
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return projects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      category: project.category,
      location: project.location,
      status: project.status,
      currentAmount: project.currentAmount,
      targetAmount: project.targetAmount,
      totalDonors: project._count?.donations || 0,
      image: project.images?.[0] || null,
      startDate: project.startDate,
      endDate: project.endDate,
      createdAt: project.createdAt
    }))
  } catch (error) {
    console.error('Error fetching user projects:', error)
    return []
  }
})

// Helper function to check if user is NGO admin
export const isNgoAdmin = cache(async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })
    
    return user?.role === 'NGO_ADMIN'
  } catch (error) {
    console.error('Error checking NGO admin status:', error)
    return false
  }
})

// Helper function to check if user is system admin
export const isSystemAdmin = cache(async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })
    
    return user?.role === 'SYSTEM_ADMIN'
  } catch (error) {
    console.error('Error checking system admin status:', error)
    return false
  }
})
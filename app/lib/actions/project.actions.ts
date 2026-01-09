// lib/actions/project.actions.ts
import prisma from '../prisma'
import { cache } from 'react'

// Helper function to convert Decimal to number
const toNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (value && typeof value.toNumber === 'function') return value.toNumber();
  if (value && typeof value.toString === 'function') return parseFloat(value.toString());
  return 0;
};

export const getProjectById = cache(async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        ngo: {
          select: {
            name: true,
            email: true,
            image: true
          }
        },
        milestones: {
          orderBy: {
            targetDate: 'asc'
          }
        },
        updates: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        impactMetrics: {
          orderBy: {
            date: 'desc'
          }
        },
        _count: {
          select: {
            donations: {
              where: {
                status: 'COMPLETED'
              }
            }
          }
        }
      }
    })

    if (!project) return null

    // Convert Decimal values to numbers
    const targetAmount = toNumber(project.targetAmount);
    const currentAmount = toNumber(project.currentAmount);

    // Get milestones data
    const milestones = project.milestones.map(milestone => ({
      id: milestone.id,
      title: milestone.title,
      description: milestone.description,
      date: milestone.targetDate,
      status: milestone.completed ? 'COMPLETED' : 'PENDING'
    }));

    // Get updates data
    const updates = project.updates.map(update => ({
      id: update.id,
      title: update.title,
      content: update.content,
      date: update.createdAt,
      images: update.images
    }));

    return {
      id: project.id,
      _id: project.id,
      title: project.title,
      description: project.description,
      shortDescription: project.description.substring(0, 200) + '...',
      category: project.category,
      location: project.location,
      status: project.status.toLowerCase(),
      goalAmount: targetAmount,
      currentAmount: currentAmount,
      amountRaised: currentAmount,
      totalDonors: project._count?.donations || 0,
      featuredImage: project.images?.[0] || null,
      image: project.images?.[0] || null,
      endDate: project.endDate,
      deadline: project.endDate,
      organization: {
        name: project.ngo?.name || 'Unknown Organization',
        logo: project.ngo?.image || null,
        description: `Contact: ${project.ngo?.email || 'No contact available'}`,
        projectsCount: 0 // You can query this separately
      },
      milestones: milestones,
      updates: updates,
      faqs: [], // Your schema doesn't have FAQs, add if needed
      faq: [],
      _count: project._count,
      images: project.images,
      impactMetrics: project.impactMetrics
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
})

export const getRelatedProjects = cache(async (projectId: string, limit: number = 3) => {
  try {
    // First get the current project to know its category
    const currentProject = await prisma.project.findUnique({
      where: { id: projectId },
      select: { category: true }
    })

    if (!currentProject) return []

    const relatedProjects = await prisma.project.findMany({
      where: {
        id: { not: projectId },
        category: currentProject.category,
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
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return relatedProjects.map(project => {
      const targetAmount = toNumber(project.targetAmount);
      const currentAmount = toNumber(project.currentAmount);
      const progress = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;

      return {
        _id: project.id,
        title: project.title,
        description: project.description,
        shortDescription: project.description.substring(0, 100) + '...',
        progress: progress,
        raised: currentAmount,
        target: targetAmount,
        donors: project._count?.donations || 0,
        category: project.category,
        location: project.location,
        status: project.status.toLowerCase(),
        image: project.images?.[0] || null
      }
    })
  } catch (error) {
    console.error('Error fetching related projects:', error)
    return []
  }
})
// lib/actions/donation.actions.ts
import prisma from '../prisma'
import { cache } from 'react'

// Helper function to convert Decimal to number
const toNumber = (value: any): number => {
  if (typeof value === 'number') return value;
  if (value && typeof value.toNumber === 'function') return value.toNumber();
  if (value && typeof value.toString === 'function') return parseFloat(value.toString());
  return 0;
};

export const getDonationsByProjectId = cache(async (projectId: string, limit: number = 5) => {
  try {
    const donations = await prisma.donation.findMany({
      where: {
        projectId,
        status: 'COMPLETED'
      },
      include: {
        donor: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      },
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return donations.map(donation => {
      // Convert Decimal amount to number
      const amount = toNumber(donation.amount);
      
      // For now, we'll assume donations are not anonymous
      // You can add an anonymous field to your Donation model if needed
      const isAnonymous = false;
      
      // Use notes as message if available
      const message = donation.notes || '';
      
      return {
        id: donation.id,
        amount: amount,
        currency: donation.currency,
        date: donation.createdAt,
        anonymous: isAnonymous,
        message: message,
        donor: isAnonymous ? null : (donation.donor ? {
          name: donation.donor.name || 'Anonymous',
          avatar: donation.donor.image || null
        } : null)
      }
    })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return []
  }
})
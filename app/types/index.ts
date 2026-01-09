import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    role: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export interface Project {
  id: string
  title: string
  description: string
  organization: string
  progress: number
  raised: number
  target: number
  donors: number
  category: string
  location: string
  status: 'active' | 'completed' | 'suspended'
  startDate: Date
  endDate: Date
  impact: string[]
}

export interface Donation {
  id: string
  amount: number
  currency: string
  donorId: string
  projectId: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentMethod: string
  transactionId: string
  createdAt: Date
}

export interface ImpactMetric {
  id: string
  projectId: string
  metricName: string
  value: number
  unit: string
  date: Date
}

export interface ProjectUpdate {
  id: string
  projectId: string
  title: string
  content: string
  images: string[]
  createdAt: Date
}
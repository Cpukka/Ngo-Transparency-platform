'use client'

import StatsCard from '../../components/dashboard/StatsCard'
import DonationChart from '../../components/dashboard/DonationChart'
import ProjectCard from '../../components/dashboard/ProjectCard'
//import ImpactMetrics from '/components/dashboard/ImpactMetrics'
import { DollarSign, Users, Target, TrendingUp } from 'lucide-react'
import ImpactMetrics from '../../components/dashboard/ImpactMetrics'

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening with your donations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Donations"
          value="$24,580"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <StatsCard
          title="Active Projects"
          value="18"
          change="+2"
          icon={Target}
          trend="up"
        />
        <StatsCard
          title="Total Donors"
          value="1,248"
          change="+8.2%"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Impact Score"
          value="94.5"
          change="+3.1%"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <DonationChart />
        </div>
        <div>
          <ImpactMetrics />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
  title="Clean Water Initiative"
  organization="Water for All"
  progress={75}
  raised={75000}
  target={100000}
  donors={1240}
  category="Health"
  location="Kenya"
/>
<ProjectCard
  title="Education for Children"
  organization="Bright Future NGO"
  progress={45}
  raised={45000}
  target={100000}
  donors={890}
  category="Education"
  location="Bangladesh"
/>
<ProjectCard
  title="Reforestation Project"
  organization="Green Earth Alliance"
  progress={90}
  raised={180000}
  target={200000}
  donors={2100}
  category="Environment"
  location="Brazil"
/>
        </div>
      </div>
    </div>
  )
}
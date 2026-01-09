'use client'

import { Users, Droplets, Trees, BookOpen, TrendingUp, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'

const metrics = [
  {
    icon: Users,
    label: 'People Helped',
    value: '10,240',
    change: '+12%',
    trend: 'up',
    description: 'Direct beneficiaries across all projects',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: Droplets,
    label: 'Clean Water',
    value: '2.5M',
    change: '+25%',
    trend: 'up',
    description: 'Liters of clean water provided',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
  },
  {
    icon: Trees,
    label: 'Trees Planted',
    value: '50,000',
    change: '+8%',
    trend: 'up',
    description: 'Trees planted in reforestation projects',
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    icon: BookOpen,
    label: 'Education',
    value: '1,250',
    change: '+15%',
    trend: 'up',
    description: 'Children enrolled in schools',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    icon: Target,
    label: 'Health Kits',
    value: '5,000',
    change: '+20%',
    trend: 'up',
    description: 'Medical kits distributed',
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    icon: TrendingUp,
    label: 'Carbon Offset',
    value: '1,200',
    change: '+5%',
    trend: 'up',
    description: 'Tons of CO2 offset annually',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
]

export default function ImpactMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Impact Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`${metric.bgColor} p-2 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="font-medium">{metric.label}</p>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{metric.value}</div>
                  <div className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.trend === 'up' ? '↑' : '↓'} {metric.change}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Overall Impact Score */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">Overall Impact Score</p>
              <p className="text-sm text-muted-foreground">Based on your donations</p>
            </div>
            <div className="text-2xl font-bold text-green-500">94.5%</div>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full"
              style={{ width: '94.5%' }}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Low</span>
            <span>Industry Avg: 65%</span>
            <span>High</span>
          </div>
        </div>

        {/* Impact Breakdown */}
        <div className="mt-6">
          <p className="font-medium mb-3">Impact by Category</p>
          <div className="space-y-3">
            {[
              { category: 'Education', percentage: 35, color: 'bg-blue-500' },
              { category: 'Healthcare', percentage: 25, color: 'bg-green-500' },
              { category: 'Environment', percentage: 20, color: 'bg-emerald-500' },
              { category: 'Poverty', percentage: 15, color: 'bg-purple-500' },
              { category: 'Other', percentage: 5, color: 'bg-gray-500' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.category}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
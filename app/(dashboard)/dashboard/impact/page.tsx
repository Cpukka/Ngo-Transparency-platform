'use client'

import { useState } from 'react'
import { 
  Users, Droplets, Trees, BookOpen, 
  TrendingUp, Target, Globe, Heart 
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Button } from '../../../components/ui/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/Tabs'

// Add proper Badge component at the top
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline'
  className?: string
}

function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input',
  } as const
  
  // Type assertion to ensure variant is a valid key
  const variantKey = variant as keyof typeof variants
  
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variantKey]} ${className}`}>
      {children}
    </span>
  )
}

const impactMetrics = [
  { icon: Users, label: 'People Helped', value: '50,000+', change: '+12%', color: 'text-blue-500' },
  { icon: Droplets, label: 'Clean Water Access', value: '100K+ Liters', change: '+25%', color: 'text-cyan-500' },
  { icon: Trees, label: 'Trees Planted', value: '500,000+', change: '+8%', color: 'text-green-500' },
  { icon: BookOpen, label: 'Children Educated', value: '10,000+', change: '+15%', color: 'text-purple-500' },
]

const impactStories = [
  {
    title: 'Clean Water Transforms Village',
    location: 'Kenya',
    description: 'A village of 500 people now has access to clean drinking water, reducing waterborne diseases by 80%.',
    impact: 'Health improvements, time saved on water collection',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop',
  },
  {
    title: 'School Built in Remote Area',
    location: 'Bangladesh',
    description: 'A new school serving 200 children who previously had no access to education.',
    impact: 'Literacy rate increased from 40% to 85%',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop',
  },
  {
    title: 'Reforestation Success',
    location: 'Brazil',
    description: '50,000 trees planted in deforested areas, creating new habitats for wildlife.',
    impact: 'Carbon capture of 1,000+ tons annually',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop',
  },
]

export default function ImpactPage() {
  const [timeframe, setTimeframe] = useState('year')

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Impact Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">See the real-world impact of your donations</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeframe === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeframe('month')}
          >
            Month
          </Button>
          <Button
            variant={timeframe === 'year' ? 'default' : 'outline'}
            onClick={() => setTimeframe('year')}
          >
            Year
          </Button>
          <Button
            variant={timeframe === 'all' ? 'default' : 'outline'}
            onClick={() => setTimeframe('all')}
          >
            All Time
          </Button>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.label}</p>
                    <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{metric.value}</p>
                    <p className="text-sm text-green-500 mt-1 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {metric.change}
                    </p>
                  </div>
                  <div className={`h-12 w-12 rounded-full ${metric.color.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stories">Impact Stories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Impact by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Health', value: 35, color: 'bg-blue-500' },
                    { category: 'Education', value: 25, color: 'bg-green-500' },
                    { category: 'Environment', value: 20, color: 'bg-emerald-500' },
                    { category: 'Poverty Alleviation', value: 15, color: 'bg-purple-500' },
                    { category: 'Animal Welfare', value: 5, color: 'bg-pink-500' },
                  ].map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-900 dark:text-white">{item.category}</span>
                        <span className="text-gray-900 dark:text-white">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Regional Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { region: 'Africa', projects: 45, impact: 'High' },
                    { region: 'Asia', projects: 38, impact: 'Medium' },
                    { region: 'South America', projects: 22, impact: 'High' },
                    { region: 'Europe', projects: 15, impact: 'Low' },
                    { region: 'North America', projects: 12, impact: 'Medium' },
                  ].map((item) => (
                    <div key={item.region} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.region}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.projects} projects</p>
                      </div>
                      <Badge variant={
                        item.impact === 'High' ? 'default' :
                        item.impact === 'Medium' ? 'secondary' :
                        'outline'
                      }>
                        {item.impact} Impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactStories.map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-linear-to-br from-blue-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white text-gray-900 hover:bg-white/90">
                      {story.location}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{story.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{story.description}</p>
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Key Impact:</p>
                    <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{story.impact}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Read Full Story
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Impact Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Analytics visualization coming soon</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Detailed impact analytics will be available in the next update
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Global Impact Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg bg-linear-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
                <div className="text-center">
                  <Globe className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Interactive impact map coming soon</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Visualize impact across different regions on an interactive map
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Heart className="h-5 w-5 text-red-500" />
            Your Personal Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">250</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">People directly helped</p>
            </div>
            <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">15</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Projects supported</p>
            </div>
            <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">2.5K</div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Liters of clean water provided</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Search, Filter, Heart, Globe, Users, Target } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Link from 'next/link'
import Header from '../components/layout/Header'

// Badge component interface
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive'
  className?: string
}

const featuredProjects = [
  {
    id: 'PROJ-001',
    title: 'Clean Water Initiative',
    organization: 'Water for All',
    description: 'Providing clean drinking water to 10,000 people in rural Kenya',
    progress: 75,
    raised: 75000,
    target: 100000,
    donors: 1240,
    category: 'Health',
    location: 'Kenya',
    urgency: 'high',
  },
  {
    id: 'PROJ-002',
    title: 'Education for Children',
    organization: 'Bright Future NGO',
    description: 'Building schools and providing education for 500 children',
    progress: 45,
    raised: 45000,
    target: 100000,
    donors: 890,
    category: 'Education',
    location: 'Bangladesh',
    urgency: 'medium',
  },
  {
    id: 'PROJ-003',
    title: 'Reforestation Project',
    organization: 'Green Earth Alliance',
    description: 'Planting 50,000 trees to combat climate change',
    progress: 90,
    raised: 180000,
    target: 200000,
    donors: 2100,
    category: 'Environment',
    location: 'Brazil',
    urgency: 'high',
  },
]

const categories = [
  { name: 'All', icon: Globe, count: 45 },
  { name: 'Health', icon: Heart, count: 12 },
  { name: 'Education', icon: Users, count: 8 },
  { name: 'Environment', icon: Target, count: 10 },
  { name: 'Poverty', icon: Heart, count: 7 },
  { name: 'Animal Welfare', icon: Heart, count: 8 },
]

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/30">
      {/* Hero Section */}
      <Header />
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Make a Difference Today
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Support verified projects and see exactly how your donation creates impact
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1 max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-white/90">
                <Heart className="h-5 w-5" />
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.name
              
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105'
                      : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-3 rounded-lg ${
                      isSelected
                        ? 'bg-blue-600 dark:bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {category.count} projects
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Projects</h2>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link href={`/donate/${project.id}`} key={project.id}>
                <Card className="h-full hover:shadow-xl duration-300 border border-gray-200 dark:border-gray-800 shadow-lg hover:-translate-y-1 transition-transform">
                  <div className="h-48 bg-linear-to-br from-blue-500 to-purple-600 rounded-t-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-white text-gray-900 hover:bg-white/90">
                          {project.category}
                        </Badge>
                        {project.urgency === 'high' && (
                          <Badge variant="destructive">Urgent</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">{project.title}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.organization}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Progress */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">${project.raised.toLocaleString()} raised</span>
                        <span className="text-gray-600 dark:text-gray-400">${project.target.toLocaleString()} goal</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="font-bold text-gray-900 dark:text-white">{project.donors.toLocaleString()}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Donors</div>
                      </div>
                      <div className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="font-bold text-gray-900 dark:text-white">{project.location}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Location</div>
                      </div>
                    </div>

                    <Button className="w-full gap-2">
                      <Heart className="h-4 w-4" />
                      Donate Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Why Donate Section */}
        <Card className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-900">
          <CardContent className="p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Why Donate Through Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Complete Transparency',
                    description: 'Track every dollar and see real-time impact updates',
                  },
                  {
                    title: 'Verified Projects',
                    description: 'All projects are vetted and monitored for effectiveness',
                  },
                  {
                    title: 'Maximum Impact',
                    description: '95% of donations go directly to project implementation',
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Fixed Badge component
function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-blue-600 text-white dark:bg-blue-500',
    destructive: 'bg-red-600 text-white dark:bg-red-500',
  } as const
  
  // Type assertion to ensure variant is a valid key
  const variantClass = variants[variant as keyof typeof variants] || variants.default
  
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variantClass} ${className}`}>
      {children}
    </span>
  )
}
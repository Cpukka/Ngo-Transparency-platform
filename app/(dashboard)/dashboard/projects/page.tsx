'use client'

import { useState } from 'react'
import { Plus, Filter, Search, TrendingUp, Users, Target, Clock } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import Link from 'next/link'

const projects = [
  {
    id: 'PROJ-001',
    title: 'Clean Water Initiative',
    organization: 'Water for All',
    description: 'Providing clean drinking water to rural communities',
    progress: 75,
    raised: 75000,
    target: 100000,
    donors: 1240,
    status: 'active',
    category: 'Health',
    location: 'Kenya',
    endDate: '2024-06-30',
    impact: '10,000+ people with clean water access',
  },
  {
    id: 'PROJ-002',
    title: 'Education for Children',
    organization: 'Bright Future NGO',
    description: 'Building schools and providing education materials',
    progress: 45,
    raised: 45000,
    target: 100000,
    donors: 890,
    status: 'active',
    category: 'Education',
    location: 'Bangladesh',
    endDate: '2024-08-15',
    impact: '500+ children enrolled in school',
  },
  {
    id: 'PROJ-003',
    title: 'Reforestation Project',
    organization: 'Green Earth Alliance',
    description: 'Planting trees to combat climate change',
    progress: 90,
    raised: 180000,
    target: 200000,
    donors: 2100,
    status: 'active',
    category: 'Environment',
    location: 'Brazil',
    endDate: '2024-05-20',
    impact: '50,000+ trees planted',
  },
  {
    id: 'PROJ-004',
    title: 'Medical Aid Fund',
    organization: 'Health First International',
    description: 'Providing medical supplies and healthcare access',
    progress: 60,
    raised: 120000,
    target: 200000,
    donors: 1500,
    status: 'active',
    category: 'Health',
    location: 'Syria',
    endDate: '2024-07-10',
    impact: '5,000+ medical kits delivered',
  },
  {
    id: 'PROJ-005',
    title: 'Animal Rescue',
    organization: 'Wildlife Protection Society',
    description: 'Rescuing and rehabilitating endangered species',
    progress: 30,
    raised: 30000,
    target: 100000,
    donors: 450,
    status: 'active',
    category: 'Animal Welfare',
    location: 'Indonesia',
    endDate: '2024-09-30',
    impact: '200+ animals rescued',
  },
]

export default function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                         project.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || project.category === category
    return matchesSearch && matchesCategory
  })

  const categories = ['all', 'Health', 'Education', 'Environment', 'Animal Welfare']

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Browse and support impactful projects</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold mt-2">{projects.length}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
                <p className="text-2xl font-bold mt-2">${projects.reduce((sum, p) => sum + p.raised, 0).toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donors</p>
                <p className="text-2xl font-bold mt-2">{projects.reduce((sum, p) => sum + p.donors, 0).toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold mt-2">{Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  onClick={() => setCategory(cat)}
                  className="whitespace-nowrap"
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{project.organization}</p>
                  </div>
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                {/* Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${project.raised.toLocaleString()} raised</span>
                    <span>${project.target.toLocaleString()} goal</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center border-t pt-4">
                  <div>
                    <div className="font-bold">{project.donors.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Donors</div>
                  </div>
                  <div>
                    <div className="font-bold">{project.category}</div>
                    <div className="text-xs text-muted-foreground">Category</div>
                  </div>
                  <div>
                    <div className="font-bold">{project.location}</div>
                    <div className="text-xs text-muted-foreground">Location</div>
                  </div>
                </div>

                {/* Impact */}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium">Impact</p>
                  <p className="text-sm text-muted-foreground mt-1">{project.impact}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
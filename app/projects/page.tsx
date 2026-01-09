'use client'

import { useState, useEffect } from 'react'
import { 
  Search, Filter, Globe, Heart, Users, Target, 
  TreePine, BookOpen, Droplets, Shield, Calendar,
  TrendingUp, MapPin, Eye, ArrowRight
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import Link from 'next/link'
import Header from '../components/layout/Header'

const allProjects = [
  {
    id: 'PROJ-001',
    title: 'Clean Water Initiative',
    organization: 'Water for All',
    description: 'Providing clean drinking water to 10,000 people in rural Kenya by drilling boreholes and installing water purification systems.',
    progress: 75,
    raised: 75000,
    target: 100000,
    donors: 1240,
    category: 'Health',
    subcategory: 'Water & Sanitation',
    location: 'Kenya',
    urgency: 'high',
    status: 'active',
    endDate: '2024-06-30',
    impact: '10,000+ people with clean water access',
    tags: ['Water', 'Health', 'Africa'],
    verified: true,
    featured: true,
  },
  {
    id: 'PROJ-002',
    title: 'Education for Children',
    organization: 'Bright Future NGO',
    description: 'Building schools and providing education materials for 500 children in remote areas with no access to formal education.',
    progress: 45,
    raised: 45000,
    target: 100000,
    donors: 890,
    category: 'Education',
    subcategory: 'Child Education',
    location: 'Bangladesh',
    urgency: 'medium',
    status: 'active',
    endDate: '2024-08-15',
    impact: '500+ children enrolled in school',
    tags: ['Education', 'Children', 'Asia'],
    verified: true,
    featured: true,
  },
  {
    id: 'PROJ-003',
    title: 'Reforestation Project',
    organization: 'Green Earth Alliance',
    description: 'Planting 50,000 trees in deforested areas to combat climate change and restore local ecosystems.',
    progress: 90,
    raised: 180000,
    target: 200000,
    donors: 2100,
    category: 'Environment',
    subcategory: 'Reforestation',
    location: 'Brazil',
    urgency: 'high',
    status: 'active',
    endDate: '2024-05-20',
    impact: '50,000+ trees planted',
    tags: ['Environment', 'Climate', 'South America'],
    verified: true,
    featured: true,
  },
  {
    id: 'PROJ-004',
    title: 'Medical Aid Fund',
    organization: 'Health First International',
    description: 'Providing emergency medical supplies and healthcare access to conflict-affected communities.',
    progress: 60,
    raised: 120000,
    target: 200000,
    donors: 1500,
    category: 'Health',
    subcategory: 'Medical Aid',
    location: 'Syria',
    urgency: 'high',
    status: 'active',
    endDate: '2024-07-10',
    impact: '5,000+ medical kits delivered',
    tags: ['Health', 'Emergency', 'Middle East'],
    verified: true,
    featured: false,
  },
  {
    id: 'PROJ-005',
    title: 'Animal Rescue',
    organization: 'Wildlife Protection Society',
    description: 'Rescuing and rehabilitating endangered species from illegal wildlife trade and habitat destruction.',
    progress: 30,
    raised: 30000,
    target: 100000,
    donors: 450,
    category: 'Animal Welfare',
    subcategory: 'Wildlife Rescue',
    location: 'Indonesia',
    urgency: 'medium',
    status: 'active',
    endDate: '2024-09-30',
    impact: '200+ animals rescued',
    tags: ['Animals', 'Conservation', 'Asia'],
    verified: true,
    featured: false,
  },
  {
    id: 'PROJ-006',
    title: 'Women Empowerment',
    organization: 'Empower Women NGO',
    description: 'Providing vocational training and microloans to help women start businesses and gain financial independence.',
    progress: 55,
    raised: 110000,
    target: 200000,
    donors: 920,
    category: 'Economic Development',
    subcategory: 'Women Empowerment',
    location: 'India',
    urgency: 'medium',
    status: 'active',
    endDate: '2024-10-15',
    impact: '300+ women trained',
    tags: ['Women', 'Economic', 'Asia'],
    verified: true,
    featured: false,
  },
  {
    id: 'PROJ-007',
    title: 'Disaster Relief Fund',
    organization: 'Global Aid Network',
    description: 'Emergency response and relief for communities affected by natural disasters.',
    progress: 85,
    raised: 170000,
    target: 200000,
    donors: 1850,
    category: 'Emergency',
    subcategory: 'Disaster Relief',
    location: 'Turkey',
    urgency: 'high',
    status: 'active',
    endDate: '2024-04-30',
    impact: '10,000+ people assisted',
    tags: ['Emergency', 'Disaster', 'Middle East'],
    verified: true,
    featured: false,
  },
  {
    id: 'PROJ-008',
    title: 'Digital Literacy Program',
    organization: 'Tech for All Foundation',
    description: 'Teaching digital skills to underserved youth to bridge the digital divide and create employment opportunities.',
    progress: 40,
    raised: 80000,
    target: 200000,
    donors: 620,
    category: 'Education',
    subcategory: 'Digital Skills',
    location: 'Nigeria',
    urgency: 'medium',
    status: 'active',
    endDate: '2024-11-30',
    impact: '1,000+ youth trained',
    tags: ['Education', 'Technology', 'Africa'],
    verified: true,
    featured: false,
  },
]

const categories = [
  { id: 'all', name: 'All Projects', icon: Globe, count: allProjects.length },
  { id: 'health', name: 'Health', icon: Heart, count: allProjects.filter(p => p.category === 'Health').length },
  { id: 'education', name: 'Education', icon: BookOpen, count: allProjects.filter(p => p.category === 'Education').length },
  { id: 'environment', name: 'Environment', icon: TreePine, count: allProjects.filter(p => p.category === 'Environment').length },
  { id: 'economic', name: 'Economic Development', icon: TrendingUp, count: allProjects.filter(p => p.category === 'Economic Development').length },
  { id: 'animal', name: 'Animal Welfare', icon: Users, count: allProjects.filter(p => p.category === 'Animal Welfare').length },
  { id: 'emergency', name: 'Emergency', icon: Shield, count: allProjects.filter(p => p.category === 'Emergency').length },
]

const locations = [
  'All Locations',
  'Africa',
  'Asia',
  'South America',
  'Middle East',
  'Europe',
  'North America',
]

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'newest', name: 'Newest' },
  { id: 'ending', name: 'Ending Soon' },
  { id: 'popular', name: 'Most Popular' },
  { id: 'progress', name: 'Highest Progress' },
  { id: 'urgent', name: 'Most Urgent' },
]

export default function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedSort, setSelectedSort] = useState('featured')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [filteredProjects, setFilteredProjects] = useState(allProjects)

  useEffect(() => {
    let result = [...allProjects]

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.organization.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(project => 
        project.category.toLowerCase().includes(selectedCategory) ||
        project.subcategory.toLowerCase().includes(selectedCategory)
      )
    }

    // Location filter
    if (selectedLocation !== 'All Locations') {
      result = result.filter(project => {
        if (selectedLocation === 'Africa') return ['Kenya', 'Nigeria'].includes(project.location)
        if (selectedLocation === 'Asia') return ['Bangladesh', 'India', 'Indonesia'].includes(project.location)
        if (selectedLocation === 'South America') return ['Brazil'].includes(project.location)
        if (selectedLocation === 'Middle East') return ['Syria', 'Turkey'].includes(project.location)
        return true
      })
    }

    // Sort
    switch (selectedSort) {
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id))
        break
      case 'ending':
        result.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
        break
      case 'popular':
        result.sort((a, b) => b.donors - a.donors)
        break
      case 'progress':
        result.sort((a, b) => b.progress - a.progress)
        break
      case 'urgent':
  result.sort((a, b) => {
    // Create a type-safe urgency order
    type Urgency = 'high' | 'medium' | 'low'
    const urgencyOrder: Record<Urgency, number> = { 
      high: 3, 
      medium: 2, 
      low: 1 
    }
    
    // Cast urgency to the Urgency type since we know it's valid
    const aUrgency = a.urgency as Urgency
    const bUrgency = b.urgency as Urgency
    
    return urgencyOrder[bUrgency] - urgencyOrder[aUrgency]
  })
  break
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProjects(result)
  }, [search, selectedCategory, selectedLocation, selectedSort])

  const totalRaised = allProjects.reduce((sum, p) => sum + p.raised, 0)
  const totalDonors = allProjects.reduce((sum, p) => sum + p.donors, 0)
  const avgProgress = Math.round(allProjects.reduce((sum, p) => sum + p.progress, 0) / allProjects.length)

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      {/* Hero Section */}
      <Header />
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-300">Impactful</span> Projects
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Browse verified projects from around the world and support causes you care about
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold">${totalRaised.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Total Raised</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalDonors.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Donors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{avgProgress}%</div>
                <div className="text-sm text-blue-200">Avg Progress</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search projects by name, organization, or keyword..."
                className="pl-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                            selectedCategory === category.id
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{category.name}</span>
                          </div>
                          <span className="text-sm px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
                            {category.count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </h3>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                          selectedLocation === location
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <span>{location}</span>
                        {location !== 'All Locations' && (
                          <span className="text-sm text-muted-foreground">
                            {allProjects.filter(p => {
                              if (location === 'Africa') return ['Kenya', 'Nigeria'].includes(p.location)
                              if (location === 'Asia') return ['Bangladesh', 'India', 'Indonesia'].includes(p.location)
                              if (location === 'South America') return ['Brazil'].includes(p.location)
                              if (location === 'Middle East') return ['Syria', 'Turkey'].includes(p.location)
                              return false
                            }).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Urgency Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Urgency</h3>
                  <div className="space-y-2">
                    {['All', 'High', 'Medium', 'Low'].map((urgency) => (
                      <button
                        key={urgency}
                        onClick={() => {
                          // Filter by urgency
                        }}
                        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted"
                      >
                        <span>{urgency} Priority</span>
                        <span className="text-sm text-muted-foreground">
                          {urgency === 'All' 
                            ? allProjects.length 
                            : allProjects.filter(p => p.urgency === urgency.toLowerCase()).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedLocation('All Locations')
                    setSearch('')
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>

            {/* Verification Badge */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-semibold">Verified Projects</p>
                    <p className="text-sm text-muted-foreground">All NGOs are thoroughly vetted</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Legal registration verified</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Financial transparency</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Impact reporting verified</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold">
                  {filteredProjects.length} Projects Found
                </h2>
                <p className="text-muted-foreground">
                  {selectedCategory === 'all' ? 'All categories' : selectedCategory} • {selectedLocation}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/30' : 'hover:bg-muted'}`}
                  >
                    <div className="grid grid-cols-2 gap-1 h-4 w-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-current rounded-sm"></div>
                      ))}
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/30' : 'hover:bg-muted'}`}
                  >
                    <div className="space-y-1 h-4 w-4">
                      <div className="h-1 w-full bg-current rounded-sm"></div>
                      <div className="h-1 w-full bg-current rounded-sm"></div>
                      <div className="h-1 w-full bg-current rounded-sm"></div>
                    </div>
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  className="flex h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      Sort by: {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Projects Grid/List */}
            {filteredProjects.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ListProjectCard key={project.id} {...project} />
                  ))}
                </div>
              )
            ) : (
              <Card className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedLocation('All Locations')
                    setSearch('')
                  }}
                >
                  Clear All Filters
                </Button>
              </Card>
            )}

            {/* Pagination */}
            {filteredProjects.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={page === 1 ? 'default' : 'outline'}
                      size="sm"
                      className="w-10"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* CTA Section */}
            <Card className="mt-12 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Have a project in mind?</h3>
                    <p className="text-muted-foreground">
                      Register your NGO and start receiving transparent donations
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link href="/ngo/register">
                      <Button className="gap-2">
                        Register NGO
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/donate">
                      <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        How to Donate
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// List View Card Component
function ListProjectCard({
  id,
  title,
  organization,
  description,
  progress,
  raised,
  target,
  donors,
  category,
  location,
  urgency,
  verified,
}: any) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Project Image/Placeholder */}
          <div className="lg:w-48 h-48 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              {urgency === 'high' && (
                <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  Urgent
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                    {category}
                  </span>
                  {verified && (
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-muted-foreground">Verified</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-muted-foreground">{organization} • {location}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${raised.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">raised of ${target.toLocaleString()}</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
              {description}
            </p>

            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{progress}% funded</span>
                  <span>{donors.toLocaleString()} donors</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>30 days left</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{donors.toLocaleString()} supporters</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Save
                  </Button>
                  <Link href={`/donate/${id}`}>
                    <Button size="sm" className="gap-2">
                      Donate Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Reusable Project Card Component
function ProjectCard({
  id,
  title,
  organization,
  description,
  progress,
  raised,
  target,
  donors,
  category,
  location,
  urgency,
  verified,
  featured,
}: any) {
  return (
    <Link href={`/donate/${id}`}>
      <Card className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
        <div className="h-48 bg-linear-to-br from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                {category}
              </span>
              {urgency === 'high' && (
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  Urgent
                </span>
              )}
              {featured && (
                <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {verified && (
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">Verified</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-lg line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                {title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{organization}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          {/* Progress */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${raised.toLocaleString()} raised</span>
              <span>${target.toLocaleString()} goal</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 border rounded-lg">
              <div className="font-bold">{donors.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Donors</div>
            </div>
            <div className="text-center p-2 border rounded-lg">
              <div className="font-bold">{location}</div>
              <div className="text-xs text-muted-foreground">Location</div>
            </div>
          </div>

          <Button className="w-full gap-2 group-hover:bg-blue-700 transition-colors">
            <Heart className="h-4 w-4" />
            Donate Now
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
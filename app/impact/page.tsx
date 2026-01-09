import { Heart, Globe, Users, Droplets, Trees, BookOpen, Award, TrendingUp } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Link from 'next/link'

export default function PublicImpactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            See Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Impact</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover how donations are creating real change across the world through complete transparency.
          </p>
        </div>

        {/* Global Impact Stats */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Global Impact at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                value: '2.5M+',
                label: 'Total Donations',
                description: 'Raised through our platform',
                color: 'text-red-500',
              },
              {
                icon: Users,
                value: '50K+',
                label: 'Lives Changed',
                description: 'People directly impacted',
                color: 'text-blue-500',
              },
              {
                icon: Globe,
                value: '45+',
                label: 'Countries',
                description: 'Projects across the globe',
                color: 'text-green-500',
              },
              {
                icon: Award,
                value: '98%',
                label: 'Transparency Score',
                description: 'Average NGO rating',
                color: 'text-purple-500',
              },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className={`${stat.color} mb-4`}>
                    <Icon className="h-12 w-12 mx-auto" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Impact Categories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Impact by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Droplets,
                title: 'Clean Water',
                projects: 45,
                impact: '1M+ liters provided',
                color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
              },
              {
                icon: BookOpen,
                title: 'Education',
                projects: 38,
                impact: '10K+ children educated',
                color: 'bg-green-100 text-green-600 dark:bg-green-900/30',
              },
              {
                icon: Trees,
                title: 'Environment',
                projects: 32,
                impact: '500K+ trees planted',
                color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30',
              },
              {
                icon: Users,
                title: 'Healthcare',
                projects: 28,
                impact: '100K+ medical kits',
                color: 'bg-red-100 text-red-600 dark:bg-red-900/30',
              },
            ].map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="bg-card rounded-2xl p-6 border hover:shadow-xl transition-shadow">
                  <div className={`${category.color} h-14 w-14 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-semibold">{category.projects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Impact</span>
                      <span className="font-semibold">{category.impact}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Success Stories</h2>
            <Link 
              href="/stories" 
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View All Stories →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Clean Water for 10 Villages',
                location: 'Kenya',
                description: '5000+ people gained access to clean drinking water through 20 new boreholes.',
                impact: '80% reduction in waterborne diseases',
                imageColor: 'bg-gradient-to-br from-blue-500 to-cyan-500',
              },
              {
                title: 'School Rebuilding Project',
                location: 'Bangladesh',
                description: 'New school building serving 200 children who previously had no access to education.',
                impact: 'Literacy rate increased from 40% to 85%',
                imageColor: 'bg-gradient-to-br from-green-500 to-emerald-500',
              },
              {
                title: 'Reforestation Initiative',
                location: 'Brazil',
                description: '50,000 trees planted in deforested areas, creating new habitats for wildlife.',
                impact: 'Carbon capture of 1,000+ tons annually',
                imageColor: 'bg-gradient-to-br from-emerald-500 to-green-500',
              },
            ].map((story, index) => (
              <div key={index} className="bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${story.imageColor} h-48 relative`}>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                      {story.location}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                  <p className="text-muted-foreground mb-4">{story.description}</p>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Key Impact:</p>
                    <p className="text-sm">{story.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Map Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Global Impact Map</h2>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 rounded-2xl flex items-center justify-center border">
                  <div className="text-center">
                    <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive Impact Map</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Visualize impact across different regions
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-6">Regional Impact</h3>
                <div className="space-y-4">
                  {[
                    { region: 'Africa', projects: 45, impact: 'High' },
                    { region: 'Asia', projects: 38, impact: 'Medium' },
                    { region: 'South America', projects: 22, impact: 'High' },
                    { region: 'Europe', projects: 15, impact: 'Low' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.region}</p>
                        <p className="text-sm text-muted-foreground">{item.projects} projects</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.impact === 'High' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30' 
                          : item.impact === 'Medium'
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800'
                      }`}>
                        {item.impact} Impact
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transparency Metrics */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Transparency Metrics</h2>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Funds to Projects', value: '95%', description: 'Direct to beneficiaries' },
                { label: 'Timely Reports', value: '98%', description: 'On-time project updates' },
                { label: 'Verified NGOs', value: '100%', description: 'All partners verified' },
                { label: 'Donor Satisfaction', value: '96%', description: 'Based on surveys' },
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold mb-2">{metric.value}</div>
                  <div className="font-semibold mb-1">{metric.label}</div>
                  <div className="text-blue-100 text-sm">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Annual Impact Report */}
        <div className="mb-20">
          <div className="bg-card rounded-3xl border p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">2024 Annual Impact Report</h2>
                <p className="text-muted-foreground mb-6">
                  Download our comprehensive annual report with detailed impact metrics,
                  financial transparency, and success stories from around the world.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/reports/annual-2024.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                  >
                    Download Full Report (PDF)
                  </a>
                  <a
                    href="/reports/summary"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                  >
                    View Summary
                  </a>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6 border">
                  <h3 className="font-bold mb-4">Report Highlights</h3>
                  <ul className="space-y-3">
                    {[
                      'Detailed financial breakdown',
                      'Project-by-project impact metrics',
                      'NGO performance reviews',
                      'Donor testimonies',
                      '2025 roadmap and goals',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Own Impact?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of donors who trust us to make their giving transparent and impactful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                Browse Projects
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
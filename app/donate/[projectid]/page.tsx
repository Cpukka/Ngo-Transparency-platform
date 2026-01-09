'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Heart, Share2, Bookmark, Globe, Users, Target, Calendar, CheckCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import { toast } from 'sonner'

const project = {
  id: 'PROJ-001',
  title: 'Clean Water Initiative',
  organization: 'Water for All',
  description: 'This project aims to provide clean, safe drinking water to 10,000 people in rural Kenya by drilling boreholes and installing water purification systems. Many communities in this region currently walk 3-4 hours daily to collect contaminated water from distant sources.',
  longDescription: `
    The Clean Water Initiative focuses on providing sustainable water solutions to rural communities in Kenya. 
    Our approach includes:
    • Drilling 20 boreholes in strategic locations
    • Installing solar-powered water purification systems
    • Training local community members in maintenance
    • Establishing water management committees
    • Implementing hygiene education programs
    
    Each borehole serves approximately 500 people, reducing water collection time from 4 hours to 15 minutes. 
    This allows children, especially girls, to attend school regularly instead of spending hours collecting water.
  `,
  progress: 75,
  raised: 75000,
  target: 100000,
  donors: 1240,
  category: 'Health',
  location: 'Kenya',
  startDate: '2024-01-01',
  endDate: '2024-06-30',
  status: 'active',
  impact: [
    '10,000+ people with clean water access',
    '80% reduction in waterborne diseases',
    '3 hours saved daily per household',
    '300+ children able to attend school regularly',
  ],
  updates: [
    {
      id: 1,
      date: '2024-01-15',
      title: 'First Borehole Completed',
      content: 'Successfully drilled and installed the first borehole in Kijiji village. 500 people now have access to clean water within 15 minutes of their homes.',
    },
    {
      id: 2,
      date: '2024-01-10',
      title: 'Community Training Session',
      content: 'Trained 20 community members in water system maintenance and hygiene practices.',
    },
  ],
  milestones: [
    { title: 'Planning & Assessment', completed: true, date: '2024-01-15' },
    { title: 'First 5 Boreholes', completed: true, date: '2024-02-28' },
    { title: 'Community Training', completed: true, date: '2024-03-15' },
    { title: 'Next 10 Boreholes', completed: false, date: '2024-04-30' },
    { title: 'Final 5 Boreholes', completed: false, date: '2024-05-31' },
    { title: 'Project Evaluation', completed: false, date: '2024-06-30' },
  ],
}

const donationAmounts = [25, 50, 100, 250, 500, 1000]

// Fixed Badge component interface
interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'outline'
}

export default function ProjectDonatePage() {
  const params = useParams()
  const router = useRouter()
  const [donationAmount, setDonationAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleDonate = async () => {
    const amount = selectedAmount || parseFloat(donationAmount)
    
    if (!amount || amount < 1) {
      toast.error('Please enter a valid donation amount')
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast.success(`Thank you for your $${amount} donation!`)
      router.push('/dashboard/donations')
    }, 1500)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Badge>Health</Badge>
                  <Badge variant="outline">{project.location}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
                <p className="text-xl text-blue-100 mb-6">by {project.organization}</p>
                <div className="flex items-center gap-4">
                  <Button variant="secondary" size="sm" onClick={handleShare} className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
              
              <Card className="w-full md:w-96 bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Raised</span>
                        <span className="font-semibold">{project.progress}%</span>
                      </div>
                      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="font-bold">${project.raised.toLocaleString()}</span>
                        <span>${project.target.toLocaleString()} goal</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{project.donors.toLocaleString()}</div>
                        <div className="text-sm text-blue-200">Donors</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">75</div>
                        <div className="text-sm text-blue-200">Days Left</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">4</div>
                        <div className="text-sm text-blue-200">Updates</div>
                      </div>
                    </div>

                    {/* Donation Amounts */}
                    <div>
                      <p className="text-sm mb-3">Select amount</p>
                      <div className="grid grid-cols-3 gap-2">
                        {donationAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => {
                              setSelectedAmount(amount)
                              setDonationAmount('')
                            }}
                            className={`p-3 rounded-lg border transition-colors ${
                              selectedAmount === amount
                                ? 'bg-white text-blue-600 border-white'
                                : 'bg-white/10 border-white/20 hover:bg-white/20'
                            }`}
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <p className="text-sm mb-3">Or enter custom amount</p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="pl-8 bg-white/10 border-white/20 text-white"
                          value={donationAmount}
                          onChange={(e) => {
                            setDonationAmount(e.target.value)
                            setSelectedAmount(null)
                          }}
                        />
                      </div>
                    </div>

                    {/* Donate Button */}
                    <Button
                      size="lg"
                      className="w-full gap-2 bg-white text-blue-600 hover:bg-white/90"
                      onClick={handleDonate}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Heart className="h-5 w-5" />
                          Donate Now
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="about">About NGO</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none dark:prose-invert">
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">{project.longDescription}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { icon: Globe, label: 'Location', value: project.location },
                      { icon: Calendar, label: 'Start Date', value: project.startDate },
                      { icon: Calendar, label: 'End Date', value: project.endDate },
                      { icon: Target, label: 'Status', value: project.status },
                      { icon: Users, label: 'Beneficiaries', value: '10,000 people' },
                      { icon: CheckCircle, label: 'Verified', value: 'Yes' },
                    ].map((detail, index) => {
                      const Icon = detail.icon
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{detail.label}</p>
                            <p className="font-medium text-gray-900 dark:text-white">{detail.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Project Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.updates.map((update) => (
                      <div key={update.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{update.date}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{update.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Project Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          milestone.completed
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          {milestone.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-gray-500 dark:bg-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <p className={`font-medium ${
                              milestone.completed ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {milestone.title}
                            </p>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{milestone.date}</span>
                          </div>
                          <div className={`h-1 w-full mt-2 ${
                            milestone.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Project Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.impact.map((impact, index) => (
                      <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white">{impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Fixed Badge component
function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-white/20 text-white',
    outline: 'bg-transparent border border-white/30 text-white',
  } as const
  
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]}`}>
      {children}
    </span>
  )
}
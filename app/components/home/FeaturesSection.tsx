'use client'

import { Shield, BarChart3, Smartphone, Download, Eye, Globe, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const features = [
  {
    icon: Shield,
    title: 'Complete Transparency',
    description: 'Track every donation from start to finish. See exactly how funds are used with real-time updates.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: BarChart3,
    title: 'Impact Dashboards',
    description: 'Visualize your impact with interactive charts and detailed analytics. See the difference you make.',
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    icon: Smartphone,
    title: 'Mobile Donor UI',
    description: 'Beautiful, responsive interface that works perfectly on any device. Donate anytime, anywhere.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    icon: Download,
    title: 'Report Export',
    description: 'Export detailed reports in multiple formats (PDF, Excel, CSV) for accounting and analysis.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  {
    icon: Eye,
    title: 'Project Updates',
    description: 'Follow project progress with regular updates, photos, and milestone achievements.',
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Support projects worldwide with verified NGOs and localized impact tracking.',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Everything You Need for{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Transparent Giving
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform provides comprehensive tools for donors and NGOs to ensure every donation creates maximum impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 shadow-lg bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${feature.bgColor} p-3 rounded-xl transition-colors`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Learn more</span>
                      <div className="h-8 w-8 rounded-full bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* For NGOs Section */}
        <div className="mt-24">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">For NGOs & Organizations</h3>
                  <p className="text-blue-100/90 text-lg mb-6">
                    Join our platform to access powerful tools for managing donations, engaging donors, and demonstrating impact.
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Real-time donation tracking and management',
                      'Automated impact reporting',
                      'Donor engagement tools',
                      'Compliance and transparency features',
                      'Multi-currency support',
                      'API integrations',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <span className="text-blue-50">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h4 className="text-xl font-bold mb-4">Get Started Today</h4>
                    <p className="mb-6 text-blue-100/90">
                      Register your NGO and start accepting transparent donations within minutes.
                    </p>
                    <Button 
                      className="w-full py-6 bg-white text-blue-600 font-semibold rounded-lg hover:bg-white/90 transition-colors dark:text-blue-700"
                      size="lg"
                    >
                      Register Your NGO
                    </Button>
                    <p className="text-sm text-blue-200 text-center mt-4">
                      Already registered?{' '}
                      <a 
                        href="/ngo/login" 
                        className="underline hover:text-white transition-colors"
                      >
                        Sign in here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
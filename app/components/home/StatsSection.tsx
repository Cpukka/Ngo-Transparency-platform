'use client'

import { Users, Globe, Heart, TrendingUp } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const stats = [
  {
    icon: Users,
    value: 12500,
    suffix: '+',
    label: 'Active Donors',
    description: 'Trusted community of givers',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: Globe,
    value: 45,
    suffix: '+',
    label: 'Countries',
    description: 'Global impact reach',
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    icon: Heart,
    value: 2.5,
    prefix: '$',
    suffix: 'M+',
    label: 'Donations Processed',
    description: 'Total funds distributed',
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Transparency Score',
    description: 'Average NGO rating',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
]

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-linear-to-b from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Making Real Impact{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
              Worldwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of donors and NGOs who trust our platform for transparent giving
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`${stat.bgColor} h-16 w-16 rounded-2xl flex items-center justify-center mb-6 transition-colors`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
                    {inView ? (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                        prefix={stat.prefix || ''}
                        suffix={stat.suffix || ''}
                      />
                    ) : (
                      `${stat.prefix || ''}0${stat.suffix || ''}`
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {stat.label}
                  </h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {stat.description}
                </p>
                
                {/* Animated progress bar for transparency score */}
                {stat.label === 'Transparency Score' && (
                  <div className="mt-6">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-linear-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-full"
                        style={{
                          width: inView ? '98%' : '0%',
                          transition: 'width 2s ease-in-out',
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                      <span>Industry Average: 65%</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">98%</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Impact Visualization */}
        <div className="mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Visual Impact Tracking
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                See exactly how donations translate into real-world impact through our interactive dashboards and detailed reporting.
              </p>
              
              <div className="space-y-6">
                {[
                  { label: 'Funds Allocated to Projects', value: 95, color: 'bg-green-500 dark:bg-green-400' },
                  { label: 'Operational Costs', value: 3, color: 'bg-blue-500 dark:bg-blue-400' },
                  { label: 'Platform Fees', value: 2, color: 'bg-purple-500 dark:bg-purple-400' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{
                          width: inView ? `${item.value}%` : '0%',
                          transitionDelay: `${index * 0.3}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: '10K+', label: 'Lives Impacted' },
                    { value: '500+', label: 'Projects Funded' },
                    { value: '24/7', label: 'Support' },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mini chart visualization */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-inner border border-gray-200 dark:border-gray-700">
                  <div className="flex items-end justify-between h-32">
                    {[65, 80, 45, 90, 75, 85].map((height, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className={`w-6 rounded-t-lg transition-all duration-1000 ${
                            index % 2 === 0 
                              ? 'bg-linear-to-t from-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-300' 
                              : 'bg-linear-to-t from-purple-500 to-purple-400 dark:from-purple-400 dark:to-purple-300'
                          }`}
                          style={{
                            height: inView ? `${height}%` : '0%',
                            transitionDelay: `${index * 0.2}s`,
                          }}
                        />
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                          Q{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Quarterly Donation Growth
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
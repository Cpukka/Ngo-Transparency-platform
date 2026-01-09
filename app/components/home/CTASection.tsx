'use client'

import { ArrowRight, Heart, Shield, Users } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useRouter } from 'next/navigation'

export default function CTASection() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/register')
  }

  const handleBrowseProjects = () => {
    router.push('/projects')
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Make a <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Difference?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community of transparent givers and start creating real impact today.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            
            <div className="relative z-10 p-12 md:p-16">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Start Your Giving Journey Today
                  </h3>
                  <p className="text-lg text-blue-100 mb-8 max-w-2xl">
                    Create an account in 2 minutes and begin supporting verified projects with complete transparency.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-white/90 gap-2"
                      onClick={handleGetStarted}
                    >
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 gap-2"
                      onClick={handleBrowseProjects}
                    >
                      <Heart className="h-5 w-5" />
                      Browse Projects
                    </Button>
                  </div>
                  
                  <div className="mt-8 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-300" />
                      <span className="text-sm text-white">No hidden fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-300" />
                      <span className="text-sm text-white">10,000+ donors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-300 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-sm text-white">95% project allocation</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <h4 className="text-xl font-bold text-white mb-6">Why Choose Us?</h4>
                    <ul className="space-y-4">
                      {[
                        'Real-time donation tracking',
                        'Verified NGOs only',
                        'Detailed impact reports',
                        'Tax deductible donations',
                        'Mobile app available',
                        '24/7 donor support',
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-green-400"></div>
                          </div>
                          <span className="text-white">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-12">Trusted by Donors & NGOs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Regular Donor',
                  content: 'I\'ve donated to multiple projects and the transparency is incredible. I can see exactly how my money is being used.',
                  avatar: 'SJ',
                  color: 'bg-blue-500',
                },
                {
                  name: 'Water for All NGO',
                  role: 'Verified Organization',
                  content: 'This platform has helped us increase donations by 300% while reducing administrative overhead significantly.',
                  avatar: 'WA',
                  color: 'bg-green-500',
                },
                {
                  name: 'Michael Chen',
                  role: 'Corporate Donor',
                  content: 'The detailed reports make it easy for our company to track our CSR impact and share with stakeholders.',
                  avatar: 'MC',
                  color: 'bg-purple-500',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${testimonial.color} h-12 w-12 rounded-full flex items-center justify-center text-white font-bold`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div className="flex gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 text-yellow-400 fill-current">
                        ★
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center">
            <div className="inline-block bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-1">
              <div className="bg-card rounded-xl p-8 max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Our team is here to help you understand how our platform works and how you can maximize your impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2"
                    onClick={() => router.push('/contact')}
                  >
                    Contact Support
                  </Button>
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={() => router.push('/faq')}
                  >
                    View FAQ
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
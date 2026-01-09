import { Heart, Shield, Target, Users, Globe, Award } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Mission</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            We're building a world where every donation creates maximum impact through complete transparency and accountability.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg">
              <p>
                Founded in 2023, NGO Transparency Platform was born from a simple observation: 
                donors want to see the real impact of their contributions, and NGOs need better 
                tools to demonstrate their effectiveness.
              </p>
              <p>
                We saw a gap between generous intentions and measurable outcomes. Too often, 
                donations were made without clear visibility into how funds were used or what 
                difference they made.
              </p>
              <p>
                Our platform bridges this gap by providing complete transparency, real-time 
                tracking, and verifiable impact metrics for every donation.
              </p>
            </div>
          </div>
          <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-3xl p-8 h-80 flex items-center justify-center">
            <div className="text-center text-white">
              <Globe className="h-16 w-16 mx-auto mb-6" />
              <p className="text-2xl font-bold">Making Global Impact Transparent</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Transparency',
                description: 'Every transaction is visible, traceable, and verifiable.',
                color: 'text-blue-500',
              },
              {
                icon: Target,
                title: 'Impact',
                description: 'We measure success by real-world outcomes, not just donations.',
                color: 'text-green-500',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building trust between donors, NGOs, and beneficiaries.',
                color: 'text-purple-500',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Highest standards for NGO verification and project evaluation.',
                color: 'text-yellow-500',
              },
              {
                icon: Heart,
                title: 'Compassion',
                description: 'Putting human impact at the center of everything we do.',
                color: 'text-red-500',
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Supporting impactful projects across all continents.',
                color: 'text-cyan-500',
              },
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-card rounded-2xl p-8 border hover:shadow-xl transition-shadow">
                  <div className={`${value.color} mb-4`}>
                    <Icon className="h-12 w-12" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'CEO & Founder',
                bio: 'Former NGO director with 15+ years in international development.',
                avatar: 'SC',
                color: 'bg-blue-500',
              },
              {
                name: 'Marcus Johnson',
                role: 'CTO',
                bio: 'Tech entrepreneur focused on social impact solutions.',
                avatar: 'MJ',
                color: 'bg-green-500',
              },
              {
                name: 'Priya Patel',
                role: 'Head of NGO Relations',
                bio: 'Expert in nonprofit management and impact measurement.',
                avatar: 'PP',
                color: 'bg-purple-500',
              },
              {
                name: 'David Kim',
                role: 'Head of Finance',
                bio: 'CPA with expertise in nonprofit financial transparency.',
                avatar: 'DK',
                color: 'bg-red-500',
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className={`${member.color} h-20 w-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}>
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground mb-2">{member.role}</p>
                <p className="text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2023', label: 'Year Founded' },
              { value: '500+', label: 'NGO Partners' },
              { value: '45+', label: 'Countries' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a donor seeking impact or an NGO wanting to demonstrate transparency, 
            we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Donating
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
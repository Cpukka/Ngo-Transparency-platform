'use client'

import { Button } from '../../components/ui/Button'
import { ArrowRight, Heart } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="py-20 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Gradient text - this will work in both themes */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
          Transparent Giving,<br />Measurable Impact
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Track every donation, follow project progress, and see real impact. 
          Complete transparency for NGOs and donors.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            Start Donating <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Heart className="w-4 h-4" />
            For NGOs
          </Button>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">$2.5M+</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">Total Donations</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">150+</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">Projects Funded</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">Donors</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">98%</div>
            <div className="text-gray-600 dark:text-gray-400 mt-2">Transparency Score</div>
          </div>
        </div>
      </div>
    </section>
  )
}
import Header from './components/layout/Header'
import HeroSection from './components/home/HeroSection'
import FeaturesSection from './components/home/FeaturesSection'
import StatsSection from './components/home/StatsSection'
import CTASection from './components/home/CTASection'
import Footer from './components/layout/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Let ThemeProvider handle the theme */}
      <Header />
      <main className="container mx-auto px-4">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
// app/privacy/page.tsx
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead">Last updated: January 15, 2024</p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including:
          </p>
          <ul>
            <li>Account information (name, email, password)</li>
            <li>Payment information (processed securely by our payment partners)</li>
            <li>Communication preferences</li>
            <li>Donation history and preferences</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Process your donations and provide receipts</li>
            <li>Send you project updates and impact reports</li>
            <li>Improve our platform and services</li>
            <li>Ensure compliance with legal obligations</li>
          </ul>

          <h2>3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data,
            including encryption, secure servers, and regular security audits.
          </p>

          <h2>4. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>5. Contact Us</h2>
          <p>
            For privacy-related questions, contact: privacy@ngotransparency.org
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
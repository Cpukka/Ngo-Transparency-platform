'use client'

import { useState } from 'react'
import { Search, ChevronDown, HelpCircle, CreditCard, Shield, Users, Globe } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Input } from '../components/ui/Input'

const faqCategories = [
  { id: 'general', name: 'General', icon: HelpCircle },
  { id: 'donations', name: 'Donations', icon: CreditCard },
  { id: 'security', name: 'Security & Privacy', icon: Shield },
  { id: 'ngo', name: 'For NGOs', icon: Users },
  { id: 'technical', name: 'Technical', icon: Globe },
]

const faqs = {
  general: [
    {
      question: 'What is NGO Transparency Platform?',
      answer: 'We are a platform that connects donors with verified NGOs, providing complete transparency in how donations are used and what impact they create.',
    },
    {
      question: 'How do you verify NGOs?',
      answer: 'All NGOs undergo a rigorous verification process including legal documentation review, financial audit, site visits, and impact assessment.',
    },
    {
      question: 'Is there a fee for using the platform?',
      answer: 'We charge a small platform fee (typically 2-5%) to cover operational costs. 95%+ of donations go directly to projects.',
    },
  ],
  donations: [
    {
      question: 'How do I make a donation?',
      answer: 'You can donate directly to any project on our platform using credit/debit card, PayPal, or bank transfer. The process takes less than 2 minutes.',
    },
    {
      question: 'Can I get a receipt for my donation?',
      answer: 'Yes, you will receive a detailed tax-deductible receipt immediately after your donation, which can be downloaded from your dashboard.',
    },
    {
      question: 'How are donation funds allocated?',
      answer: '95% goes directly to the project, 3% covers payment processing, and 2% supports platform maintenance and verification.',
    },
    {
      question: 'Can I cancel or refund a donation?',
      answer: 'Donations can be refunded within 24 hours. After that, refunds are at the discretion of the receiving NGO.',
    },
  ],
  security: [
    {
      question: 'Is my payment information secure?',
      answer: 'Yes, we use bank-level encryption and PCI-compliant payment processors. We never store your full payment details.',
    },
    {
      question: 'How is my personal data protected?',
      answer: 'We follow GDPR and CCPA regulations, encrypt all personal data, and never share your information without consent.',
    },
  ],
  ngo: [
    {
      question: 'How can my NGO join the platform?',
      answer: 'Visit our NGO registration page and submit your organization details. Our team will guide you through verification.',
    },
    {
      question: 'What are the requirements for NGOs?',
      answer: 'NGOs must be legally registered, have at least 2 years of operation, provide financial audits, and demonstrate impact.',
    },
  ],
  technical: [
    {
      question: 'What browsers are supported?',
      answer: 'We support Chrome, Firefox, Safari, and Edge on their latest versions. Mobile apps are available for iOS and Android.',
    },
    {
      question: 'Do you have a mobile app?',
      answer: 'Yes, you can download our mobile app from the App Store or Google Play for a better mobile experience.',
    },
  ],
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('general')
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs].filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about donations, NGO verification, platform features, and more.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for answers..."
                className="pl-12 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories */}
            <div>
              <div className="sticky top-24">
                <h2 className="text-lg font-bold mb-4">Categories</h2>
                <div className="space-y-2">
                  {faqCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                          activeCategory === category.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{category.name}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Quick Help */}
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl">
                  <h3 className="font-bold mb-2">Need More Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Can't find what you're looking for?
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Contact Support →
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {faqCategories.find(c => c.id === activeCategory)?.name} Questions
                </h2>
                <p className="text-muted-foreground">
                  {filteredFaqs.length} questions in this category
                </p>
              </div>

              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-xl border overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            openItems.includes(index) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openItems.includes(index) && (
                        <div className="px-6 pb-6 pt-2 border-t">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No matches found</h3>
                    <p className="text-muted-foreground">
                      Try searching with different keywords or browse another category.
                    </p>
                  </div>
                )}
              </div>

              {/* Popular Questions */}
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Popular Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'How do I track my donation impact?',
                    'What payment methods are accepted?',
                    'How often are project updates posted?',
                    'Can I donate anonymously?',
                    'How are NGOs verified?',
                    'Is my donation tax deductible?',
                  ].map((question, index) => (
                    <a
                      key={index}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        const foundIndex = filteredFaqs.findIndex(faq => 
                          faq.question.includes(question.split('?')[0])
                        )
                        if (foundIndex > -1) {
                          setOpenItems([foundIndex])
                        }
                      }}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{question}</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
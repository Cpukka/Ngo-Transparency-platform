'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Textarea } from '../components/ui/Textarea'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions? We're here to help. Contact our team for support, partnerships, or feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground">
                  Reach out to us through any of these channels. We typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: 'Email',
                    details: ['support@ngotransparency.org', 'partnerships@ngotransparency.org'],
                    color: 'text-blue-500',
                  },
                  {
                    icon: Phone,
                    title: 'Phone',
                    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
                    color: 'text-green-500',
                  },
                  {
                    icon: MapPin,
                    title: 'Office',
                    details: ['123 Charity Street', 'Global City, GC 10001', 'United States'],
                    color: 'text-red-500',
                  },
                  {
                    icon: Clock,
                    title: 'Hours',
                    details: ['Monday - Friday: 9AM - 6PM EST', 'Weekends: Emergency support only'],
                    color: 'text-purple-500',
                  },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`${item.color} mt-1`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{item.title}</h3>
                        {item.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* FAQ Link */}
              <div className="bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl p-6">
                <h3 className="font-bold mb-2">Common Questions?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Check our FAQ for quick answers to common inquiries.
                </p>
                <a
                  href="/faq"
                  className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
                >
                  Visit FAQ →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-8">
                  <Send className="h-6 w-6 text-blue-500" />
                  <h2 className="text-2xl font-bold">Send us a Message</h2>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground mb-8">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your Name *
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your inquiry..."
                        className="resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Fields marked with * are required
                      </p>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Departments */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Support',
                    email: 'support@ngotransparency.org',
                    description: 'Technical issues & platform questions',
                  },
                  {
                    title: 'Partnerships',
                    email: 'partnerships@ngotransparency.org',
                    description: 'NGO onboarding & collaborations',
                  },
                  {
                    title: 'Media',
                    email: 'press@ngotransparency.org',
                    description: 'Press inquiries & media relations',
                  },
                ].map((dept, index) => (
                  <div key={index} className="bg-card rounded-xl border p-4 text-center">
                    <h4 className="font-bold mb-1">{dept.title}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{dept.email}</p>
                    <p className="text-xs text-muted-foreground">{dept.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
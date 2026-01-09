'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Building2, Mail, Globe, Phone, MapPin, Users, 
  FileText, Check, ArrowRight, Upload, Globe as Earth 
} from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Textarea } from '../../../components/ui/Textarea'
import { toast } from 'sonner'

export default function NGORegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Organization, 2: Contact, 3: Documents
  const [formData, setFormData] = useState({
    // Step 1: Organization Details
    orgName: '',
    orgEmail: '',
    website: '',
    foundedYear: '',
    mission: '',
    
    // Step 2: Contact & Location
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    country: '',
    city: '',
    address: '',
    
    // Step 3: Documents & Verification
    registrationNumber: '',
    taxId: '',
    focusAreas: [] as string[],
    annualBudget: '',
    staffCount: '',
    
    // Files (simplified)
    registrationDoc: false,
    financialStatement: false,
    boardResolution: false,
  })

  const focusAreasList = [
    'Education',
    'Healthcare',
    'Environment',
    'Poverty Alleviation',
    'Human Rights',
    'Disaster Relief',
    'Animal Welfare',
    'Arts & Culture',
    'Technology',
    'Research',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('NGO registration submitted successfully!')
      toast.info('Our team will review your application within 3-5 business days.')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.orgName || !formData.orgEmail || !formData.mission) {
        toast.error('Please fill in all required fields')
        return
      }
    }
    if (step === 2) {
      if (!formData.contactName || !formData.contactEmail || !formData.country) {
        toast.error('Please fill in all required fields')
        return
      }
    }
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const toggleFocusArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">NGO Transparency</span>
          </Link>
          <h1 className="text-3xl font-bold">Register Your NGO</h1>
          <p className="text-muted-foreground mt-2">
            Join our platform to access transparent donation management and impact tracking
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= stepNumber
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                }`}>
                  {step > stepNumber ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className="text-sm">
                  {stepNumber === 1 && 'Organization'}
                  {stepNumber === 2 && 'Contact'}
                  {stepNumber === 3 && 'Documents'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${(step - 1) * 50}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-2xl border shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Organization Details */}
            {step === 1 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Organization Details</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="orgName" className="block text-sm font-medium mb-2">
                        Organization Name *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="orgName"
                          placeholder="Your NGO Name"
                          className="pl-10"
                          value={formData.orgName}
                          onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="orgEmail" className="block text-sm font-medium mb-2">
                        Organization Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="orgEmail"
                          type="email"
                          placeholder="contact@yourngo.org"
                          className="pl-10"
                          value={formData.orgEmail}
                          onChange={(e) => setFormData({ ...formData, orgEmail: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium mb-2">
                        Website
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="website"
                          placeholder="https://yourngo.org"
                          className="pl-10"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="foundedYear" className="block text-sm font-medium mb-2">
                        Year Founded
                      </label>
                      <Input
                        id="foundedYear"
                        type="number"
                        placeholder="e.g., 2010"
                        min="1900"
                        max="2024"
                        value={formData.foundedYear}
                        onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mission" className="block text-sm font-medium mb-2">
                      Mission Statement *
                    </label>
                    <Textarea
                      id="mission"
                      placeholder="Describe your organization's mission and goals..."
                      className="min-h-30"
                      value={formData.mission}
                      onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full gap-2"
                  >
                    Continue to Contact Information
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {step === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium mb-2">
                        Contact Person Name *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="contactName"
                          placeholder="John Doe"
                          className="pl-10"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                        Contact Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="john@yourngo.org"
                          className="pl-10"
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium mb-2">
                        Contact Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="contactPhone"
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-2">
                        Country *
                      </label>
                      <Input
                        id="country"
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        City
                      </label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <Input
                        id="address"
                        placeholder="123 Charity Street"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 gap-2"
                  >
                    Continue to Documents
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Documents & Verification */}
            {step === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Documents & Verification</h2>
                
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="registrationNumber" className="block text-sm font-medium mb-2">
                        Registration Number *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="registrationNumber"
                          placeholder="e.g., 123456789"
                          className="pl-10"
                          value={formData.registrationNumber}
                          onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="taxId" className="block text-sm font-medium mb-2">
                        Tax ID / EIN
                      </label>
                      <Input
                        id="taxId"
                        placeholder="e.g., 12-3456789"
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="annualBudget" className="block text-sm font-medium mb-2">
                        Annual Budget (USD)
                      </label>
                      <Input
                        id="annualBudget"
                        type="number"
                        placeholder="e.g., 500000"
                        value={formData.annualBudget}
                        onChange={(e) => setFormData({ ...formData, annualBudget: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="staffCount" className="block text-sm font-medium mb-2">
                        Number of Staff
                      </label>
                      <Input
                        id="staffCount"
                        type="number"
                        placeholder="e.g., 25"
                        value={formData.staffCount}
                        onChange={(e) => setFormData({ ...formData, staffCount: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div>
                    <label className="block text-sm font-medium mb-4">
                      Focus Areas *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {focusAreasList.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleFocusArea(area)}
                          className={`p-3 border rounded-lg text-sm transition-all ${
                            formData.focusAreas.includes(area)
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                              : 'hover:border-gray-300'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h3 className="text-lg font-bold mb-4">Required Documents</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Please prepare these documents for verification. You can upload them after submission.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        {
                          title: 'Registration Certificate',
                          description: 'Legal registration document from government',
                          required: true,
                          key: 'registrationDoc',
                        },
                        {
                          title: 'Financial Statement',
                          description: 'Latest audited financial statement',
                          required: true,
                          key: 'financialStatement',
                        },
                        {
                          title: 'Board Resolution',
                          description: 'Authorization to register on platform',
                          required: true,
                          key: 'boardResolution',
                        },
                      ].map((doc) => (
                        <div key={doc.key} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{doc.title}</p>
                                {doc.required && (
                                  <span className="text-xs px-2 py-1 bg-red-100 text-red-600 dark:bg-red-900/30 rounded">
                                    Required
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{doc.description}</p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => toast.info('Upload will be available after initial submission')}
                          >
                            <Upload className="h-4 w-4" />
                            Upload
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Process Info */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h3 className="font-bold mb-3">Verification Process</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Initial review within 3-5 business days</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Document verification takes 7-10 days</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>You'll receive email updates throughout the process</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Benefits for NGOs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <Earth className="h-5 w-5" />,
              title: 'Global Reach',
              description: 'Access donors from around the world',
            },
            {
              icon: <Check className="h-5 w-5" />,
              title: 'Verified Badge',
              description: 'Build trust with our verification seal',
            },
            {
              icon: <Users className="h-5 w-5" />,
              title: 'Donor Management',
              description: 'Tools to engage and retain donors',
            },
          ].map((benefit, index) => (
            <div key={index} className="text-center p-4">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                {benefit.icon}
              </div>
              <h3 className="font-bold mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already registered?{' '}
          <Link href="/login" className="text-green-600 dark:text-green-400 font-semibold hover:underline">
            Sign in to your NGO account
          </Link>
        </p>
      </div>
    </div>
  )
}
// app/auth/register/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Eye, EyeOff, Chrome, Github, Check, ArrowRight } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { toast } from 'sonner'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Account, 2: Profile, 3: Preferences
  const [formData, setFormData] = useState({
    // Step 1: Account
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    
    // Step 2: Profile
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    
    // Step 3: Preferences
    userType: 'donor', // 'donor' or 'ngo'
    interests: [] as string[],
    notifications: true,
    newsletter: true,
  })

  const interestsList = [
    'Education',
    'Healthcare',
    'Environment',
    'Poverty Alleviation',
    'Animal Welfare',
    'Disaster Relief',
    'Human Rights',
    'Arts & Culture',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    // Validate password strength
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    
    // Validate terms acceptance
    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Create user via API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          location: formData.location,
          userType: formData.userType,
          interests: formData.interests,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      toast.success('Account created successfully!')
      
      // Sign in the user after successful registration
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (signInResult?.error) {
        // If sign in fails, redirect to login
        toast.error('Account created! Please sign in.')
        router.push('/login')
      } else {
        // If sign in succeeds, redirect to dashboard
        toast.success('Welcome!')
        router.push('/dashboard')
        router.refresh() // Refresh to update session
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        toast.error('Please fill in all required fields')
        return
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address')
        return
      }
      
      if (formData.password.length < 8) {
        toast.error('Password must be at least 8 characters')
        return
      }
    }
    
    if (step === 2) {
      if (!formData.firstName || !formData.lastName) {
        toast.error('Please fill in your name')
        return
      }
    }
    
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="h-6 w-6 rounded-lg bg-white/20"></div>
            </div>
            <span className="text-2xl font-bold">NGO Transparency</span>
          </Link>
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">
            Join our community of transparent givers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
                }`}>
                  {step > stepNumber ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className="text-sm">
                  {stepNumber === 1 && 'Account'}
                  {stepNumber === 2 && 'Profile'}
                  {stepNumber === 3 && 'Preferences'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(step - 1) * 50}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-2xl border shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Account */}
            {step === 1 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Account Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="h-4 w-4 mt-1"
                      disabled={isLoading}
                    />
                    <label htmlFor="acceptTerms" className="text-sm">
                      I agree to the{' '}
                      <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full gap-2"
                    disabled={isLoading}
                  >
                    Continue to Profile
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Profile */}
            {step === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="pl-10"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="pl-10"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <Input
                      id="location"
                      placeholder="New York, USA"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 gap-2"
                    disabled={isLoading}
                  >
                    Continue to Preferences
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Preferences</h2>
                
                <div className="space-y-6">
                  {/* User Type */}
                  <div>
                    <label className="block text-sm font-medium mb-4">
                      I am signing up as a:
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, userType: 'donor' })}
                        className={`p-6 border rounded-xl text-left transition-all ${
                          formData.userType === 'donor'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'hover:border-gray-300'
                        }`}
                        disabled={isLoading}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                            formData.userType === 'donor'
                              ? 'bg-blue-100 text-blue-600 dark:bg-blue-800'
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            <User className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-bold">Individual Donor</h3>
                            <p className="text-sm text-muted-foreground">
                              Support projects as an individual
                            </p>
                          </div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, userType: 'ngo' })}
                        className={`p-6 border rounded-xl text-left transition-all ${
                          formData.userType === 'ngo'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'hover:border-gray-300'
                        }`}
                        disabled={isLoading}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                            formData.userType === 'ngo'
                              ? 'bg-green-100 text-green-600 dark:bg-green-800'
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}>
                            <div className="h-6 w-6 flex items-center justify-center">
                              <div className="h-4 w-4 border-2 border-current rounded"></div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold">NGO Representative</h3>
                            <p className="text-sm text-muted-foreground">
                              Register your organization
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium mb-4">
                      What causes are you interested in?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {interestsList.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`p-3 border rounded-lg text-sm transition-all ${
                            formData.interests.includes(interest)
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              : 'hover:border-gray-300'
                          }`}
                          disabled={isLoading}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about projects you support
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications}
                          onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                          className="sr-only peer"
                          disabled={isLoading}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Newsletter</p>
                        <p className="text-sm text-muted-foreground">
                          Receive monthly impact reports and updates
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                          className="sr-only peer"
                          disabled={isLoading}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevStep}
                    className="flex-1"
                    disabled={isLoading}
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
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* OAuth Section (only on step 1) */}
          {step === 1 && (
            <>
              <div className="px-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => toast.info('Google sign up coming soon')}
                    disabled={isLoading}
                  >
                    <Chrome className="h-5 w-5" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => toast.info('GitHub sign up coming soon')}
                    disabled={isLoading}
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </Button>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Complete Transparency',
              description: 'Track every donation from start to finish',
            },
            {
              title: 'Verified NGOs',
              description: 'All organizations are thoroughly vetted',
            },
            {
              title: 'Tax Deductible',
              description: 'Receive receipts for tax purposes',
            },
          ].map((benefit, index) => (
            <div key={index} className="text-center p-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                <Check className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
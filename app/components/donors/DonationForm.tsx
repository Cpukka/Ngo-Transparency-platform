// components/donors/DonationForm.tsx
'use client'

import { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

interface DonationFormProps {
  projectId: string
  projectTitle: string
  projectImage?: string
  currentUser: any
}

export default function DonationForm({
  projectId,
  projectTitle,
  projectImage,
  currentUser
}: DonationFormProps) {
  const [amount, setAmount] = useState(50)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDonate = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement donation logic
      console.log('Donating:', { projectId, amount, isAnonymous, message })
      // Add your donation API call here
    } catch (error) {
      console.error('Donation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickAmounts = [25, 50, 100, 250, 500, 1000]

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Select Amount</label>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {quickAmounts.map((quickAmount) => (
            <button
              key={quickAmount}
              type="button"
              onClick={() => setAmount(quickAmount)}
              className={`p-2 rounded-lg border ${
                amount === quickAmount
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              ${quickAmount}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="pl-8"
            placeholder="Custom amount"
            min="1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Donate anonymously</span>
        </label>

        <div>
          <label className="text-sm font-medium mb-2 block">Optional message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Leave a message of support..."
            rows={3}
          />
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleDonate}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : `Donate $${amount}`}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Your donation is secure. You will receive a receipt via email.
      </p>
    </div>
  )
}
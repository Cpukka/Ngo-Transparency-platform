// components/donations/DonationList.tsx
interface Donation {
  id: string
  amount: number
  currency: string
  date: Date
  anonymous: boolean
  message?: string
  donor?: {
    name: string
    avatar?: string
  } | null
}

interface DonationListProps {
  donations: Donation[]
  showProjectInfo?: boolean
}

export default function DonationList({ donations, showProjectInfo = true }: DonationListProps) {
  if (donations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No donations yet. Be the first to support!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Recent Donations</h3>
      <div className="space-y-3">
        {donations.map((donation) => (
          <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                {donation.donor?.avatar ? (
                  <img 
                    src={donation.donor.avatar} 
                    alt={donation.donor.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {donation.anonymous ? '?' : donation.donor?.name?.charAt(0) || 'A'}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium">
                  {donation.anonymous ? 'Anonymous' : donation.donor?.name}
                </p>
                {donation.message && (
                  <p className="text-sm text-gray-600">{donation.message}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">${donation.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">
                {new Date(donation.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
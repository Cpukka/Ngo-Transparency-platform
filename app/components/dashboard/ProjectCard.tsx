import { Target, Users, Calendar, MapPin, Heart, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import Link from 'next/link'

interface ProjectCardProps {
  id?: string
  title: string
  organization: string
  description?: string
  progress: number
  raised: number
  target: number
  donors: number
  category: string
  location: string
  endDate?: string
  status?: 'active' | 'completed' | 'suspended'
  impact?: string
  showDonateButton?: boolean
  compact?: boolean
}

export default function ProjectCard({
  id = 'PROJ-001',
  title,
  organization,
  description = 'A meaningful project creating positive impact in the community.',
  progress,
  raised,
  target,
  donors,
  category,
  location,
  endDate = '2024-06-30',
  status = 'active',
  impact = 'Creating sustainable change',
  showDonateButton = true,
  compact = false,
}: ProjectCardProps) {
  const statusColors = {
    active: 'bg-green-500',
    completed: 'bg-blue-500',
    suspended: 'bg-yellow-500',
  }

  const statusLabels = {
    active: 'Active',
    completed: 'Completed',
    suspended: 'Suspended',
  }

  const getDaysRemaining = () => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = end.getTime() - now.getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${statusColors[status]}`} />
                <span className="text-xs text-muted-foreground">
                  {statusLabels[status]}
                </span>
              </div>
            </div>
            <CardTitle className="text-lg line-clamp-2 mb-1">
              {compact ? title.slice(0, 30) + (title.length > 30 ? '...' : '') : title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{organization}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {!compact && description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              <span>Progress</span>
            </div>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>${raised.toLocaleString()}</span>
            </div>
            <span>${target.toLocaleString()} goal</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 border rounded-lg">
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="font-bold">{donors.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Donors</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 border rounded-lg">
            <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="font-bold">{location}</div>
              <div className="text-xs text-muted-foreground">Location</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {!compact && (
          <>
            {/* Impact */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Impact</span>
              </div>
              <p className="text-sm text-muted-foreground">{impact}</p>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {getDaysRemaining()} days left
                </span>
              </div>
              <span className="text-muted-foreground">{endDate}</span>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {showDonateButton ? (
            <Link href={`/donate/${id}`} className="flex-1">
              <button className="w-full py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Donate Now
              </button>
            </Link>
          ) : (
            <Link href={`/projects/${id}`} className="flex-1">
              <button className="w-full py-2 border border-input rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                View Details
              </button>
            </Link>
          )}
          
          <button className="px-3 border border-input rounded-lg hover:bg-muted transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
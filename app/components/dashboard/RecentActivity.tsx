import { CheckCircle, Heart, TrendingUp, Users, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'

const activities = [
  {
    id: 1,
    type: 'donation',
    title: 'New donation received',
    description: 'John Doe donated $500 to Clean Water Initiative',
    time: '2 minutes ago',
    icon: Heart,
    color: 'text-red-500',
  },
  {
    id: 2,
    type: 'milestone',
    title: 'Project milestone reached',
    description: 'Education Project reached 50% funding',
    time: '1 hour ago',
    icon: CheckCircle,
    color: 'text-green-500',
  },
  {
    id: 3,
    type: 'impact',
    title: 'Impact update',
    description: '1000+ people gained access to clean water',
    time: '3 hours ago',
    icon: TrendingUp,
    color: 'text-blue-500',
  },
  {
    id: 4,
    type: 'new_donor',
    title: 'New donor registered',
    description: 'Sarah Johnson joined the platform',
    time: '5 hours ago',
    icon: Users,
    color: 'text-purple-500',
  },
  {
    id: 5,
    type: 'update',
    title: 'Project update published',
    description: 'Reforestation project published new photos',
    time: '1 day ago',
    icon: AlertCircle,
    color: 'text-yellow-500',
  },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`mt-0.5 ${activity.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
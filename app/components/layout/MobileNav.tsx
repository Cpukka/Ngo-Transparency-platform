'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  X, Home, Heart, Target, BarChart3, 
  FileText, User, Settings, LogOut,
  Globe
} from 'lucide-react'
import { Button } from '../ui/Button'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/projects', label: 'Projects', icon: Target },
    { href: '/donate', label: 'Donate', icon: Heart },
    { href: '/impact', label: 'Impact', icon: BarChart3 },
    { href: '/about', label: 'About', icon: Globe },
  ]

  const dashboardItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/donations', label: 'Donations', icon: Heart },
    { href: '/dashboard/projects', label: 'Projects', icon: Target },
    { href: '/dashboard/impact', label: 'Impact', icon: BarChart3 },
    { href: '/dashboard/reports', label: 'Reports', icon: FileText },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600"></div>
            <span className="text-xl font-bold">NGO Transparency</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {session && (
          <>
            <div className="mt-8 mb-4">
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Dashboard
              </h3>
            </div>
            <nav className="space-y-2">
              {dashboardItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </>
        )}

        <div className="mt-8 pt-6 border-t">
          {session ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{session.user?.name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{session.user?.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={() => signOut()}
              >
                <LogOut size={20} />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link href="/login" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={onClose}>
                <Button className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
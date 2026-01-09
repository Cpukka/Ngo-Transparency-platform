import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { AuthProvider } from './components/providers/AuthProvider'
import { ToastProvider } from './components/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NGO Transparency Platform - Donation Tracking & Impact',
  description: 'Transparent donation tracking and project impact visualization for NGOs',
  keywords: ['NGO', 'donation', 'transparency', 'impact', 'charity'],
  authors: [{ name: 'NGO Transparency Platform' }],
  openGraph: {
    type: 'website',
    title: 'NGO Transparency Platform',
    description: 'Track donations and project impact with complete transparency',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <ToastProvider />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
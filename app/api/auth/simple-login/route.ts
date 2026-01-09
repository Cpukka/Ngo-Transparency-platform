import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'your-secret-key'
)

// Helper function to set cookie
async function setAuthCookie(token: string) {
  try {
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
  } catch (error) {
    console.error('Error setting auth cookie:', error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Simple hardcoded test users
    const testUsers = [
      { 
        email: 'john@example.com', 
        password: 'password123', 
        name: 'John Doe', 
        role: 'DONOR',
        id: 'user-1'
      },
      { 
        email: 'ngo@example.com', 
        password: 'password123', 
        name: 'NGO Admin', 
        role: 'NGO_ADMIN',
        id: 'user-2'
      },
      { 
        email: 'admin@example.com', 
        password: 'password123', 
        name: 'System Admin', 
        role: 'SYSTEM_ADMIN',
        id: 'user-3'
      },
    ]
    
    const user = testUsers.find(u => u.email === email && u.password === password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Create JWT token
    const token = await new SignJWT({ 
      email: user.email,
      name: user.name,
      role: user.role,
      sub: user.id
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)
    
    // Set cookie using helper function
    await setAuthCookie(token)
    
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id,
        email: user.email, 
        name: user.name, 
        role: user.role 
      }
    })
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    )
  }
}

// Optional: Add logout endpoint
export async function DELETE() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('auth-token')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Logged out successfully' 
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}
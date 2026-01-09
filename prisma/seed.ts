// prisma/seed.ts
import { PrismaClient,Prisma } from '../app/generated/prisma/client'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 12)

  // Create test users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Doe',
        password: hashedPassword,
        role: 'DONOR',
      },
    }),
    prisma.user.upsert({
      where: { email: 'sarah@example.com' },
      update: {},
      create: {
        email: 'sarah@example.com',
        name: 'Sarah Johnson',
        password: hashedPassword,
        role: 'DONOR',
      },
    }),
    prisma.user.upsert({
      where: { email: 'ngo@waterforall.org' },
      update: {},
      create: {
        email: 'ngo@waterforall.org',
        name: 'Water for All NGO',
        password: hashedPassword,
        role: 'NGO_ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'admin@ngotransparency.org' },
      update: {},
      create: {
        email: 'admin@ngotransparency.org',
        name: 'System Administrator',
        password: hashedPassword,
        role: 'SYSTEM_ADMIN',
      },
    }),
  ])

  console.log('Seed users created:', users)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
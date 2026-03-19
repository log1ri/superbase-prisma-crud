import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  await prisma.product.createMany({
    data: [
      {
        name: 'Wireless Headphones',
        detail: 'Noise-cancelling over-ear headphones with 30hr battery life',
        price: 299.99,
      },
      {
        name: 'Mechanical Keyboard',
        detail: 'RGB backlit mechanical keyboard with brown switches',
        price: 149.50,
      },
      {
        name: 'USB-C Hub',
        detail: '7-in-1 multiport adapter with HDMI, USB 3.0, and SD card reader',
        price: 49.99,
      },
      {
        name: 'Laptop Stand',
        detail: 'Aluminum adjustable laptop stand for better ergonomics',
        price: 79.00,
      },
      {
        name: 'Wireless Mouse',
        detail: 'Ergonomic wireless mouse with precision tracking',
        price: 35.99,
      },
    ],
    skipDuplicates: true,
  })

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
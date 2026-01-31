import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Clear existing products to avoid duplicates/conflicts during development
  await prisma.productImage.deleteMany({})
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.product.deleteMany({})

  const products = [
    {
      name: "BIG STEPPERS CLUB TEE WHITE",
      slug: "big-steppers-club-tee-white",
      description: "Classic fit white tee with BSC branding. Premium quality cotton, oversized fit.",
      price: 3500,
      image: "/products/BIG STEPPERS CLUB T-SHIRT WHITE.png",
      category: "TEES",
      stock: 20
    },
    {
      name: "BSC JERSEY BLACK",
      slug: "bsc-jersey-black",
      description: "Premium black jersey with athletic fit. Breathable fabric, perfect for sports or lifestyle.",
      price: 4500,
      image: "/products/BSC JERSEY BLACK.png",
      category: "TEES",
      stock: 15
    },
    {
      name: "BSC TEE BLACK",
      slug: "bsc-tee-black",
      description: "Essential black tee for everyday wear. Heavyweight cotton (240g), minimalist logo.",
      price: 3500,
      image: "/products/BSC T-SHIRT BLACK.png",
      category: "TEES",
      stock: 25
    },
    {
      name: "BSC TEE WHITE",
      slug: "bsc-tee-white",
      description: "Clean white tee with subtle logo. Heavyweight cotton, perfect boxy fit.",
      price: 3500,
      image: "/products/BSC T-SHIRT WHITE.png",
      category: "TEES",
      stock: 25
    },
    {
      name: "TSC TEE WHITE",
      slug: "tsc-tee-white",
      description: "TSC edition white tee. Limited release special collaboration design.",
      price: 3500,
      image: "/products/TSC T-SHIRT WHITE.png",
      category: "TEES",
      stock: 10
    },
    {
      name: "BASIC TEE BLACK",
      slug: "basic-tee-black",
      description: "Minimalist black tee, high quality cotton. Essential base layer for any outfit.",
      price: 2990,
      image: "/products/basic t-shirt black.png",
      category: "TEES",
      stock: 50
    },
    {
      name: "BASIC TEE WHITE",
      slug: "basic-tee-white",
      description: "Minimalist white tee, high quality cotton. Pure white, durable construction.",
      price: 2990,
      image: "/products/basic t-shirt white.png",
      category: "TEES",
      stock: 50
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        images: {
          create: [
            { url: product.image },
            // Adding more images if they existed, or just using main one for now
            // You can add more URLs here if you have more photos for these items
          ]
        }
      },
    })
  }

  console.log('Seed executed successfully with real products')
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

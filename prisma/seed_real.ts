import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "BIG STEPPERS CLUB TEE WHITE",
    slug: "big-steppers-club-tee-white",
    description: "Classic fit white tee with BSC branding.",
    price: 3500,
    image: "/products/BIG STEPPERS CLUB T-SHIRT WHITE.png",
    category: "TEES",
    stock: 20
  },
  {
    name: "BSC JERSEY BLACK",
    slug: "bsc-jersey-black",
    description: "Premium black jersey with athletic fit.",
    price: 4500,
    image: "/products/BSC JERSEY BLACK.png",
    category: "TEES",
    stock: 15
  },
  {
    name: "BSC TEE BLACK",
    slug: "bsc-tee-black",
    description: "Essential black tee for everyday wear.",
    price: 3500,
    image: "/products/BSC T-SHIRT BLACK.png",
    category: "TEES",
    stock: 25
  },
  {
    name: "BSC TEE WHITE",
    slug: "bsc-tee-white",
    description: "Clean white tee with subtle logo.",
    price: 3500,
    image: "/products/BSC T-SHIRT WHITE.png",
    category: "TEES",
    stock: 25
  },
  {
    name: "TSC TEE WHITE",
    slug: "tsc-tee-white",
    description: "TSC edition white tee.",
    price: 3500,
    image: "/products/TSC T-SHIRT WHITE.png",
    category: "TEES",
    stock: 10
  },
  {
    name: "BASIC TEE BLACK",
    slug: "basic-tee-black",
    description: "Minimalist black tee, high quality cotton.",
    price: 2990,
    image: "/products/basic t-shirt black.png",
    category: "TEES",
    stock: 50
  },
  {
    name: "BASIC TEE WHITE",
    slug: "basic-tee-white",
    description: "Minimalist white tee, high quality cotton.",
    price: 2990,
    image: "/products/basic t-shirt white.png",
    category: "TEES",
    stock: 50
  }
];

async function main() {
  console.log("Start seeding...");

  // Delete existing products
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});
  
  console.log("Deleted old products.");

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

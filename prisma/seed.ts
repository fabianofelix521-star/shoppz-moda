import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@dropstore.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create demo user
  const userPassword = await hash("user123", 12);
  const user = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane@example.com",
      password: userPassword,
      role: "USER",
    },
  });

  // Categories
  const women = await prisma.category.create({
    data: {
      name: "Women",
      slug: "women",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=800&fit=crop",
      description: "Women's fashion collection",
    },
  });

  const men = await prisma.category.create({
    data: {
      name: "Men",
      slug: "men",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      description: "Men's fashion collection",
    },
  });

  const bags = await prisma.category.create({
    data: {
      name: "Bags",
      slug: "bags",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
      description: "Premium bags and accessories",
    },
  });

  const shoes = await prisma.category.create({
    data: {
      name: "Shoes",
      slug: "shoes",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop",
      description: "Footwear collection",
    },
  });

  const tops = await prisma.category.create({
    data: {
      name: "Tops",
      slug: "tops",
      image:
        "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=800&fit=crop",
      description: "Shirts, blouses and tops",
    },
  });

  const dresses = await prisma.category.create({
    data: {
      name: "Dresses",
      slug: "dresses",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
      description: "Dresses for every occasion",
    },
  });

  // Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Leather Monogram Tote Bag",
        slug: "leather-monogram-tote-bag",
        brand: "Maison Luxe",
        description:
          "Elegant leather tote bag with monogram print. Spacious interior with multiple compartments. Premium hardware in gold tone. Perfect for daily use or special occasions.",
        price: 175.0,
        compareAt: 220.0,
        rating: 4.8,
        reviewCount: 124,
        sizes: ["ONE SIZE"],
        featured: true,
        categoryId: bags.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop",
              alt: "Tote bag front",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=800&fit=crop",
              alt: "Tote bag side",
              position: 1,
            },
            {
              url: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=800&fit=crop",
              alt: "Tote bag detail",
              position: 2,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Floral Print Wrap Dress",
        slug: "floral-print-wrap-dress",
        brand: "Atelier Mode",
        description:
          "Flowy wrap dress with delicate floral print. V-neck design with adjustable tie waist. Lightweight fabric perfect for spring and summer.",
        price: 430.7,
        rating: 4.7,
        reviewCount: 89,
        sizes: ["XS", "S", "M", "L", "XL"],
        featured: true,
        categoryId: dresses.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
              alt: "Wrap dress front",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
              alt: "Wrap dress back",
              position: 1,
            },
            {
              url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
              alt: "Wrap dress detail",
              position: 2,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Tailored Slim Fit Trousers",
        slug: "tailored-slim-fit-trousers",
        brand: "Voss & Co",
        description:
          "Classic tailored trousers in slim fit. High-quality stretch wool blend for comfort and style. Perfect for business or smart casual looks.",
        price: 259.9,
        rating: 4.5,
        reviewCount: 67,
        sizes: ["XS", "S", "M", "L", "XL"],
        featured: true,
        categoryId: men.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
              alt: "Trousers front",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&h=800&fit=crop",
              alt: "Trousers side",
              position: 1,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Oversized Wool Blend Jacket",
        slug: "oversized-wool-blend-jacket",
        brand: "Maison Luxe",
        description:
          "Luxurious oversized jacket in wool blend. Single-breasted design with wide lapels. Soft satin lining. A statement piece for the modern wardrobe.",
        price: 239.8,
        rating: 4.9,
        reviewCount: 156,
        sizes: ["XS", "S", "M", "L", "XL"],
        featured: true,
        categoryId: women.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
              alt: "Jacket front",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop",
              alt: "Jacket back",
              position: 1,
            },
            {
              url: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&h=800&fit=crop",
              alt: "Jacket detail",
              position: 2,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Tie Dye Print Satin Shirt",
        slug: "tie-dye-print-satin-shirt",
        brand: "Atelier Mode",
        description:
          "Flowy shirt with lapel collar with V-neck and long sleeves. Front button closure. Satin effect fabric with vibrant tie-dye print pattern. Relaxed fit for effortless style.",
        price: 175.0,
        rating: 4.9,
        reviewCount: 203,
        sizes: ["XS", "S", "M", "L", "XL"],
        featured: true,
        categoryId: tops.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop",
              alt: "Satin shirt front",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&h=800&fit=crop",
              alt: "Satin shirt model",
              position: 1,
            },
            {
              url: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=800&fit=crop",
              alt: "Satin shirt detail",
              position: 2,
            },
            {
              url: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&h=800&fit=crop",
              alt: "Satin shirt styled",
              position: 3,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Rainbow Stripe Knit Sweater",
        slug: "rainbow-stripe-knit-sweater",
        brand: "Chromatic",
        description:
          "Colorful striped knit sweater with relaxed fit. Soft cotton blend. Crew neck with ribbed trim. A cheerful addition to any wardrobe.",
        price: 189.0,
        rating: 4.6,
        reviewCount: 78,
        sizes: ["XS", "S", "M", "L"],
        featured: false,
        categoryId: tops.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop",
              alt: "Knit sweater front",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a16?w=600&h=800&fit=crop",
              alt: "Knit sweater detail",
              position: 1,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Classic Leather Oxford Shoes",
        slug: "classic-leather-oxford-shoes",
        brand: "Voss & Co",
        description:
          "Timeless Oxford shoes in premium leather. Blake stitched for durability. Leather sole with rubber heel. Perfect for formal occasions.",
        price: 345.0,
        compareAt: 420.0,
        rating: 4.8,
        reviewCount: 201,
        sizes: ["39", "40", "41", "42", "43", "44"],
        featured: false,
        categoryId: shoes.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
              alt: "Oxford shoes",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&h=800&fit=crop",
              alt: "Oxford shoes side",
              position: 1,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Silk Midi Skirt",
        slug: "silk-midi-skirt",
        brand: "Atelier Mode",
        description:
          "Elegant midi skirt in flowing silk. High waist with invisible zip closure. Beautiful drape and movement. Versatile piece for day or evening.",
        price: 299.0,
        rating: 4.7,
        reviewCount: 92,
        sizes: ["XS", "S", "M", "L", "XL"],
        featured: false,
        categoryId: women.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&h=800&fit=crop",
              alt: "Silk skirt",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600&h=800&fit=crop",
              alt: "Silk skirt detail",
              position: 1,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Structured Canvas Crossbody",
        slug: "structured-canvas-crossbody",
        brand: "Maison Luxe",
        description:
          "Structured crossbody bag in premium canvas with leather trim. Adjustable shoulder strap. Multiple interior pockets for organization. Gold-tone hardware.",
        price: 195.0,
        rating: 4.4,
        reviewCount: 56,
        sizes: ["ONE SIZE"],
        featured: false,
        categoryId: bags.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
              alt: "Crossbody bag",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=800&fit=crop",
              alt: "Crossbody bag detail",
              position: 1,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Linen Blend Summer Blazer",
        slug: "linen-blend-summer-blazer",
        brand: "Voss & Co",
        description:
          "Lightweight summer blazer in linen blend. Single-breasted with two buttons. Patch pockets. Unlined for breathability. Perfect for warm weather.",
        price: 320.0,
        rating: 4.6,
        reviewCount: 44,
        sizes: ["S", "M", "L", "XL"],
        featured: false,
        categoryId: men.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=800&fit=crop",
              alt: "Summer blazer",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop",
              alt: "Summer blazer detail",
              position: 1,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Platform Leather Sneakers",
        slug: "platform-leather-sneakers",
        brand: "Chromatic",
        description:
          "Modern platform sneakers in white leather. Chunky sole with excellent cushioning. Clean minimalist design. Comfortable for all-day wear.",
        price: 215.0,
        rating: 4.5,
        reviewCount: 134,
        sizes: ["36", "37", "38", "39", "40", "41"],
        featured: false,
        categoryId: shoes.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=800&fit=crop",
              alt: "Platform sneakers",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=800&fit=crop",
              alt: "Platform sneakers side",
              position: 1,
            },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        name: "Cashmere Crew Neck Sweater",
        slug: "cashmere-crew-neck-sweater",
        brand: "Maison Luxe",
        description:
          "Luxurious pure cashmere sweater. Soft and lightweight with fine knit. Classic crew neck design. Available in versatile neutral tones.",
        price: 485.0,
        rating: 4.9,
        reviewCount: 267,
        sizes: ["XS", "S", "M", "L", "XL"],
        featured: true,
        categoryId: women.id,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=800&fit=crop",
              alt: "Cashmere sweater",
              position: 0,
            },
            {
              url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop",
              alt: "Cashmere sweater detail",
              position: 1,
            },
          ],
        },
      },
    }),
  ]);

  // Banners
  await prisma.banner.createMany({
    data: [
      {
        title: "80% OFF",
        subtitle: "Discover fashion that suits your style",
        cta: "Shop Now",
        link: "/products",
        bgColor: "#E84545",
        active: true,
        position: 0,
      },
      {
        title: "New Arrivals",
        subtitle: "Spring/Summer 2026 Collection",
        cta: "Explore",
        link: "/products?sort=newest",
        bgColor: "#1a1a1a",
        active: true,
        position: 1,
      },
    ],
  });

  // Create user address
  await prisma.address.create({
    data: {
      userId: user.id,
      name: "Jane Doe",
      street: "123 Fashion Ave",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "US",
      isDefault: true,
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log(`   Admin: admin@dropstore.com / admin123`);
  console.log(`   User: jane@example.com / user123`);
  console.log(`   Categories: ${6}`);
  console.log(`   Products: ${products.length}`);
  console.log(`   Banners: 2`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

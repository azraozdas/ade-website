import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
  {
    id: 'ade-hydra-skin-tint',
    name: 'Hydra Skin Tint SPF15',
    category: 'FACE' as const,
    priceCents: 4700,
    image: 'assets/images/product-foundation.jpg',
    short: 'Lightweight, breathable skin tint that evens complexion with a natural glow.',
    shades: ['#E7C4A8', '#D9AE8C', '#C99576', '#B77961'],
  },
  {
    id: 'ade-velvet-compact',
    name: 'Velvet Compact Powder',
    category: 'FACE' as const,
    priceCents: 3500,
    image: 'assets/images/product-powder.jpg',
    short: 'Smooth, silky pressed powder that blurs pores and evens tone.',
    shades: ['#EBD3B9', '#DDBA98', '#CFA17C'],
  },
  {
    id: 'ade-satin-rose',
    name: 'Satin Rose Lipstick',
    category: 'LIPS' as const,
    priceCents: 3000,
    image: 'assets/images/product-lipstick.jpg',
    short: 'Rich, creamy color with a satin finish for everyday elegance.',
    shades: ['#ff99d8', '#ff66c4', '#ff1fa9', '#cc007e'],
  },
  {
    id: 'ade-soft-matte-blush',
    name: 'ADE Soft Matte Blush',
    category: 'FACE' as const,
    priceCents: 3200,
    image: 'assets/images/product-blush.jpg',
    short: 'Pure-blending blush with seamless texture and a cloud-like payoff.',
    shades: ['#F6A8A3', '#EF8E86', '#E17474'],
  },
  {
    id: 'ade-eye-definition-duo',
    name: 'ADE Eye Definition Duo',
    category: 'EYES' as const,
    priceCents: 3900,
    image: 'assets/images/product-eyes.jpg',
    short: 'Precision liquid liner paired with volumizing mascara for defined eyes.',
    shades: [],
  },
  {
    id: 'ade-rose-gold-eyeshadow',
    name: 'ADE Eyeshadow Palette',
    category: 'EYES' as const,
    priceCents: 4200,
    image: 'assets/images/product-eyeshadow.jpg',
    short: '12-pan palette of velvety mattes and foiled metallics in rose-tone hues.',
    shades: ['#F2C7C2', '#D78F86', '#B86C63'],
  },
  {
    id: 'ade-glow-highlighter',
    name: 'ADE Glow Highlighter',
    category: 'FACE' as const,
    priceCents: 3300,
    image: 'assets/images/product-highlighter.jpg',
    short: 'Creamy highlighter that melts into skin with glass-like sheen.',
    shades: ['#FFE3C5', '#F9CFA4', '#F3B784'],
  },
  {
    id: 'ade-lengthening-mascara',
    name: 'ADE Lengthening Mascara',
    category: 'EYES' as const,
    priceCents: 3400,
    image: 'assets/images/product-mascara.jpg',
    short: 'Fiber-rich mascara that lifts, lengthens, and defines each lash.',
    shades: [],
  },
  {
    id: 'ade-precision-lip-liner',
    name: 'ADE Precision Lip Liner',
    category: 'LIPS' as const,
    priceCents: 2600,
    image: 'assets/images/product-lipliner.jpg',
    short: 'Shape, define, and perfect your lips with effortless elegance.',
    shades: ['#D8938E', '#C06E6A', '#A15452'],
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing order items first (due to foreign key constraints)
  await prisma.orderItem.deleteMany({});
  console.log('✨ Cleared existing order items');

  // Clear existing products
  await prisma.product.deleteMany({});
  console.log('✨ Cleared existing products');

  // Insert products
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
    console.log(`✓ Created product: ${product.name}`);
  }

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


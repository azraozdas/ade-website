"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const products = [
    {
        id: 'ade-hydra-skin-tint',
        name: 'Hydra Skin Tint SPF15',
        category: 'FACE',
        priceCents: 4700,
        image: 'assets/images/product-foundation.jpg',
        short: 'Lightweight, glow-enhancing base with buildable coverage.',
        shades: ['#E7C4A8', '#D9AE8C', '#C99576', '#B77961'],
    },
    {
        id: 'ade-velvet-compact',
        name: 'Velvet Compact Powder',
        category: 'FACE',
        priceCents: 3500,
        image: 'assets/images/product-face.jpg',
        short: 'Smooth, silky powder that blurs pores and evens tone.',
        shades: ['#EBD3B9', '#DDBA98', '#CFA17C', '#B98862'],
    },
    {
        id: 'ade-satin-rose',
        name: 'Satin Rose Lipstick',
        category: 'LIPS',
        priceCents: 3000,
        image: 'assets/images/product-lips.jpg',
        short: 'Rich, creamy color with a satin shine.',
        shades: ['#F2A6BD', '#EB7FA2', '#D25D85', '#B9466E'],
    },
];
async function main() {
    console.log('🌱 Seeding database...');
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
//# sourceMappingURL=seed.js.map
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting rich seed...');

  // Remove existing demo data (optional, safe for dev)
  await prisma.review.deleteMany();
  await prisma.business.deleteMany();

  const businesses = [
    {
      name: 'Brew & Bean Café',
      googleBusinessId: 'brewbean-001',
      averageRating: 4.6,
      totalReviews: 4,
      reviews: [
        { author: 'Alice M.', rating: 5, comment: 'Cozy vibes and amazing cappuccino ☕️', date: new Date('2024-10-02') },
        { author: 'John D.', rating: 4, comment: 'Great ambience but Wi-Fi was a bit slow.', date: new Date('2024-10-05') },
        { author: 'Priya S.', rating: 5, comment: 'Staff are super friendly! Best mocha in town.', date: new Date('2024-10-08') },
        { author: 'Marco T.', rating: 4, comment: 'Solid place for remote work.', date: new Date('2024-11-01') },
      ],
    },
    {
      name: 'Glow Salon',
      googleBusinessId: 'glowsalon-002',
      averageRating: 4.2,
      totalReviews: 3,
      reviews: [
        { author: 'Rina K.', rating: 5, comment: 'Amazing haircut and friendly staff.', date: new Date('2024-09-12') },
        { author: 'Sam P.', rating: 4, comment: 'Good service; took a bit longer than expected.', date: new Date('2024-09-20') },
        { author: 'Anu V.', rating: 3, comment: 'Nice stylist but appointment mix-up.', date: new Date('2024-10-10') },
      ],
    },
    {
      name: 'ParcelPro Courier',
      googleBusinessId: 'parcelpro-003',
      averageRating: 4.0,
      totalReviews: 4,
      reviews: [
        { author: 'Dev B.', rating: 4, comment: 'Fast delivery, clear tracking.', date: new Date('2024-08-22') },
        { author: 'Lata S.', rating: 4, comment: 'Reasonable rates, reliable.', date: new Date('2024-08-30') },
        { author: 'Omar N.', rating: 3, comment: 'Package arrived slightly late.', date: new Date('2024-09-02') },
        { author: 'Pri', rating: 5, comment: 'Excellent service for fragile items!', date: new Date('2024-10-25') },
      ],
    },
    {
      name: 'PixelWorks Studio',
      googleBusinessId: 'pixelworks-004',
      averageRating: 4.8,
      totalReviews: 5,
      reviews: [
        { author: 'Hannah L.', rating: 5, comment: 'Creative team and quick turnaround.', date: new Date('2024-07-15') },
        { author: 'Rajat M.', rating: 5, comment: 'Delivered beyond expectations.', date: new Date('2024-07-20') },
        { author: 'Simone', rating: 5, comment: 'Great UX work.', date: new Date('2024-08-05') },
        { author: 'Kiran', rating: 4, comment: 'Very good but a few revisions required.', date: new Date('2024-09-01') },
        { author: 'Lucy', rating: 5, comment: 'Highly recommend for branding projects.', date: new Date('2024-10-17') },
      ],
    },
    {
      name: 'Green Spoon Deli',
      googleBusinessId: 'greenspoon-005',
      averageRating: 4.3,
      totalReviews: 3,
      reviews: [
        { author: 'Ankit', rating: 4, comment: 'Tasty sandwiches and quick service.', date: new Date('2024-11-02') },
        { author: 'Meera', rating: 5, comment: 'Fresh salads, perfect lunch spot.', date: new Date('2024-10-28') },
        { author: 'Zara', rating: 4, comment: 'Good value for money.', date: new Date('2024-09-18') },
      ],
    },
  ];

  for (const b of businesses) {
    const created = await prisma.business.create({
      data: {
        name: b.name,
        googleBusinessId: b.googleBusinessId,
        averageRating: b.averageRating,
        totalReviews: b.totalReviews,
        reviews: {
          create: b.reviews.map((r) => ({
            author: r.author,
            rating: r.rating,
            comment: r.comment,
            date: r.date,
          })),
        },
      },
      include: { reviews: true },
    });

    console.log(`✅ Created business: ${created.name} (${created.reviews.length} reviews)`);
  }

  console.log('🎉 Rich seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

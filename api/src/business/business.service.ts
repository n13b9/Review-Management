import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    const business = await this.prisma.business.findFirst({
      include: { reviews: true },
    });

    if (!business) return { message: 'No business found' };

    const totalReviews = business.reviews.length;
    const averageRating = totalReviews
      ? business.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;

    return {
      name: business.name,
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
      latestReviews: business.reviews
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5),
    };
  }

  async getAllBusinesses() {
    const businesses = await this.prisma.business.findMany({
      include: { reviews: true },
      orderBy: { createdAt: 'desc' },
    });
  
    // Shape the response for the admin table
    return businesses.map((b) => ({
      id: b.id,
      name: b.name,
      googleBusinessId: b.googleBusinessId,
      totalReviews: b.reviews.length,
      averageRating:
        b.reviews.length > 0
          ? Number(
              (b.reviews.reduce((sum, r) => sum + r.rating, 0) /
                b.reviews.length).toFixed(1)
            )
          : 0,
      createdAt: b.createdAt,
    }));
  }
}


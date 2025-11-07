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
}

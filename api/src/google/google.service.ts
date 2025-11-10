import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoogleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async getReviews(placeId: string, businessId: string) {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    const url = 'https://maps.googleapis.com/maps/api/place/details/json';

    try {
      const response$ = this.httpService.get(url, {
        params: {
          place_id: placeId,
          fields: 'name,rating,user_ratings_total,reviews',
          key: apiKey,
        },
      });

      const response = await lastValueFrom(response$);
      const result = response.data?.result;

      if (!result?.reviews) {
        return { message: 'No reviews found for this place ID' };
      }

      const normalized = result.reviews.map((r: any) => ({
        businessId,
        author: r.author_name,
        rating: r.rating,
        comment: r.text,
        date: new Date(r.time * 1000),
      }));

      // ✅ Save to DB while skipping duplicates
      for (const review of normalized) {
        const exists = await this.prisma.review.findFirst({
          where: {
            businessId: review.businessId,
            author: review.author,
            comment: review.comment,
          },
        });

        if (!exists) {
          await this.prisma.review.create({ data: review });
        }
      }

      return normalized;
    } catch (error) {
      console.error('Error fetching Google reviews:', error.message);
      throw new Error('Failed to fetch and save Google reviews');
    }
  }
}

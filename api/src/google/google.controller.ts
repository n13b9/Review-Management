import { Controller, Get, Query } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {
    console.log('[GoogleController] Loaded ✅');
  }

  @Get('reviews')
  async getGoogleReviews(
    @Query('placeId') placeId: string,
    @Query('businessId') businessId: string,
  ) {
    if (!placeId || !businessId) {
      return { error: 'Both placeId and businessId are required' };
    }

    return this.googleService.getReviews(placeId, businessId);
  }

  @Get('ping')
ping() {
  return { message: 'Google route working ✅' };
}
}

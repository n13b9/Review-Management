import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getAll() {
    return this.reviewsService.getAll();
  }

  @Post(':id/reply')
  addReply(@Param('id') id: string, @Body('reply') reply: string) {
    return this.reviewsService.addReply(id, reply);
  }
}

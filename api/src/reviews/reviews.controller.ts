import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getAll() {
    return this.reviewsService.getAll();
  }

  @Post(':id/reply')
  async addReply(@Param('id') id: string, @Body('replyText') replyText: string) {
    return this.reviewsService.addReply(id, replyText);
  }
}

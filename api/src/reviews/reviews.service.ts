import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.review.findMany({
      orderBy: { date: 'desc' },
    });
  }

  async addReply(id: string, reply: string) {
    return this.prisma.review.update({
      where: { id },
      data: { replyText: reply },
    });
  }
}

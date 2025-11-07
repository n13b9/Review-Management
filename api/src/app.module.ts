import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './business/business.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [BusinessModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

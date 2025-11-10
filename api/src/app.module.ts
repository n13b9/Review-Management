import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BusinessModule } from './business/business.module';
import { ReviewsModule } from './reviews/reviews.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BusinessModule,
    ReviewsModule,
    GoogleModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

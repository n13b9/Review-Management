import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GoogleService],
  controllers: [GoogleController],
})
export class GoogleModule {}

import { Controller, Get } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get('overview')
  getOverview() {
    return this.businessService.getOverview();
  }

  @Get('all')
  async getAllBusinesses() {
    return this.businessService.getAllBusinesses();
  }
}

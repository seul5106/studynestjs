import { Controller, Get } from '@nestjs/common';
import { ExMongooseService } from './exmongoose.service';

@Controller('mongoose')
export class ExMongooseController {
  constructor(private mongooseService: ExMongooseService) {}

  @Get()
  async exMongoose(): Promise<any> {
    return this.mongooseService.getBios();
  }
}

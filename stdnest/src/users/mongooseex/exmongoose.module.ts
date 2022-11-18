import { Module } from '@nestjs/common';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Bios, BiosFactory } from './exmongoose.schema';

import { LoggingModule } from '../logging.module';
import { ExMongooseService } from './exmongoose.service';
import { ExMongooseController } from './exmongoose.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Bios.name,
        useFactory: BiosFactory,
        inject: [getConnectionToken()],
      },
    ]),
    LoggingModule,
  ],
  controllers: [ExMongooseController],
  providers: [ExMongooseService],
})
export class ExMongooseModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from '../email/email.module';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Users, UsersFactory } from '../users/users.schema';
import { AuthModule } from '../auth/auth.module';
import { LoggingModule } from './logging.module';
import { BatchModule } from './scheduler/batch.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Users.name,
        useFactory: UsersFactory,
        inject: [getConnectionToken()],
      },
    ]),
    LoggingModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

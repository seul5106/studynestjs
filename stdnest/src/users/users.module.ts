import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EmailModule } from 'src/email/email.module';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { Users, UsersFactory } from '../users/users.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    EmailModule,
    AuthModule,
    MongooseModule.forFeatureAsync([
      {
        name: Users.name,
        useFactory: UsersFactory,
        inject: [getConnectionToken()],
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ApiController } from './api-controller/api-controller.controller';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [ApiController],
  providers: [],
  imports: [UserModule, UsersModule],
})
export class AppModule {}

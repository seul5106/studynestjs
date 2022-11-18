import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [BatchController],
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService],
})
export class BatchModule {}

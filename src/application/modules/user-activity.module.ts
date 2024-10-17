import { Module } from '@nestjs/common';
import { UserActivityService } from '../services/user-activity.service';
import { UserActivityRepository } from 'src/infrastructure/persistences/user-activity.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    UserActivityService,
    PrismaService,
    {
      provide: 'IUserActivityRepository',
      useClass: UserActivityRepository,
    },
  ],
  exports: [UserActivityService],
})
export class UserActivityModule {}


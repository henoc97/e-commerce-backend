import { Module } from '@nestjs/common';
import { UserActivityService } from '../services/user-activity.service';
import { UserActivityRepository } from 'src/infrastructure/persistences/user-activity.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { ListActivitiesByUser } from '../use-cases/user-activity.use-cases/list-activities-by-user.use-case';
import { CountActivitiesByUser } from '../use-cases/user-activity.use-cases/count-activities-by-user.use-case';
import { ListActivitiesByProduct } from '../use-cases/user-activity.use-cases/list-activities-by-product.use-case';
import { UpdateActivity } from '../use-cases/user-activity.use-cases/update-activity.use-case';
import { GetRecentActivitiesByUser } from '../use-cases/user-activity.use-cases/get-recent-activities-by-user.use-case';
import { RecordActivity } from '../use-cases/user-activity.use-cases/record-activity.use-case';
import { DeleteActivity } from '../use-cases/user-activity.use-cases/delete-activity.use-case';
import { FetchActivityById } from '../use-cases/user-activity.use-cases/fetch-activity-by-id.use-case';
import { ValidateActivity } from '../use-cases/user-activity.use-cases/validate-activity.use-case';
import { ListActivitiesByDateRange } from '../use-cases/user-activity.use-cases/list-activities-by-date-range.use-case';
import { KafkaModule } from 'src/infrastructure/external-servicies/kafka/kafka.module';

const userActivityUseCases = [
  ListActivitiesByUser,
  CountActivitiesByUser,
  ListActivitiesByProduct,
  UpdateActivity,
  GetRecentActivitiesByUser,
  RecordActivity,
  DeleteActivity,
  FetchActivityById,
  ValidateActivity,
  ListActivitiesByDateRange,
];

@Module({
  imports: [KafkaModule],
  providers: [
    UserActivityService,
    PrismaService,
    {
      provide: 'IUserActivityRepository',
      useClass: UserActivityRepository,
    },
    ...userActivityUseCases,
  ],
  exports: [UserActivityService, ...userActivityUseCases],
})
export class UserActivityModule { }

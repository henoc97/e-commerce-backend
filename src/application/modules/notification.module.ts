import { Module } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { NotificationRepository } from 'src/infrastructure/persistences/notification.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    NotificationService,
    PrismaService,
    {
      provide: 'INotificationRepository',
      useClass: NotificationRepository,
    },
  ],
  exports: [NotificationService],
})
export class NotificationModule {}


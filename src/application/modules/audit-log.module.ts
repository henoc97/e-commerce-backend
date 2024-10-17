import { Module } from '@nestjs/common';
import { AuditLogService } from '../services/audit-log.service';
import { AuditLogRepository } from 'src/infrastructure/persistences/audit-log.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    AuditLogService,
    PrismaService,
    {
      provide: 'IAuditLogRepository',
      useClass: AuditLogRepository,
    },
  ],
  exports: [AuditLogService],
})
export class AuditLogModule {}


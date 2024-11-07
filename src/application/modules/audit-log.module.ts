import { Module } from '@nestjs/common';
import { AuditLogService } from '../services/audit-log.service';
import { AuditLogRepository } from 'src/infrastructure/persistences/audit-log.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { CreateLog } from '../use-cases/audit-log.use-cases/create-log.use-case';
import { FetchLogsByUser } from '../use-cases/audit-log.use-cases/fetch-logs-by-user.use-case';
import { UpdateLog } from '../use-cases/audit-log.use-cases/update-log.use-case';
import { DeleteLog } from '../use-cases/audit-log.use-cases/delete-log.use-case';
import { FetchLogsByEntity } from '../use-cases/audit-log.use-cases/fetch-logs-by-entity.use-case';
import { FetchLogById } from '../use-cases/audit-log.use-cases/fetch-log-by-id.use-case';
import { FetchRecentLogs } from '../use-cases/audit-log.use-cases/fetch-recent-logs.use-case';
import { FetchLogsByAction } from '../use-cases/audit-log.use-cases/fetch-logs-by-action.use-case';
import { FetchLogsByDateRange } from '../use-cases/audit-log.use-cases/fetch-logs-by-date-range.use-case';

const auditLogUseCases = [
  CreateLog,
  FetchLogsByUser,
  UpdateLog,
  DeleteLog,
  FetchLogsByEntity,
  FetchLogById,
  FetchRecentLogs,
  FetchLogsByAction,
  FetchLogsByDateRange,
];

@Module({
  providers: [
    AuditLogService,
    PrismaService,
    {
      provide: 'IAuditLogRepository',
      useClass: AuditLogRepository,
    },
    ...auditLogUseCases,
  ],
  exports: [AuditLogService, ...auditLogUseCases],
})
export class AuditLogModule { }

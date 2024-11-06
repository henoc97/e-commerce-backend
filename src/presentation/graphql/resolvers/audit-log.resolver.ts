import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateLog } from 'src/application/use-cases/audit-log.use-cases/create-log.use-case';
import { DeleteLog } from 'src/application/use-cases/audit-log.use-cases/delete-log.use-case';
import { FetchLogById } from 'src/application/use-cases/audit-log.use-cases/fetch-log-by-id.use-case';
import { FetchLogsByAction } from 'src/application/use-cases/audit-log.use-cases/fetch-logs-by-action.use-case';
import { FetchLogsByDateRange } from 'src/application/use-cases/audit-log.use-cases/fetch-logs-by-date-range.use-case';
import { FetchLogsByEntity } from 'src/application/use-cases/audit-log.use-cases/fetch-logs-by-entity.use-case';
import { FetchLogsByUser } from 'src/application/use-cases/audit-log.use-cases/fetch-logs-by-user.use-case';
import { FetchRecentLogs } from 'src/application/use-cases/audit-log.use-cases/fetch-recent-logs.use-case';
import { UpdateLog } from 'src/application/use-cases/audit-log.use-cases/update-log.use-case';
import { AuditLogAction } from 'src/domain/enums/audit-log-action.enum';
import { JwtAuthGuard } from 'src/infrastructure/external-servicies/auth/jwt-auth.guard';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';

@Resolver(() => AuditLogDTO)
export class AuditLogResolver {
  constructor(
    private readonly createLog: CreateLog,
    private readonly deleteLog: DeleteLog,
    private readonly fetchLogById: FetchLogById,
    private readonly fetchLogsByAction: FetchLogsByAction,
    private readonly fetchLogsByDateRange: FetchLogsByDateRange,
    private readonly fetchLogsByEntity: FetchLogsByEntity,
    private readonly fetchLogsByUser: FetchLogsByUser,
    private readonly fetchRecentLogs: FetchRecentLogs,
    private readonly updateLog: UpdateLog,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuditLogDTO)
  async createAuditLog(@Args('dto') dto: AuditLogDTO): Promise<AuditLogDTO> {
    return this.createLog.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteAuditLog(@Args('id') id: number): Promise<boolean> {
    return this.deleteLog.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => AuditLogDTO, { nullable: true })
  async auditLogById(@Args('id') id: number): Promise<AuditLogDTO | null> {
    return this.fetchLogById.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogDTO])
  async auditLogsByAction(
    @Args('action') action: AuditLogAction,
  ): Promise<AuditLogDTO[]> {
    return this.fetchLogsByAction.execute(action);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogDTO])
  async auditLogsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<AuditLogDTO[]> {
    return this.fetchLogsByDateRange.execute(startDate, endDate);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogDTO])
  async auditLogsByEntity(
    @Args('entity') entity: string,
    @Args('entityId') entityId: number,
  ): Promise<AuditLogDTO[]> {
    return this.fetchLogsByEntity.execute(entity, entityId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogDTO])
  async auditLogsByUser(
    @Args('userId') userId: number,
  ): Promise<AuditLogDTO[]> {
    return this.fetchLogsByUser.execute(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogDTO])
  async recentAuditLogs(@Args('limit') limit: number): Promise<AuditLogDTO[]> {
    return this.fetchRecentLogs.execute(limit);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuditLogDTO)
  async updateAuditLog(
    @Args('id') id: number,
    @Args('dto') dto: AuditLogDTO,
  ): Promise<AuditLogDTO> {
    return this.updateLog.execute(id, dto);
  }
}

import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { toAuditLogDTO } from 'src/application/helper/to-dto/to.audit-log.dto';
import { transformAuditLogDTOToGraphQL } from 'src/application/helper/utils/transformers';
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
import { AuditLog, AuditLogInput } from 'src/generated/graphql';
import { JwtAuthGuard } from 'src/infrastructure/external-servicies/auth/jwt-auth.guard';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';

@Resolver(() => 'AuditLog')
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
  ) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'AuditLog')
  async createAuditLog(@Args('AuditLogInput') input: AuditLogInput): Promise<AuditLog> {
    const dto = toAuditLogDTO(input);
    const result = await this.createLog.execute(dto);
    return transformAuditLogDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteAuditLog(@Args('id') id: number): Promise<boolean> {
    return this.deleteLog.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => 'AuditLog', { nullable: true })
  async auditLogById(@Args('id') id: number): Promise<AuditLog | null> {
    const result = await this.fetchLogById.execute(id);
    return transformAuditLogDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['AuditLog'])
  async auditLogsByAction(
    @Args('action') action: AuditLogAction,
  ): Promise<AuditLog[]> {
    const result = await this.fetchLogsByAction.execute(action);
    return result.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['AuditLog'])
  async auditLogsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<AuditLog[]> {
    const result = await this.fetchLogsByDateRange.execute(startDate, endDate);
    return result.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['AuditLog'])
  async auditLogsByEntity(
    @Args('entity') entity: string,
    @Args('entityId') entityId: number,
  ): Promise<AuditLog[]> {
    const result = await this.fetchLogsByEntity.execute(entity, entityId);
    return result.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['AuditLog'])
  async auditLogsByUser(
    @Args('userId') userId: number,
  ): Promise<AuditLog[]> {
    const result = await this.fetchLogsByUser.execute(userId);
    return result.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['AuditLog'])
  async recentAuditLogs(@Args('limit') limit: number): Promise<AuditLog[]> {
    const result = await this.fetchRecentLogs.execute(limit);
    return result.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'AuditLog')
  async updateAuditLog(
    @Args('id') id: number,
    @Args('AuditLogInput') input: AuditLogInput,
  ): Promise<AuditLog> {
    const dto = toAuditLogDTO(input);
    const result = await this.updateLog.execute(id, dto);
    return transformAuditLogDTOToGraphQL(result);
  }
}

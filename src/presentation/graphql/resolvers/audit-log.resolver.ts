import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { toAuditLogDTO } from '../../../application/helper/to-dto/to.audit-log.dto';
import { transformAuditLogDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { CreateLog } from '../../../application/use-cases/audit-log.use-cases/create-log.use-case';
import { DeleteLog } from '../../../application/use-cases/audit-log.use-cases/delete-log.use-case';
import { FetchLogById } from '../../../application/use-cases/audit-log.use-cases/fetch-log-by-id.use-case';
import { FetchLogsByAction } from '../../../application/use-cases/audit-log.use-cases/fetch-logs-by-action.use-case';
import { FetchLogsByDateRange } from '../../../application/use-cases/audit-log.use-cases/fetch-logs-by-date-range.use-case';
import { FetchLogsByEntity } from '../../../application/use-cases/audit-log.use-cases/fetch-logs-by-entity.use-case';
import { FetchLogsByUser } from '../../../application/use-cases/audit-log.use-cases/fetch-logs-by-user.use-case';
import { FetchRecentLogs } from '../../../application/use-cases/audit-log.use-cases/fetch-recent-logs.use-case';
import { UpdateLog } from '../../../application/use-cases/audit-log.use-cases/update-log.use-case';
import { AuditLogAction } from '../../../domain/enums/audit-log-action.enum';
import { JwtAuthGuard } from '../../../infrastructure/external-services/auth/jwt-auth.guard';
import { AuditLogInput } from '../../../presentation/input/audit-log.input';
import { AuditLogOutput } from '../../../presentation/output/audit-log.output';

@Resolver(() => AuditLogOutput)
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
  @Mutation(() => AuditLogOutput)
  async createAuditLog(@Args('AuditLogInput') input: AuditLogInput): Promise<AuditLogOutput> {
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
  @Query(() => AuditLogOutput, { nullable: true })
  async auditLogById(@Args('id') id: number): Promise<AuditLogOutput | null> {
    const result = await this.fetchLogById.execute(id);
    return transformAuditLogDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogOutput])
  async auditLogsByAction(
    @Args('action') action: AuditLogAction,
  ): Promise<AuditLogOutput[]> {
    const result = await this.fetchLogsByAction.execute(action);
    return result?.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogOutput])
  async auditLogsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<AuditLogOutput[]> {
    const result = await this.fetchLogsByDateRange.execute(startDate, endDate);
    return result?.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogOutput])
  async auditLogsByEntity(
    @Args('entity') entity: string,
    @Args('entityId') entityId: number,
  ): Promise<AuditLogOutput[]> {
    const result = await this.fetchLogsByEntity.execute(entity, entityId);
    return result?.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogOutput])
  async auditLogsByUser(
    @Args('userId') userId: number,
  ): Promise<AuditLogOutput[]> {
    const result = await this.fetchLogsByUser.execute(userId);
    return result?.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuditLogOutput])
  async recentAuditLogs(@Args('limit') limit: number): Promise<AuditLogOutput[]> {
    const result = await this.fetchRecentLogs.execute(limit);
    return result?.map(transformAuditLogDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuditLogOutput)
  async updateAuditLog(
    @Args('id') id: number,
    @Args('AuditLogInput') input: AuditLogInput,
  ): Promise<AuditLogOutput> {
    const dto = toAuditLogDTO(input);
    const result = await this.updateLog.execute(id, dto);
    return transformAuditLogDTOToGraphQL(result);
  }
}

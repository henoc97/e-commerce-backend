import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogResolver } from '../../src/presentation/graphql/resolvers/audit-log.resolver';

import { AuditLogDTO } from '../../src/presentation/dtos/audit-log.dto';
import { AuditLogAction } from '../../src/domain/enums/audit-log-action.enum';
import { CreateLog } from '../../src/application/use-cases/audit-log.use-cases/create-log.use-case';
import { DeleteLog } from '../../src/application/use-cases/audit-log.use-cases/delete-log.use-case';
import { FetchLogById } from '../../src/application/use-cases/audit-log.use-cases/fetch-log-by-id.use-case';
import { FetchLogsByAction } from '../../src/application/use-cases/audit-log.use-cases/fetch-logs-by-action.use-case';
import { FetchLogsByDateRange } from '../../src/application/use-cases/audit-log.use-cases/fetch-logs-by-date-range.use-case';
import { FetchLogsByEntity } from '../../src/application/use-cases/audit-log.use-cases/fetch-logs-by-entity.use-case';
import { FetchLogsByUser } from '../../src/application/use-cases/audit-log.use-cases/fetch-logs-by-user.use-case';
import { FetchRecentLogs } from '../../src/application/use-cases/audit-log.use-cases/fetch-recent-logs.use-case';
import { UpdateLog } from '../../src/application/use-cases/audit-log.use-cases/update-log.use-case';

describe('AuditLogResolver', () => {
  let resolver: AuditLogResolver;
  let createLog: CreateLog;
  let deleteLog: DeleteLog;
  let fetchLogById: FetchLogById;
  let fetchLogsByAction: FetchLogsByAction;
  let fetchLogsByDateRange: FetchLogsByDateRange;
  let fetchLogsByEntity: FetchLogsByEntity;
  let fetchLogsByUser: FetchLogsByUser;
  let fetchRecentLogs: FetchRecentLogs;
  let updateLog: UpdateLog;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogResolver,
        { provide: CreateLog, useValue: { execute: jest.fn() } },
        { provide: DeleteLog, useValue: { execute: jest.fn() } },
        { provide: FetchLogById, useValue: { execute: jest.fn() } },
        { provide: FetchLogsByAction, useValue: { execute: jest.fn() } },
        { provide: FetchLogsByDateRange, useValue: { execute: jest.fn() } },
        { provide: FetchLogsByEntity, useValue: { execute: jest.fn() } },
        { provide: FetchLogsByUser, useValue: { execute: jest.fn() } },
        { provide: FetchRecentLogs, useValue: { execute: jest.fn() } },
        { provide: UpdateLog, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    resolver = module.get<AuditLogResolver>(AuditLogResolver);
    createLog = module.get<CreateLog>(CreateLog);
    deleteLog = module.get<DeleteLog>(DeleteLog);
    fetchLogById = module.get<FetchLogById>(FetchLogById);
    fetchLogsByAction = module.get<FetchLogsByAction>(FetchLogsByAction);
    fetchLogsByDateRange =
      module.get<FetchLogsByDateRange>(FetchLogsByDateRange);
    fetchLogsByEntity = module.get<FetchLogsByEntity>(FetchLogsByEntity);
    fetchLogsByUser = module.get<FetchLogsByUser>(FetchLogsByUser);
    fetchRecentLogs = module.get<FetchRecentLogs>(FetchRecentLogs);
    updateLog = module.get<UpdateLog>(UpdateLog);
  });

  it("devrait créer un journal d'audit", async () => {
    const dto = new AuditLogDTO(
      1,
      AuditLogAction.CREATED,
      'TestEntity',
      123,
      'Test details',
      new Date(),
    );
    jest.spyOn(createLog, 'execute').mockResolvedValue(dto);

    expect(await resolver.createAuditLog(dto)).toBe(dto);
    expect(createLog.execute).toHaveBeenCalledWith(dto);
  });

  it('should delete an audit log', async () => {
    jest.spyOn(deleteLog, 'execute').mockResolvedValue(true);

    expect(await resolver.deleteAuditLog(1)).toBe(true);
    expect(deleteLog.execute).toHaveBeenCalledWith(1);
  });

  it('should fetch an audit log by id', async () => {
    const dto = new AuditLogDTO(
      1,
      AuditLogAction.CREATED,
      'TestEntity',
      123,
      'Test details',
    );
    jest.spyOn(fetchLogById, 'execute').mockResolvedValue(dto);

    expect(await resolver.auditLogById(1)).toBe(dto);
    expect(fetchLogById.execute).toHaveBeenCalledWith(1);
  });

  it('should fetch audit logs by action', async () => {
    const dtos = [
      new AuditLogDTO(
        1,
        AuditLogAction.CREATED,
        'TestEntity',
        123,
        'Test details',
        new Date(),
      ),
    ];
    jest.spyOn(fetchLogsByAction, 'execute').mockResolvedValue(dtos);

    expect(await resolver.auditLogsByAction(AuditLogAction.CREATED)).toBe(dtos);
    expect(fetchLogsByAction.execute).toHaveBeenCalledWith(
      AuditLogAction.CREATED,
    );
  });

  it('should fetch audit logs by date range', async () => {
    const dtos = [
      new AuditLogDTO(
        1,
        AuditLogAction.CREATED,
        'TestEntity',
        123,
        'Test details',
        new Date(),
      ),
    ];
    const startDate = new Date();
    const endDate = new Date();
    jest.spyOn(fetchLogsByDateRange, 'execute').mockResolvedValue(dtos);

    expect(await resolver.auditLogsByDateRange(startDate, endDate)).toBe(dtos);
    expect(fetchLogsByDateRange.execute).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });

  it('should fetch audit logs by entity', async () => {
    const dtos = [
      new AuditLogDTO(
        1,
        AuditLogAction.CREATED,
        'TestEntity',
        123,
        'Test details',
        new Date(),
      ),
    ];
    jest.spyOn(fetchLogsByEntity, 'execute').mockResolvedValue(dtos);

    expect(await resolver.auditLogsByEntity('entity', 1)).toBe(dtos);
    expect(fetchLogsByEntity.execute).toHaveBeenCalledWith('entity', 1);
  });

  it('should fetch audit logs by user', async () => {
    const dtos = [
      new AuditLogDTO(
        1,
        AuditLogAction.CREATED,
        'TestEntity',
        123,
        'Test details',
        new Date(),
      ),
    ];
    jest.spyOn(fetchLogsByUser, 'execute').mockResolvedValue(dtos);

    expect(await resolver.auditLogsByUser(1)).toBe(dtos);
    expect(fetchLogsByUser.execute).toHaveBeenCalledWith(1);
  });

  it('should fetch recent audit logs', async () => {
    const dtos = [
      new AuditLogDTO(
        1,
        AuditLogAction.CREATED,
        'TestEntity',
        123,
        'Test details',
        new Date(),
      ),
    ];
    jest.spyOn(fetchRecentLogs, 'execute').mockResolvedValue(dtos);

    expect(await resolver.recentAuditLogs(5)).toBe(dtos);
    expect(fetchRecentLogs.execute).toHaveBeenCalledWith(5);
  });

  it('should update an audit log', async () => {
    const dto = new AuditLogDTO(
      1,
      AuditLogAction.CREATED,
      'TestEntity',
      123,
      'Test details',
      new Date(),
    );
    jest.spyOn(updateLog, 'execute').mockResolvedValue(dto);

    expect(await resolver.updateAuditLog(1, dto)).toBe(dto);
    expect(updateLog.execute).toHaveBeenCalledWith(1, dto);
  });
});

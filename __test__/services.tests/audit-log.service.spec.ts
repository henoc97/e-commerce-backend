import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogService } from '../../src/application/services/audit-log.service';
import { IAuditLogRepository } from '../../src/domain/repositories/audit-log.repository';
import { AuditLog } from '../../src/domain/entities/audit-log.entity';
import { AuditLogDTO } from '../../src/presentation/dtos/audit-log.dto';

const mockAuditLogRepository = {
  createLog: jest.fn(),
  getLogById: jest.fn(),
  getLogsByEntity: jest.fn(),
  getLogsByUser: jest.fn(),
  updateLog: jest.fn(),
  deleteLog: jest.fn(),
  getLogsByDateRange: jest.fn(),
  validateLog: jest.fn(),
  getRecentLogs: jest.fn(),
  getLogsByAction: jest.fn(),
};

describe('AuditLogService', () => {
  let service: AuditLogService;
  let auditLogRepository: IAuditLogRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogService,
        {
          provide: 'AuditLogRepository',
          useValue: mockAuditLogRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<AuditLogService>(AuditLogService);
    auditLogRepository = module.get<IAuditLogRepository>('AuditLogRepository');
  });

  /* create log success and failure tests */
  it('should create log', async () => {
    /**
     * Tests the create log method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's createLog method is called with the correct data.
     */

    const dto: AuditLogDTO = {
      /* data */
    };

    const returnOject: AuditLog = { id: 1 /* others data */ };

    mockAuditLogRepository.createLog.mockResolvedValue(returnOject);

    const result = await service.createLog(dto);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.createLog).toHaveBeenCalledWith(dto);
  });

  it('should throw an error when create log method fails', async () => {
    const dto: AuditLogDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockAuditLogRepository.createLog.mockResolvedValue(' Repository error');

    const result = await service.createLog(dto);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get log by id success and failure tests */
  it('should get log by id', async () => {
    /**
     * Tests the get log by id method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's getLogById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: AuditLog | null = { id: 1 /* others data */ };

    mockAuditLogRepository.getLogById.mockResolvedValue(returnOject);

    const result = await service.getLogById(id);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.getLogById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get log by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockAuditLogRepository.getLogById.mockResolvedValue(' Repository error');

    const result = await service.getLogById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get logs by entity success and failure tests */
  it('should get logs by entity', async () => {
    /**
     * Tests the get logs by entity method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's getLogsByEntity method is called with the correct data.
     */

    const entity: string = 'entity';
    const entityId: number = 1;

    const returnOject: AuditLog[] = [{ id: 1 /* others data */ }];

    mockAuditLogRepository.getLogsByEntity.mockResolvedValue(returnOject);

    const result = await service.getLogsByEntity(entity, entityId);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.getLogsByEntity).toHaveBeenCalledWith(
      entity,
      entityId,
    );
  });

  it('should throw an error when get logs by entity method fails', async () => {
    const entity: string = 'entity';
    const entityId: number = 1;

    // Simulate a failure when calling the repository
    mockAuditLogRepository.getLogsByEntity.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getLogsByEntity(entity, entityId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get logs by user success and failure tests */
  it('should get logs by user', async () => {
    /**
     * Tests the get logs by user method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's getLogsByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: AuditLog[] = [{ id: 1 /* others data */ }];

    mockAuditLogRepository.getLogsByUser.mockResolvedValue(returnOject);

    const result = await service.getLogsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.getLogsByUser).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get logs by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockAuditLogRepository.getLogsByUser.mockResolvedValue(' Repository error');

    const result = await service.getLogsByUser(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update log success and failure tests */
  it('should update log', async () => {
    /**
     * Tests the update log method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's updateLog method is called with the correct data.
     */

    const id: number = 1;
    const dto: AuditLogDTO = {
      /* data */
    };

    const returnOject: AuditLog = { id: 1 /* others data */ };

    mockAuditLogRepository.updateLog.mockResolvedValue(returnOject);

    const result = await service.updateLog(id, dto);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.updateLog).toHaveBeenCalledWith(id, dto);
  });

  it('should throw an error when update log method fails', async () => {
    const id: number = 1;
    const dto: AuditLogDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockAuditLogRepository.updateLog.mockResolvedValue(' Repository error');

    const result = await service.updateLog(id, dto);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete log success and failure tests */
  it('should delete log', async () => {
    /**
     * Tests the delete log method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's deleteLog method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockAuditLogRepository.deleteLog.mockResolvedValue(returnOject);

    const result = await service.deleteLog(id);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.deleteLog).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete log method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockAuditLogRepository.deleteLog.mockResolvedValue(' Repository error');

    const result = await service.deleteLog(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get logs by date range success and failure tests */
  it('should get logs by date range', async () => {
    /**
     * Tests the get logs by date range method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's getLogsByDateRange method is called with the correct data.
     */

    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    const returnOject: AuditLog[] = [{ id: 1 /* others data */ }];

    mockAuditLogRepository.getLogsByDateRange.mockResolvedValue(returnOject);

    const result = await service.getLogsByDateRange(startDate, endDate);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.getLogsByDateRange).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });

  it('should throw an error when get logs by date range method fails', async () => {
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockAuditLogRepository.getLogsByDateRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getLogsByDateRange(startDate, endDate);
    expect(result).rejects.toThrow('Repository error');
  });

  /* validate log success and failure tests */
  it('should validate log', async () => {
    /**
     * Tests the validate log method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's validateLog method is called with the correct data.
     */

    const dto: AuditLogDTO = {
      /* data */
    };

    const returnOject: boolean = true;

    mockAuditLogRepository.validateLog.mockResolvedValue(returnOject);

    const result = await service.validateLog(dto);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.validateLog).toHaveBeenCalledWith(dto);
  });

  it('should throw an error when validate log method fails', async () => {
    const dto: AuditLogDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockAuditLogRepository.validateLog.mockResolvedValue(' Repository error');

    const result = await service.validateLog(dto);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get recent logs success and failure tests */
  it('should get recent logs', async () => {
    /**
     * Tests the get recent logs method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's getRecentLogs method is called with the correct data.
     */

    const limit: number = 1;

    const returnOject: AuditLog[] = [{ id: 1 /* others data */ }];

    mockAuditLogRepository.getRecentLogs.mockResolvedValue(returnOject);

    const result = await service.getRecentLogs(limit);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.getRecentLogs).toHaveBeenCalledWith(limit);
  });

  it('should throw an error when get recent logs method fails', async () => {
    const limit: number = 1;

    // Simulate a failure when calling the repository
    mockAuditLogRepository.getRecentLogs.mockResolvedValue(' Repository error');

    const result = await service.getRecentLogs(limit);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get logs by action success and failure tests */
  it('should get logs by action', async () => {
    /**
     * Tests the get logs by action method.
     * Verifies that the returned auditLog matches the expected one
     * and that the repository's getLogsByAction method is called with the correct data.
     */

    const action: string = 'action';

    const returnOject: AuditLog[] = [{ id: 1 /* others data */ }];

    mockAuditLogRepository.getLogsByAction.mockResolvedValue(returnOject);

    const result = await service.getLogsByAction(action);
    expect(result).toEqual(returnOject);
    expect(mockAuditLogRepository.getLogsByAction).toHaveBeenCalledWith(action);
  });

  it('should throw an error when get logs by action method fails', async () => {
    const action: string = 'action';

    // Simulate a failure when calling the repository
    mockAuditLogRepository.getLogsByAction.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getLogsByAction(action);
    expect(result).rejects.toThrow('Repository error');
  });
});

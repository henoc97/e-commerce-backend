import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogService } from '../../../src/application/services/audit-log.service';
import { FetchLogsByEntity } from '../../../src/application/use-cases/audit-log.use-cases/fetch-logs-by-entity.use-case';
import { AuditLogDTO } from '../../../src/presentation/dtos/audit-log.dto';
import { toAuditLogDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchLogsByEntity use case.
 * This test covers the initialization and behavior of the FetchLogsByEntity class.
 * It mocks the AuditLogService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchLogsByEntity', () => {
  let fetchLogsByEntity: FetchLogsByEntity;
  let auditLogService: AuditLogService;

  // Mock implementation of the AuditLogService service with jest functions
  const mockAuditLogService = {
    fetchLogsByEntity: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const entity: string = 'entity';
  const entityId: number = 1;

  // Mock version of  to be used as input and expected output
  const mockAuditLogDTO: AuditLogDTO = {
    // TODO: Fill in your AuditLogDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchLogsByEntity,
        {
          provide: AuditLogService,
          useValue: mockAuditLogService,
        },
      ],
    }).compile();

    fetchLogsByEntity = module.get<FetchLogsByEntity>(FetchLogsByEntity);
    auditLogService = module.get<AuditLogService>(AuditLogService);
  });

  /**
   * After each test, clear all jest mocks.
   * This ensures no interference between tests and guarantees a clean test environment.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case to verify that the use case executes successfully and returns a DTO.
   * This test ensures that the service method is called correctly and that the result is processed by 	o.
   */
  it('should create and return an address DTO', async () => {
    // Mock service returning the expected DTO
    mockAuditLogService.fetchLogsByEntity.mockResolvedValue(mockAuditLogDTO);
    (toAuditLogDTO as jest.Mock).mockReturnValue(mockAuditLogDTO);

    // Execute the use case with provided parameters
    const result = await fetchLogsByEntity.execute(entity, entityId);

    // Verify that the service was called with the expected arguments
    expect(mockAuditLogService.fetchLogsByEntity).toHaveBeenCalledWith(
      entity,
      entityId,
    );

    // Verify that the transformation to DTO was called with the service result
    expect(toAuditLogDTO).toHaveBeenCalledWith(mockAuditLogDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockAuditLogDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchLogsByEntity execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockAuditLogService.fetchLogsByEntity.mockRejectedValue(
      'Service method error',
    );

    // Verify that the use case throws an error when service method fails
    await expect(fetchLogsByEntity.execute(entity, entityId)).rejects.toThrow(
      'Service method error',
    );
  });
});

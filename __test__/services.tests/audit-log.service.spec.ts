import { Test, TestingModule } from '@nestjs/testing';
import { AuditLogService } from '../../src/application/services/audit-log.service';
import { AuditLog } from '../../src/domain/entities/audit-log.entity';
import { AuditLogDTO } from '../../src/presentation/dtos/audit-log.dto';
import { AuditLogAction } from 'src/domain/enums/audit-log-action.enum';
import { IAuditLogRepository } from 'src/domain/repositories/auditlog.repository';
import { InternalServerErrorException } from '@nestjs/common';


const mockAuditLogRepository = {
    create: jest.fn(),
    getById: jest.fn(),
    getByEntity: jest.fn(),
    getByUser: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getByDateRange: jest.fn(),
    validate: jest.fn(),
    getRecent: jest.fn(),
    getByAction: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('AuditLogService', () => {
    let service: AuditLogService;
    let auditLogRepository: IAuditLogRepository;

    beforeEach(async () => {
        // Set up the testing module with the service and the mock repository
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuditLogService,
                {
                    provide: 'IAuditLogRepository',
                    useValue: mockAuditLogRepository, // Use the mock
                },
            ],
        }).compile();

        // Retrieve instances of the service and repository
        service = module.get<AuditLogService>(AuditLogService);
        auditLogRepository = module.get<IAuditLogRepository>('IAuditLogRepository');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    /* create log success and failure tests */
    it('should create log', async () => {
        /** 
         * Tests the create log method.
         * Verifies that the returned auditLog matches the expected one 
         * and that the repository's createLog method is called with the correct data.
         */

        const dto: AuditLogDTO = new AuditLogDTO(1, 1, AuditLogAction.CREATED, "user", 1, "created user");

        const returnOject: AuditLog = new AuditLog(1, 1, AuditLogAction.CREATED, "user", 1, "created user")

        mockAuditLogRepository.create.mockResolvedValue(returnOject);

        const result = await service.createLog(dto);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.create).toHaveBeenCalledWith(dto);
    });

    it('should throw an error when create log method fails', async () => {

        const dto: AuditLogDTO = new AuditLogDTO(1, 1, AuditLogAction.CREATED, "user", 1, "created user");

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.create.mockRejectedValue(new Error('Repository error'));

        await expect(service.createLog(dto)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });


    /* get log by id success and failure tests */
    it('should get log by id', async () => {
        /** 
         * Tests the get log by id method.
         * Verifies that the returned auditLog matches the expected one 
         * and that the repository's getLogById method is called with the correct data.
         */

        const id: number = 1;

        const returnOject: AuditLog | null = new AuditLog(1, 1, AuditLogAction.CREATED, "user", 1, "created user")

        mockAuditLogRepository.getById.mockResolvedValue(returnOject);

        const result = await service.getLogById(id);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.getById).toHaveBeenCalledWith(id);
    });

    it('should throw an error when get log by id method fails', async () => {

        const id: number = 1;

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.getById.mockRejectedValue(new Error('Repository error'));

        await expect(service.getLogById(id)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
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

        const returnOject: AuditLog[] = [new AuditLog(1, 1, AuditLogAction.CREATED, "user", 1, "created user")]

        mockAuditLogRepository.getByEntity.mockResolvedValue(returnOject);

        const result = await service.getLogsByEntity(entity, entityId);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.getByEntity).toHaveBeenCalledWith(entity, entityId);
    });

    it('should throw an error when get logs by entity method fails', async () => {

        const entity: string = 'entity';
        const entityId: number = 1;

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.getByEntity.mockRejectedValue(new Error('Repository error'));

        await expect(service.getLogsByEntity(entity, entityId)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });


    /* get logs by user success and failure tests */
    it('should get logs by user', async () => {
        /** 
         * Tests the get logs by user method.
         * Verifies that the returned auditLog matches the expected one 
         * and that the repository's getLogsByUser method is called with the correct data.
         */

        const userId: number = 1;

        const returnOject: AuditLog[] = [new AuditLog(1, 1, AuditLogAction.CREATED, "user", 1, "created user")]

        mockAuditLogRepository.getByUser.mockResolvedValue(returnOject);

        const result = await service.getLogsByUser(userId);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.getByUser).toHaveBeenCalledWith(userId);
    });

    it('should throw an error when get logs by user method fails', async () => {

        const userId: number = 1;

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.getByUser.mockRejectedValue(new Error('Repository error'));

        await expect(service.getLogsByUser(userId)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });


    /* update log success and failure tests */
    it('should update log', async () => {
        /** 
         * Tests the update log method.
         * Verifies that the returned auditLog matches the expected one 
         * and that the repository's updateLog method is called with the correct data.
         */

        const id: number = 1;
        const dto: AuditLogDTO = new AuditLogDTO(1, 1, AuditLogAction.CREATED, "user", 1, "created user");

        const returnOject: AuditLog = new AuditLog(1, 1, AuditLogAction.CREATED, "user", 1, "created user")

        mockAuditLogRepository.update.mockResolvedValue(returnOject);

        const result = await service.updateLog(id, dto);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.update).toHaveBeenCalledWith(id, dto);
    });

    it('should throw an error when update log method fails', async () => {

        const id: number = 1;
        const dto: AuditLogDTO = new AuditLogDTO(1, 1, AuditLogAction.CREATED, "user", 1, "created user");

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.update.mockRejectedValue(new Error('Repository error'));

        await expect(service.updateLog(id, dto)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });


    /* delete log success and failure tests */
    it('should delete log', async () => {
        /** 
         * Tests the delete log method.
         * Verifies that the returned auditLog matches the expected one 
         * and that the repository's deleteLog method is called with the correct data.
         */

        const id: number = 1;

        const returnOject: boolean = true

        mockAuditLogRepository.delete.mockResolvedValue(returnOject);

        const result = await service.deleteLog(id);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error when delete log method fails', async () => {

        const id: number = 1;

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.delete.mockRejectedValue(new Error('Repository error'));

        await expect(service.deleteLog(id)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });


    /* get logs by date range success and failure tests */
    it('should get logs by date range', async () => {
        /** 
         * Tests the get logs by date range method.
         * Verifies that the returned auditLog matches the expected one 
         * and that the repository's getLogsByDateRange method is called with the correct data.
         */

        const startDate: Date = new Date("2024-01-01");
        const endDate: Date = new Date();

        const returnOject: AuditLog[] = [new AuditLog(1, 1, AuditLogAction.CREATED, "user", 1, "created user")]

        mockAuditLogRepository.getByDateRange.mockResolvedValue(returnOject);

        const result = await service.getLogsByDateRange(startDate,
            endDate,);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.getByDateRange).toHaveBeenCalledWith(startDate,
            endDate,);
    });

    it('should throw an error when get logs by date range method fails', async () => {

        const startDate: Date = new Date("2024-01-01");
        const endDate: Date = new Date();

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.getByDateRange.mockRejectedValue(new Error('Repository error'));

        await expect(service.getLogsByDateRange(startDate,
            endDate,)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });


    /* get recent logs success and failure tests */
    it('should get recent logs', async () => {
        /** 
         * Tests the get recent logs method.
         * Verifies that the returned auditLog matches the expected one 
         * and that the repository's getRecentLogs method is called with the correct data.
         */

        const limit: number = 1;

        const returnOject: AuditLog[] = [new AuditLog(1, 1, AuditLogAction.CREATED, "user", 1, "created user")]

        mockAuditLogRepository.getRecent.mockResolvedValue(returnOject);

        const result = await service.getRecentLogs(limit);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.getRecent).toHaveBeenCalledWith(limit);
    });

    it('should throw an error when get recent logs method fails', async () => {

        const limit: number = 1;

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.getRecent.mockRejectedValue(new Error('Repository error'));

        await expect(service.getRecentLogs(limit)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });


    /* get logs by action success and failure tests */
    it('should get logs by action', async () => {
        /** 
         * Tests the get logs by action method.
         * Verifies that the returned auditLog matches the expected one 
         * and that the repository's getLogsByAction method is called with the correct data.
         */

        const action: AuditLogAction = AuditLogAction.CREATED;

        const returnOject: AuditLog[] = [new AuditLog(1, 1, AuditLogAction.CREATED, "user", 1, "created user")]

        mockAuditLogRepository.getByAction.mockResolvedValue(returnOject);

        const result = await service.getLogsByAction(action);
        expect(result).toEqual(returnOject);
        expect(mockAuditLogRepository.getByAction).toHaveBeenCalledWith(action);
    });

    it('should throw an error when get logs by action method fails', async () => {

        const action: AuditLogAction = AuditLogAction.CREATED;

        // Simulate a failure when calling the repository 
        mockAuditLogRepository.getByAction.mockRejectedValue(new Error('Repository error'));

        await expect(service.getLogsByAction(action)).rejects.toThrow(InternalServerErrorException);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });


})

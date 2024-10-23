import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityService } from '../../src/application/services/user-activity.service';
import { IUserActivityRepository } from '../../src/domain/repositories/user-activity.repository';
import { UserActivity } from '../../src/domain/entities/user-activity.entity';
import { UserActivityDTO } from '../../src/presentation/dtos/user-activity.dto';


const mockUserActivityRepository = {
  create: jest.fn(),
findById: jest.fn(),
listByUser: jest.fn(),
listByProduct: jest.fn(),
update: jest.fn(),
delete: jest.fn(),
listByDateRange: jest.fn(),
validate: jest.fn(),
countByUser: jest.fn(),
getRecentByUser: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('UserActivityService', () => {
    let service: UserActivityService;
    let userActivityRepository: IUserActivityRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActivityService,
        {
          provide: 'IUserActivityRepository',
          useValue: mockUserActivityRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<UserActivityService>(UserActivityService);
    userActivityRepository = module.get<IUserActivityRepository>('IUserActivityRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* record activity success and failure tests */
it('should record activity', async () => {
    /** 
     * Tests the record activity method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's recordActivity method is called with the correct data.
     */
    
     const activityDTO: UserActivityDTO = { /* data */ };

    const returnOject: UserActivity = { id: 1, /* others data */ };
    
    mockUserActivityRepository.create.mockResolvedValue(returnOject);

    const result = await service.recordActivity(activityDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.create).toHaveBeenCalledWith(activityDTO);
});

it('should throw an error when record activity method fails', async () => {
    
     const activityDTO: UserActivityDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.recordActivity(activityDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get activity by id success and failure tests */
it('should get activity by id', async () => {
    /** 
     * Tests the get activity by id method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's getActivityById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: UserActivity | null = { id: 1, /* others data */ };
    
    mockUserActivityRepository.findById.mockResolvedValue(returnOject);

    const result = await service.getActivityById(id);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.findById).toHaveBeenCalledWith(id);
});

it('should throw an error when get activity by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.findById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getActivityById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* list activities by user success and failure tests */
it('should list activities by user', async () => {
    /** 
     * Tests the list activities by user method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's listActivitiesByUser method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: UserActivity[] = [{ id: 1, /* others data */ }];
    
    mockUserActivityRepository.listByUser.mockResolvedValue(returnOject);

    const result = await service.listActivitiesByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.listByUser).toHaveBeenCalledWith(userId);
});

it('should throw an error when list activities by user method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.listByUser.mockRejectedValue(new Error('Repository error'));

    await expect(service.listActivitiesByUser(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* list activities by product success and failure tests */
it('should list activities by product', async () => {
    /** 
     * Tests the list activities by product method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's listActivitiesByProduct method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: UserActivity[] = [{ id: 1, /* others data */ }];
    
    mockUserActivityRepository.listByProduct.mockResolvedValue(returnOject);

    const result = await service.listActivitiesByProduct(productId);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.listByProduct).toHaveBeenCalledWith(productId);
});

it('should throw an error when list activities by product method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.listByProduct.mockRejectedValue(new Error('Repository error'));

    await expect(service.listActivitiesByProduct(productId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update activity success and failure tests */
it('should update activity', async () => {
    /** 
     * Tests the update activity method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's updateActivity method is called with the correct data.
     */
    
     const id: number = 1;
     const activityDTO: Partial<UserActivityDTO> = { /* data */ };

    const returnOject: UserActivity = { id: 1, /* others data */ };
    
    mockUserActivityRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateActivity(id,
    activityDTO,);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.update).toHaveBeenCalledWith(id,
    activityDTO,);
});

it('should throw an error when update activity method fails', async () => {
    
     const id: number = 1;
     const activityDTO: Partial<UserActivityDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateActivity(id,
    activityDTO,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete activity success and failure tests */
it('should delete activity', async () => {
    /** 
     * Tests the delete activity method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's deleteActivity method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockUserActivityRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteActivity(id);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.delete).toHaveBeenCalledWith(id);
});

it('should throw an error when delete activity method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.delete.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteActivity(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* list activities by date range success and failure tests */
it('should list activities by date range', async () => {
    /** 
     * Tests the list activities by date range method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's listActivitiesByDateRange method is called with the correct data.
     */
    
     const start: Date = { /* data */ };
     const end: Date = { /* data */ };

    const returnOject: UserActivity[] = [{ id: 1, /* others data */ }];
    
    mockUserActivityRepository.listByDateRange.mockResolvedValue(returnOject);

    const result = await service.listActivitiesByDateRange(start,
    end,);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.listByDateRange).toHaveBeenCalledWith(start,
    end,);
});

it('should throw an error when list activities by date range method fails', async () => {
    
     const start: Date = { /* data */ };
     const end: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.listByDateRange.mockRejectedValue(new Error('Repository error'));

    await expect(service.listActivitiesByDateRange(start,
    end,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* validate activity success and failure tests */
it('should validate activity', async () => {
    /** 
     * Tests the validate activity method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's validateActivity method is called with the correct data.
     */
    
     const activityDTO: UserActivityDTO = { /* data */ };

    const returnOject: boolean = true
    
    mockUserActivityRepository.validate.mockResolvedValue(returnOject);

    const result = await service.validateActivity(activityDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.validate).toHaveBeenCalledWith(activityDTO);
});

it('should throw an error when validate activity method fails', async () => {
    
     const activityDTO: UserActivityDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.validate.mockRejectedValue(new Error('Repository error'));

    await expect(service.validateActivity(activityDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* count activities by user success and failure tests */
it('should count activities by user', async () => {
    /** 
     * Tests the count activities by user method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's countActivitiesByUser method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: number = 1
    
    mockUserActivityRepository.countByUser.mockResolvedValue(returnOject);

    const result = await service.countActivitiesByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.countByUser).toHaveBeenCalledWith(userId);
});

it('should throw an error when count activities by user method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.countByUser.mockRejectedValue(new Error('Repository error'));

    await expect(service.countActivitiesByUser(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get recent activities by user success and failure tests */
it('should get recent activities by user', async () => {
    /** 
     * Tests the get recent activities by user method.
     * Verifies that the returned userActivity matches the expected one 
     * and that the repository's getRecentActivitiesByUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const limit: number = 1;

    const returnOject: UserActivity[] = [{ id: 1, /* others data */ }];
    
    mockUserActivityRepository.getRecentByUser.mockResolvedValue(returnOject);

    const result = await service.getRecentActivitiesByUser(userId,
    limit,);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.getRecentByUser).toHaveBeenCalledWith(userId,
    limit,);
});

it('should throw an error when get recent activities by user method fails', async () => {
    
     const userId: number = 1;
     const limit: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserActivityRepository.getRecentByUser.mockRejectedValue(new Error('Repository error'));

    await expect(service.getRecentActivitiesByUser(userId,
    limit,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

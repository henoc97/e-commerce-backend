import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityService } from '../../src/application/services/user-activity.service';
import { IUserActivityRepository } from '../../src/domain/repositories/user-activity.repository';
import { UserActivity } from '../../src/domain/entities/user-activity.entity';
import { UserActivityDTO } from '../../src/presentation/dtos/user-activity.dto';

const mockUserActivityRepository = {
  recordActivity: jest.fn(),
  getActivityById: jest.fn(),
  listActivitiesByUser: jest.fn(),
  listActivitiesByProduct: jest.fn(),
  updateActivity: jest.fn(),
  deleteActivity: jest.fn(),
  listActivitiesByDateRange: jest.fn(),
  validateActivity: jest.fn(),
  countActivitiesByUser: jest.fn(),
  getRecentActivitiesByUser: jest.fn(),
};

describe('UserActivityService', () => {
  let service: UserActivityService;
  let userActivityRepository: IUserActivityRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActivityService,
        {
          provide: 'UserActivityRepository',
          useValue: mockUserActivityRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<UserActivityService>(UserActivityService);
    userActivityRepository = module.get<IUserActivityRepository>(
      'UserActivityRepository',
    );
  });

  /* record activity success and failure tests */
  it('should record activity', async () => {
    /**
     * Tests the record activity method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's recordActivity method is called with the correct data.
     */

    const activityDTO: UserActivityDTO = {
      /* data */
    };

    const returnOject: UserActivity = { id: 1 /* others data */ };

    mockUserActivityRepository.recordActivity.mockResolvedValue(returnOject);

    const result = await service.recordActivity(activityDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.recordActivity).toHaveBeenCalledWith(
      activityDTO,
    );
  });

  it('should throw an error when record activity method fails', async () => {
    const activityDTO: UserActivityDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserActivityRepository.recordActivity.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.recordActivity(activityDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get activity by id success and failure tests */
  it('should get activity by id', async () => {
    /**
     * Tests the get activity by id method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's getActivityById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: UserActivity | null = { id: 1 /* others data */ };

    mockUserActivityRepository.getActivityById.mockResolvedValue(returnOject);

    const result = await service.getActivityById(id);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.getActivityById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get activity by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockUserActivityRepository.getActivityById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getActivityById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list activities by user success and failure tests */
  it('should list activities by user', async () => {
    /**
     * Tests the list activities by user method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's listActivitiesByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: UserActivity[] = [{ id: 1 /* others data */ }];

    mockUserActivityRepository.listActivitiesByUser.mockResolvedValue(
      returnOject,
    );

    const result = await service.listActivitiesByUser(userId);
    expect(result).toEqual(returnOject);
    expect(
      mockUserActivityRepository.listActivitiesByUser,
    ).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when list activities by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockUserActivityRepository.listActivitiesByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.listActivitiesByUser(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list activities by product success and failure tests */
  it('should list activities by product', async () => {
    /**
     * Tests the list activities by product method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's listActivitiesByProduct method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: UserActivity[] = [{ id: 1 /* others data */ }];

    mockUserActivityRepository.listActivitiesByProduct.mockResolvedValue(
      returnOject,
    );

    const result = await service.listActivitiesByProduct(productId);
    expect(result).toEqual(returnOject);
    expect(
      mockUserActivityRepository.listActivitiesByProduct,
    ).toHaveBeenCalledWith(productId);
  });

  it('should throw an error when list activities by product method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockUserActivityRepository.listActivitiesByProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.listActivitiesByProduct(productId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update activity success and failure tests */
  it('should update activity', async () => {
    /**
     * Tests the update activity method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's updateActivity method is called with the correct data.
     */

    const id: number = 1;
    const activityDTO: Partial<UserActivityDTO> = {
      /* data */
    };

    const returnOject: UserActivity = { id: 1 /* others data */ };

    mockUserActivityRepository.updateActivity.mockResolvedValue(returnOject);

    const result = await service.updateActivity(id, activityDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.updateActivity).toHaveBeenCalledWith(
      id,
      activityDTO,
    );
  });

  it('should throw an error when update activity method fails', async () => {
    const id: number = 1;
    const activityDTO: Partial<UserActivityDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserActivityRepository.updateActivity.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateActivity(id, activityDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete activity success and failure tests */
  it('should delete activity', async () => {
    /**
     * Tests the delete activity method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's deleteActivity method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockUserActivityRepository.deleteActivity.mockResolvedValue(returnOject);

    const result = await service.deleteActivity(id);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.deleteActivity).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete activity method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockUserActivityRepository.deleteActivity.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteActivity(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list activities by date range success and failure tests */
  it('should list activities by date range', async () => {
    /**
     * Tests the list activities by date range method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's listActivitiesByDateRange method is called with the correct data.
     */

    const start: Date = {
      /* data */
    };
    const end: Date = {
      /* data */
    };

    const returnOject: UserActivity[] = [{ id: 1 /* others data */ }];

    mockUserActivityRepository.listActivitiesByDateRange.mockResolvedValue(
      returnOject,
    );

    const result = await service.listActivitiesByDateRange(start, end);
    expect(result).toEqual(returnOject);
    expect(
      mockUserActivityRepository.listActivitiesByDateRange,
    ).toHaveBeenCalledWith(start, end);
  });

  it('should throw an error when list activities by date range method fails', async () => {
    const start: Date = {
      /* data */
    };
    const end: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserActivityRepository.listActivitiesByDateRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.listActivitiesByDateRange(start, end);
    expect(result).rejects.toThrow('Repository error');
  });

  /* validate activity success and failure tests */
  it('should validate activity', async () => {
    /**
     * Tests the validate activity method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's validateActivity method is called with the correct data.
     */

    const activityDTO: UserActivityDTO = {
      /* data */
    };

    const returnOject: boolean = true;

    mockUserActivityRepository.validateActivity.mockResolvedValue(returnOject);

    const result = await service.validateActivity(activityDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserActivityRepository.validateActivity).toHaveBeenCalledWith(
      activityDTO,
    );
  });

  it('should throw an error when validate activity method fails', async () => {
    const activityDTO: UserActivityDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockUserActivityRepository.validateActivity.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.validateActivity(activityDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* count activities by user success and failure tests */
  it('should count activities by user', async () => {
    /**
     * Tests the count activities by user method.
     * Verifies that the returned userActivity matches the expected one
     * and that the repository's countActivitiesByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: number = 1;

    mockUserActivityRepository.countActivitiesByUser.mockResolvedValue(
      returnOject,
    );

    const result = await service.countActivitiesByUser(userId);
    expect(result).toEqual(returnOject);
    expect(
      mockUserActivityRepository.countActivitiesByUser,
    ).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when count activities by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockUserActivityRepository.countActivitiesByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.countActivitiesByUser(userId);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: UserActivity[] = [{ id: 1 /* others data */ }];

    mockUserActivityRepository.getRecentActivitiesByUser.mockResolvedValue(
      returnOject,
    );

    const result = await service.getRecentActivitiesByUser(userId, limit);
    expect(result).toEqual(returnOject);
    expect(
      mockUserActivityRepository.getRecentActivitiesByUser,
    ).toHaveBeenCalledWith(userId, limit);
  });

  it('should throw an error when get recent activities by user method fails', async () => {
    const userId: number = 1;
    const limit: number = 1;

    // Simulate a failure when calling the repository
    mockUserActivityRepository.getRecentActivitiesByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getRecentActivitiesByUser(userId, limit);
    expect(result).rejects.toThrow('Repository error');
  });
});

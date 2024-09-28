import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../../src/application/services/notification.service';
import { INotificationRepository } from '../../src/domain/repositories/notification.repository';
import { Notification } from '../../src/domain/entities/notification.entity';
import { NotificationDTO } from '../../src/presentation/dtos/notification.dto';

const mockNotificationRepository = {
  createNotification: jest.fn(),
  getNotificationById: jest.fn(),
  updateNotification: jest.fn(),
  deleteNotification: jest.fn(),
  getNotificationsByUserId: jest.fn(),
  getNotificationsByType: jest.fn(),
  getNotificationsByDateRange: jest.fn(),
  markNotificationAsRead: jest.fn(),
  countUnreadNotifications: jest.fn(),
  getRecentNotifications: jest.fn(),
};

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationRepository: INotificationRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: 'NotificationRepository',
          useValue: mockNotificationRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<NotificationService>(NotificationService);
    notificationRepository = module.get<INotificationRepository>(
      'NotificationRepository',
    );
  });

  /* create notification success and failure tests */
  it('should create notification', async () => {
    /**
     * Tests the create notification method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's createNotification method is called with the correct data.
     */

    const notificationDTO: NotificationDTO = {
      /* data */
    };

    const returnOject: Notification = { id: 1 /* others data */ };

    mockNotificationRepository.createNotification.mockResolvedValue(
      returnOject,
    );

    const result = await service.createNotification(notificationDTO);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.createNotification).toHaveBeenCalledWith(
      notificationDTO,
    );
  });

  it('should throw an error when create notification method fails', async () => {
    const notificationDTO: NotificationDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockNotificationRepository.createNotification.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createNotification(notificationDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get notification by id success and failure tests */
  it('should get notification by id', async () => {
    /**
     * Tests the get notification by id method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getNotificationById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Notification | null = { id: 1 /* others data */ };

    mockNotificationRepository.getNotificationById.mockResolvedValue(
      returnOject,
    );

    const result = await service.getNotificationById(id);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.getNotificationById).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when get notification by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.getNotificationById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getNotificationById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update notification success and failure tests */
  it('should update notification', async () => {
    /**
     * Tests the update notification method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's updateNotification method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<NotificationDTO> = {
      /* data */
    };

    const returnOject: Notification = { id: 1 /* others data */ };

    mockNotificationRepository.updateNotification.mockResolvedValue(
      returnOject,
    );

    const result = await service.updateNotification(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.updateNotification).toHaveBeenCalledWith(
      id,
      updates,
    );
  });

  it('should throw an error when update notification method fails', async () => {
    const id: number = 1;
    const updates: Partial<NotificationDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockNotificationRepository.updateNotification.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateNotification(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete notification success and failure tests */
  it('should delete notification', async () => {
    /**
     * Tests the delete notification method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's deleteNotification method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockNotificationRepository.deleteNotification.mockResolvedValue(
      returnOject,
    );

    const result = await service.deleteNotification(id);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.deleteNotification).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when delete notification method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.deleteNotification.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteNotification(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get notifications by user id success and failure tests */
  it('should get notifications by user id', async () => {
    /**
     * Tests the get notifications by user id method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getNotificationsByUserId method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Notification[] = [{ id: 1 /* others data */ }];

    mockNotificationRepository.getNotificationsByUserId.mockResolvedValue(
      returnOject,
    );

    const result = await service.getNotificationsByUserId(userId);
    expect(result).toEqual(returnOject);
    expect(
      mockNotificationRepository.getNotificationsByUserId,
    ).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get notifications by user id method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.getNotificationsByUserId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getNotificationsByUserId(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get notifications by type success and failure tests */
  it('should get notifications by type', async () => {
    /**
     * Tests the get notifications by type method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getNotificationsByType method is called with the correct data.
     */

    const type: NotificationType = {
      /* data */
    };

    const returnOject: Notification[] = [{ id: 1 /* others data */ }];

    mockNotificationRepository.getNotificationsByType.mockResolvedValue(
      returnOject,
    );

    const result = await service.getNotificationsByType(type);
    expect(result).toEqual(returnOject);
    expect(
      mockNotificationRepository.getNotificationsByType,
    ).toHaveBeenCalledWith(type);
  });

  it('should throw an error when get notifications by type method fails', async () => {
    const type: NotificationType = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockNotificationRepository.getNotificationsByType.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getNotificationsByType(type);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get notifications by date range success and failure tests */
  it('should get notifications by date range', async () => {
    /**
     * Tests the get notifications by date range method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getNotificationsByDateRange method is called with the correct data.
     */

    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    const returnOject: Notification[] = [{ id: 1 /* others data */ }];

    mockNotificationRepository.getNotificationsByDateRange.mockResolvedValue(
      returnOject,
    );

    const result = await service.getNotificationsByDateRange(
      startDate,
      endDate,
    );
    expect(result).toEqual(returnOject);
    expect(
      mockNotificationRepository.getNotificationsByDateRange,
    ).toHaveBeenCalledWith(startDate, endDate);
  });

  it('should throw an error when get notifications by date range method fails', async () => {
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockNotificationRepository.getNotificationsByDateRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getNotificationsByDateRange(
      startDate,
      endDate,
    );
    expect(result).rejects.toThrow('Repository error');
  });

  /* mark notification as read success and failure tests */
  it('should mark notification as read', async () => {
    /**
     * Tests the mark notification as read method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's markNotificationAsRead method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Notification = { id: 1 /* others data */ };

    mockNotificationRepository.markNotificationAsRead.mockResolvedValue(
      returnOject,
    );

    const result = await service.markNotificationAsRead(id);
    expect(result).toEqual(returnOject);
    expect(
      mockNotificationRepository.markNotificationAsRead,
    ).toHaveBeenCalledWith(id);
  });

  it('should throw an error when mark notification as read method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.markNotificationAsRead.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.markNotificationAsRead(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* count unread notifications success and failure tests */
  it('should count unread notifications', async () => {
    /**
     * Tests the count unread notifications method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's countUnreadNotifications method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: number = 1;

    mockNotificationRepository.countUnreadNotifications.mockResolvedValue(
      returnOject,
    );

    const result = await service.countUnreadNotifications(userId);
    expect(result).toEqual(returnOject);
    expect(
      mockNotificationRepository.countUnreadNotifications,
    ).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when count unread notifications method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.countUnreadNotifications.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.countUnreadNotifications(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get recent notifications success and failure tests */
  it('should get recent notifications', async () => {
    /**
     * Tests the get recent notifications method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getRecentNotifications method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Notification[] = [{ id: 1 /* others data */ }];

    mockNotificationRepository.getRecentNotifications.mockResolvedValue(
      returnOject,
    );

    const result = await service.getRecentNotifications(userId);
    expect(result).toEqual(returnOject);
    expect(
      mockNotificationRepository.getRecentNotifications,
    ).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get recent notifications method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.getRecentNotifications.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getRecentNotifications(userId);
    expect(result).rejects.toThrow('Repository error');
  });
});

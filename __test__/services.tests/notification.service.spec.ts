import { Test, TestingModule } from '@nestjs/testing';
import { NotificationService } from '../../src/application/services/notification.service';
import { INotificationRepository } from '../../src/domain/repositories/notification.repository';
import { Notification } from '../../src/domain/entities/notification.entity';
import { NotificationDTO } from '../../src/presentation/dtos/notification.dto';
import { NotificationType } from 'src/domain/enums/notification-type.enum';
import { fromNotificationDTO } from 'src/application/helper/to-entity/to.notification.entity';

const mockNotificationRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getByUserId: jest.fn(),
  getByType: jest.fn(),
  getByDateRange: jest.fn(),
  markAsRead: jest.fn(),
  countUnread: jest.fn(),
  getRecent: jest.fn(),
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('NotificationService', () => {
  let service: NotificationService;
  let notificationRepository: INotificationRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationService,
        {
          provide: 'INotificationRepository',
          useValue: mockNotificationRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<NotificationService>(NotificationService);
    notificationRepository = module.get<INotificationRepository>(
      'INotificationRepository',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* create notification success and failure tests */
  it('should create notification', async () => {
    /**
     * Tests the create notification method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's createNotification method is called with the correct data.
     */

    const notificationDTO: NotificationDTO = {
      userId: 1,
      type: NotificationType.INFO,
      content: 'Test notification',
      read: false,
      sentAt: new Date('2024-10-17T10:10:03.619Z'),
    };

    const returnOject: Notification = {
      id: 1,
      userId: 1,
      type: NotificationType.INFO,
      content: 'Test notification',
      read: false,
      sentAt: new Date('2024-10-17T10:10:03.619Z'),
    };

    mockNotificationRepository.create.mockResolvedValue(returnOject);

    const result = await service.createNotification(notificationDTO);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.create).toHaveBeenCalledWith(
      fromNotificationDTO(notificationDTO),
    );
  });

  it('should throw an error when create notification method fails', async () => {
    const notificationDTO: NotificationDTO = {
      userId: 1,
      type: NotificationType.INFO,
      content: 'Test notification',
      read: false,
    };

    // Simulate a failure when calling the repository
    mockNotificationRepository.create.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.createNotification(notificationDTO)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get notification by id success and failure tests */
  it('should get notification by id', async () => {
    /**
     * Tests the get notification by id method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getNotificationById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Notification | null = {
      id: 1,
      userId: 1,
      content: 'Test notification',
      read: false,
      type: NotificationType.INFO,
      sentAt: new Date(),
    };

    mockNotificationRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getNotificationById(id);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get notification by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.getById.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getNotificationById(id)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
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
        userId: 1,
        type: NotificationType.INFO,
        content: 'Updated content',
        read: false,
        sentAt: new Date(),
    };

    const returnOject: Notification = {
      id: 1,
      userId: 1,
      type: NotificationType.INFO,
      content: 'Updated content',
      read: false,
      sentAt: new Date(),
    };

    mockNotificationRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateNotification(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.update).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update notification method fails', async () => {
    const id: number = 1;
    const updates: Partial<NotificationDTO> = {
      content: 'Updated content',
    };

    // Simulate a failure when calling the repository
    mockNotificationRepository.update.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.updateNotification(id, updates)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
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

    mockNotificationRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteNotification(id);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete notification method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.delete.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.deleteNotification(id)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get notifications by user id success and failure tests */
  it('should get notifications by user id', async () => {
    /**
     * Tests the get notifications by user id method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getNotificationsByUserId method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Notification[] = [
      {
        id: 1,
        userId: 1,
        type: NotificationType.INFO,
        content: 'Test notification',
        read: false,
        sentAt: new Date(),
      },
    ];

    mockNotificationRepository.getByUserId.mockResolvedValue(returnOject);

    const result = await service.getNotificationsByUserId(userId);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.getByUserId).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get notifications by user id method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.getByUserId.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getNotificationsByUserId(userId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get notifications by type success and failure tests */
  it('should get notifications by type', async () => {
    /**
     * Tests the get notifications by type method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getNotificationsByType method is called with the correct data.
     */

    const type: NotificationType = NotificationType.INFO;

    const returnOject: Notification[] = [
      {
        id: 1,
        userId: 1,
        type: NotificationType.INFO,
        content: 'Test notification',
        read: false,
        sentAt: new Date(),
      },
    ];

    mockNotificationRepository.getByType.mockResolvedValue(returnOject);

    const result = await service.getNotificationsByType(type);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.getByType).toHaveBeenCalledWith(type);
  });

  it('should throw an error when get notifications by type method fails', async () => {
    const type: NotificationType = NotificationType.INFO;

    // Simulate a failure when calling the repository
    mockNotificationRepository.getByType.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getNotificationsByType(type)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get notifications by date range success and failure tests */
  it('should get notifications by date range', async () => {
    /**
     * Tests the get notifications by date range method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getNotificationsByDateRange method is called with the correct data.
     */

    const startDate: Date = new Date('2023-01-01');
    const endDate: Date = new Date('2023-12-31');

    const returnOject: Notification[] = [
      {
        id: 1,
        userId: 1,
        type: NotificationType.INFO,
        content: 'Test notification',
        read: false,
        sentAt: new Date(),
      },
    ];

    mockNotificationRepository.getByDateRange.mockResolvedValue(returnOject);

    const result = await service.getNotificationsByDateRange(
      startDate,
      endDate,
    );
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.getByDateRange).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });

  it('should throw an error when get notifications by date range method fails', async () => {
    const startDate: Date = new Date('2023-01-01');
    const endDate: Date = new Date('2023-12-31');

    // Simulate a failure when calling the repository
    mockNotificationRepository.getByDateRange.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.getNotificationsByDateRange(startDate, endDate),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* mark notification as read success and failure tests */
  it('should mark notification as read', async () => {
    /**
     * Tests the mark notification as read method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's markNotificationAsRead method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Notification = {
      id: 1,
      userId: 1,
      type: NotificationType.INFO,
      content: 'Test notification',
      read: true,
      sentAt: new Date(),
    };

    mockNotificationRepository.markAsRead.mockResolvedValue(returnOject);

    const result = await service.markNotificationAsRead(id);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.markAsRead).toHaveBeenCalledWith(id);
  });

  it('should throw an error when mark notification as read method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.markAsRead.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.markNotificationAsRead(id)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
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

    mockNotificationRepository.countUnread.mockResolvedValue(returnOject);

    const result = await service.countUnreadNotifications(userId);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.countUnread).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when count unread notifications method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.countUnread.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.countUnreadNotifications(userId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get recent notifications success and failure tests */
  it('should get recent notifications', async () => {
    /**
     * Tests the get recent notifications method.
     * Verifies that the returned notification matches the expected one
     * and that the repository's getRecentNotifications method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Notification[] = [
      {
        id: 1,
        userId: 1,
        type: NotificationType.INFO,
        content: 'Test notification',
        read: false,
        sentAt: new Date(),
      },
    ];

    mockNotificationRepository.getRecent.mockResolvedValue(returnOject);

    const result = await service.getRecentNotifications(userId);
    expect(result).toEqual(returnOject);
    expect(mockNotificationRepository.getRecent).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get recent notifications method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockNotificationRepository.getRecent.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getRecentNotifications(userId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});

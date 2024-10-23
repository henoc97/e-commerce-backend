import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterSubscriptionService } from '../../src/application/services/newsletter-subscription.service';
import { INewsletterSubscriptionRepository } from '../../src/domain/repositories/newsletter-subscription.repository';
import { NewsletterSubscription } from '../../src/domain/entities/newsletter-subscription.entity';
import { NewsletterSubscriptionDTO } from '../../src/presentation/dtos/newsletter-subscription.dto';

const mockNewsletterSubscriptionRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  listAllByShop: jest.fn(),
  getByEmailAndShop: jest.fn(),
  isSubscribed: jest.fn(),
  getByDateRange: jest.fn(),
  countAllForShop: jest.fn(),
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('NewsletterSubscriptionService', () => {
  let service: NewsletterSubscriptionService;
  let newsletterSubscriptionRepository: INewsletterSubscriptionRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsletterSubscriptionService,
        {
          provide: 'INewsletterSubscriptionRepository',
          useValue: mockNewsletterSubscriptionRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<NewsletterSubscriptionService>(
      NewsletterSubscriptionService,
    );
    newsletterSubscriptionRepository =
      module.get<INewsletterSubscriptionRepository>(
        'INewsletterSubscriptionRepository',
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* create subscription success and failure tests */
  it('should create subscription', async () => {
    const dto: NewsletterSubscriptionDTO = {
      id: 1,
      email: 'example@example.com',
      shopId: 1,
      isActive: true,
      subscribedAt: new Date('2024-10-17T10:10:03.619Z'),
    };

    const returnObject: NewsletterSubscription = {
      id: 1,
      email: 'example@example.com',
      shopId: 1,
      isActive: true,
      subscribedAt: new Date('2024-10-17T10:10:03.619Z'),
    };

    mockNewsletterSubscriptionRepository.create.mockResolvedValue(returnObject);

    const result = await service.createSubscription(dto);
    expect(result).toEqual(returnObject);
    // Adjust the expected object to match the actual call
    expect(mockNewsletterSubscriptionRepository.create).toHaveBeenCalledWith({
      id: 1,
      email: 'example@example.com',
      shopId: 1,
      isActive: true,
      subscribedAt: new Date('2024-10-17T10:10:03.619Z'),
    });
  });

  it('should throw an error when create subscription method fails', async () => {
    const dto: NewsletterSubscriptionDTO = {
      email: 'example@example.com',
      shopId: 1,
      isActive: true,
    };

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.create.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.createSubscription(dto)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get subscription by id success and failure tests */
  it('should get subscription by id', async () => {
    /**
     * Tests the get subscription by id method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's getSubscriptionById method is called with the correct data.
     */

    const id: number = 1;

    const returnObject: NewsletterSubscription | null = {
      id: 1,
      email: 'example@example.com',
      shopId: 1,
      isActive: true,
      subscribedAt: new Date(),
    };

    mockNewsletterSubscriptionRepository.getById.mockResolvedValue(
      returnObject,
    );

    const result = await service.getSubscriptionById(id);
    expect(result).toEqual(returnObject);
    expect(mockNewsletterSubscriptionRepository.getById).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when get subscription by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.getById.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getSubscriptionById(id)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* Test: Update subscription */
  it('should update subscription', async () => {
    const id: number = 1;
    const updates: Partial<NewsletterSubscriptionDTO> = {
        email: 'updated@example.com',
        shopId: 1,
        isActive: false,
        subscribedAt: new Date('2024-10-17T10:10:03.619Z'),
    };

    const returnObject: NewsletterSubscription = {
      id: 1,
      email: 'updated@example.com',
      shopId: 1,
      isActive: false,
      subscribedAt: new Date('2024-10-17T10:10:03.619Z'),
    };

    mockNewsletterSubscriptionRepository.update.mockResolvedValue(returnObject);

    const result = await service.updateSubscription(id, updates);
    expect(result).toEqual(returnObject);
    expect(mockNewsletterSubscriptionRepository.update).toHaveBeenCalledWith(
      id,
      {
        email: 'updated@example.com',
        shopId: 1,
        isActive: false,
        subscribedAt: new Date('2024-10-17T10:10:03.619Z'),
      },
    );
  });

  /* Test: Update subscription failure */
  it('should throw an error when update subscription method fails', async () => {
    const id: number = 1;
    const updates: Partial<NewsletterSubscriptionDTO> = {
      email: 'updated@example.com',
      isActive: false,
    };

    mockNewsletterSubscriptionRepository.update.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.updateSubscription(id, updates)).rejects.toThrow(
      'Repository error',
    );
    consoleErrorMock.mockRestore();
  });

  /* delete subscription success and failure tests */
  it('should delete subscription', async () => {
    /**
     * Tests the delete subscription method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's deleteSubscription method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockNewsletterSubscriptionRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteSubscription(id);
    expect(result).toEqual(returnOject);
    expect(mockNewsletterSubscriptionRepository.delete).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when delete subscription method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.delete.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.deleteSubscription(id)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* list all subscriptions success and failure tests */
  it('should list all subscriptions', async () => {
    /**
     * Tests the list all subscriptions method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's listAllSubscriptions method is called with the correct data.
     */

    const shopId: number = 1;

    const returnObject: NewsletterSubscription[] = [
      {
        id: 1,
        email: 'example@example.com',
        shopId: 1,
        isActive: true,
        subscribedAt: new Date(),
      },
    ];

    mockNewsletterSubscriptionRepository.listAllByShop.mockResolvedValue(
      returnObject,
    );

    const result = await service.listAllSubscriptions(shopId);
    expect(result).toEqual(returnObject);
    expect(
      mockNewsletterSubscriptionRepository.listAllByShop,
    ).toHaveBeenCalledWith(shopId);
  });

  it('should throw an error when list all subscriptions method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.listAllByShop.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.listAllSubscriptions(shopId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get subscription by email success and failure tests */
  it('should get subscription by email', async () => {
    /**
     * Tests the get subscription by email method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's getSubscriptionByEmail method is called with the correct data.
     */

    const email: string = 'email';
    const shopId: number = 1;

    const returnObject: NewsletterSubscription | null = {
      id: 1,
      email: 'example@example.com',
      shopId: 1,
      isActive: true,
      subscribedAt: new Date(),
    };

    mockNewsletterSubscriptionRepository.getByEmailAndShop.mockResolvedValue(
      returnObject,
    );

    const result = await service.getSubscriptionByEmail(email, shopId);
    expect(result).toEqual(returnObject);
    expect(
      mockNewsletterSubscriptionRepository.getByEmailAndShop,
    ).toHaveBeenCalledWith(email, shopId);
  });

  it('should throw an error when get subscription by email method fails', async () => {
    const email: string = 'email';
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.getByEmailAndShop.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getSubscriptionByEmail(email, shopId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* is email subscribed success and failure tests */
  it('should is email subscribed', async () => {
    /**
     * Tests the is email subscribed method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's isEmailSubscribed method is called with the correct data.
     */

    const email: string = 'email';
    const shopId: number = 1;

    const returnOject: boolean = true;

    mockNewsletterSubscriptionRepository.isSubscribed.mockResolvedValue(
      returnOject,
    );

    const result = await service.isEmailSubscribed(email, shopId);
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.isSubscribed,
    ).toHaveBeenCalledWith(email, shopId);
  });

  it('should throw an error when is email subscribed method fails', async () => {
    const email: string = 'email';
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.isSubscribed.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.isEmailSubscribed(email, shopId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get subscriptions by date range success and failure tests */
  it('should get subscriptions by date range', async () => {
    /**
     * Tests the get subscriptions by date range method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's getSubscriptionsByDateRange method is called with the correct data.
     */

    const shopId: number = 1;
    const startDate: Date = new Date('2023-01-01');
    const endDate: Date = new Date('2023-12-31');

    const returnObject: NewsletterSubscription[] = [
      {
        id: 1,
        email: 'example@example.com',
        shopId: 1,
        isActive: true,
        subscribedAt: new Date(),
      },
    ];

    mockNewsletterSubscriptionRepository.getByDateRange.mockResolvedValue(
      returnObject,
    );

    const result = await service.getSubscriptionsByDateRange(
      shopId,
      startDate,
      endDate,
    );
    expect(result).toEqual(returnObject);
    expect(
      mockNewsletterSubscriptionRepository.getByDateRange,
    ).toHaveBeenCalledWith(shopId, startDate, endDate);
  });

  it('should throw an error when get subscriptions by date range method fails', async () => {
    const shopId: number = 1;
    const startDate: Date = new Date('2023-01-01');
    const endDate: Date = new Date('2023-12-31');

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.getByDateRange.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.getSubscriptionsByDateRange(shopId, startDate, endDate),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* count total subscriptions success and failure tests */
  it('should count total subscriptions', async () => {
    /**
     * Tests the count total subscriptions method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's countTotalSubscriptions method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: number = 1;

    mockNewsletterSubscriptionRepository.countAllForShop.mockResolvedValue(
      returnOject,
    );

    const result = await service.countTotalSubscriptions(shopId);
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.countAllForShop,
    ).toHaveBeenCalledWith(shopId);
  });

  it('should throw an error when count total subscriptions method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.countAllForShop.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.countTotalSubscriptions(shopId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});

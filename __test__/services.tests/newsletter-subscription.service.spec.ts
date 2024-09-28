import { Test, TestingModule } from '@nestjs/testing';
import { NewsletterSubscriptionService } from '../../src/application/services/newsletter-subscription.service';
import { INewsletterSubscriptionRepository } from '../../src/domain/repositories/newsletter-subscription.repository';
import { NewsletterSubscription } from '../../src/domain/entities/newsletter-subscription.entity';
import { NewsletterSubscriptionDTO } from '../../src/presentation/dtos/newsletter-subscription.dto';

const mockNewsletterSubscriptionRepository = {
  createSubscription: jest.fn(),
  getSubscriptionById: jest.fn(),
  updateSubscription: jest.fn(),
  deleteSubscription: jest.fn(),
  listAllSubscriptions: jest.fn(),
  getSubscriptionByEmail: jest.fn(),
  isEmailSubscribed: jest.fn(),
  getSubscriptionsByDateRange: jest.fn(),
  countTotalSubscriptions: jest.fn(),
};

describe('NewsletterSubscriptionService', () => {
  let service: NewsletterSubscriptionService;
  let newsletterSubscriptionRepository: INewsletterSubscriptionRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsletterSubscriptionService,
        {
          provide: 'NewsletterSubscriptionRepository',
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
        'NewsletterSubscriptionRepository',
      );
  });

  /* create subscription success and failure tests */
  it('should create subscription', async () => {
    /**
     * Tests the create subscription method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's createSubscription method is called with the correct data.
     */

    const dto: NewsletterSubscriptionDTO = {
      /* data */
    };

    const returnOject: NewsletterSubscription = { id: 1 /* others data */ };

    mockNewsletterSubscriptionRepository.createSubscription.mockResolvedValue(
      returnOject,
    );

    const result = await service.createSubscription(dto);
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.createSubscription,
    ).toHaveBeenCalledWith(dto);
  });

  it('should throw an error when create subscription method fails', async () => {
    const dto: NewsletterSubscriptionDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.createSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createSubscription(dto);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subscription by id success and failure tests */
  it('should get subscription by id', async () => {
    /**
     * Tests the get subscription by id method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's getSubscriptionById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: NewsletterSubscription | null = {
      id: 1 /* others data */,
    };

    mockNewsletterSubscriptionRepository.getSubscriptionById.mockResolvedValue(
      returnOject,
    );

    const result = await service.getSubscriptionById(id);
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.getSubscriptionById,
    ).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get subscription by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.getSubscriptionById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getSubscriptionById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update subscription success and failure tests */
  it('should update subscription', async () => {
    /**
     * Tests the update subscription method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's updateSubscription method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<NewsletterSubscriptionDTO> = {
      /* data */
    };

    const returnOject: NewsletterSubscription = { id: 1 /* others data */ };

    mockNewsletterSubscriptionRepository.updateSubscription.mockResolvedValue(
      returnOject,
    );

    const result = await service.updateSubscription(id, updates);
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.updateSubscription,
    ).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update subscription method fails', async () => {
    const id: number = 1;
    const updates: Partial<NewsletterSubscriptionDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.updateSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateSubscription(id, updates);
    expect(result).rejects.toThrow('Repository error');
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

    mockNewsletterSubscriptionRepository.deleteSubscription.mockResolvedValue(
      returnOject,
    );

    const result = await service.deleteSubscription(id);
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.deleteSubscription,
    ).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete subscription method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.deleteSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteSubscription(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list all subscriptions success and failure tests */
  it('should list all subscriptions', async () => {
    /**
     * Tests the list all subscriptions method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's listAllSubscriptions method is called with the correct data.
     */

    const returnOject: NewsletterSubscription[] = [{ id: 1 /* others data */ }];

    mockNewsletterSubscriptionRepository.listAllSubscriptions.mockResolvedValue(
      returnOject,
    );

    const result = await service.listAllSubscriptions();
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.listAllSubscriptions,
    ).toHaveBeenCalledWith();
  });

  it('should throw an error when list all subscriptions method fails', async () => {
    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.listAllSubscriptions.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.listAllSubscriptions();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subscription by email success and failure tests */
  it('should get subscription by email', async () => {
    /**
     * Tests the get subscription by email method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's getSubscriptionByEmail method is called with the correct data.
     */

    const email: string = 'email';

    const returnOject: NewsletterSubscription | null = {
      id: 1 /* others data */,
    };

    mockNewsletterSubscriptionRepository.getSubscriptionByEmail.mockResolvedValue(
      returnOject,
    );

    const result = await service.getSubscriptionByEmail(email);
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.getSubscriptionByEmail,
    ).toHaveBeenCalledWith(email);
  });

  it('should throw an error when get subscription by email method fails', async () => {
    const email: string = 'email';

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.getSubscriptionByEmail.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getSubscriptionByEmail(email);
    expect(result).rejects.toThrow('Repository error');
  });

  /* is email subscribed success and failure tests */
  it('should is email subscribed', async () => {
    /**
     * Tests the is email subscribed method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's isEmailSubscribed method is called with the correct data.
     */

    const email: string = 'email';

    const returnOject: boolean = true;

    mockNewsletterSubscriptionRepository.isEmailSubscribed.mockResolvedValue(
      returnOject,
    );

    const result = await service.isEmailSubscribed(email);
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.isEmailSubscribed,
    ).toHaveBeenCalledWith(email);
  });

  it('should throw an error when is email subscribed method fails', async () => {
    const email: string = 'email';

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.isEmailSubscribed.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.isEmailSubscribed(email);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subscriptions by date range success and failure tests */
  it('should get subscriptions by date range', async () => {
    /**
     * Tests the get subscriptions by date range method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's getSubscriptionsByDateRange method is called with the correct data.
     */

    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    const returnOject: NewsletterSubscription[] = [{ id: 1 /* others data */ }];

    mockNewsletterSubscriptionRepository.getSubscriptionsByDateRange.mockResolvedValue(
      returnOject,
    );

    const result = await service.getSubscriptionsByDateRange(
      startDate,
      endDate,
    );
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.getSubscriptionsByDateRange,
    ).toHaveBeenCalledWith(startDate, endDate);
  });

  it('should throw an error when get subscriptions by date range method fails', async () => {
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.getSubscriptionsByDateRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getSubscriptionsByDateRange(
      startDate,
      endDate,
    );
    expect(result).rejects.toThrow('Repository error');
  });

  /* count total subscriptions success and failure tests */
  it('should count total subscriptions', async () => {
    /**
     * Tests the count total subscriptions method.
     * Verifies that the returned newsletterSubscription matches the expected one
     * and that the repository's countTotalSubscriptions method is called with the correct data.
     */

    const returnOject: number = 1;

    mockNewsletterSubscriptionRepository.countTotalSubscriptions.mockResolvedValue(
      returnOject,
    );

    const result = await service.countTotalSubscriptions();
    expect(result).toEqual(returnOject);
    expect(
      mockNewsletterSubscriptionRepository.countTotalSubscriptions,
    ).toHaveBeenCalledWith();
  });

  it('should throw an error when count total subscriptions method fails', async () => {
    // Simulate a failure when calling the repository
    mockNewsletterSubscriptionRepository.countTotalSubscriptions.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.countTotalSubscriptions();
    expect(result).rejects.toThrow('Repository error');
  });
});

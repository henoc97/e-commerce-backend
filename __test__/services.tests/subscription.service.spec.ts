import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from '../../src/application/services/subscription.service';
import { ISubscriptionRepository } from '../../src/domain/repositories/subscription.repository';
import { Subscription } from '../../src/domain/entities/subscription.entity';
import { SubscriptionDTO } from '../../src/presentation/dtos/subscription.dto';

const mockSubscriptionRepository = {
  createSubscription: jest.fn(),
  getSubscriptionById: jest.fn(),
  updateSubscription: jest.fn(),
  deleteSubscription: jest.fn(),
  getSubscriptionsByVendor: jest.fn(),
  getSubscriptionsByPriceRange: jest.fn(),
  getActiveSubscriptions: jest.fn(),
  getExpiredSubscriptions: jest.fn(),
  getExpiringSubscriptions: jest.fn(),
  getLatestSubscription: jest.fn(),
  countSubscriptionsByVendor: jest.fn(),
};

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let subscriptionRepository: ISubscriptionRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: 'SubscriptionRepository',
          useValue: mockSubscriptionRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<SubscriptionService>(SubscriptionService);
    subscriptionRepository = module.get<ISubscriptionRepository>(
      'SubscriptionRepository',
    );
  });

  /* create subscription success and failure tests */
  it('should create subscription', async () => {
    /**
     * Tests the create subscription method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's createSubscription method is called with the correct data.
     */

    const subscriptionDto: SubscriptionDTO = {
      /* data */
    };

    const returnOject: Subscription = { id: 1 /* others data */ };

    mockSubscriptionRepository.createSubscription.mockResolvedValue(
      returnOject,
    );

    const result = await service.createSubscription(subscriptionDto);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.createSubscription).toHaveBeenCalledWith(
      subscriptionDto,
    );
  });

  it('should throw an error when create subscription method fails', async () => {
    const subscriptionDto: SubscriptionDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockSubscriptionRepository.createSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createSubscription(subscriptionDto);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subscription by id success and failure tests */
  it('should get subscription by id', async () => {
    /**
     * Tests the get subscription by id method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's getSubscriptionById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Subscription | null = { id: 1 /* others data */ };

    mockSubscriptionRepository.getSubscriptionById.mockResolvedValue(
      returnOject,
    );

    const result = await service.getSubscriptionById(id);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.getSubscriptionById).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when get subscription by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockSubscriptionRepository.getSubscriptionById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getSubscriptionById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update subscription success and failure tests */
  it('should update subscription', async () => {
    /**
     * Tests the update subscription method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's updateSubscription method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<SubscriptionDTO> = {
      /* data */
    };

    const returnOject: Subscription = { id: 1 /* others data */ };

    mockSubscriptionRepository.updateSubscription.mockResolvedValue(
      returnOject,
    );

    const result = await service.updateSubscription(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.updateSubscription).toHaveBeenCalledWith(
      id,
      updates,
    );
  });

  it('should throw an error when update subscription method fails', async () => {
    const id: number = 1;
    const updates: Partial<SubscriptionDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockSubscriptionRepository.updateSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateSubscription(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete subscription success and failure tests */
  it('should delete subscription', async () => {
    /**
     * Tests the delete subscription method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's deleteSubscription method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockSubscriptionRepository.deleteSubscription.mockResolvedValue(
      returnOject,
    );

    const result = await service.deleteSubscription(id);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.deleteSubscription).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when delete subscription method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockSubscriptionRepository.deleteSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteSubscription(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subscriptions by vendor success and failure tests */
  it('should get subscriptions by vendor', async () => {
    /**
     * Tests the get subscriptions by vendor method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's getSubscriptionsByVendor method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: Subscription[] = [{ id: 1 /* others data */ }];

    mockSubscriptionRepository.getSubscriptionsByVendor.mockResolvedValue(
      returnOject,
    );

    const result = await service.getSubscriptionsByVendor(vendorId);
    expect(result).toEqual(returnOject);
    expect(
      mockSubscriptionRepository.getSubscriptionsByVendor,
    ).toHaveBeenCalledWith(vendorId);
  });

  it('should throw an error when get subscriptions by vendor method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockSubscriptionRepository.getSubscriptionsByVendor.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getSubscriptionsByVendor(vendorId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subscriptions by price range success and failure tests */
  it('should get subscriptions by price range', async () => {
    /**
     * Tests the get subscriptions by price range method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's getSubscriptionsByPriceRange method is called with the correct data.
     */

    const minPrice: number = 1;
    const maxPrice: number = 1;

    const returnOject: Subscription[] = [{ id: 1 /* others data */ }];

    mockSubscriptionRepository.getSubscriptionsByPriceRange.mockResolvedValue(
      returnOject,
    );

    const result = await service.getSubscriptionsByPriceRange(
      minPrice,
      maxPrice,
    );
    expect(result).toEqual(returnOject);
    expect(
      mockSubscriptionRepository.getSubscriptionsByPriceRange,
    ).toHaveBeenCalledWith(minPrice, maxPrice);
  });

  it('should throw an error when get subscriptions by price range method fails', async () => {
    const minPrice: number = 1;
    const maxPrice: number = 1;

    // Simulate a failure when calling the repository
    mockSubscriptionRepository.getSubscriptionsByPriceRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getSubscriptionsByPriceRange(
      minPrice,
      maxPrice,
    );
    expect(result).rejects.toThrow('Repository error');
  });

  /* get active subscriptions success and failure tests */
  it('should get active subscriptions', async () => {
    /**
     * Tests the get active subscriptions method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's getActiveSubscriptions method is called with the correct data.
     */

    const returnOject: Subscription[] = [{ id: 1 /* others data */ }];

    mockSubscriptionRepository.getActiveSubscriptions.mockResolvedValue(
      returnOject,
    );

    const result = await service.getActiveSubscriptions();
    expect(result).toEqual(returnOject);
    expect(
      mockSubscriptionRepository.getActiveSubscriptions,
    ).toHaveBeenCalledWith();
  });

  it('should throw an error when get active subscriptions method fails', async () => {
    // Simulate a failure when calling the repository
    mockSubscriptionRepository.getActiveSubscriptions.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getActiveSubscriptions();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get expired subscriptions success and failure tests */
  it('should get expired subscriptions', async () => {
    /**
     * Tests the get expired subscriptions method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's getExpiredSubscriptions method is called with the correct data.
     */

    const returnOject: Subscription[] = [{ id: 1 /* others data */ }];

    mockSubscriptionRepository.getExpiredSubscriptions.mockResolvedValue(
      returnOject,
    );

    const result = await service.getExpiredSubscriptions();
    expect(result).toEqual(returnOject);
    expect(
      mockSubscriptionRepository.getExpiredSubscriptions,
    ).toHaveBeenCalledWith();
  });

  it('should throw an error when get expired subscriptions method fails', async () => {
    // Simulate a failure when calling the repository
    mockSubscriptionRepository.getExpiredSubscriptions.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getExpiredSubscriptions();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get expiring subscriptions success and failure tests */
  it('should get expiring subscriptions', async () => {
    /**
     * Tests the get expiring subscriptions method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's getExpiringSubscriptions method is called with the correct data.
     */

    const days: number = 1;

    const returnOject: Subscription[] = [{ id: 1 /* others data */ }];

    mockSubscriptionRepository.getExpiringSubscriptions.mockResolvedValue(
      returnOject,
    );

    const result = await service.getExpiringSubscriptions(days);
    expect(result).toEqual(returnOject);
    expect(
      mockSubscriptionRepository.getExpiringSubscriptions,
    ).toHaveBeenCalledWith(days);
  });

  it('should throw an error when get expiring subscriptions method fails', async () => {
    const days: number = 1;

    // Simulate a failure when calling the repository
    mockSubscriptionRepository.getExpiringSubscriptions.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getExpiringSubscriptions(days);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get latest subscription success and failure tests */
  it('should get latest subscription', async () => {
    /**
     * Tests the get latest subscription method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's getLatestSubscription method is called with the correct data.
     */

    const returnOject: Subscription = { id: 1 /* others data */ };

    mockSubscriptionRepository.getLatestSubscription.mockResolvedValue(
      returnOject,
    );

    const result = await service.getLatestSubscription();
    expect(result).toEqual(returnOject);
    expect(
      mockSubscriptionRepository.getLatestSubscription,
    ).toHaveBeenCalledWith();
  });

  it('should throw an error when get latest subscription method fails', async () => {
    // Simulate a failure when calling the repository
    mockSubscriptionRepository.getLatestSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getLatestSubscription();
    expect(result).rejects.toThrow('Repository error');
  });

  /* count subscriptions by vendor success and failure tests */
  it('should count subscriptions by vendor', async () => {
    /**
     * Tests the count subscriptions by vendor method.
     * Verifies that the returned subscription matches the expected one
     * and that the repository's countSubscriptionsByVendor method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: number = 1;

    mockSubscriptionRepository.countSubscriptionsByVendor.mockResolvedValue(
      returnOject,
    );

    const result = await service.countSubscriptionsByVendor(vendorId);
    expect(result).toEqual(returnOject);
    expect(
      mockSubscriptionRepository.countSubscriptionsByVendor,
    ).toHaveBeenCalledWith(vendorId);
  });

  it('should throw an error when count subscriptions by vendor method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockSubscriptionRepository.countSubscriptionsByVendor.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.countSubscriptionsByVendor(vendorId);
    expect(result).rejects.toThrow('Repository error');
  });
});

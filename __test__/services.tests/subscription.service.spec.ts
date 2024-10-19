import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionService } from '../../src/application/services/subscription.service';
import { ISubscriptionRepository } from '../../src/domain/repositories/subscription.repository';
import { Subscription } from '../../src/domain/entities/subscription.entity';
import { SubscriptionDTO } from '../../src/presentation/dtos/subscription.dto';


const mockSubscriptionRepository = {
  create: jest.fn(),
getById: jest.fn(),
update: jest.fn(),
remove: jest.fn(),
getByVendor: jest.fn(),
getByPriceRange: jest.fn(),
getActive: jest.fn(),
getExpired: jest.fn(),
getExpiringSoon: jest.fn(),
getLatest: jest.fn(),
countByVendor: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('SubscriptionService', () => {
    let service: SubscriptionService;
    let subscriptionRepository: ISubscriptionRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: 'ISubscriptionRepository',
          useValue: mockSubscriptionRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<SubscriptionService>(SubscriptionService);
    subscriptionRepository = module.get<ISubscriptionRepository>('ISubscriptionRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create subscription success and failure tests */
it('should create subscription', async () => {
    /** 
     * Tests the create subscription method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's createSubscription method is called with the correct data.
     */
    
     const subscriptionDto: SubscriptionDTO = { /* data */ };

    const returnOject: Subscription = { id: 1, /* others data */ };
    
    mockSubscriptionRepository.create.mockResolvedValue(returnOject);

    const result = await service.createSubscription(subscriptionDto,);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.create).toHaveBeenCalledWith(subscriptionDto,);
});

it('should throw an error when create subscription method fails', async () => {
    
     const subscriptionDto: SubscriptionDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createSubscription(subscriptionDto,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get subscription by id success and failure tests */
it('should get subscription by id', async () => {
    /** 
     * Tests the get subscription by id method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's getSubscriptionById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Subscription | null = { id: 1, /* others data */ };
    
    mockSubscriptionRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getSubscriptionById(id);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get subscription by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getSubscriptionById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update subscription success and failure tests */
it('should update subscription', async () => {
    /** 
     * Tests the update subscription method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's updateSubscription method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<SubscriptionDTO> = { /* data */ };

    const returnOject: Subscription = { id: 1, /* others data */ };
    
    mockSubscriptionRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateSubscription(id,
    updates,);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.update).toHaveBeenCalledWith(id,
    updates,);
});

it('should throw an error when update subscription method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<SubscriptionDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateSubscription(id,
    updates,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete subscription success and failure tests */
it('should delete subscription', async () => {
    /** 
     * Tests the delete subscription method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's deleteSubscription method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockSubscriptionRepository.remove.mockResolvedValue(returnOject);

    const result = await service.deleteSubscription(id);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.remove).toHaveBeenCalledWith(id);
});

it('should throw an error when delete subscription method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.remove.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteSubscription(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get subscriptions by vendor success and failure tests */
it('should get subscriptions by vendor', async () => {
    /** 
     * Tests the get subscriptions by vendor method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's getSubscriptionsByVendor method is called with the correct data.
     */
    
     const vendorId: number = 1;

    const returnOject: Subscription[] = [{ id: 1, /* others data */ }];
    
    mockSubscriptionRepository.getByVendor.mockResolvedValue(returnOject);

    const result = await service.getSubscriptionsByVendor(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.getByVendor).toHaveBeenCalledWith(vendorId);
});

it('should throw an error when get subscriptions by vendor method fails', async () => {
    
     const vendorId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.getByVendor.mockRejectedValue(new Error('Repository error'));

    await expect(service.getSubscriptionsByVendor(vendorId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
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

    const returnOject: Subscription[] = [{ id: 1, /* others data */ }];
    
    mockSubscriptionRepository.getByPriceRange.mockResolvedValue(returnOject);

    const result = await service.getSubscriptionsByPriceRange(minPrice,
    maxPrice,);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.getByPriceRange).toHaveBeenCalledWith(minPrice,
    maxPrice,);
});

it('should throw an error when get subscriptions by price range method fails', async () => {
    
     const minPrice: number = 1;
     const maxPrice: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.getByPriceRange.mockRejectedValue(new Error('Repository error'));

    await expect(service.getSubscriptionsByPriceRange(minPrice,
    maxPrice,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get active subscriptions success and failure tests */
it('should get active subscriptions', async () => {
    /** 
     * Tests the get active subscriptions method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's getActiveSubscriptions method is called with the correct data.
     */
    

    const returnOject: Subscription[] = [{ id: 1, /* others data */ }];
    
    mockSubscriptionRepository.getActive.mockResolvedValue(returnOject);

    const result = await service.getActiveSubscriptions();
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.getActive).toHaveBeenCalledWith();
});

it('should throw an error when get active subscriptions method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.getActive.mockRejectedValue(new Error('Repository error'));

    await expect(service.getActiveSubscriptions()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get expired subscriptions success and failure tests */
it('should get expired subscriptions', async () => {
    /** 
     * Tests the get expired subscriptions method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's getExpiredSubscriptions method is called with the correct data.
     */
    

    const returnOject: Subscription[] = [{ id: 1, /* others data */ }];
    
    mockSubscriptionRepository.getExpired.mockResolvedValue(returnOject);

    const result = await service.getExpiredSubscriptions();
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.getExpired).toHaveBeenCalledWith();
});

it('should throw an error when get expired subscriptions method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.getExpired.mockRejectedValue(new Error('Repository error'));

    await expect(service.getExpiredSubscriptions()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get expiring subscriptions success and failure tests */
it('should get expiring subscriptions', async () => {
    /** 
     * Tests the get expiring subscriptions method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's getExpiringSubscriptions method is called with the correct data.
     */
    
     const days: number = 1;

    const returnOject: Subscription[] = [{ id: 1, /* others data */ }];
    
    mockSubscriptionRepository.getExpiringSoon.mockResolvedValue(returnOject);

    const result = await service.getExpiringSubscriptions(days);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.getExpiringSoon).toHaveBeenCalledWith(days);
});

it('should throw an error when get expiring subscriptions method fails', async () => {
    
     const days: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.getExpiringSoon.mockRejectedValue(new Error('Repository error'));

    await expect(service.getExpiringSubscriptions(days)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get latest subscription success and failure tests */
it('should get latest subscription', async () => {
    /** 
     * Tests the get latest subscription method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's getLatestSubscription method is called with the correct data.
     */
    

    const returnOject: Subscription = { id: 1, /* others data */ };
    
    mockSubscriptionRepository.getLatest.mockResolvedValue(returnOject);

    const result = await service.getLatestSubscription();
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.getLatest).toHaveBeenCalledWith();
});

it('should throw an error when get latest subscription method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.getLatest.mockRejectedValue(new Error('Repository error'));

    await expect(service.getLatestSubscription()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* count subscriptions by vendor success and failure tests */
it('should count subscriptions by vendor', async () => {
    /** 
     * Tests the count subscriptions by vendor method.
     * Verifies that the returned subscription matches the expected one 
     * and that the repository's countSubscriptionsByVendor method is called with the correct data.
     */
    
     const vendorId: number = 1;

    const returnOject: number = 1
    
    mockSubscriptionRepository.countByVendor.mockResolvedValue(returnOject);

    const result = await service.countSubscriptionsByVendor(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockSubscriptionRepository.countByVendor).toHaveBeenCalledWith(vendorId);
});

it('should throw an error when count subscriptions by vendor method fails', async () => {
    
     const vendorId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubscriptionRepository.countByVendor.mockRejectedValue(new Error('Repository error'));

    await expect(service.countSubscriptionsByVendor(vendorId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

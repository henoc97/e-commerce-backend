import { Test, TestingModule } from '@nestjs/testing';
import { PromotionService } from '../../src/application/services/promotion.service';
import { IPromotionRepository } from '../../src/domain/repositories/promotion.repository';
import { Promotion } from '../../src/domain/entities/promotion.entity';
import { PromotionDTO } from '../../src/presentation/dtos/promotion.dto';


const mockPromotionRepository = {
  create: jest.fn(),
getById: jest.fn(),
modify: jest.fn(),
remove: jest.fn(),
getByProduct: jest.fn(),
getActiveBetween: jest.fn(),
getActive: jest.fn(),
getBestForProduct: jest.fn(),
combine: jest.fn(),
applyToProduct: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('PromotionService', () => {
    let service: PromotionService;
    let promotionRepository: IPromotionRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionService,
        {
          provide: 'IPromotionRepository',
          useValue: mockPromotionRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<PromotionService>(PromotionService);
    promotionRepository = module.get<IPromotionRepository>('IPromotionRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create promotion success and failure tests */
it('should create promotion', async () => {
    /** 
     * Tests the create promotion method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's createPromotion method is called with the correct data.
     */
    
     const promotionDTO: PromotionDTO = { /* data */ };

    const returnOject: Promotion = { id: 1, /* others data */ };
    
    mockPromotionRepository.create.mockResolvedValue(returnOject);

    const result = await service.createPromotion(promotionDTO);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.create).toHaveBeenCalledWith(promotionDTO);
});

it('should throw an error when create promotion method fails', async () => {
    
     const promotionDTO: PromotionDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createPromotion(promotionDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get promotion by id success and failure tests */
it('should get promotion by id', async () => {
    /** 
     * Tests the get promotion by id method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's getPromotionById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Promotion | null = { id: 1, /* others data */ };
    
    mockPromotionRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getPromotionById(id);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get promotion by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getPromotionById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update promotion success and failure tests */
it('should update promotion', async () => {
    /** 
     * Tests the update promotion method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's updatePromotion method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<PromotionDTO> = { /* data */ };

    const returnOject: Promotion = { id: 1, /* others data */ };
    
    mockPromotionRepository.modify.mockResolvedValue(returnOject);

    const result = await service.updatePromotion(id,
    updates,);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.modify).toHaveBeenCalledWith(id,
    updates,);
});

it('should throw an error when update promotion method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<PromotionDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.modify.mockRejectedValue(new Error('Repository error'));

    await expect(service.updatePromotion(id,
    updates,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete promotion success and failure tests */
it('should delete promotion', async () => {
    /** 
     * Tests the delete promotion method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's deletePromotion method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockPromotionRepository.remove.mockResolvedValue(returnOject);

    const result = await service.deletePromotion(id);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.remove).toHaveBeenCalledWith(id);
});

it('should throw an error when delete promotion method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.remove.mockRejectedValue(new Error('Repository error'));

    await expect(service.deletePromotion(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get promotions by product success and failure tests */
it('should get promotions by product', async () => {
    /** 
     * Tests the get promotions by product method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's getPromotionsByProduct method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: Promotion[] = [{ id: 1, /* others data */ }];
    
    mockPromotionRepository.getByProduct.mockResolvedValue(returnOject);

    const result = await service.getPromotionsByProduct(productId);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.getByProduct).toHaveBeenCalledWith(productId);
});

it('should throw an error when get promotions by product method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.getByProduct.mockRejectedValue(new Error('Repository error'));

    await expect(service.getPromotionsByProduct(productId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get active promotions between success and failure tests */
it('should get active promotions between', async () => {
    /** 
     * Tests the get active promotions between method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's getActivePromotionsBetween method is called with the correct data.
     */
    
     const start: Date = { /* data */ };
     const end: Date = { /* data */ };

    const returnOject: Promotion[] = [{ id: 1, /* others data */ }];
    
    mockPromotionRepository.getActiveBetween.mockResolvedValue(returnOject);

    const result = await service.getActivePromotionsBetween(start,
    end,);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.getActiveBetween).toHaveBeenCalledWith(start,
    end,);
});

it('should throw an error when get active promotions between method fails', async () => {
    
     const start: Date = { /* data */ };
     const end: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.getActiveBetween.mockRejectedValue(new Error('Repository error'));

    await expect(service.getActivePromotionsBetween(start,
    end,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get active promotions success and failure tests */
it('should get active promotions', async () => {
    /** 
     * Tests the get active promotions method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's getActivePromotions method is called with the correct data.
     */
    

    const returnOject: Promotion[] = [{ id: 1, /* others data */ }];
    
    mockPromotionRepository.getActive.mockResolvedValue(returnOject);

    const result = await service.getActivePromotions();
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.getActive).toHaveBeenCalledWith();
});

it('should throw an error when get active promotions method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.getActive.mockRejectedValue(new Error('Repository error'));

    await expect(service.getActivePromotions()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get best promotion for product success and failure tests */
it('should get best promotion for product', async () => {
    /** 
     * Tests the get best promotion for product method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's getBestPromotionForProduct method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: Promotion | null = { id: 1, /* others data */ };
    
    mockPromotionRepository.getBestForProduct.mockResolvedValue(returnOject);

    const result = await service.getBestPromotionForProduct(productId,);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.getBestForProduct).toHaveBeenCalledWith(productId,);
});

it('should throw an error when get best promotion for product method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.getBestForProduct.mockRejectedValue(new Error('Repository error'));

    await expect(service.getBestPromotionForProduct(productId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* combine promotions success and failure tests */
it('should combine promotions', async () => {
    /** 
     * Tests the combine promotions method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's combinePromotions method is called with the correct data.
     */
    
     const promotions: PromotionDTO = { /* data */ };

    const returnOject: Promotion | null = { id: 1, /* others data */ };
    
    mockPromotionRepository.combine.mockResolvedValue(returnOject);

    const result = await service.combinePromotions(promotions,);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.combine).toHaveBeenCalledWith(promotions,);
});

it('should throw an error when combine promotions method fails', async () => {
    
     const promotions: PromotionDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.combine.mockRejectedValue(new Error('Repository error'));

    await expect(service.combinePromotions(promotions,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* apply promotion to product success and failure tests */
it('should apply promotion to product', async () => {
    /** 
     * Tests the apply promotion to product method.
     * Verifies that the returned promotion matches the expected one 
     * and that the repository's applyPromotionToProduct method is called with the correct data.
     */
    
     const productId: number = 1;
     const promotionId: number = 1;

    const returnOject: Promotion = { id: 1, /* others data */ };
    
    mockPromotionRepository.applyToProduct.mockResolvedValue(returnOject);

    const result = await service.applyPromotionToProduct(productId,
    promotionId,);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.applyToProduct).toHaveBeenCalledWith(productId,
    promotionId,);
});

it('should throw an error when apply promotion to product method fails', async () => {
    
     const productId: number = 1;
     const promotionId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockPromotionRepository.applyToProduct.mockRejectedValue(new Error('Repository error'));

    await expect(service.applyPromotionToProduct(productId,
    promotionId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

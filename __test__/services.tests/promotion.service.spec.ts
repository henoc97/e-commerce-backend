import { Test, TestingModule } from '@nestjs/testing';
import { PromotionService } from '../../src/application/services/promotion.service';
import { IPromotionRepository } from '../../src/domain/repositories/promotion.repository';
import { Promotion } from '../../src/domain/entities/promotion.entity';
import { PromotionDTO } from '../../src/presentation/dtos/promotion.dto';

const mockPromotionRepository = {
  createPromotion: jest.fn(),
  getPromotionById: jest.fn(),
  updatePromotion: jest.fn(),
  deletePromotion: jest.fn(),
  getPromotionsByProduct: jest.fn(),
  getActivePromotionsBetween: jest.fn(),
  getActivePromotions: jest.fn(),
  getBestPromotionForProduct: jest.fn(),
  combinePromotions: jest.fn(),
  applyPromotionToProduct: jest.fn(),
};

describe('PromotionService', () => {
  let service: PromotionService;
  let promotionRepository: IPromotionRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromotionService,
        {
          provide: 'PromotionRepository',
          useValue: mockPromotionRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<PromotionService>(PromotionService);
    promotionRepository = module.get<IPromotionRepository>(
      'PromotionRepository',
    );
  });

  /* create promotion success and failure tests */
  it('should create promotion', async () => {
    /**
     * Tests the create promotion method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's createPromotion method is called with the correct data.
     */

    const promotionDTO: PromotionDTO = {
      /* data */
    };

    const returnOject: Promotion = { id: 1 /* others data */ };

    mockPromotionRepository.createPromotion.mockResolvedValue(returnOject);

    const result = await service.createPromotion(promotionDTO);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.createPromotion).toHaveBeenCalledWith(
      promotionDTO,
    );
  });

  it('should throw an error when create promotion method fails', async () => {
    const promotionDTO: PromotionDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockPromotionRepository.createPromotion.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createPromotion(promotionDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get promotion by id success and failure tests */
  it('should get promotion by id', async () => {
    /**
     * Tests the get promotion by id method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's getPromotionById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Promotion | null = { id: 1 /* others data */ };

    mockPromotionRepository.getPromotionById.mockResolvedValue(returnOject);

    const result = await service.getPromotionById(id);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.getPromotionById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get promotion by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockPromotionRepository.getPromotionById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getPromotionById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update promotion success and failure tests */
  it('should update promotion', async () => {
    /**
     * Tests the update promotion method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's updatePromotion method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<PromotionDTO> = {
      /* data */
    };

    const returnOject: Promotion = { id: 1 /* others data */ };

    mockPromotionRepository.updatePromotion.mockResolvedValue(returnOject);

    const result = await service.updatePromotion(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.updatePromotion).toHaveBeenCalledWith(
      id,
      updates,
    );
  });

  it('should throw an error when update promotion method fails', async () => {
    const id: number = 1;
    const updates: Partial<PromotionDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockPromotionRepository.updatePromotion.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updatePromotion(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete promotion success and failure tests */
  it('should delete promotion', async () => {
    /**
     * Tests the delete promotion method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's deletePromotion method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockPromotionRepository.deletePromotion.mockResolvedValue(returnOject);

    const result = await service.deletePromotion(id);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.deletePromotion).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete promotion method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockPromotionRepository.deletePromotion.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deletePromotion(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get promotions by product success and failure tests */
  it('should get promotions by product', async () => {
    /**
     * Tests the get promotions by product method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's getPromotionsByProduct method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: Promotion[] = [{ id: 1 /* others data */ }];

    mockPromotionRepository.getPromotionsByProduct.mockResolvedValue(
      returnOject,
    );

    const result = await service.getPromotionsByProduct(productId);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.getPromotionsByProduct).toHaveBeenCalledWith(
      productId,
    );
  });

  it('should throw an error when get promotions by product method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockPromotionRepository.getPromotionsByProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getPromotionsByProduct(productId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get active promotions between success and failure tests */
  it('should get active promotions between', async () => {
    /**
     * Tests the get active promotions between method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's getActivePromotionsBetween method is called with the correct data.
     */

    const start: Date = {
      /* data */
    };
    const end: Date = {
      /* data */
    };

    const returnOject: Promotion[] = [{ id: 1 /* others data */ }];

    mockPromotionRepository.getActivePromotionsBetween.mockResolvedValue(
      returnOject,
    );

    const result = await service.getActivePromotionsBetween(start, end);
    expect(result).toEqual(returnOject);
    expect(
      mockPromotionRepository.getActivePromotionsBetween,
    ).toHaveBeenCalledWith(start, end);
  });

  it('should throw an error when get active promotions between method fails', async () => {
    const start: Date = {
      /* data */
    };
    const end: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockPromotionRepository.getActivePromotionsBetween.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getActivePromotionsBetween(start, end);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get active promotions success and failure tests */
  it('should get active promotions', async () => {
    /**
     * Tests the get active promotions method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's getActivePromotions method is called with the correct data.
     */

    const returnOject: Promotion[] = [{ id: 1 /* others data */ }];

    mockPromotionRepository.getActivePromotions.mockResolvedValue(returnOject);

    const result = await service.getActivePromotions();
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.getActivePromotions).toHaveBeenCalledWith();
  });

  it('should throw an error when get active promotions method fails', async () => {
    // Simulate a failure when calling the repository
    mockPromotionRepository.getActivePromotions.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getActivePromotions();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get best promotion for product success and failure tests */
  it('should get best promotion for product', async () => {
    /**
     * Tests the get best promotion for product method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's getBestPromotionForProduct method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: Promotion | null = { id: 1 /* others data */ };

    mockPromotionRepository.getBestPromotionForProduct.mockResolvedValue(
      returnOject,
    );

    const result = await service.getBestPromotionForProduct(productId);
    expect(result).toEqual(returnOject);
    expect(
      mockPromotionRepository.getBestPromotionForProduct,
    ).toHaveBeenCalledWith(productId);
  });

  it('should throw an error when get best promotion for product method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockPromotionRepository.getBestPromotionForProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getBestPromotionForProduct(productId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* combine promotions success and failure tests */
  it('should combine promotions', async () => {
    /**
     * Tests the combine promotions method.
     * Verifies that the returned promotion matches the expected one
     * and that the repository's combinePromotions method is called with the correct data.
     */

    const promotions: PromotionDTO = {
      /* data */
    };

    const returnOject: Promotion | null = { id: 1 /* others data */ };

    mockPromotionRepository.combinePromotions.mockResolvedValue(returnOject);

    const result = await service.combinePromotions(promotions);
    expect(result).toEqual(returnOject);
    expect(mockPromotionRepository.combinePromotions).toHaveBeenCalledWith(
      promotions,
    );
  });

  it('should throw an error when combine promotions method fails', async () => {
    const promotions: PromotionDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockPromotionRepository.combinePromotions.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.combinePromotions(promotions);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: Promotion = { id: 1 /* others data */ };

    mockPromotionRepository.applyPromotionToProduct.mockResolvedValue(
      returnOject,
    );

    const result = await service.applyPromotionToProduct(
      productId,
      promotionId,
    );
    expect(result).toEqual(returnOject);
    expect(
      mockPromotionRepository.applyPromotionToProduct,
    ).toHaveBeenCalledWith(productId, promotionId);
  });

  it('should throw an error when apply promotion to product method fails', async () => {
    const productId: number = 1;
    const promotionId: number = 1;

    // Simulate a failure when calling the repository
    mockPromotionRepository.applyPromotionToProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.applyPromotionToProduct(
      productId,
      promotionId,
    );
    expect(result).rejects.toThrow('Repository error');
  });
});

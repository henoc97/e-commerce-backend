import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceService } from '../../src/application/services/marketplace.service';
import { IMarketplaceRepository } from '../../src/domain/repositories/marketplace.repository';
import { Marketplace } from '../../src/domain/entities/marketplace.entity';
import { MarketplaceDTO } from '../../src/presentation/dtos/marketplace.dto';

const mockMarketplaceRepository = {
  createMarketplace: jest.fn(),
  getMarketplaceById: jest.fn(),
  listMarketplaces: jest.fn(),
  updateMarketplace: jest.fn(),
  deleteMarketplace: jest.fn(),
  addShopToMarketplace: jest.fn(),
  removeShopFromMarketplace: jest.fn(),
  getShopsInMarketplace: jest.fn(),
  getMarketplaceByShopId: jest.fn(),
};

describe('MarketplaceService', () => {
  let service: MarketplaceService;
  let marketplaceRepository: IMarketplaceRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketplaceService,
        {
          provide: 'MarketplaceRepository',
          useValue: mockMarketplaceRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<MarketplaceService>(MarketplaceService);
    marketplaceRepository = module.get<IMarketplaceRepository>(
      'MarketplaceRepository',
    );
  });

  /* create marketplace success and failure tests */
  it('should create marketplace', async () => {
    /**
     * Tests the create marketplace method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's createMarketplace method is called with the correct data.
     */

    const dto: MarketplaceDTO = {
      /* data */
    };

    const returnOject: Marketplace = { id: 1 /* others data */ };

    mockMarketplaceRepository.createMarketplace.mockResolvedValue(returnOject);

    const result = await service.createMarketplace(dto);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.createMarketplace).toHaveBeenCalledWith(
      dto,
    );
  });

  it('should throw an error when create marketplace method fails', async () => {
    const dto: MarketplaceDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.createMarketplace.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createMarketplace(dto);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get marketplace by id success and failure tests */
  it('should get marketplace by id', async () => {
    /**
     * Tests the get marketplace by id method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's getMarketplaceById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Marketplace | null = { id: 1 /* others data */ };

    mockMarketplaceRepository.getMarketplaceById.mockResolvedValue(returnOject);

    const result = await service.getMarketplaceById(id);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.getMarketplaceById).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when get marketplace by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.getMarketplaceById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getMarketplaceById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list marketplaces success and failure tests */
  it('should list marketplaces', async () => {
    /**
     * Tests the list marketplaces method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's listMarketplaces method is called with the correct data.
     */

    const returnOject: Marketplace[] = [{ id: 1 /* others data */ }];

    mockMarketplaceRepository.listMarketplaces.mockResolvedValue(returnOject);

    const result = await service.listMarketplaces();
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.listMarketplaces).toHaveBeenCalledWith();
  });

  it('should throw an error when list marketplaces method fails', async () => {
    // Simulate a failure when calling the repository
    mockMarketplaceRepository.listMarketplaces.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.listMarketplaces();
    expect(result).rejects.toThrow('Repository error');
  });

  /* update marketplace success and failure tests */
  it('should update marketplace', async () => {
    /**
     * Tests the update marketplace method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's updateMarketplace method is called with the correct data.
     */

    const id: number = 1;
    const data: Partial<MarketplaceDTO> = {
      /* data */
    };

    const returnOject: Marketplace = { id: 1 /* others data */ };

    mockMarketplaceRepository.updateMarketplace.mockResolvedValue(returnOject);

    const result = await service.updateMarketplace(id, data);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.updateMarketplace).toHaveBeenCalledWith(
      id,
      data,
    );
  });

  it('should throw an error when update marketplace method fails', async () => {
    const id: number = 1;
    const data: Partial<MarketplaceDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.updateMarketplace.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateMarketplace(id, data);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete marketplace success and failure tests */
  it('should delete marketplace', async () => {
    /**
     * Tests the delete marketplace method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's deleteMarketplace method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockMarketplaceRepository.deleteMarketplace.mockResolvedValue(returnOject);

    const result = await service.deleteMarketplace(id);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.deleteMarketplace).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when delete marketplace method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.deleteMarketplace.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteMarketplace(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* add shop to marketplace success and failure tests */
  it('should add shop to marketplace', async () => {
    /**
     * Tests the add shop to marketplace method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's addShopToMarketplace method is called with the correct data.
     */

    const marketplaceId: number = 1;
    const shopDTO: ShopDTO = {
      /* data */
    };

    const returnOject: Marketplace = { id: 1 /* others data */ };

    mockMarketplaceRepository.addShopToMarketplace.mockResolvedValue(
      returnOject,
    );

    const result = await service.addShopToMarketplace(marketplaceId, shopDTO);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.addShopToMarketplace).toHaveBeenCalledWith(
      marketplaceId,
      shopDTO,
    );
  });

  it('should throw an error when add shop to marketplace method fails', async () => {
    const marketplaceId: number = 1;
    const shopDTO: ShopDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.addShopToMarketplace.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.addShopToMarketplace(marketplaceId, shopDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* remove shop from marketplace success and failure tests */
  it('should remove shop from marketplace', async () => {
    /**
     * Tests the remove shop from marketplace method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's removeShopFromMarketplace method is called with the correct data.
     */

    const marketplaceId: number = 1;
    const shopId: number = 1;

    const returnOject: Marketplace = { id: 1 /* others data */ };

    mockMarketplaceRepository.removeShopFromMarketplace.mockResolvedValue(
      returnOject,
    );

    const result = await service.removeShopFromMarketplace(
      marketplaceId,
      shopId,
    );
    expect(result).toEqual(returnOject);
    expect(
      mockMarketplaceRepository.removeShopFromMarketplace,
    ).toHaveBeenCalledWith(marketplaceId, shopId);
  });

  it('should throw an error when remove shop from marketplace method fails', async () => {
    const marketplaceId: number = 1;
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.removeShopFromMarketplace.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.removeShopFromMarketplace(
      marketplaceId,
      shopId,
    );
    expect(result).rejects.toThrow('Repository error');
  });

  /* get shops in marketplace success and failure tests */
  it('should get shops in marketplace', async () => {
    /**
     * Tests the get shops in marketplace method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's getShopsInMarketplace method is called with the correct data.
     */

    const marketplaceId: number = 1;

    const returnOject: Shop[] = [{ id: 1 /* others data */ }];

    mockMarketplaceRepository.getShopsInMarketplace.mockResolvedValue(
      returnOject,
    );

    const result = await service.getShopsInMarketplace(marketplaceId);
    expect(result).toEqual(returnOject);
    expect(
      mockMarketplaceRepository.getShopsInMarketplace,
    ).toHaveBeenCalledWith(marketplaceId);
  });

  it('should throw an error when get shops in marketplace method fails', async () => {
    const marketplaceId: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.getShopsInMarketplace.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getShopsInMarketplace(marketplaceId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get marketplace by shop id success and failure tests */
  it('should get marketplace by shop id', async () => {
    /**
     * Tests the get marketplace by shop id method.
     * Verifies that the returned marketplace matches the expected one
     * and that the repository's getMarketplaceByShopId method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: Marketplace | null = { id: 1 /* others data */ };

    mockMarketplaceRepository.getMarketplaceByShopId.mockResolvedValue(
      returnOject,
    );

    const result = await service.getMarketplaceByShopId(shopId);
    expect(result).toEqual(returnOject);
    expect(
      mockMarketplaceRepository.getMarketplaceByShopId,
    ).toHaveBeenCalledWith(shopId);
  });

  it('should throw an error when get marketplace by shop id method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.getMarketplaceByShopId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getMarketplaceByShopId(shopId);
    expect(result).rejects.toThrow('Repository error');
  });
});

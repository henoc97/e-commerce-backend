import { Test, TestingModule } from '@nestjs/testing';
import { MarketplaceService } from '../../src/application/services/marketplace.service';
import { IMarketplaceRepository } from '../../src/domain/repositories/marketplace.repository';
import { Marketplace } from '../../src/domain/entities/marketplace.entity';
import { MarketplaceDTO } from '../../src/presentation/dtos/marketplace.dto';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { Shop } from 'src/domain/entities/shop.entity';
import { Vendor } from 'src/domain/entities/vendor.entity';
import { User } from 'src/domain/entities/user.entity';
import { ShopService } from '../../src/application/services/shop.service';

const mockMarketplaceRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  list: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  addShop: jest.fn(),
  removeShop: jest.fn(),
  getShops: jest.fn(),
  getMarketplaceByShopId: jest.fn(),
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

// Mock ShopService
const mockShopService = {
  associateMarketplaceWithShop: jest.fn(),
  deleteShop: jest.fn(),
};

describe('MarketplaceService', () => {
  let service: MarketplaceService;
  let marketplaceRepository: IMarketplaceRepository;

  beforeEach(async () => {
    // Set up the testing module with the service, the mock repository, and the mock ShopService
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarketplaceService,
        {
          provide: 'IMarketplaceRepository',
          useValue: mockMarketplaceRepository, // Use the mock
        },
        {
          provide: ShopService,
          useValue: mockShopService, // Use the mock ShopService
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<MarketplaceService>(MarketplaceService);
    marketplaceRepository = module.get<IMarketplaceRepository>(
      'IMarketplaceRepository',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* create marketplace success and failure tests */
  it('should create marketplace', async () => {
    const dto: MarketplaceDTO = {
      name: 'Test Marketplace',
      description: 'A test marketplace',
      shops: [],
    };

    const returnOject: Marketplace = {
      id: 1,
      name: 'Test Marketplace',
      description: 'A test marketplace',
      shops: [],
      // Ajoutez d'autres propriétés requises ici
    };

    mockMarketplaceRepository.create.mockResolvedValue(returnOject);

    const result = await service.createMarketplace(dto);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should throw an error when create marketplace method fails', async () => {
    const dto: MarketplaceDTO = {
      name: 'Test Marketplace',
      description: 'A test marketplace',
    };

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.create.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.createMarketplace(dto)).rejects.toThrow(Error);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get marketplace by id success and failure tests */
  it('should get marketplace by id', async () => {
    const id: number = 1;

    const returnOject: Marketplace | null = {
      id: 1,
      name: 'Test Marketplace',
      shops: [] /* autres données */,
    };

    mockMarketplaceRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getMarketplaceById(id);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get marketplace by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.getById.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getMarketplaceById(id)).rejects.toThrow(Error);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* list marketplaces success and failure tests */
  it('should list marketplaces', async () => {
    const returnOject: Marketplace[] = [
      { id: 1, name: 'Test Marketplace', shops: [] /* autres données */ },
    ];

    mockMarketplaceRepository.list.mockResolvedValue(returnOject);

    const result = await service.listMarketplaces();
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.list).toHaveBeenCalledWith();
  });

  it('should throw an error when list marketplaces method fails', async () => {
    // Simulate a failure when calling the repository
    mockMarketplaceRepository.list.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.listMarketplaces()).rejects.toThrow(Error);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* update marketplace success and failure tests */
  it('should update marketplace', async () => {
    const id: number = 1;
    const data: Partial<MarketplaceDTO> = {
      name: 'Updated Marketplace',
      description: 'A test marketplace',
      shops: [],
    };

    const returnOject: Marketplace = {
      id: 1,
      name: 'Updated Marketplace',
      description: 'A test marketplace',
      shops: [],
    };

    mockMarketplaceRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateMarketplace(id, data);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.update).toHaveBeenCalledWith(id, data);
  });

  it('should throw an error when update marketplace method fails', async () => {
    const id: number = 1;
    const data: Partial<MarketplaceDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.update.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.updateMarketplace(id, data)).rejects.toThrow(Error);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* delete marketplace success and failure tests */
  it('should delete marketplace', async () => {
    const id: number = 1;

    const returnOject: boolean = true;

    mockMarketplaceRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteMarketplace(id);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete marketplace method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.delete.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.deleteMarketplace(id)).rejects.toThrow(Error);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* add shop to marketplace success and failure tests */
  it('should add shop to marketplace', async () => {
    const marketplaceId: number = 1;
    const shopId: number = 1;

    const returnOject: Marketplace = {
      id: 1,
      name: 'Test Marketplace',
      description: 'A test marketplace',
      shops: [],
    };

    // Assurez-vous que le mock renvoie la valeur correcte
    mockMarketplaceRepository.addShop.mockResolvedValue(returnOject);

    const result = await service.addShopToMarketplace(marketplaceId, shopId);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.addShop).toHaveBeenCalledWith(
      marketplaceId,
      shopId,
    );
  });

  it('should throw an error when add shop to marketplace method fails', async () => {
    const marketplaceId: number = 1;
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.addShop.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.addShopToMarketplace(marketplaceId, shopId),
    ).rejects.toThrow(Error);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* remove shop from marketplace success and failure tests */
  it('should remove shop from marketplace', async () => {
    const marketplaceId: number = 1;
    const shopId: number = 1;

    const returnOject: Marketplace = {
      id: 1,
      name: 'Test Marketplace',
      description: 'A test marketplace',
      shops: [],
    };

    // Assurez-vous que le mock renvoie la valeur correcte
    mockMarketplaceRepository.removeShop.mockResolvedValue(returnOject);

    const result = await service.removeShopFromMarketplace(
      marketplaceId,
      shopId,
    );
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.removeShop).toHaveBeenCalledWith(
      marketplaceId,
      shopId,
    );
  });

  it('should throw an error when remove shop from marketplace method fails', async () => {
    const marketplaceId: number = 1;
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.removeShop.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.removeShopFromMarketplace(marketplaceId, shopId),
    ).rejects.toThrow(Error);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get shops in marketplace success and failure tests */
  it('should get shops in marketplace', async () => {
    const marketplaceId: number = 1;

    const returnOject: Shop[] = [
      new Shop(
        1,
        'Test Shop',
        'https://test.com',
        123,
        [],
        [],
        [],
        new Date(),
        new Date(),
      ),
    ];

    mockMarketplaceRepository.getShops.mockResolvedValue(returnOject);

    const result = await service.getShopsInMarketplace(marketplaceId);
    expect(result).toEqual(returnOject);
    expect(mockMarketplaceRepository.getShops).toHaveBeenCalledWith(
      marketplaceId,
    );
  });

  it('should throw an error when get shops in marketplace method fails', async () => {
    const marketplaceId: number = 1;

    // Simulate a failure when calling the repository
    mockMarketplaceRepository.getShops.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getShopsInMarketplace(marketplaceId)).rejects.toThrow(
      Error,
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get marketplace by shop id success and failure tests */
  it('should get marketplace by shop id', async () => {
    const shopId: number = 1;

    const returnOject: Marketplace | null = {
      id: 1,
      name: 'Test Marketplace',
      shops: [] /* autres données */,
    };

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
    mockMarketplaceRepository.getMarketplaceByShopId.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getMarketplaceByShopId(shopId)).rejects.toThrow(Error);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});

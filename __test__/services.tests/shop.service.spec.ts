import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from '../../src/application/services/shop.service';
import { IShopRepository } from '../../src/domain/repositories/shop.repository';
import { Shop } from '../../src/domain/entities/shop.entity';
import { ShopDTO } from '../../src/presentation/dtos/shop.dto';

const mockShopRepository = {
  createShop: jest.fn(),
  getShopById: jest.fn(),
  updateShop: jest.fn(),
  deleteShop: jest.fn(),
  searchShopsByName: jest.fn(),
  addProductToShop: jest.fn(),
  removeProductFromShop: jest.fn(),
  listProductsForShop: jest.fn(),
  addOrderToShop: jest.fn(),
  listOrdersForShop: jest.fn(),
  addCategoryToShop: jest.fn(),
  removeCategoryFromShop: jest.fn(),
  listCategoriesForShop: jest.fn(),
  associateMarketplaceWithShop: jest.fn(),
  getMarketplaceForShop: jest.fn(),
  listShopsByVendor: jest.fn(),
  getMostRecentShop: jest.fn(),
  getTotalSalesForShop: jest.fn(),
  getOrderReportForShop: jest.fn(),
  getTopProductForShop: jest.fn(),
};

describe('ShopService', () => {
  let service: ShopService;
  let shopRepository: IShopRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: 'ShopRepository',
          useValue: mockShopRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ShopService>(ShopService);
    shopRepository = module.get<IShopRepository>('ShopRepository');
  });

  /* create shop success and failure tests */
  it('should create shop', async () => {
    /**
     * Tests the create shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's createShop method is called with the correct data.
     */

    const shopDTO: ShopDTO = {
      /* data */
    };

    const returnOject: Shop = { id: 1 /* others data */ };

    mockShopRepository.createShop.mockResolvedValue(returnOject);

    const result = await service.createShop(shopDTO);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.createShop).toHaveBeenCalledWith(shopDTO);
  });

  it('should throw an error when create shop method fails', async () => {
    const shopDTO: ShopDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockShopRepository.createShop.mockResolvedValue(' Repository error');

    const result = await service.createShop(shopDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get shop by id success and failure tests */
  it('should get shop by id', async () => {
    /**
     * Tests the get shop by id method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's getShopById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Shop | null = { id: 1 /* others data */ };

    mockShopRepository.getShopById.mockResolvedValue(returnOject);

    const result = await service.getShopById(id);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getShopById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get shop by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.getShopById.mockResolvedValue(' Repository error');

    const result = await service.getShopById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update shop success and failure tests */
  it('should update shop', async () => {
    /**
     * Tests the update shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's updateShop method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<ShopDTO> = {
      /* data */
    };

    const returnOject: Shop = { id: 1 /* others data */ };

    mockShopRepository.updateShop.mockResolvedValue(returnOject);

    const result = await service.updateShop(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.updateShop).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update shop method fails', async () => {
    const id: number = 1;
    const updates: Partial<ShopDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockShopRepository.updateShop.mockResolvedValue(' Repository error');

    const result = await service.updateShop(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete shop success and failure tests */
  it('should delete shop', async () => {
    /**
     * Tests the delete shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's deleteShop method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockShopRepository.deleteShop.mockResolvedValue(returnOject);

    const result = await service.deleteShop(id);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.deleteShop).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete shop method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.deleteShop.mockResolvedValue(' Repository error');

    const result = await service.deleteShop(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* search shops by name success and failure tests */
  it('should search shops by name', async () => {
    /**
     * Tests the search shops by name method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's searchShopsByName method is called with the correct data.
     */

    const name: string = 'name';

    const returnOject: Shop[] = [{ id: 1 /* others data */ }];

    mockShopRepository.searchShopsByName.mockResolvedValue(returnOject);

    const result = await service.searchShopsByName(name);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.searchShopsByName).toHaveBeenCalledWith(name);
  });

  it('should throw an error when search shops by name method fails', async () => {
    const name: string = 'name';

    // Simulate a failure when calling the repository
    mockShopRepository.searchShopsByName.mockResolvedValue(' Repository error');

    const result = await service.searchShopsByName(name);
    expect(result).rejects.toThrow('Repository error');
  });

  /* add product to shop success and failure tests */
  it('should add product to shop', async () => {
    /**
     * Tests the add product to shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's addProductToShop method is called with the correct data.
     */

    const shopId: number = 1;
    const product: ProductDTO = {
      /* data */
    };

    const returnOject: Shop = { id: 1 /* others data */ };

    mockShopRepository.addProductToShop.mockResolvedValue(returnOject);

    const result = await service.addProductToShop(shopId, product);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.addProductToShop).toHaveBeenCalledWith(
      shopId,
      product,
    );
  });

  it('should throw an error when add product to shop method fails', async () => {
    const shopId: number = 1;
    const product: ProductDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockShopRepository.addProductToShop.mockResolvedValue(' Repository error');

    const result = await service.addProductToShop(shopId, product);
    expect(result).rejects.toThrow('Repository error');
  });

  /* remove product from shop success and failure tests */
  it('should remove product from shop', async () => {
    /**
     * Tests the remove product from shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's removeProductFromShop method is called with the correct data.
     */

    const shopId: number = 1;
    const productId: number = 1;

    const returnOject: Shop = { id: 1 /* others data */ };

    mockShopRepository.removeProductFromShop.mockResolvedValue(returnOject);

    const result = await service.removeProductFromShop(shopId, productId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.removeProductFromShop).toHaveBeenCalledWith(
      shopId,
      productId,
    );
  });

  it('should throw an error when remove product from shop method fails', async () => {
    const shopId: number = 1;
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.removeProductFromShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.removeProductFromShop(shopId, productId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list products for shop success and failure tests */
  it('should list products for shop', async () => {
    /**
     * Tests the list products for shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's listProductsForShop method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: Product[] = [{ id: 1 /* others data */ }];

    mockShopRepository.listProductsForShop.mockResolvedValue(returnOject);

    const result = await service.listProductsForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.listProductsForShop).toHaveBeenCalledWith(shopId);
  });

  it('should throw an error when list products for shop method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.listProductsForShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.listProductsForShop(shopId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* add order to shop success and failure tests */
  it('should add order to shop', async () => {
    /**
     * Tests the add order to shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's addOrderToShop method is called with the correct data.
     */

    const shopId: number = 1;
    const order: OrderDTO = {
      /* data */
    };

    const returnOject: Shop = { id: 1 /* others data */ };

    mockShopRepository.addOrderToShop.mockResolvedValue(returnOject);

    const result = await service.addOrderToShop(shopId, order);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.addOrderToShop).toHaveBeenCalledWith(
      shopId,
      order,
    );
  });

  it('should throw an error when add order to shop method fails', async () => {
    const shopId: number = 1;
    const order: OrderDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockShopRepository.addOrderToShop.mockResolvedValue(' Repository error');

    const result = await service.addOrderToShop(shopId, order);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list orders for shop success and failure tests */
  it('should list orders for shop', async () => {
    /**
     * Tests the list orders for shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's listOrdersForShop method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: Order[] = [{ id: 1 /* others data */ }];

    mockShopRepository.listOrdersForShop.mockResolvedValue(returnOject);

    const result = await service.listOrdersForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.listOrdersForShop).toHaveBeenCalledWith(shopId);
  });

  it('should throw an error when list orders for shop method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.listOrdersForShop.mockResolvedValue(' Repository error');

    const result = await service.listOrdersForShop(shopId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* add category to shop success and failure tests */
  it('should add category to shop', async () => {
    /**
     * Tests the add category to shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's addCategoryToShop method is called with the correct data.
     */

    const shopId: number = 1;
    const category: CategoryDTO = {
      /* data */
    };

    const returnOject: Shop = { id: 1 /* others data */ };

    mockShopRepository.addCategoryToShop.mockResolvedValue(returnOject);

    const result = await service.addCategoryToShop(shopId, category);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.addCategoryToShop).toHaveBeenCalledWith(
      shopId,
      category,
    );
  });

  it('should throw an error when add category to shop method fails', async () => {
    const shopId: number = 1;
    const category: CategoryDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockShopRepository.addCategoryToShop.mockResolvedValue(' Repository error');

    const result = await service.addCategoryToShop(shopId, category);
    expect(result).rejects.toThrow('Repository error');
  });

  /* remove category from shop success and failure tests */
  it('should remove category from shop', async () => {
    /**
     * Tests the remove category from shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's removeCategoryFromShop method is called with the correct data.
     */

    const shopId: number = 1;
    const categoryId: number = 1;

    const returnOject: Shop = { id: 1 /* others data */ };

    mockShopRepository.removeCategoryFromShop.mockResolvedValue(returnOject);

    const result = await service.removeCategoryFromShop(shopId, categoryId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.removeCategoryFromShop).toHaveBeenCalledWith(
      shopId,
      categoryId,
    );
  });

  it('should throw an error when remove category from shop method fails', async () => {
    const shopId: number = 1;
    const categoryId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.removeCategoryFromShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.removeCategoryFromShop(shopId, categoryId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list categories for shop success and failure tests */
  it('should list categories for shop', async () => {
    /**
     * Tests the list categories for shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's listCategoriesForShop method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: Category[] = [{ id: 1 /* others data */ }];

    mockShopRepository.listCategoriesForShop.mockResolvedValue(returnOject);

    const result = await service.listCategoriesForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.listCategoriesForShop).toHaveBeenCalledWith(
      shopId,
    );
  });

  it('should throw an error when list categories for shop method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.listCategoriesForShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.listCategoriesForShop(shopId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* associate marketplace with shop success and failure tests */
  it('should associate marketplace with shop', async () => {
    /**
     * Tests the associate marketplace with shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's associateMarketplaceWithShop method is called with the correct data.
     */

    const shopId: number = 1;
    const marketplace: MarketplaceDTO = {
      /* data */
    };

    const returnOject: Shop = { id: 1 /* others data */ };

    mockShopRepository.associateMarketplaceWithShop.mockResolvedValue(
      returnOject,
    );

    const result = await service.associateMarketplaceWithShop(
      shopId,
      marketplace,
    );
    expect(result).toEqual(returnOject);
    expect(
      mockShopRepository.associateMarketplaceWithShop,
    ).toHaveBeenCalledWith(shopId, marketplace);
  });

  it('should throw an error when associate marketplace with shop method fails', async () => {
    const shopId: number = 1;
    const marketplace: MarketplaceDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockShopRepository.associateMarketplaceWithShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.associateMarketplaceWithShop(
      shopId,
      marketplace,
    );
    expect(result).rejects.toThrow('Repository error');
  });

  /* get marketplace for shop success and failure tests */
  it('should get marketplace for shop', async () => {
    /**
     * Tests the get marketplace for shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's getMarketplaceForShop method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: Marketplace | null = { id: 1 /* others data */ };

    mockShopRepository.getMarketplaceForShop.mockResolvedValue(returnOject);

    const result = await service.getMarketplaceForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getMarketplaceForShop).toHaveBeenCalledWith(
      shopId,
    );
  });

  it('should throw an error when get marketplace for shop method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.getMarketplaceForShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getMarketplaceForShop(shopId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* list shops by vendor success and failure tests */
  it('should list shops by vendor', async () => {
    /**
     * Tests the list shops by vendor method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's listShopsByVendor method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: Shop[] = [{ id: 1 /* others data */ }];

    mockShopRepository.listShopsByVendor.mockResolvedValue(returnOject);

    const result = await service.listShopsByVendor(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.listShopsByVendor).toHaveBeenCalledWith(vendorId);
  });

  it('should throw an error when list shops by vendor method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.listShopsByVendor.mockResolvedValue(' Repository error');

    const result = await service.listShopsByVendor(vendorId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get most recent shop success and failure tests */
  it('should get most recent shop', async () => {
    /**
     * Tests the get most recent shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's getMostRecentShop method is called with the correct data.
     */

    const returnOject: Shop | null = { id: 1 /* others data */ };

    mockShopRepository.getMostRecentShop.mockResolvedValue(returnOject);

    const result = await service.getMostRecentShop();
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getMostRecentShop).toHaveBeenCalledWith();
  });

  it('should throw an error when get most recent shop method fails', async () => {
    // Simulate a failure when calling the repository
    mockShopRepository.getMostRecentShop.mockResolvedValue(' Repository error');

    const result = await service.getMostRecentShop();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get total sales for shop success and failure tests */
  it('should get total sales for shop', async () => {
    /**
     * Tests the get total sales for shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's getTotalSalesForShop method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: number = 1;

    mockShopRepository.getTotalSalesForShop.mockResolvedValue(returnOject);

    const result = await service.getTotalSalesForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getTotalSalesForShop).toHaveBeenCalledWith(
      shopId,
    );
  });

  it('should throw an error when get total sales for shop method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.getTotalSalesForShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getTotalSalesForShop(shopId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get order report for shop success and failure tests */
  it('should get order report for shop', async () => {
    /**
     * Tests the get order report for shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's getOrderReportForShop method is called with the correct data.
     */

    const shopId: number = 1;
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    const returnOject: any = { id: 1 /* others data */ };

    mockShopRepository.getOrderReportForShop.mockResolvedValue(returnOject);

    const result = await service.getOrderReportForShop(
      shopId,
      startDate,
      endDate,
    );
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getOrderReportForShop).toHaveBeenCalledWith(
      shopId,
      startDate,
      endDate,
    );
  });

  it('should throw an error when get order report for shop method fails', async () => {
    const shopId: number = 1;
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockShopRepository.getOrderReportForShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getOrderReportForShop(
      shopId,
      startDate,
      endDate,
    );
    expect(result).rejects.toThrow('Repository error');
  });

  /* get top product for shop success and failure tests */
  it('should get top product for shop', async () => {
    /**
     * Tests the get top product for shop method.
     * Verifies that the returned shop matches the expected one
     * and that the repository's getTopProductForShop method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: Product = { id: 1 /* others data */ };

    mockShopRepository.getTopProductForShop.mockResolvedValue(returnOject);

    const result = await service.getTopProductForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getTopProductForShop).toHaveBeenCalledWith(
      shopId,
    );
  });

  it('should throw an error when get top product for shop method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockShopRepository.getTopProductForShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getTopProductForShop(shopId);
    expect(result).rejects.toThrow('Repository error');
  });
});

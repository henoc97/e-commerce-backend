import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from '../../src/application/services/shop.service';
import { IShopRepository } from '../../src/domain/repositories/shop.repository';
import { Shop } from '../../src/domain/entities/shop.entity';
import { ShopDTO } from '../../src/presentation/dtos/shop.dto';


const mockShopRepository = {
  create: jest.fn(),
getById: jest.fn(),
update: jest.fn(),
delete: jest.fn(),
searchByName: jest.fn(),
addProduct: jest.fn(),
removeProduct: jest.fn(),
listProducts: jest.fn(),
addOrder: jest.fn(),
listOrders: jest.fn(),
addCategory: jest.fn(),
removeCategory: jest.fn(),
listCategories: jest.fn(),
associateMarketplace: jest.fn(),
getMarketplace: jest.fn(),
listByVendor: jest.fn(),
getMostRecent: jest.fn(),
getTotalSales: jest.fn(),
getOrderReport: jest.fn(),
getTopProduct: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('ShopService', () => {
    let service: ShopService;
    let shopRepository: IShopRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: 'IShopRepository',
          useValue: mockShopRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ShopService>(ShopService);
    shopRepository = module.get<IShopRepository>('IShopRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create shop success and failure tests */
it('should create shop', async () => {
    /** 
     * Tests the create shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's createShop method is called with the correct data.
     */
    
     const shopDTO: ShopDTO = { /* data */ };

    const returnOject: Shop = { id: 1, /* others data */ };
    
    mockShopRepository.create.mockResolvedValue(returnOject);

    const result = await service.createShop(shopDTO);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.create).toHaveBeenCalledWith(shopDTO);
});

it('should throw an error when create shop method fails', async () => {
    
     const shopDTO: ShopDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockShopRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createShop(shopDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get shop by id success and failure tests */
it('should get shop by id', async () => {
    /** 
     * Tests the get shop by id method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's getShopById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Shop | null = { id: 1, /* others data */ };
    
    mockShopRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getShopById(id);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get shop by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getShopById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update shop success and failure tests */
it('should update shop', async () => {
    /** 
     * Tests the update shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's updateShop method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<ShopDTO> = { /* data */ };

    const returnOject: Shop = { id: 1, /* others data */ };
    
    mockShopRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateShop(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.update).toHaveBeenCalledWith(id, updates);
});

it('should throw an error when update shop method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<ShopDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockShopRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateShop(id, updates)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete shop success and failure tests */
it('should delete shop', async () => {
    /** 
     * Tests the delete shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's deleteShop method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockShopRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteShop(id);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.delete).toHaveBeenCalledWith(id);
});

it('should throw an error when delete shop method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.delete.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteShop(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* search shops by name success and failure tests */
it('should search shops by name', async () => {
    /** 
     * Tests the search shops by name method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's searchShopsByName method is called with the correct data.
     */
    
     const name: string = 'name';

    const returnOject: Shop[] = [{ id: 1, /* others data */ }];
    
    mockShopRepository.searchByName.mockResolvedValue(returnOject);

    const result = await service.searchShopsByName(name);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.searchByName).toHaveBeenCalledWith(name);
});

it('should throw an error when search shops by name method fails', async () => {
    
     const name: string = 'name';
    
    // Simulate a failure when calling the repository 
    mockShopRepository.searchByName.mockRejectedValue(new Error('Repository error'));

    await expect(service.searchShopsByName(name)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* add product to shop success and failure tests */
it('should add product to shop', async () => {
    /** 
     * Tests the add product to shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's addProductToShop method is called with the correct data.
     */
    
     const shopId: number = 1;
     const product: ProductDTO = { /* data */ };

    const returnOject: Shop = { id: 1, /* others data */ };
    
    mockShopRepository.addProduct.mockResolvedValue(returnOject);

    const result = await service.addProductToShop(shopId, product);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.addProduct).toHaveBeenCalledWith(shopId, product);
});

it('should throw an error when add product to shop method fails', async () => {
    
     const shopId: number = 1;
     const product: ProductDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockShopRepository.addProduct.mockRejectedValue(new Error('Repository error'));

    await expect(service.addProductToShop(shopId, product)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
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

    const returnOject: Shop = { id: 1, /* others data */ };
    
    mockShopRepository.removeProduct.mockResolvedValue(returnOject);

    const result = await service.removeProductFromShop(shopId,
    productId,);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.removeProduct).toHaveBeenCalledWith(shopId,
    productId,);
});

it('should throw an error when remove product from shop method fails', async () => {
    
     const shopId: number = 1;
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.removeProduct.mockRejectedValue(new Error('Repository error'));

    await expect(service.removeProductFromShop(shopId,
    productId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* list products for shop success and failure tests */
it('should list products for shop', async () => {
    /** 
     * Tests the list products for shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's listProductsForShop method is called with the correct data.
     */
    
     const shopId: number = 1;

    const returnOject: Product[] = [{ id: 1, /* others data */ }];
    
    mockShopRepository.listProducts.mockResolvedValue(returnOject);

    const result = await service.listProductsForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.listProducts).toHaveBeenCalledWith(shopId);
});

it('should throw an error when list products for shop method fails', async () => {
    
     const shopId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.listProducts.mockRejectedValue(new Error('Repository error'));

    await expect(service.listProductsForShop(shopId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* add order to shop success and failure tests */
it('should add order to shop', async () => {
    /** 
     * Tests the add order to shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's addOrderToShop method is called with the correct data.
     */
    
     const shopId: number = 1;
     const order: OrderDTO = { /* data */ };

    const returnOject: Shop = { id: 1, /* others data */ };
    
    mockShopRepository.addOrder.mockResolvedValue(returnOject);

    const result = await service.addOrderToShop(shopId, order);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.addOrder).toHaveBeenCalledWith(shopId, order);
});

it('should throw an error when add order to shop method fails', async () => {
    
     const shopId: number = 1;
     const order: OrderDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockShopRepository.addOrder.mockRejectedValue(new Error('Repository error'));

    await expect(service.addOrderToShop(shopId, order)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* list orders for shop success and failure tests */
it('should list orders for shop', async () => {
    /** 
     * Tests the list orders for shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's listOrdersForShop method is called with the correct data.
     */
    
     const shopId: number = 1;

    const returnOject: Order[] = [{ id: 1, /* others data */ }];
    
    mockShopRepository.listOrders.mockResolvedValue(returnOject);

    const result = await service.listOrdersForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.listOrders).toHaveBeenCalledWith(shopId);
});

it('should throw an error when list orders for shop method fails', async () => {
    
     const shopId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.listOrders.mockRejectedValue(new Error('Repository error'));

    await expect(service.listOrdersForShop(shopId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* add category to shop success and failure tests */
it('should add category to shop', async () => {
    /** 
     * Tests the add category to shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's addCategoryToShop method is called with the correct data.
     */
    
     const shopId: number = 1;
     const category: CategoryDTO = { /* data */ };

    const returnOject: Shop = { id: 1, /* others data */ };
    
    mockShopRepository.addCategory.mockResolvedValue(returnOject);

    const result = await service.addCategoryToShop(shopId,
    category,);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.addCategory).toHaveBeenCalledWith(shopId,
    category,);
});

it('should throw an error when add category to shop method fails', async () => {
    
     const shopId: number = 1;
     const category: CategoryDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockShopRepository.addCategory.mockRejectedValue(new Error('Repository error'));

    await expect(service.addCategoryToShop(shopId,
    category,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
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

    const returnOject: Shop = { id: 1, /* others data */ };
    
    mockShopRepository.removeCategory.mockResolvedValue(returnOject);

    const result = await service.removeCategoryFromShop(shopId,
    categoryId,);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.removeCategory).toHaveBeenCalledWith(shopId,
    categoryId,);
});

it('should throw an error when remove category from shop method fails', async () => {
    
     const shopId: number = 1;
     const categoryId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.removeCategory.mockRejectedValue(new Error('Repository error'));

    await expect(service.removeCategoryFromShop(shopId,
    categoryId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* list categories for shop success and failure tests */
it('should list categories for shop', async () => {
    /** 
     * Tests the list categories for shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's listCategoriesForShop method is called with the correct data.
     */
    
     const shopId: number = 1;

    const returnOject: Category[] = [{ id: 1, /* others data */ }];
    
    mockShopRepository.listCategories.mockResolvedValue(returnOject);

    const result = await service.listCategoriesForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.listCategories).toHaveBeenCalledWith(shopId);
});

it('should throw an error when list categories for shop method fails', async () => {
    
     const shopId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.listCategories.mockRejectedValue(new Error('Repository error'));

    await expect(service.listCategoriesForShop(shopId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* associate marketplace with shop success and failure tests */
it('should associate marketplace with shop', async () => {
    /** 
     * Tests the associate marketplace with shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's associateMarketplaceWithShop method is called with the correct data.
     */
    
     const shopId: number = 1;
     const marketplace: MarketplaceDTO = { /* data */ };

    const returnOject: Shop = { id: 1, /* others data */ };
    
    mockShopRepository.associateMarketplace.mockResolvedValue(returnOject);

    const result = await service.associateMarketplaceWithShop(shopId,
    marketplace,);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.associateMarketplace).toHaveBeenCalledWith(shopId,
    marketplace,);
});

it('should throw an error when associate marketplace with shop method fails', async () => {
    
     const shopId: number = 1;
     const marketplace: MarketplaceDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockShopRepository.associateMarketplace.mockRejectedValue(new Error('Repository error'));

    await expect(service.associateMarketplaceWithShop(shopId,
    marketplace,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get marketplace for shop success and failure tests */
it('should get marketplace for shop', async () => {
    /** 
     * Tests the get marketplace for shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's getMarketplaceForShop method is called with the correct data.
     */
    
     const shopId: number = 1;

    const returnOject: Marketplace | null = { id: 1, /* others data */ };
    
    mockShopRepository.getMarketplace.mockResolvedValue(returnOject);

    const result = await service.getMarketplaceForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getMarketplace).toHaveBeenCalledWith(shopId);
});

it('should throw an error when get marketplace for shop method fails', async () => {
    
     const shopId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.getMarketplace.mockRejectedValue(new Error('Repository error'));

    await expect(service.getMarketplaceForShop(shopId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* list shops by vendor success and failure tests */
it('should list shops by vendor', async () => {
    /** 
     * Tests the list shops by vendor method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's listShopsByVendor method is called with the correct data.
     */
    
     const vendorId: number = 1;

    const returnOject: Shop[] = [{ id: 1, /* others data */ }];
    
    mockShopRepository.listByVendor.mockResolvedValue(returnOject);

    const result = await service.listShopsByVendor(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.listByVendor).toHaveBeenCalledWith(vendorId);
});

it('should throw an error when list shops by vendor method fails', async () => {
    
     const vendorId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.listByVendor.mockRejectedValue(new Error('Repository error'));

    await expect(service.listShopsByVendor(vendorId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get most recent shop success and failure tests */
it('should get most recent shop', async () => {
    /** 
     * Tests the get most recent shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's getMostRecentShop method is called with the correct data.
     */
    

    const returnOject: Shop | null = { id: 1, /* others data */ };
    
    mockShopRepository.getMostRecent.mockResolvedValue(returnOject);

    const result = await service.getMostRecentShop();
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getMostRecent).toHaveBeenCalledWith();
});

it('should throw an error when get most recent shop method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockShopRepository.getMostRecent.mockRejectedValue(new Error('Repository error'));

    await expect(service.getMostRecentShop()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get total sales for shop success and failure tests */
it('should get total sales for shop', async () => {
    /** 
     * Tests the get total sales for shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's getTotalSalesForShop method is called with the correct data.
     */
    
     const shopId: number = 1;

    const returnOject: number = 1
    
    mockShopRepository.getTotalSales.mockResolvedValue(returnOject);

    const result = await service.getTotalSalesForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getTotalSales).toHaveBeenCalledWith(shopId);
});

it('should throw an error when get total sales for shop method fails', async () => {
    
     const shopId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.getTotalSales.mockRejectedValue(new Error('Repository error'));

    await expect(service.getTotalSalesForShop(shopId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get order report for shop success and failure tests */
it('should get order report for shop', async () => {
    /** 
     * Tests the get order report for shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's getOrderReportForShop method is called with the correct data.
     */
    
     const shopId: number = 1;
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };

    const returnOject: any = { id: 1, /* others data */ };
    
    mockShopRepository.getOrderReport.mockResolvedValue(returnOject);

    const result = await service.getOrderReportForShop(shopId,
    startDate,
    endDate,);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getOrderReport).toHaveBeenCalledWith(shopId,
    startDate,
    endDate,);
});

it('should throw an error when get order report for shop method fails', async () => {
    
     const shopId: number = 1;
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockShopRepository.getOrderReport.mockRejectedValue(new Error('Repository error'));

    await expect(service.getOrderReportForShop(shopId,
    startDate,
    endDate,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get top product for shop success and failure tests */
it('should get top product for shop', async () => {
    /** 
     * Tests the get top product for shop method.
     * Verifies that the returned shop matches the expected one 
     * and that the repository's getTopProductForShop method is called with the correct data.
     */
    
     const shopId: number = 1;

    const returnOject: Product = { id: 1, /* others data */ };
    
    mockShopRepository.getTopProduct.mockResolvedValue(returnOject);

    const result = await service.getTopProductForShop(shopId);
    expect(result).toEqual(returnOject);
    expect(mockShopRepository.getTopProduct).toHaveBeenCalledWith(shopId);
});

it('should throw an error when get top product for shop method fails', async () => {
    
     const shopId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockShopRepository.getTopProduct.mockRejectedValue(new Error('Repository error'));

    await expect(service.getTopProductForShop(shopId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

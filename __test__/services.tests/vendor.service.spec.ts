import { Test, TestingModule } from '@nestjs/testing';
import { VendorService } from '../../src/application/services/vendor.service';
import { IVendorRepository } from '../../src/domain/repositories/vendor.repository';
import { Vendor } from '../../src/domain/entities/vendor.entity';
import { VendorDTO } from '../../src/presentation/dtos/vendor.dto';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { Product } from 'src/domain/entities/product.entity';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';
import { Subscription } from 'src/domain/entities/subscription.entity';
import { Shop } from 'src/domain/entities/shop.entity';
import { SubscriptionService } from 'src/application/services/subscription.service';
import { ShopService } from 'src/application/services/shop.service';

const mockVendorRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByStoreName: jest.fn(),
  addProduct: jest.fn(),
  removeProduct: jest.fn(),
  getProducts: jest.fn(),
  getSubscription: jest.fn(),
  setSubscription: jest.fn(),
  getShop: jest.fn(),
  setShop: jest.fn(),
  findByUser: jest.fn(),
  findBySubscription: jest.fn(),
  getall: jest.fn(),
  getLatest: jest.fn(),
};

const mockSubscriptionService = {
  createSubscription: jest.fn()
}

const mockShopService = {
  createShop: jest.fn()
}

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('VendorService', () => {
  let service: VendorService;
  let vendorRepository: IVendorRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorService,
        {
          provide: 'IVendorRepository',
          useValue: mockVendorRepository, // Use the mock
        },
        {
          provide: SubscriptionService,
          useValue: mockSubscriptionService, // Use the mock
        },
        {
          provide: ShopService,
          useValue: mockShopService, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<VendorService>(VendorService);
    vendorRepository = module.get<IVendorRepository>('IVendorRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* create vendor success and failure tests */
  it('should create vendor', async () => {
    /**
     * Tests the create vendor method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's createVendor method is called with the correct data.
     */

    const vendorDTO: VendorDTO = {
        id: 1,
        userId: 1,
        user: null,
        shop: null,
        storeName: 'Nom du magasin',
        products: [],
        subscription: null
    };

    const returnOject: Vendor = {
        id: 1,
        userId: 1,
        user: null,
        shop: null,
        storeName: 'Nom du magasin',
        products: [],
        subscription: null
    };

    mockVendorRepository.create.mockResolvedValue(returnOject);

    const result = await service.createVendor(vendorDTO);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.create).toHaveBeenCalledWith(vendorDTO);
  });

  it('should throw an error when create vendor method fails', async () => {
    const vendorDTO: VendorDTO = {
      id: 1,
        userId: 1,
        user: null,
        storeName: 'Nom du magasin',
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.create.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.createVendor(vendorDTO)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* find vendor by id success and failure tests */
  it('should find vendor by id', async () => {
    /**
     * Tests the find vendor by id method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's findVendorById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Vendor | null = {
        id: 1,
        userId: 1,
        user: null,
        storeName: 'Nom du magasin',
      };

    mockVendorRepository.findById.mockResolvedValue(returnOject);

    const result = await service.findVendorById(id);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.findById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when find vendor by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.findById.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.findVendorById(id)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* update vendor success and failure tests */
  it('should update vendor', async () => {
    /**
     * Tests the update vendor method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's updateVendor method is called with the correct data.
     */

    const id: number = 1;
    const updateData: Partial<VendorDTO> = {
      id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin',
    };

    const returnOject: Vendor = { id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin', };

    mockVendorRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateVendor(id, updateData);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.update).toHaveBeenCalledWith(id, updateData);
  });

  it('should throw an error when update vendor method fails', async () => {
    const id: number = 1;
    const updateData: Partial<VendorDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.update.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.updateVendor(id, updateData)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* delete vendor success and failure tests */
  it('should delete vendor', async () => {
    /**
     * Tests the delete vendor method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's deleteVendor method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockVendorRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteVendor(id);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete vendor method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.delete.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.deleteVendor(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* find vendors by store name success and failure tests */
  it('should find vendors by store name', async () => {
    /**
     * Tests the find vendors by store name method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's findVendorsByStoreName method is called with the correct data.
     */

    const storeName: string = 'storeName';

    const returnOject: Vendor[] = [{ id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin', }];

    mockVendorRepository.findByStoreName.mockResolvedValue(returnOject);

    const result = await service.findVendorsByStoreName(storeName);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.findByStoreName).toHaveBeenCalledWith(
      storeName,
    );
  });

  it('should throw an error when find vendors by store name method fails', async () => {
    const storeName: string = 'storeName';

    // Simulate a failure when calling the repository
    mockVendorRepository.findByStoreName.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.findVendorsByStoreName(storeName)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* add product to vendor success and failure tests */
  it('should add product to vendor', async () => {
    /**
     * Tests the add product to vendor method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's addProductToVendor method is called with the correct data.
     */

    const vendorId: number = 1;
    const productDTO: ProductDTO = {
        id: 1,
        name: 'Nom du produit',
        price: 100,
        category: null,
        categoryId: 1,
        images: [],
        variants: [],
        stock: 100,
        shopId: 1,
        shop: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        cartItem: [],
        orderItem: [],
        review: []
    };

    const returnOject: Vendor = {
      id: 1,
      userId: 1,
      storeName: 'Nom du magasin',
      user: undefined
    };

    mockVendorRepository.addProduct.mockResolvedValue(returnOject);

    const result = await service.addProductToVendor(vendorId, productDTO);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.addProduct).toHaveBeenCalledWith(
        vendorId,
        productDTO,
    );
  });

  it('should throw an error when add product to vendor method fails', async () => {
    const vendorId: number = 1;
    const productDTO: ProductDTO = {
        id: 1,
        name: 'Nom du produit',
        price: 100,
        category: null,
        categoryId: 1,
        images: [],
        variants: [],
        stock: 100,
        shopId: 1,
        shop: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        cartItem: [],
        orderItem: [],
        review: []
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.addProduct.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.addProductToVendor(vendorId, productDTO),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* remove product from vendor success and failure tests */
  it('should remove product from vendor', async () => {
    /**
     * Tests the remove product from vendor method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's removeProductFromVendor method is called with the correct data.
     */

    const vendorId: number = 1;
    const productId: number = 1;

    const returnOject: Vendor = {
      id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin',
      // Ajoutez d'autres propriétés si nécessaire
    };

    mockVendorRepository.removeProduct.mockResolvedValue(returnOject);

    const result = await service.removeProductFromVendor(vendorId, productId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.removeProduct).toHaveBeenCalledWith(
      vendorId,
      productId,
    );
  });

  it('should throw an error when remove product from vendor method fails', async () => {
    const vendorId: number = 1;
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.removeProduct.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.removeProductFromVendor(vendorId, productId),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get vendor products success and failure tests */
  it('should get vendor products', async () => {
    /**
     * Tests the get vendor products method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getVendorProducts method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: Product[] = [
        {
          id: 1,
          name: '',
          price: 0,
          promotions: [],
          category: undefined,
          categoryId: 0,
          images: [],
          variants: [],
          stock: 0,
          shopId: 0,
          createdAt: undefined,
          updatedAt: undefined,
          cartItem: [],
          orderItem: [],
          review: []
        }
    ];

    mockVendorRepository.getProducts.mockResolvedValue(returnOject);

    const result = await service.getVendorProducts(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getProducts).toHaveBeenCalledWith(vendorId);
  });

  it('should throw an error when get vendor products method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.getProducts.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getVendorProducts(vendorId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get vendor subscription success and failure tests */
  it('should get vendor subscription', async () => {
    /**
     * Tests the get vendor subscription method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getVendorSubscription method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: Subscription | null = { id: 1,
      name: '',
      price: 0,
      duration: 0,
      vendors: [null],
      createdAt: undefined,
      updatedAt: undefined
    };

    mockVendorRepository.getSubscription.mockResolvedValue(returnOject);

    const result = await service.getVendorSubscription(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getSubscription).toHaveBeenCalledWith(vendorId);
  });

  it('should throw an error when get vendor subscription method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.getSubscription.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getVendorSubscription(vendorId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* set vendor subscription success and failure tests */
  it('should set vendor subscription', async () => {
    /**
     * Tests the set vendor subscription method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's setVendorSubscription method is called with the correct data.
     */
    const vendorId: number = 1;
    const subscriptionDTO: SubscriptionDTO = {
      id: 1,
      name: 'Basic Plan',
      price: 9.99,
      duration: 30,
      vendors: [null],
      createdAt: undefined,
      updatedAt: undefined
    };

    const returnOject: Vendor = { 
      id: 1,
      userId: 1,
      user: null,
      storeName: 'Vendor Store'
    };

    mockVendorRepository.setSubscription.mockResolvedValue(returnOject);

    const result = await service.setVendorSubscription(
      vendorId,
      subscriptionDTO,
    );
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.setSubscription).toHaveBeenCalledWith(
      vendorId,
      subscriptionDTO,
    );
  });

  it('should throw an error when set vendor subscription method fails', async () => {
    const vendorId: number = 1;
    const subscriptionDTO: SubscriptionDTO = {
      id: 1,
      name: 'Basic Plan',
      price: 9.99,
      duration: 30,
      vendors: [null],
      createdAt: undefined,
      updatedAt: undefined
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.setSubscription.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.setVendorSubscription(vendorId, subscriptionDTO),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get vendor shop success and failure tests */
  it('should get vendor shop', async () => {
    /**
     * Tests the get vendor shop method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getVendorShop method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: Shop | null = { id: 1,
      url: '',
      vendor: null,
      vendorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: '',
      products: [],
      orders: [],
      categories: []
    };

    mockVendorRepository.getShop.mockResolvedValue(returnOject);

    const result = await service.getVendorShop(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getShop).toHaveBeenCalledWith(vendorId);
  });

  it('should throw an error when get vendor shop method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.getShop.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getVendorShop(vendorId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* set vendor shop success and failure tests */
  it('should set vendor shop', async () => {
    /**
     * Tests the set vendor shop method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's setVendorShop method is called with the correct data.
     */

    const vendorId: number = 1;
    const shopDTO: ShopDTO = {
      id: 1,
      url: 'https://example.com',
      vendor: {
        id: 1,
        userId: 0,
        user: undefined,
        storeName: ''
      },
      vendorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: ''
    };

    const returnOject: Vendor = {
      id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin',
      // Ajoutez d'autres propriétés si nécessaire
    };

    mockVendorRepository.setShop.mockResolvedValue(returnOject);

    const result = await service.setVendorShop(vendorId, shopDTO);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.setShop).toHaveBeenCalledWith(
      vendorId,
      shopDTO,
    );
  });

  it('should throw an error when set vendor shop method fails', async () => {
    const vendorId: number = 1;
    const shopDTO: ShopDTO = {
      id: 1,
      url: 'https://example.com',
      vendor: null,
      vendorId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: ''
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.setShop.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.setVendorShop(vendorId, shopDTO)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* find vendors by user success and failure tests */
  it('should find vendors by user', async () => {
    /**
     * Tests the find vendors by user method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's findVendorsByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Vendor[] = [{
      id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin',
      // Ajoutez d'autres propriétés si nécessaire
    }];

    mockVendorRepository.findByUser.mockResolvedValue(returnOject);

    const result = await service.findVendorsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.findByUser).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when find vendors by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.findByUser.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.findVendorsByUser(userId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* find vendors by subscription success and failure tests */
  it('should find vendors by subscription', async () => {
    /**
     * Tests the find vendors by subscription method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's findVendorsBySubscription method is called with the correct data.
     */

    const subscriptionId: number = 1;

    const returnOject: Vendor[] = [{
      id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin',
      // Ajoutez d'autres propriétés si nécessaire
    }];

    mockVendorRepository.findBySubscription.mockResolvedValue(returnOject);

    const result = await service.findVendorsBySubscription(subscriptionId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.findBySubscription).toHaveBeenCalledWith(
      subscriptionId,
    );
  });

  it('should throw an error when find vendors by subscription method fails', async () => {
    const subscriptionId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.findBySubscription.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.findVendorsBySubscription(subscriptionId),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get all vendors success and failure tests */
  it('should get all vendors', async () => {
    /**
     * Tests the get all vendors method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getAllVendors method is called with the correct data.
     */

    const returnOject: Vendor[] = [{
      id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin',
      // Ajoutez d'autres propriétés si nécessaire
    }];

    mockVendorRepository.getall.mockResolvedValue(returnOject);

    const result = await service.getAllVendors();
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getall).toHaveBeenCalledWith();
  });

  it('should throw an error when get all vendors method fails', async () => {
    // Simulate a failure when calling the repository
    mockVendorRepository.getall.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getAllVendors()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get latest vendor success and failure tests */
  it('should get latest vendor', async () => {
    /**
     * Tests the get latest vendor method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getLatestVendor method is called with the correct data.
     */

    const returnOject: Vendor | null = {
      id: 1,
      userId: 1,
      user: null,
      storeName: 'Nom du magasin',
      // Ajoutez d'autres propriétés si nécessaire
    };

    mockVendorRepository.getLatest.mockResolvedValue(returnOject);

    const result = await service.getLatestVendor();
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getLatest).toHaveBeenCalledWith();
  });

  it('should throw an error when get latest vendor method fails', async () => {
    // Simulate a failure when calling the repository
    mockVendorRepository.getLatest.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getLatestVendor()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});
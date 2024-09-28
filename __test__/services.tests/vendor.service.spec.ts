import { Test, TestingModule } from '@nestjs/testing';
import { VendorService } from '../../src/application/services/vendor.service';
import { IVendorRepository } from '../../src/domain/repositories/vendor.repository';
import { Vendor } from '../../src/domain/entities/vendor.entity';
import { VendorDTO } from '../../src/presentation/dtos/vendor.dto';

const mockVendorRepository = {
  createVendor: jest.fn(),
  findVendorById: jest.fn(),
  updateVendor: jest.fn(),
  deleteVendor: jest.fn(),
  findVendorsByStoreName: jest.fn(),
  addProductToVendor: jest.fn(),
  removeProductFromVendor: jest.fn(),
  getVendorProducts: jest.fn(),
  getVendorSubscription: jest.fn(),
  setVendorSubscription: jest.fn(),
  getVendorShop: jest.fn(),
  setVendorShop: jest.fn(),
  findVendorsByUser: jest.fn(),
  findVendorsBySubscription: jest.fn(),
  getAllVendors: jest.fn(),
  getLatestVendor: jest.fn(),
};

describe('VendorService', () => {
  let service: VendorService;
  let vendorRepository: IVendorRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorService,
        {
          provide: 'VendorRepository',
          useValue: mockVendorRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<VendorService>(VendorService);
    vendorRepository = module.get<IVendorRepository>('VendorRepository');
  });

  /* create vendor success and failure tests */
  it('should create vendor', async () => {
    /**
     * Tests the create vendor method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's createVendor method is called with the correct data.
     */

    const vendorDTO: VendorDTO = {
      /* data */
    };

    const returnOject: Vendor = { id: 1 /* others data */ };

    mockVendorRepository.createVendor.mockResolvedValue(returnOject);

    const result = await service.createVendor(vendorDTO);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.createVendor).toHaveBeenCalledWith(vendorDTO);
  });

  it('should throw an error when create vendor method fails', async () => {
    const vendorDTO: VendorDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.createVendor.mockResolvedValue(' Repository error');

    const result = await service.createVendor(vendorDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* find vendor by id success and failure tests */
  it('should find vendor by id', async () => {
    /**
     * Tests the find vendor by id method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's findVendorById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Vendor | null = { id: 1 /* others data */ };

    mockVendorRepository.findVendorById.mockResolvedValue(returnOject);

    const result = await service.findVendorById(id);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.findVendorById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when find vendor by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.findVendorById.mockResolvedValue(' Repository error');

    const result = await service.findVendorById(id);
    expect(result).rejects.toThrow('Repository error');
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
      /* data */
    };

    const returnOject: Vendor = { id: 1 /* others data */ };

    mockVendorRepository.updateVendor.mockResolvedValue(returnOject);

    const result = await service.updateVendor(id, updateData);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.updateVendor).toHaveBeenCalledWith(
      id,
      updateData,
    );
  });

  it('should throw an error when update vendor method fails', async () => {
    const id: number = 1;
    const updateData: Partial<VendorDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.updateVendor.mockResolvedValue(' Repository error');

    const result = await service.updateVendor(id, updateData);
    expect(result).rejects.toThrow('Repository error');
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

    mockVendorRepository.deleteVendor.mockResolvedValue(returnOject);

    const result = await service.deleteVendor(id);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.deleteVendor).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete vendor method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.deleteVendor.mockResolvedValue(' Repository error');

    const result = await service.deleteVendor(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* find vendors by store name success and failure tests */
  it('should find vendors by store name', async () => {
    /**
     * Tests the find vendors by store name method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's findVendorsByStoreName method is called with the correct data.
     */

    const storeName: string = 'storeName';

    const returnOject: Vendor[] = [{ id: 1 /* others data */ }];

    mockVendorRepository.findVendorsByStoreName.mockResolvedValue(returnOject);

    const result = await service.findVendorsByStoreName(storeName);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.findVendorsByStoreName).toHaveBeenCalledWith(
      storeName,
    );
  });

  it('should throw an error when find vendors by store name method fails', async () => {
    const storeName: string = 'storeName';

    // Simulate a failure when calling the repository
    mockVendorRepository.findVendorsByStoreName.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.findVendorsByStoreName(storeName);
    expect(result).rejects.toThrow('Repository error');
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
      /* data */
    };

    const returnOject: Vendor = { id: 1 /* others data */ };

    mockVendorRepository.addProductToVendor.mockResolvedValue(returnOject);

    const result = await service.addProductToVendor(vendorId, productDTO);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.addProductToVendor).toHaveBeenCalledWith(
      vendorId,
      productDTO,
    );
  });

  it('should throw an error when add product to vendor method fails', async () => {
    const vendorId: number = 1;
    const productDTO: ProductDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.addProductToVendor.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.addProductToVendor(vendorId, productDTO);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: Vendor = { id: 1 /* others data */ };

    mockVendorRepository.removeProductFromVendor.mockResolvedValue(returnOject);

    const result = await service.removeProductFromVendor(vendorId, productId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.removeProductFromVendor).toHaveBeenCalledWith(
      vendorId,
      productId,
    );
  });

  it('should throw an error when remove product from vendor method fails', async () => {
    const vendorId: number = 1;
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.removeProductFromVendor.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.removeProductFromVendor(vendorId, productId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get vendor products success and failure tests */
  it('should get vendor products', async () => {
    /**
     * Tests the get vendor products method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getVendorProducts method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: Product[] = [{ id: 1 /* others data */ }];

    mockVendorRepository.getVendorProducts.mockResolvedValue(returnOject);

    const result = await service.getVendorProducts(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getVendorProducts).toHaveBeenCalledWith(
      vendorId,
    );
  });

  it('should throw an error when get vendor products method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.getVendorProducts.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getVendorProducts(vendorId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get vendor subscription success and failure tests */
  it('should get vendor subscription', async () => {
    /**
     * Tests the get vendor subscription method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getVendorSubscription method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: Subscription | null = { id: 1 /* others data */ };

    mockVendorRepository.getVendorSubscription.mockResolvedValue(returnOject);

    const result = await service.getVendorSubscription(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getVendorSubscription).toHaveBeenCalledWith(
      vendorId,
    );
  });

  it('should throw an error when get vendor subscription method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.getVendorSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getVendorSubscription(vendorId);
    expect(result).rejects.toThrow('Repository error');
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
      /* data */
    };

    const returnOject: Vendor = { id: 1 /* others data */ };

    mockVendorRepository.setVendorSubscription.mockResolvedValue(returnOject);

    const result = await service.setVendorSubscription(
      vendorId,
      subscriptionDTO,
    );
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.setVendorSubscription).toHaveBeenCalledWith(
      vendorId,
      subscriptionDTO,
    );
  });

  it('should throw an error when set vendor subscription method fails', async () => {
    const vendorId: number = 1;
    const subscriptionDTO: SubscriptionDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.setVendorSubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.setVendorSubscription(
      vendorId,
      subscriptionDTO,
    );
    expect(result).rejects.toThrow('Repository error');
  });

  /* get vendor shop success and failure tests */
  it('should get vendor shop', async () => {
    /**
     * Tests the get vendor shop method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getVendorShop method is called with the correct data.
     */

    const vendorId: number = 1;

    const returnOject: Shop | null = { id: 1 /* others data */ };

    mockVendorRepository.getVendorShop.mockResolvedValue(returnOject);

    const result = await service.getVendorShop(vendorId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getVendorShop).toHaveBeenCalledWith(vendorId);
  });

  it('should throw an error when get vendor shop method fails', async () => {
    const vendorId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.getVendorShop.mockResolvedValue(' Repository error');

    const result = await service.getVendorShop(vendorId);
    expect(result).rejects.toThrow('Repository error');
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
      /* data */
    };

    const returnOject: Vendor = { id: 1 /* others data */ };

    mockVendorRepository.setVendorShop.mockResolvedValue(returnOject);

    const result = await service.setVendorShop(vendorId, shopDTO);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.setVendorShop).toHaveBeenCalledWith(
      vendorId,
      shopDTO,
    );
  });

  it('should throw an error when set vendor shop method fails', async () => {
    const vendorId: number = 1;
    const shopDTO: ShopDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockVendorRepository.setVendorShop.mockResolvedValue(' Repository error');

    const result = await service.setVendorShop(vendorId, shopDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* find vendors by user success and failure tests */
  it('should find vendors by user', async () => {
    /**
     * Tests the find vendors by user method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's findVendorsByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Vendor[] = [{ id: 1 /* others data */ }];

    mockVendorRepository.findVendorsByUser.mockResolvedValue(returnOject);

    const result = await service.findVendorsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.findVendorsByUser).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when find vendors by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.findVendorsByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.findVendorsByUser(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* find vendors by subscription success and failure tests */
  it('should find vendors by subscription', async () => {
    /**
     * Tests the find vendors by subscription method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's findVendorsBySubscription method is called with the correct data.
     */

    const subscriptionId: number = 1;

    const returnOject: Vendor[] = [{ id: 1 /* others data */ }];

    mockVendorRepository.findVendorsBySubscription.mockResolvedValue(
      returnOject,
    );

    const result = await service.findVendorsBySubscription(subscriptionId);
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.findVendorsBySubscription).toHaveBeenCalledWith(
      subscriptionId,
    );
  });

  it('should throw an error when find vendors by subscription method fails', async () => {
    const subscriptionId: number = 1;

    // Simulate a failure when calling the repository
    mockVendorRepository.findVendorsBySubscription.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.findVendorsBySubscription(subscriptionId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get all vendors success and failure tests */
  it('should get all vendors', async () => {
    /**
     * Tests the get all vendors method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getAllVendors method is called with the correct data.
     */

    const returnOject: Vendor[] = [{ id: 1 /* others data */ }];

    mockVendorRepository.getAllVendors.mockResolvedValue(returnOject);

    const result = await service.getAllVendors();
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getAllVendors).toHaveBeenCalledWith();
  });

  it('should throw an error when get all vendors method fails', async () => {
    // Simulate a failure when calling the repository
    mockVendorRepository.getAllVendors.mockResolvedValue(' Repository error');

    const result = await service.getAllVendors();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get latest vendor success and failure tests */
  it('should get latest vendor', async () => {
    /**
     * Tests the get latest vendor method.
     * Verifies that the returned vendor matches the expected one
     * and that the repository's getLatestVendor method is called with the correct data.
     */

    const returnOject: Vendor | null = { id: 1 /* others data */ };

    mockVendorRepository.getLatestVendor.mockResolvedValue(returnOject);

    const result = await service.getLatestVendor();
    expect(result).toEqual(returnOject);
    expect(mockVendorRepository.getLatestVendor).toHaveBeenCalledWith();
  });

  it('should throw an error when get latest vendor method fails', async () => {
    // Simulate a failure when calling the repository
    mockVendorRepository.getLatestVendor.mockResolvedValue(' Repository error');

    const result = await service.getLatestVendor();
    expect(result).rejects.toThrow('Repository error');
  });
});

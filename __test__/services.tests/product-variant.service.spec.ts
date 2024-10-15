import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantService } from '../../src/application/services/product-variant.service';
import { IProductVariantRepository } from '../../src/domain/repositories/product-variant.repository';
import { ProductVariant } from '../../src/domain/entities/product-variant.entity';
import { ProductVariantDTO } from '../../src/presentation/dtos/product-variant.dto';


const mockProductVariantRepository = {
  create: jest.fn(),
getById: jest.fn(),
update: jest.fn(),
delete: jest.fn(),
getByProductId: jest.fn(),
deleteByProductId: jest.fn(),
exists: jest.fn(),
updateDetails: jest.fn(),
getByName: jest.fn(),
getMostPopularVariant: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('ProductVariantService', () => {
    let service: ProductVariantService;
    let productVariantRepository: IProductVariantRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductVariantService,
        {
          provide: 'IProductVariantRepository',
          useValue: mockProductVariantRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ProductVariantService>(ProductVariantService);
    productVariantRepository = module.get<IProductVariantRepository>('IProductVariantRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create product variant success and failure tests */
it('should create product variant', async () => {
    /** 
     * Tests the create product variant method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's createProductVariant method is called with the correct data.
     */
    
     const variantDTO: ProductVariantDTO = { /* data */ };

    const returnOject: ProductVariant = { id: 1, /* others data */ };
    
    mockProductVariantRepository.create.mockResolvedValue(returnOject);

    const result = await service.createProductVariant(variantDTO,);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.create).toHaveBeenCalledWith(variantDTO,);
});

it('should throw an error when create product variant method fails', async () => {
    
     const variantDTO: ProductVariantDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createProductVariant(variantDTO,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get product variant by id success and failure tests */
it('should get product variant by id', async () => {
    /** 
     * Tests the get product variant by id method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's getProductVariantById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: ProductVariant | null = { id: 1, /* others data */ };
    
    mockProductVariantRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getProductVariantById(id);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get product variant by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getProductVariantById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update product variant success and failure tests */
it('should update product variant', async () => {
    /** 
     * Tests the update product variant method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's updateProductVariant method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<ProductVariantDTO> = { /* data */ };

    const returnOject: ProductVariant = { id: 1, /* others data */ };
    
    mockProductVariantRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateProductVariant(id,
    updates,);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.update).toHaveBeenCalledWith(id,
    updates,);
});

it('should throw an error when update product variant method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<ProductVariantDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateProductVariant(id,
    updates,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete product variant success and failure tests */
it('should delete product variant', async () => {
    /** 
     * Tests the delete product variant method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's deleteProductVariant method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockProductVariantRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteProductVariant(id);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.delete).toHaveBeenCalledWith(id);
});

it('should throw an error when delete product variant method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.delete.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteProductVariant(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get product variants by product id success and failure tests */
it('should get product variants by product id', async () => {
    /** 
     * Tests the get product variants by product id method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's getProductVariantsByProductId method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: ProductVariant[] = [{ id: 1, /* others data */ }];
    
    mockProductVariantRepository.getByProductId.mockResolvedValue(returnOject);

    const result = await service.getProductVariantsByProductId(productId,);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.getByProductId).toHaveBeenCalledWith(productId,);
});

it('should throw an error when get product variants by product id method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.getByProductId.mockRejectedValue(new Error('Repository error'));

    await expect(service.getProductVariantsByProductId(productId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete product variants by product id success and failure tests */
it('should delete product variants by product id', async () => {
    /** 
     * Tests the delete product variants by product id method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's deleteProductVariantsByProductId method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: boolean = true
    
    mockProductVariantRepository.deleteByProductId.mockResolvedValue(returnOject);

    const result = await service.deleteProductVariantsByProductId(productId);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.deleteByProductId).toHaveBeenCalledWith(productId);
});

it('should throw an error when delete product variants by product id method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.deleteByProductId.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteProductVariantsByProductId(productId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* product variant exists success and failure tests */
it('should product variant exists', async () => {
    /** 
     * Tests the product variant exists method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's productVariantExists method is called with the correct data.
     */
    
     const productId: number = 1;
     const name: string = 'name';
     const value: string = 'value';

    const returnOject: boolean = true
    
    mockProductVariantRepository.exists.mockResolvedValue(returnOject);

    const result = await service.productVariantExists(productId,
    name,
    value,);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.exists).toHaveBeenCalledWith(productId,
    name,
    value,);
});

it('should throw an error when product variant exists method fails', async () => {
    
     const productId: number = 1;
     const name: string = 'name';
     const value: string = 'value';
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.exists.mockRejectedValue(new Error('Repository error'));

    await expect(service.productVariantExists(productId,
    name,
    value,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update product variant details success and failure tests */
it('should update product variant details', async () => {
    /** 
     * Tests the update product variant details method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's updateProductVariantDetails method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: ProductVariant = { id: 1, /* others data */ };
    
    mockProductVariantRepository.updateDetails.mockResolvedValue(returnOject);

    const result = await service.updateProductVariantDetails(id,
    name?,
    value?,);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.updateDetails).toHaveBeenCalledWith(id,
    name?,
    value?,);
});

it('should throw an error when update product variant details method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.updateDetails.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateProductVariantDetails(id,
    name?,
    value?,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get product variants by name success and failure tests */
it('should get product variants by name', async () => {
    /** 
     * Tests the get product variants by name method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's getProductVariantsByName method is called with the correct data.
     */
    
     const productId: number = 1;
     const name: string = 'name';

    const returnOject: ProductVariant[] = [{ id: 1, /* others data */ }];
    
    mockProductVariantRepository.getByName.mockResolvedValue(returnOject);

    const result = await service.getProductVariantsByName(productId,
    name,);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.getByName).toHaveBeenCalledWith(productId,
    name,);
});

it('should throw an error when get product variants by name method fails', async () => {
    
     const productId: number = 1;
     const name: string = 'name';
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.getByName.mockRejectedValue(new Error('Repository error'));

    await expect(service.getProductVariantsByName(productId,
    name,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get most popular variant success and failure tests */
it('should get most popular variant', async () => {
    /** 
     * Tests the get most popular variant method.
     * Verifies that the returned productVariant matches the expected one 
     * and that the repository's getMostPopularVariant method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: ProductVariant | null = { id: 1, /* others data */ };
    
    mockProductVariantRepository.getMostPopularVariant.mockResolvedValue(returnOject);

    const result = await service.getMostPopularVariant(productId,);
    expect(result).toEqual(returnOject);
    expect(mockProductVariantRepository.getMostPopularVariant).toHaveBeenCalledWith(productId,);
});

it('should throw an error when get most popular variant method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductVariantRepository.getMostPopularVariant.mockRejectedValue(new Error('Repository error'));

    await expect(service.getMostPopularVariant(productId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

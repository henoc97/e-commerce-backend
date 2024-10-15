import { Test, TestingModule } from '@nestjs/testing';
import { ProductImageService } from '../../src/application/services/product-image.service';
import { IProductImageRepository } from '../../src/domain/repositories/product-image.repository';
import { ProductImage } from '../../src/domain/entities/product-image.entity';
import { ProductImageDTO } from '../../src/presentation/dtos/product-image.dto';


const mockProductImageRepository = {
  create: jest.fn(),
getById: jest.fn(),
update: jest.fn(),
delete: jest.fn(),
getByProductId: jest.fn(),
deleteByProductId: jest.fn(),
updateUrl: jest.fn(),
exists: jest.fn(),
getPrimaryImage: jest.fn(),
countImagesByProductId: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('ProductImageService', () => {
    let service: ProductImageService;
    let productImageRepository: IProductImageRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductImageService,
        {
          provide: 'IProductImageRepository',
          useValue: mockProductImageRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ProductImageService>(ProductImageService);
    productImageRepository = module.get<IProductImageRepository>('IProductImageRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create product image success and failure tests */
it('should create product image', async () => {
    /** 
     * Tests the create product image method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's createProductImage method is called with the correct data.
     */
    
     const imageDTO: ProductImageDTO = { /* data */ };

    const returnOject: ProductImage = { id: 1, /* others data */ };
    
    mockProductImageRepository.create.mockResolvedValue(returnOject);

    const result = await service.createProductImage(imageDTO);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.create).toHaveBeenCalledWith(imageDTO);
});

it('should throw an error when create product image method fails', async () => {
    
     const imageDTO: ProductImageDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createProductImage(imageDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get product image by id success and failure tests */
it('should get product image by id', async () => {
    /** 
     * Tests the get product image by id method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's getProductImageById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: ProductImage | null = { id: 1, /* others data */ };
    
    mockProductImageRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getProductImageById(id);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get product image by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getProductImageById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update product image success and failure tests */
it('should update product image', async () => {
    /** 
     * Tests the update product image method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's updateProductImage method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<ProductImageDTO> = { /* data */ };

    const returnOject: ProductImage = { id: 1, /* others data */ };
    
    mockProductImageRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateProductImage(id,
    updates,);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.update).toHaveBeenCalledWith(id,
    updates,);
});

it('should throw an error when update product image method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<ProductImageDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateProductImage(id,
    updates,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete product image success and failure tests */
it('should delete product image', async () => {
    /** 
     * Tests the delete product image method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's deleteProductImage method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockProductImageRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteProductImage(id);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.delete).toHaveBeenCalledWith(id);
});

it('should throw an error when delete product image method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.delete.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteProductImage(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get product images by product id success and failure tests */
it('should get product images by product id', async () => {
    /** 
     * Tests the get product images by product id method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's getProductImagesByProductId method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: ProductImage[] = [{ id: 1, /* others data */ }];
    
    mockProductImageRepository.getByProductId.mockResolvedValue(returnOject);

    const result = await service.getProductImagesByProductId(productId,);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.getByProductId).toHaveBeenCalledWith(productId,);
});

it('should throw an error when get product images by product id method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.getByProductId.mockRejectedValue(new Error('Repository error'));

    await expect(service.getProductImagesByProductId(productId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete product images by product id success and failure tests */
it('should delete product images by product id', async () => {
    /** 
     * Tests the delete product images by product id method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's deleteProductImagesByProductId method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: boolean = true
    
    mockProductImageRepository.deleteByProductId.mockResolvedValue(returnOject);

    const result = await service.deleteProductImagesByProductId(productId);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.deleteByProductId).toHaveBeenCalledWith(productId);
});

it('should throw an error when delete product images by product id method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.deleteByProductId.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteProductImagesByProductId(productId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update product image url success and failure tests */
it('should update product image url', async () => {
    /** 
     * Tests the update product image url method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's updateProductImageUrl method is called with the correct data.
     */
    
     const id: number = 1;
     const url: string = 'url';

    const returnOject: ProductImage = { id: 1, /* others data */ };
    
    mockProductImageRepository.updateUrl.mockResolvedValue(returnOject);

    const result = await service.updateProductImageUrl(id, url);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.updateUrl).toHaveBeenCalledWith(id, url);
});

it('should throw an error when update product image url method fails', async () => {
    
     const id: number = 1;
     const url: string = 'url';
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.updateUrl.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateProductImageUrl(id, url)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* does product image exist success and failure tests */
it('should does product image exist', async () => {
    /** 
     * Tests the does product image exist method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's doesProductImageExist method is called with the correct data.
     */
    
     const productId: number = 1;
     const url: string = 'url';

    const returnOject: boolean = true
    
    mockProductImageRepository.exists.mockResolvedValue(returnOject);

    const result = await service.doesProductImageExist(productId,
    url,);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.exists).toHaveBeenCalledWith(productId,
    url,);
});

it('should throw an error when does product image exist method fails', async () => {
    
     const productId: number = 1;
     const url: string = 'url';
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.exists.mockRejectedValue(new Error('Repository error'));

    await expect(service.doesProductImageExist(productId,
    url,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get primary product image success and failure tests */
it('should get primary product image', async () => {
    /** 
     * Tests the get primary product image method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's getPrimaryProductImage method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: ProductImage | null = { id: 1, /* others data */ };
    
    mockProductImageRepository.getPrimaryImage.mockResolvedValue(returnOject);

    const result = await service.getPrimaryProductImage(productId,);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.getPrimaryImage).toHaveBeenCalledWith(productId,);
});

it('should throw an error when get primary product image method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.getPrimaryImage.mockRejectedValue(new Error('Repository error'));

    await expect(service.getPrimaryProductImage(productId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* count product images by product id success and failure tests */
it('should count product images by product id', async () => {
    /** 
     * Tests the count product images by product id method.
     * Verifies that the returned productImage matches the expected one 
     * and that the repository's countProductImagesByProductId method is called with the correct data.
     */
    
     const productId: number = 1;

    const returnOject: number = 1
    
    mockProductImageRepository.countImagesByProductId.mockResolvedValue(returnOject);

    const result = await service.countProductImagesByProductId(productId);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.countImagesByProductId).toHaveBeenCalledWith(productId);
});

it('should throw an error when count product images by product id method fails', async () => {
    
     const productId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockProductImageRepository.countImagesByProductId.mockRejectedValue(new Error('Repository error'));

    await expect(service.countProductImagesByProductId(productId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

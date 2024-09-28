import { Test, TestingModule } from '@nestjs/testing';
import { ProductImageService } from '../../src/application/services/product-image.service';
import { IProductImageRepository } from '../../src/domain/repositories/product-image.repository';
import { ProductImage } from '../../src/domain/entities/product-image.entity';
import { ProductImageDTO } from '../../src/presentation/dtos/product-image.dto';

const mockProductImageRepository = {
  createProductImage: jest.fn(),
  getProductImageById: jest.fn(),
  updateProductImage: jest.fn(),
  deleteProductImage: jest.fn(),
  getProductImagesByProductId: jest.fn(),
  deleteProductImagesByProductId: jest.fn(),
  updateProductImageUrl: jest.fn(),
  doesProductImageExist: jest.fn(),
  getPrimaryProductImage: jest.fn(),
  countProductImagesByProductId: jest.fn(),
};

describe('ProductImageService', () => {
  let service: ProductImageService;
  let productImageRepository: IProductImageRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductImageService,
        {
          provide: 'ProductImageRepository',
          useValue: mockProductImageRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ProductImageService>(ProductImageService);
    productImageRepository = module.get<IProductImageRepository>(
      'ProductImageRepository',
    );
  });

  /* create product image success and failure tests */
  it('should create product image', async () => {
    /**
     * Tests the create product image method.
     * Verifies that the returned productImage matches the expected one
     * and that the repository's createProductImage method is called with the correct data.
     */

    const imageDTO: ProductImageDTO = {
      /* data */
    };

    const returnOject: ProductImage = { id: 1 /* others data */ };

    mockProductImageRepository.createProductImage.mockResolvedValue(
      returnOject,
    );

    const result = await service.createProductImage(imageDTO);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.createProductImage).toHaveBeenCalledWith(
      imageDTO,
    );
  });

  it('should throw an error when create product image method fails', async () => {
    const imageDTO: ProductImageDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductImageRepository.createProductImage.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createProductImage(imageDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get product image by id success and failure tests */
  it('should get product image by id', async () => {
    /**
     * Tests the get product image by id method.
     * Verifies that the returned productImage matches the expected one
     * and that the repository's getProductImageById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: ProductImage | null = { id: 1 /* others data */ };

    mockProductImageRepository.getProductImageById.mockResolvedValue(
      returnOject,
    );

    const result = await service.getProductImageById(id);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.getProductImageById).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when get product image by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockProductImageRepository.getProductImageById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getProductImageById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update product image success and failure tests */
  it('should update product image', async () => {
    /**
     * Tests the update product image method.
     * Verifies that the returned productImage matches the expected one
     * and that the repository's updateProductImage method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<ProductImageDTO> = {
      /* data */
    };

    const returnOject: ProductImage = { id: 1 /* others data */ };

    mockProductImageRepository.updateProductImage.mockResolvedValue(
      returnOject,
    );

    const result = await service.updateProductImage(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.updateProductImage).toHaveBeenCalledWith(
      id,
      updates,
    );
  });

  it('should throw an error when update product image method fails', async () => {
    const id: number = 1;
    const updates: Partial<ProductImageDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductImageRepository.updateProductImage.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateProductImage(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete product image success and failure tests */
  it('should delete product image', async () => {
    /**
     * Tests the delete product image method.
     * Verifies that the returned productImage matches the expected one
     * and that the repository's deleteProductImage method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockProductImageRepository.deleteProductImage.mockResolvedValue(
      returnOject,
    );

    const result = await service.deleteProductImage(id);
    expect(result).toEqual(returnOject);
    expect(mockProductImageRepository.deleteProductImage).toHaveBeenCalledWith(
      id,
    );
  });

  it('should throw an error when delete product image method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockProductImageRepository.deleteProductImage.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteProductImage(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get product images by product id success and failure tests */
  it('should get product images by product id', async () => {
    /**
     * Tests the get product images by product id method.
     * Verifies that the returned productImage matches the expected one
     * and that the repository's getProductImagesByProductId method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: ProductImage[] = [{ id: 1 /* others data */ }];

    mockProductImageRepository.getProductImagesByProductId.mockResolvedValue(
      returnOject,
    );

    const result = await service.getProductImagesByProductId(productId);
    expect(result).toEqual(returnOject);
    expect(
      mockProductImageRepository.getProductImagesByProductId,
    ).toHaveBeenCalledWith(productId);
  });

  it('should throw an error when get product images by product id method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockProductImageRepository.getProductImagesByProductId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getProductImagesByProductId(productId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete product images by product id success and failure tests */
  it('should delete product images by product id', async () => {
    /**
     * Tests the delete product images by product id method.
     * Verifies that the returned productImage matches the expected one
     * and that the repository's deleteProductImagesByProductId method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: boolean = true;

    mockProductImageRepository.deleteProductImagesByProductId.mockResolvedValue(
      returnOject,
    );

    const result = await service.deleteProductImagesByProductId(productId);
    expect(result).toEqual(returnOject);
    expect(
      mockProductImageRepository.deleteProductImagesByProductId,
    ).toHaveBeenCalledWith(productId);
  });

  it('should throw an error when delete product images by product id method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockProductImageRepository.deleteProductImagesByProductId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteProductImagesByProductId(productId);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: ProductImage = { id: 1 /* others data */ };

    mockProductImageRepository.updateProductImageUrl.mockResolvedValue(
      returnOject,
    );

    const result = await service.updateProductImageUrl(id, url);
    expect(result).toEqual(returnOject);
    expect(
      mockProductImageRepository.updateProductImageUrl,
    ).toHaveBeenCalledWith(id, url);
  });

  it('should throw an error when update product image url method fails', async () => {
    const id: number = 1;
    const url: string = 'url';

    // Simulate a failure when calling the repository
    mockProductImageRepository.updateProductImageUrl.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateProductImageUrl(id, url);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: boolean = true;

    mockProductImageRepository.doesProductImageExist.mockResolvedValue(
      returnOject,
    );

    const result = await service.doesProductImageExist(productId, url);
    expect(result).toEqual(returnOject);
    expect(
      mockProductImageRepository.doesProductImageExist,
    ).toHaveBeenCalledWith(productId, url);
  });

  it('should throw an error when does product image exist method fails', async () => {
    const productId: number = 1;
    const url: string = 'url';

    // Simulate a failure when calling the repository
    mockProductImageRepository.doesProductImageExist.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.doesProductImageExist(productId, url);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get primary product image success and failure tests */
  it('should get primary product image', async () => {
    /**
     * Tests the get primary product image method.
     * Verifies that the returned productImage matches the expected one
     * and that the repository's getPrimaryProductImage method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: ProductImage | null = { id: 1 /* others data */ };

    mockProductImageRepository.getPrimaryProductImage.mockResolvedValue(
      returnOject,
    );

    const result = await service.getPrimaryProductImage(productId);
    expect(result).toEqual(returnOject);
    expect(
      mockProductImageRepository.getPrimaryProductImage,
    ).toHaveBeenCalledWith(productId);
  });

  it('should throw an error when get primary product image method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockProductImageRepository.getPrimaryProductImage.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getPrimaryProductImage(productId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* count product images by product id success and failure tests */
  it('should count product images by product id', async () => {
    /**
     * Tests the count product images by product id method.
     * Verifies that the returned productImage matches the expected one
     * and that the repository's countProductImagesByProductId method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: number = 1;

    mockProductImageRepository.countProductImagesByProductId.mockResolvedValue(
      returnOject,
    );

    const result = await service.countProductImagesByProductId(productId);
    expect(result).toEqual(returnOject);
    expect(
      mockProductImageRepository.countProductImagesByProductId,
    ).toHaveBeenCalledWith(productId);
  });

  it('should throw an error when count product images by product id method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockProductImageRepository.countProductImagesByProductId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.countProductImagesByProductId(productId);
    expect(result).rejects.toThrow('Repository error');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../src/application/services/product.service';
import { IProductRepository } from '../../src/domain/repositories/product.repository';
import { Product } from '../../src/domain/entities/product.entity';
import { ProductDTO } from '../../src/presentation/dtos/product.dto';

const mockProductRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByName: jest.fn(),
  findByCategory: jest.fn(),
  addPromotion: jest.fn(),
  removePromotion: jest.fn(),
  addImage: jest.fn(),
  removeImage: jest.fn(),
  addVariant: jest.fn(),
  removeVariant: jest.fn(),
  updateStock: jest.fn(),
  addReview: jest.fn(),
  getReviews: jest.fn(),
  addCartItem: jest.fn(),
  findByPriceRange: jest.fn(),
  getFeaturedProducts: jest.fn(),
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: IProductRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'IProductRepository',
          useValue: mockProductRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ProductService>(ProductService);
    productRepository = module.get<IProductRepository>('IProductRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* create product success and failure tests */
  it('should create product', async () => {
    /**
     * Tests the create product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's createProduct method is called with the correct data.
     */

    const product: ProductDTO = {
        id: 1,
        name: 'name',
        price: 100,
        category: undefined,
        categoryId: 0,
        stock: 0,
        shopId: 0,
        createdAt: undefined,
        updatedAt: undefined
    };

    const returnOject: Product = { id: 1, /* others data */ };

    mockProductRepository.create.mockResolvedValue(returnOject);

    const result = await service.createProduct(product);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.create).toHaveBeenCalledWith(product);
  });

  it('should throw an error when create product method fails', async () => {
    const product: ProductDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.create.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.createProduct(product)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get product by id success and failure tests */
  it('should get product by id', async () => {
    /**
     * Tests the get product by id method.
     * Verifies that the returned product matches the expected one
     * and that the repository's getProductById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Product | null = { id: 1 /* others data */ };

    mockProductRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getProductById(id);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get product by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.getById.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getProductById(id)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* update product success and failure tests */
  it('should update product', async () => {
    /**
     * Tests the update product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's updateProduct method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<ProductDTO> = {
      /* data */
    };

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateProduct(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.update).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update product method fails', async () => {
    const id: number = 1;
    const updates: Partial<ProductDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.update.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.updateProduct(id, updates)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* delete product success and failure tests */
  it('should delete product', async () => {
    /**
     * Tests the delete product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's deleteProduct method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockProductRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteProduct(id);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete product method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.delete.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.deleteProduct(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* find products by name success and failure tests */
  it('should find products by name', async () => {
    /**
     * Tests the find products by name method.
     * Verifies that the returned product matches the expected one
     * and that the repository's findProductsByName method is called with the correct data.
     */

    const name: string = 'name';

    const returnOject: Product[] = [{ id: 1 /* others data */ }];

    mockProductRepository.findByName.mockResolvedValue(returnOject);

    const result = await service.findProductsByName(name);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.findByName).toHaveBeenCalledWith(name);
  });

  it('should throw an error when find products by name method fails', async () => {
    const name: string = 'name';

    // Simulate a failure when calling the repository
    mockProductRepository.findByName.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.findProductsByName(name)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* find products by category success and failure tests */
  it('should find products by category', async () => {
    /**
     * Tests the find products by category method.
     * Verifies that the returned product matches the expected one
     * and that the repository's findProductsByCategory method is called with the correct data.
     */

    const categoryId: number = 1;

    const returnOject: Product[] = [{ id: 1 /* others data */ }];

    mockProductRepository.findByCategory.mockResolvedValue(returnOject);

    const result = await service.findProductsByCategory(categoryId);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.findByCategory).toHaveBeenCalledWith(
      categoryId,
    );
  });

  it('should throw an error when find products by category method fails', async () => {
    const categoryId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.findByCategory.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.findProductsByCategory(categoryId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* add promotion to product success and failure tests */
  it('should add promotion to product', async () => {
    /**
     * Tests the add promotion to product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's addPromotionToProduct method is called with the correct data.
     */

    const productId: number = 1;
    const promotion: PromotionDTO = {
      /* data */
    };

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.addPromotion.mockResolvedValue(returnOject);

    const result = await service.addPromotionToProduct(productId, promotion);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addPromotion).toHaveBeenCalledWith(
      productId,
      promotion,
    );
  });

  it('should throw an error when add promotion to product method fails', async () => {
    const productId: number = 1;
    const promotion: PromotionDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.addPromotion.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.addPromotionToProduct(productId, promotion),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* remove promotion from product success and failure tests */
  it('should remove promotion from product', async () => {
    /**
     * Tests the remove promotion from product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's removePromotionFromProduct method is called with the correct data.
     */

    const productId: number = 1;
    const promotionId: number = 1;

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.removePromotion.mockResolvedValue(returnOject);

    const result = await service.removePromotionFromProduct(
      productId,
      promotionId,
    );
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.removePromotion).toHaveBeenCalledWith(
      productId,
      promotionId,
    );
  });

  it('should throw an error when remove promotion from product method fails', async () => {
    const productId: number = 1;
    const promotionId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.removePromotion.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.removePromotionFromProduct(productId, promotionId),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* add image to product success and failure tests */
  it('should add image to product', async () => {
    /**
     * Tests the add image to product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's addImageToProduct method is called with the correct data.
     */

    const productId: number = 1;
    const image: ProductImageDTO = {
      /* data */
    };

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.addImage.mockResolvedValue(returnOject);

    const result = await service.addImageToProduct(productId, image);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addImage).toHaveBeenCalledWith(
      productId,
      image,
    );
  });

  it('should throw an error when add image to product method fails', async () => {
    const productId: number = 1;
    const image: ProductImageDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.addImage.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.addImageToProduct(productId, image)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* remove image from product success and failure tests */
  it('should remove image from product', async () => {
    /**
     * Tests the remove image from product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's removeImageFromProduct method is called with the correct data.
     */

    const productId: number = 1;
    const imageId: number = 1;

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.removeImage.mockResolvedValue(returnOject);

    const result = await service.removeImageFromProduct(productId, imageId);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.removeImage).toHaveBeenCalledWith(
      productId,
      imageId,
    );
  });

  it('should throw an error when remove image from product method fails', async () => {
    const productId: number = 1;
    const imageId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.removeImage.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.removeImageFromProduct(productId, imageId),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* add variant to product success and failure tests */
  it('should add variant to product', async () => {
    /**
     * Tests the add variant to product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's addVariantToProduct method is called with the correct data.
     */

    const productId: number = 1;
    const variant: ProductVariantDTO = {
      /* data */
    };

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.addVariant.mockResolvedValue(returnOject);

    const result = await service.addVariantToProduct(productId, variant);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addVariant).toHaveBeenCalledWith(
      productId,
      variant,
    );
  });

  it('should throw an error when add variant to product method fails', async () => {
    const productId: number = 1;
    const variant: ProductVariantDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.addVariant.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.addVariantToProduct(productId, variant),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* remove variant from product success and failure tests */
  it('should remove variant from product', async () => {
    /**
     * Tests the remove variant from product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's removeVariantFromProduct method is called with the correct data.
     */

    const productId: number = 1;
    const variantId: number = 1;

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.removeVariant.mockResolvedValue(returnOject);

    const result = await service.removeVariantFromProduct(productId, variantId);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.removeVariant).toHaveBeenCalledWith(
      productId,
      variantId,
    );
  });

  it('should throw an error when remove variant from product method fails', async () => {
    const productId: number = 1;
    const variantId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.removeVariant.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.removeVariantFromProduct(productId, variantId),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* update product stock success and failure tests */
  it('should update product stock', async () => {
    /**
     * Tests the update product stock method.
     * Verifies that the returned product matches the expected one
     * and that the repository's updateProductStock method is called with the correct data.
     */

    const productId: number = 1;
    const quantity: number = 1;

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.updateStock.mockResolvedValue(returnOject);

    const result = await service.updateProductStock(productId, quantity);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.updateStock).toHaveBeenCalledWith(
      productId,
      quantity,
    );
  });

  it('should throw an error when update product stock method fails', async () => {
    const productId: number = 1;
    const quantity: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.updateStock.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.updateProductStock(productId, quantity),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* add review to product success and failure tests */
  it('should add review to product', async () => {
    /**
     * Tests the add review to product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's addReviewToProduct method is called with the correct data.
     */

    const productId: number = 1;
    const review: ReviewDTO = {
      /* data */
    };

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.addReview.mockResolvedValue(returnOject);

    const result = await service.addReviewToProduct(productId, review);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addReview).toHaveBeenCalledWith(
      productId,
      review,
    );
  });

  it('should throw an error when add review to product method fails', async () => {
    const productId: number = 1;
    const review: ReviewDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.addReview.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.addReviewToProduct(productId, review)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get product reviews success and failure tests */
  it('should get product reviews', async () => {
    /**
     * Tests the get product reviews method.
     * Verifies that the returned product matches the expected one
     * and that the repository's getProductReviews method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: Review[] = [{ id: 1 /* others data */ }];

    mockProductRepository.getReviews.mockResolvedValue(returnOject);

    const result = await service.getProductReviews(productId);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.getReviews).toHaveBeenCalledWith(productId);
  });

  it('should throw an error when get product reviews method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.getReviews.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getProductReviews(productId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* add cart item to product success and failure tests */
  it('should add cart item to product', async () => {
    /**
     * Tests the add cart item to product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's addCartItemToProduct method is called with the correct data.
     */

    const productId: number = 1;
    const cartItem: CartItemDTO = {
      /* data */
    };

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.addCartItem.mockResolvedValue(returnOject);

    const result = await service.addCartItemToProduct(productId, cartItem);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addCartItem).toHaveBeenCalledWith(
      productId,
      cartItem,
    );
  });

  it('should throw an error when add cart item to product method fails', async () => {
    const productId: number = 1;
    const cartItem: CartItemDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.addCartItem.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.addCartItemToProduct(productId, cartItem),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* find products by price range success and failure tests */
  it('should find products by price range', async () => {
    /**
     * Tests the find products by price range method.
     * Verifies that the returned product matches the expected one
     * and that the repository's findProductsByPriceRange method is called with the correct data.
     */

    const minPrice: number = 1;
    const maxPrice: number = 1;

    const returnOject: Product[] = [{ id: 1 /* others data */ }];

    mockProductRepository.findByPriceRange.mockResolvedValue(returnOject);

    const result = await service.findProductsByPriceRange(minPrice, maxPrice);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.findByPriceRange).toHaveBeenCalledWith(
      minPrice,
      maxPrice,
    );
  });

  it('should throw an error when find products by price range method fails', async () => {
    const minPrice: number = 1;
    const maxPrice: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.findByPriceRange.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(
      service.findProductsByPriceRange(minPrice, maxPrice),
    ).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get featured products success and failure tests */
  it('should get featured products', async () => {
    /**
     * Tests the get featured products method.
     * Verifies that the returned product matches the expected one
     * and that the repository's getFeaturedProducts method is called with the correct data.
     */

    const returnOject: Product[] = [{ id: 1 /* others data */ }];

    mockProductRepository.getFeaturedProducts.mockResolvedValue(returnOject);

    const result = await service.getFeaturedProducts();
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.getFeaturedProducts).toHaveBeenCalledWith();
  });

  it('should throw an error when get featured products method fails', async () => {
    // Simulate a failure when calling the repository
    mockProductRepository.getFeaturedProducts.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getFeaturedProducts()).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});

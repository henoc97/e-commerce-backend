import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../src/application/services/product.service';
import { IProductRepository } from '../../src/domain/repositories/product.repository';
import { Product } from '../../src/domain/entities/product.entity';
import { ProductDTO } from '../../src/presentation/dtos/product.dto';

const mockProductRepository = {
  createProduct: jest.fn(),
  getProductById: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  findProductsByName: jest.fn(),
  findProductsByCategory: jest.fn(),
  addPromotionToProduct: jest.fn(),
  removePromotionFromProduct: jest.fn(),
  addImageToProduct: jest.fn(),
  removeImageFromProduct: jest.fn(),
  addVariantToProduct: jest.fn(),
  removeVariantFromProduct: jest.fn(),
  updateProductStock: jest.fn(),
  addReviewToProduct: jest.fn(),
  getProductReviews: jest.fn(),
  addCartItemToProduct: jest.fn(),
  findProductsByPriceRange: jest.fn(),
  getFeaturedProducts: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: IProductRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<ProductService>(ProductService);
    productRepository = module.get<IProductRepository>('ProductRepository');
  });

  /* create product success and failure tests */
  it('should create product', async () => {
    /**
     * Tests the create product method.
     * Verifies that the returned product matches the expected one
     * and that the repository's createProduct method is called with the correct data.
     */

    const product: ProductDTO = {
      /* data */
    };

    const returnOject: Product = { id: 1 /* others data */ };

    mockProductRepository.createProduct.mockResolvedValue(returnOject);

    const result = await service.createProduct(product);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.createProduct).toHaveBeenCalledWith(product);
  });

  it('should throw an error when create product method fails', async () => {
    const product: ProductDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.createProduct.mockResolvedValue(' Repository error');

    const result = await service.createProduct(product);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.getProductById.mockResolvedValue(returnOject);

    const result = await service.getProductById(id);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.getProductById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get product by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.getProductById.mockResolvedValue(' Repository error');

    const result = await service.getProductById(id);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.updateProduct.mockResolvedValue(returnOject);

    const result = await service.updateProduct(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.updateProduct).toHaveBeenCalledWith(
      id,
      updates,
    );
  });

  it('should throw an error when update product method fails', async () => {
    const id: number = 1;
    const updates: Partial<ProductDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockProductRepository.updateProduct.mockResolvedValue(' Repository error');

    const result = await service.updateProduct(id, updates);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.deleteProduct.mockResolvedValue(returnOject);

    const result = await service.deleteProduct(id);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.deleteProduct).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete product method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.deleteProduct.mockResolvedValue(' Repository error');

    const result = await service.deleteProduct(id);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.findProductsByName.mockResolvedValue(returnOject);

    const result = await service.findProductsByName(name);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.findProductsByName).toHaveBeenCalledWith(name);
  });

  it('should throw an error when find products by name method fails', async () => {
    const name: string = 'name';

    // Simulate a failure when calling the repository
    mockProductRepository.findProductsByName.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.findProductsByName(name);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.findProductsByCategory.mockResolvedValue(returnOject);

    const result = await service.findProductsByCategory(categoryId);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.findProductsByCategory).toHaveBeenCalledWith(
      categoryId,
    );
  });

  it('should throw an error when find products by category method fails', async () => {
    const categoryId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.findProductsByCategory.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.findProductsByCategory(categoryId);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.addPromotionToProduct.mockResolvedValue(returnOject);

    const result = await service.addPromotionToProduct(productId, promotion);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addPromotionToProduct).toHaveBeenCalledWith(
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
    mockProductRepository.addPromotionToProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.addPromotionToProduct(productId, promotion);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.removePromotionFromProduct.mockResolvedValue(
      returnOject,
    );

    const result = await service.removePromotionFromProduct(
      productId,
      promotionId,
    );
    expect(result).toEqual(returnOject);
    expect(
      mockProductRepository.removePromotionFromProduct,
    ).toHaveBeenCalledWith(productId, promotionId);
  });

  it('should throw an error when remove promotion from product method fails', async () => {
    const productId: number = 1;
    const promotionId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.removePromotionFromProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.removePromotionFromProduct(
      productId,
      promotionId,
    );
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.addImageToProduct.mockResolvedValue(returnOject);

    const result = await service.addImageToProduct(productId, image);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addImageToProduct).toHaveBeenCalledWith(
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
    mockProductRepository.addImageToProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.addImageToProduct(productId, image);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.removeImageFromProduct.mockResolvedValue(returnOject);

    const result = await service.removeImageFromProduct(productId, imageId);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.removeImageFromProduct).toHaveBeenCalledWith(
      productId,
      imageId,
    );
  });

  it('should throw an error when remove image from product method fails', async () => {
    const productId: number = 1;
    const imageId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.removeImageFromProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.removeImageFromProduct(productId, imageId);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.addVariantToProduct.mockResolvedValue(returnOject);

    const result = await service.addVariantToProduct(productId, variant);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addVariantToProduct).toHaveBeenCalledWith(
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
    mockProductRepository.addVariantToProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.addVariantToProduct(productId, variant);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.removeVariantFromProduct.mockResolvedValue(
      returnOject,
    );

    const result = await service.removeVariantFromProduct(productId, variantId);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.removeVariantFromProduct).toHaveBeenCalledWith(
      productId,
      variantId,
    );
  });

  it('should throw an error when remove variant from product method fails', async () => {
    const productId: number = 1;
    const variantId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.removeVariantFromProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.removeVariantFromProduct(productId, variantId);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.updateProductStock.mockResolvedValue(returnOject);

    const result = await service.updateProductStock(productId, quantity);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.updateProductStock).toHaveBeenCalledWith(
      productId,
      quantity,
    );
  });

  it('should throw an error when update product stock method fails', async () => {
    const productId: number = 1;
    const quantity: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.updateProductStock.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateProductStock(productId, quantity);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.addReviewToProduct.mockResolvedValue(returnOject);

    const result = await service.addReviewToProduct(productId, review);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addReviewToProduct).toHaveBeenCalledWith(
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
    mockProductRepository.addReviewToProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.addReviewToProduct(productId, review);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.getProductReviews.mockResolvedValue(returnOject);

    const result = await service.getProductReviews(productId);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.getProductReviews).toHaveBeenCalledWith(
      productId,
    );
  });

  it('should throw an error when get product reviews method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.getProductReviews.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getProductReviews(productId);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.addCartItemToProduct.mockResolvedValue(returnOject);

    const result = await service.addCartItemToProduct(productId, cartItem);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.addCartItemToProduct).toHaveBeenCalledWith(
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
    mockProductRepository.addCartItemToProduct.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.addCartItemToProduct(productId, cartItem);
    expect(result).rejects.toThrow('Repository error');
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

    mockProductRepository.findProductsByPriceRange.mockResolvedValue(
      returnOject,
    );

    const result = await service.findProductsByPriceRange(minPrice, maxPrice);
    expect(result).toEqual(returnOject);
    expect(mockProductRepository.findProductsByPriceRange).toHaveBeenCalledWith(
      minPrice,
      maxPrice,
    );
  });

  it('should throw an error when find products by price range method fails', async () => {
    const minPrice: number = 1;
    const maxPrice: number = 1;

    // Simulate a failure when calling the repository
    mockProductRepository.findProductsByPriceRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.findProductsByPriceRange(minPrice, maxPrice);
    expect(result).rejects.toThrow('Repository error');
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
    mockProductRepository.getFeaturedProducts.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getFeaturedProducts();
    expect(result).rejects.toThrow('Repository error');
  });
});

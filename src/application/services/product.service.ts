import { Injectable } from '@nestjs/common';
import { CartItem } from 'src/domain/entities/cart-item.entity';
import { ProductImage } from 'src/domain/entities/product-image.entity';
import { ProductVariant } from 'src/domain/entities/product-variant.entity';
import { Product } from 'src/domain/entities/product.entity';
import { Promotion } from 'src/domain/entities/promotion.entity';
import { Review } from 'src/domain/entities/review.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';
/**
 * Service class for managing product-related operations.
 */
@Injectable()
export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  /**
   * Creates and saves a new product.
   * @param product - The product entity to create.
   * @returns A promise that resolves to the created Product entity.
   */
  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }

  /**
   * Retrieves a product by its unique ID.
   * @param id - The unique ID of the product.
   * @returns A promise that resolves to the Product entity if found, otherwise null.
   */
  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.getById(id);
  }

  /**
   * Updates a product with the given data.
   * @param id - The unique ID of the product.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated Product entity.
   */
  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    return this.productRepository.update(id, updates);
  }

  /**
   * Deletes a product by its unique ID.
   * @param id - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteProduct(id: number): Promise<boolean> {
    return this.productRepository.delete(id);
  }

  /**
   * Finds products by their name.
   * @param name - The name of the product to search for.
   * @returns A promise that resolves to an array of Product entities matching the name.
   */
  async findProductsByName(name: string): Promise<Product[]> {
    return this.productRepository.findByName(name);
  }

  /**
   * Finds products within a specific category.
   * @param categoryId - The unique ID of the category.
   * @returns A promise that resolves to an array of Product entities in the category.
   */
  async findProductsByCategory(categoryId: number): Promise<Product[]> {
    return this.productRepository.findByCategory(categoryId);
  }

  /**
   * Associates a promotion with a product.
   * @param productId - The unique ID of the product.
   * @param promotion - The promotion to associate with the product.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addPromotionToProduct(
    productId: number,
    promotion: Promotion,
  ): Promise<Product> {
    return this.productRepository.addPromotion(productId, promotion);
  }

  /**
   * Disassociates a promotion from a product.
   * @param productId - The unique ID of the product.
   * @param promotionId - The unique ID of the promotion to disassociate.
   * @returns A promise that resolves to the updated Product entity.
   */
  async removePromotionFromProduct(
    productId: number,
    promotionId: number,
  ): Promise<Product> {
    return this.productRepository.removePromotion(productId, promotionId);
  }

  /**
   * Adds an image to a product.
   * @param productId - The unique ID of the product.
   * @param image - The image to add.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addImageToProduct(
    productId: number,
    image: ProductImage,
  ): Promise<Product> {
    return this.productRepository.addImage(productId, image);
  }

  /**
   * Removes an image from a product.
   * @param productId - The unique ID of the product.
   * @param imageId - The unique ID of the image to remove.
   * @returns A promise that resolves to the updated Product entity.
   */
  async removeImageFromProduct(
    productId: number,
    imageId: number,
  ): Promise<Product> {
    return this.productRepository.removeImage(productId, imageId);
  }

  /**
   * Adds a variant to a product.
   * @param productId - The unique ID of the product.
   * @param variant - The variant to add.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addVariantToProduct(
    productId: number,
    variant: ProductVariant,
  ): Promise<Product> {
    return this.productRepository.addVariant(productId, variant);
  }

  /**
   * Removes a variant from a product.
   * @param productId - The unique ID of the product.
   * @param variantId - The unique ID of the variant to remove.
   * @returns A promise that resolves to the updated Product entity.
   */
  async removeVariantFromProduct(
    productId: number,
    variantId: number,
  ): Promise<Product> {
    return this.productRepository.removeVariant(productId, variantId);
  }

  /**
   * Updates the stock quantity of a product.
   * @param productId - The unique ID of the product.
   * @param quantity - The new stock quantity.
   * @returns A promise that resolves to the updated Product entity.
   */
  async updateProductStock(
    productId: number,
    quantity: number,
  ): Promise<Product> {
    return this.productRepository.updateStock(productId, quantity);
  }

  /**
   * Adds a review to a product.
   * @param productId - The unique ID of the product.
   * @param review - The review to add.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addReviewToProduct(
    productId: number,
    review: Review,
  ): Promise<Product> {
    return this.productRepository.addReview(productId, review);
  }

  /**
   * Retrieves all reviews for a product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of Review entities.
   */
  async getProductReviews(productId: number): Promise<Review[]> {
    return this.productRepository.getReviews(productId);
  }

  /**
   * Adds a cart item for a product.
   * @param productId - The unique ID of the product.
   * @param cartItem - The cart item to add.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addCartItemToProduct(
    productId: number,
    cartItem: CartItem,
  ): Promise<Product> {
    return this.productRepository.addCartItem(productId, cartItem);
  }

  /**
   * Finds all products within a price range.
   * @param minPrice - The minimum price of the products.
   * @param maxPrice - The maximum price of the products.
   * @returns A promise that resolves to an array of Product entities within the price range.
   */
  async findProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Product[]> {
    return this.productRepository.findByPriceRange(minPrice, maxPrice);
  }

  /**
   * Retrieves a list of featured products.
   * @returns A promise that resolves to an array of featured Product entities.
   */
  async getFeaturedProducts(): Promise<Product[]> {
    return this.productRepository.getFeaturedProducts();
  }
}

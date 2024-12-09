import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import { IProductRepository } from '../../domain/repositories/product.repository';
import { fromProductDTO } from '../helper/to-entity/to.product.entity';
import { ProductDTO } from '../../presentation/dtos/product.dto';
import { PromotionDTO } from '../../presentation/dtos/promotion.dto';
import { ProductImageDTO } from '../../presentation/dtos/product-image.dto';
import { ProductVariantDTO } from '../../presentation/dtos/product-variant.dto';
import { ReviewDTO } from '../../presentation/dtos/review.dto';
import { CartItemDTO } from '../../presentation/dtos/cart-item.dto';
import { PromotionService } from './promotion.service';
import { ProductImageService } from './product-image.service';
import { ProductVariantService } from './product-variant.service';
import { ReviewService } from './review.service';
import { CartItemService } from './cart-item.service';
import { KafkaProducerService } from '../../infrastructure/external-services/kafka/services/kafka-producer.service';
import { privateDecrypt } from 'crypto';

/**
 * Service class for managing product-related operations.
 */
@Injectable()
export default class ProductService {
  constructor(
    @Inject('IProductRepository') private readonly productRepository: IProductRepository,
    private readonly kafkaProducerService: KafkaProducerService,

    private readonly promotionService: PromotionService,
    private readonly productImageService: ProductImageService,
    private readonly productVariantService: ProductVariantService,
    private readonly reviewService: ReviewService,
    private readonly cartItemService: CartItemService,
  ) { }

  /**
   * Creates and saves a new product.
   * @param product - The product dto to create.
   * @returns A promise that resolves to the created Product entity.
   */
  async createProduct(product: ProductDTO): Promise<Product> {
    const p = fromProductDTO(product);
    const result = await this.productRepository.create(p);
    if (result) this.kafkaProducerService.emitEvent('product.created', JSON.stringify(result));
    return result;
  }

  /**
   * Retrieves a product by its unique ID.
   * @param id - The unique ID of the product.
   * @returns A promise that resolves to the Product entity if found, otherwise null.
   */
  async getProductById(id: number): Promise<Product | null> {
    return await this.productRepository.getById(id);
  }

  /**
   * Updates a product with the given data.
   * @param id - The unique ID of the product.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated Product entity.
   */
  async updateProduct(
    id: number,
    updates: Partial<ProductDTO>,
  ): Promise<Product> {
    const updatedProduct = fromProductDTO(updates);
    const result = await this.productRepository.update(id, updatedProduct);
    if (result) this.kafkaProducerService.emitEvent('product.updated', JSON.stringify(result));
    return result;
  }

  /**
   * Deletes a product by its unique ID.
   * @param id - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteProduct(id: number): Promise<boolean> {
    return await this.productRepository.delete(id);
  }

  /**
   * Finds products by their name.
   * @param name - The name of the product to search for.
   * @returns A promise that resolves to an array of Product entities matching the name.
   */
  async findProductsByName(name: string): Promise<Product[]> {
    return await this.productRepository.findByName(name);
  }

  /**
   * Finds products within a specific category.
   * @param categoryId - The unique ID of the category.
   * @returns A promise that resolves to an array of Product entities in the category.
   */
  async findProductsByCategory(categoryId: number): Promise<Product[]> {
    return await this.productRepository.findByCategory(categoryId);
  }

  /**
   * Associates a promotion with a product.
   * @param productId - The unique ID of the product.
   * @param promotion - The promotion to associate with the product.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addPromotionToProduct(
    productId: number,
    promotion: PromotionDTO,
  ): Promise<Product> {
    await this.promotionService.createPromotion(promotion);
    return await this.productRepository.getById(productId);
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
    await this.promotionService.deletePromotion(promotionId);
    return await this.productRepository.getById(productId);
  }

  /**
   * Adds an image to a product.
   * @param productId - The unique ID of the product.
   * @param image - The image to add.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addImageToProduct(
    productId: number,
    image: ProductImageDTO,
  ): Promise<Product> {
    await this.productImageService.createProductImage(image);
    return await this.productRepository.getById(productId);
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
    await this.productImageService.deleteProductImage(imageId);
    return await this.productRepository.getById(productId);
  }

  /**
   * Adds a variant to a product.
   * @param productId - The unique ID of the product.
   * @param variant - The variant to add.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addVariantToProduct(
    productId: number,
    variant: ProductVariantDTO,
  ): Promise<Product> {
    await this.productVariantService.createProductVariant(variant);
    return await this.productRepository.getById(productId);
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
    await this.productVariantService.deleteProductVariant(variantId);
    return await this.productRepository.getById(productId);
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
    const result = await this.productRepository.updateStock(productId, quantity);
    if (result) this.kafkaProducerService.emitEvent('product.updated', JSON.stringify(result));
    return result;
  }

  /**
   * Adds a review to a product.
   * @param productId - The unique ID of the product.
   * @param review - The review to add.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addReviewToProduct(
    productId: number,
    review: ReviewDTO,
  ): Promise<Product> {
    await this.reviewService.createReview(review);
    return await this.productRepository.getById(productId);
  }

  /**
   * Adds a cart item for a product.
   * @param productId - The unique ID of the product.
   * @param cartItem - The cart item to add.
   * @returns A promise that resolves to the updated Product entity.
   */
  async addCartItemToProduct(
    productId: number,
    cartItem: CartItemDTO,
  ): Promise<Product> {
    await this.cartItemService.createCartItem(cartItem);
    return await this.productRepository.getById(productId);
  }

  /**
   * Retrieves all products associated with a vendor.
   * @param vendorId - The unique identifier of the vendor.
   * @returns An array of Product entities associated with the vendor.
   */
  async getVendorProducts(vendorId: number): Promise<Product[]> {
    return await this.productRepository.findByVendor(vendorId);
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
    return await this.productRepository.findByPriceRange(minPrice, maxPrice);
  }

  /**
   * Retrieves a list of featured products.
   * @returns A promise that resolves to an array of featured Product entities.
   */
  async getFeaturedProducts(): Promise<Product[]> {
    return await this.productRepository.getFeaturedProducts();
  }
}

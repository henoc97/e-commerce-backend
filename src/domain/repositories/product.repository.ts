import { CartItem } from '../entities/cart-item.entity';
import { ProductImage } from '../entities/product-image.entity';
import { ProductVariant } from '../entities/product-variant.entity';
import { Product } from '../entities/product.entity';
import { Promotion } from '../entities/promotion.entity';
import { Review } from '../entities/review.entity';

/**
 * Repository interface for managing products and their related entities.
 */
export interface IProductRepository {
  /**
   * Creates and saves a new product.
   * @param product - The product entity to create.
   * @returns A promise that resolves to the created Product entity.
   * @throws Error if creation fails.
   */
  create(product: Product): Promise<Product>;

  /**
   * Retrieves a product by its unique ID.
   * @param id - The unique ID of the product.
   * @returns A promise that resolves to the Product entity if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<Product | null>;

  /**
   * Updates a product with the given data.
   * @param id - The unique ID of the product.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if update fails.
   */
  update(id: number, updates: Partial<Product>): Promise<Product>;

  /**
   * Deletes a product by its unique ID.
   * @param id - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Finds products by their name.
   * @param name - The name of the product to search for.
   * @returns A promise that resolves to an array of Product entities matching the name.
   * @throws Error if retrieval fails.
   */
  findByName(name: string): Promise<Product[]>;

  /**
   * Finds products within a specific category.
   * @param categoryId - The unique ID of the category.
   * @returns A promise that resolves to an array of Product entities in the category.
   * @throws Error if retrieval fails.
   */
  findByCategory(categoryId: number): Promise<Product[]>;

  /**
   * Associates a promotion with a product.
   * @param productId - The unique ID of the product.
   * @param promotion - The promotion to associate with the product.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if association fails.
   */
  addPromotion(productId: number, promotion: Promotion): Promise<Product>;

  /**
   * Disassociates a promotion from a product.
   * @param productId - The unique ID of the product.
   * @param promotionId - The unique ID of the promotion to disassociate.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if disassociation fails.
   */
  removePromotion(productId: number, promotionId: number): Promise<Product>;

  /**
   * Adds an image to a product.
   * @param productId - The unique ID of the product.
   * @param image - The image to add.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if addition fails.
   */
  addImage(productId: number, image: ProductImage): Promise<Product>;

  /**
   * Removes an image from a product.
   * @param productId - The unique ID of the product.
   * @param imageId - The unique ID of the image to remove.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if removal fails.
   */
  removeImage(productId: number, imageId: number): Promise<Product>;

  /**
   * Adds a variant to a product.
   * @param productId - The unique ID of the product.
   * @param variant - The variant to add.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if addition fails.
   */
  addVariant(productId: number, variant: ProductVariant): Promise<Product>;

  /**
   * Removes a variant from a product.
   * @param productId - The unique ID of the product.
   * @param variantId - The unique ID of the variant to remove.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if removal fails.
   */
  removeVariant(productId: number, variantId: number): Promise<Product>;

  /**
   * Updates the stock quantity of a product.
   * @param productId - The unique ID of the product.
   * @param quantity - The new stock quantity.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if update fails.
   */
  updateStock(productId: number, quantity: number): Promise<Product>;

  /**
   * Adds a review to a product.
   * @param productId - The unique ID of the product.
   * @param review - The review to add.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if addition fails.
   */
  addReview(productId: number, review: Review): Promise<Product>;

  /**
   * Retrieves all reviews for a product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of Review entities.
   * @throws Error if retrieval fails.
   */
  getReviews(productId: number): Promise<Review[]>;

  /**
   * Adds a cart item for a product.
   * @param productId - The unique ID of the product.
   * @param cartItem - The cart item to add.
   * @returns A promise that resolves to the updated Product entity.
   * @throws Error if addition fails.
   */
  addCartItem(productId: number, cartItem: CartItem): Promise<Product>;

  /**
   * Finds all products within a price range.
   * @param minPrice - The minimum price of the products.
   * @param maxPrice - The maximum price of the products.
   * @returns A promise that resolves to an array of Product entities within the price range.
   * @throws Error if retrieval fails.
   */
  findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;

  /**
   * Retrieves a list of featured products.
   * @returns A promise that resolves to an array of featured Product entities.
   * @throws Error if retrieval fails.
   */
  getFeaturedProducts(): Promise<Product[]>;
}

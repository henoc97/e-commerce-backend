import { Product } from '../entities/product.entity';
import { Shop } from '../entities/shop.entity';
import { Subscription } from '../entities/subscription.entity';
import { Vendor } from '../entities/vendor.entity';

/**
 * Repository interface for managing vendors.
 */
export interface IVendorRepository {
  /**
   * Creates a new vendor.
   * @param vendor - The vendor entity to create.
   * @returns The created vendor entity.
   */
  create(vendor: Vendor): Promise<Vendor>;

  /**
   * Finds a vendor by ID.
   * @param id - The vendor ID.
   * @returns The vendor entity if found, otherwise null.
   */
  findById(id: number): Promise<Vendor | null>;

  /**
   * Updates a vendor with provided data.
   * @param id - The ID of the vendor to update.
   * @param data - Fields to update.
   * @returns The updated vendor entity.
   */
  update(id: number, data: Partial<Vendor>): Promise<Vendor>;

  /**
   * Deletes a vendor by ID.
   * @param id - The ID of the vendor to delete.
   * @returns True if deletion was successful, otherwise false.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Finds vendors by store name.
   * @param storeName - The store name.
   * @returns An array of vendors matching the store name.
   */
  findByStoreName(storeName: string): Promise<Vendor[]>;

  /**
   * Adds a product to a vendor's list.
   * @param vendorId - The ID of the vendor.
   * @param product - The product to add.
   * @returns The updated vendor entity.
   */
  addProduct(vendorId: number, product: Product): Promise<Vendor>;

  /**
   * Removes a product from a vendor's list.
   * @param vendorId - The ID of the vendor.
   * @param productId - The ID of the product to remove.
   * @returns The updated vendor entity.
   */
  removeProduct(vendorId: number, productId: number): Promise<Vendor>;

  /**
   * Retrieves all products for a vendor.
   * @param vendorId - The ID of the vendor.
   * @returns An array of products.
   */
  getProducts(vendorId: number): Promise<Product[]>;

  /**
   * Retrieves a vendor's subscription details.
   * @param vendorId - The ID of the vendor.
   * @returns The subscription entity if found, otherwise null.
   */
  getSubscription(vendorId: number): Promise<Subscription | null>;

  /**
   * Associates a subscription with a vendor.
   * @param vendorId - The ID of the vendor.
   * @param subscription - The subscription to associate.
   * @returns The updated vendor entity.
   */
  setSubscription(
    vendorId: number,
    subscription: Subscription,
  ): Promise<Vendor>;

  /**
   * Retrieves a vendor's shop.
   * @param vendorId - The ID of the vendor.
   * @returns The shop entity if found, otherwise null.
   */
  getShop(vendorId: number): Promise<Shop | null>;

  /**
   * Associates a shop with a vendor.
   * @param vendorId - The ID of the vendor.
   * @param shop - The shop to associate.
   * @returns The updated vendor entity.
   */
  setShop(vendorId: number, shop: Shop): Promise<Vendor>;

  /**
   * Finds vendors associated with a user.
   * @param userId - The user ID.
   * @returns An array of vendors.
   */
  findByUser(userId: number): Promise<Vendor[]>;

  /**
   * Retrieves vendors with a specific subscription.
   * @param subscriptionId - The subscription ID.
   * @returns An array of vendors with the specified subscription.
   */
  findBySubscription(subscriptionId: number): Promise<Vendor[]>;

  /**
   * Retrieves the most recently updated vendor.
   * @returns The most recently updated vendor entity if found, otherwise null.
   */
  getLatest(): Promise<Vendor | null>;
}

import { Injectable } from '@nestjs/common';
import { Product } from 'src/domain/entities/product.entity';
import { Shop } from 'src/domain/entities/shop.entity';
import { Subscription } from 'src/domain/entities/subscription.entity';
import { Vendor } from 'src/domain/entities/vendor.entity';
import { IVendorRepository } from 'src/domain/repositories/vendor.repository';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';
import { fromVendorDTO } from '../helper/to-entity/to.vendor.entity';
import { fromProductDTO } from '../helper/to-entity/to.product.entity';
import { fromSubscriptionDTO } from '../helper/to-entity/to.subscription.entity';
import { fromShopDTO } from '../helper/to-entity/to.shop.entity';

/**
 * VendorService handles the application logic for managing vendors.
 * It uses a repository to interact with the domain and provides business use cases.
 */
@Injectable()
export class VendorService {
  constructor(private readonly vendorRepository: IVendorRepository) {}

  /**
   * Creates a new vendor based on the provided DTO.
   * @param vendorDTO - The DTO containing vendor information.
   * @returns The newly created Vendor entity.
   */
  async createVendor(vendorDTO: VendorDTO): Promise<Vendor> {
    const vendorEntity = fromVendorDTO(vendorDTO);

    return this.vendorRepository.create(vendorEntity);
  }

  /**
   * Finds a vendor by its ID.
   * @param id - The unique identifier of the vendor.
   * @returns The Vendor entity if found, otherwise null.
   */
  async findVendorById(id: number): Promise<Vendor | null> {
    return this.vendorRepository.findById(id);
  }

  /**
   * Updates a vendor with the given data.
   * @param id - The unique identifier of the vendor to update.
   * @param updateData - Partial data to update the vendor.
   * @returns The updated Vendor entity.
   */
  async updateVendor(
    id: number,
    updateData: Partial<VendorDTO>,
  ): Promise<Vendor> {
    const updatedVendor = fromVendorDTO(updateData);
    return this.vendorRepository.update(id, updatedVendor);
  }

  /**
   * Deletes a vendor by its ID.
   * @param id - The unique identifier of the vendor to delete.
   * @returns True if deletion was successful, otherwise false.
   */
  async deleteVendor(id: number): Promise<boolean> {
    return this.vendorRepository.delete(id);
  }

  /**
   * Finds vendors by their store name.
   * @param storeName - The name of the store to search for.
   * @returns An array of vendors matching the given store name.
   */
  async findVendorsByStoreName(storeName: string): Promise<Vendor[]> {
    return this.vendorRepository.findByStoreName(storeName);
  }

  /**
   * Adds a product to the vendor's list.
   * @param vendorId - The unique identifier of the vendor.
   * @param productDTO - The DTO containing product information.
   * @returns The updated Vendor entity with the new product.
   */
  async addProductToVendor(
    vendorId: number,
    productDTO: ProductDTO,
  ): Promise<Vendor> {
    const productEntity = fromProductDTO(productDTO);

    return this.vendorRepository.addProduct(vendorId, productEntity);
  }

  /**
   * Removes a product from the vendor's list.
   * @param vendorId - The unique identifier of the vendor.
   * @param productId - The unique identifier of the product to remove.
   * @returns The updated Vendor entity without the removed product.
   */
  async removeProductFromVendor(
    vendorId: number,
    productId: number,
  ): Promise<Vendor> {
    return this.vendorRepository.removeProduct(vendorId, productId);
  }

  /**
   * Retrieves all products associated with a vendor.
   * @param vendorId - The unique identifier of the vendor.
   * @returns An array of Product entities associated with the vendor.
   */
  async getVendorProducts(vendorId: number): Promise<Product[]> {
    return this.vendorRepository.getProducts(vendorId);
  }

  /**
   * Retrieves the subscription details of a vendor.
   * @param vendorId - The unique identifier of the vendor.
   * @returns The Subscription entity if found, otherwise null.
   */
  async getVendorSubscription(vendorId: number): Promise<Subscription | null> {
    return this.vendorRepository.getSubscription(vendorId);
  }

  /**
   * Associates a subscription with a vendor.
   * @param vendorId - The unique identifier of the vendor.
   * @param subscriptionDTO - The DTO containing subscription information.
   * @returns The updated Vendor entity with the associated subscription.
   */
  async setVendorSubscription(
    vendorId: number,
    subscriptionDTO: SubscriptionDTO,
  ): Promise<Vendor> {
    const subscriptionEntity = fromSubscriptionDTO(subscriptionDTO);

    return this.vendorRepository.setSubscription(vendorId, subscriptionEntity);
  }

  /**
   * Retrieves the shop associated with a vendor.
   * @param vendorId - The unique identifier of the vendor.
   * @returns The Shop entity if found, otherwise null.
   */
  async getVendorShop(vendorId: number): Promise<Shop | null> {
    return this.vendorRepository.getShop(vendorId);
  }

  /**
   * Associates a shop with a vendor.
   * @param vendorId - The unique identifier of the vendor.
   * @param shopDTO - The DTO containing shop information.
   * @returns The updated Vendor entity with the associated shop.
   */
  async setVendorShop(vendorId: number, shopDTO: ShopDTO): Promise<Vendor> {
    const shopEntity = fromShopDTO(shopDTO);

    return this.vendorRepository.setShop(vendorId, shopEntity);
  }

  /**
   * Finds vendors by the user they are associated with.
   * @param userId - The unique identifier of the user.
   * @returns An array of vendors associated with the user.
   */
  async findVendorsByUser(userId: number): Promise<Vendor[]> {
    return this.vendorRepository.findByUser(userId);
  }

  /**
   * Finds vendors with a specific subscription.
   * @param subscriptionId - The unique identifier of the subscription.
   * @returns An array of vendors with the specified subscription.
   */
  async findVendorsBySubscription(subscriptionId: number): Promise<Vendor[]> {
    return this.vendorRepository.findBySubscription(subscriptionId);
  }

  /**
   * Execute the vendor-list use case.
   * @returns A promise that resolves to an array of Vendors.
   */
  async getAllVendors(): Promise<Vendor[]> {
    return this.vendorRepository.getall();
  }

  /**
   * Retrieves the most recently updated vendor.
   * @returns The most recently updated Vendor entity if found, otherwise null.
   */
  async getLatestVendor(): Promise<Vendor | null> {
    return this.vendorRepository.getLatest();
  }
}

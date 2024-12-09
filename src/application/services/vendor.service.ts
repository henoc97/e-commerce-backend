import { Inject, Injectable } from '@nestjs/common';
import { Vendor } from '../../domain/entities/vendor.entity';
import { IVendorRepository } from '../../domain/repositories/vendor.repository';
import { ProductDTO } from '../../presentation/dtos/product.dto';
import { ShopDTO } from '../../presentation/dtos/shop.dto';
import { SubscriptionDTO } from '../../presentation/dtos/subscription.dto';
import { VendorDTO } from '../../presentation/dtos/vendor.dto';
import { fromVendorDTO } from '../helper/to-entity/to.vendor.entity';
import { fromProductDTO } from '../helper/to-entity/to.product.entity';
import { SubscriptionService } from './subscription.service';
import { ShopService } from './shop.service';

/**
 * VendorService handles the application logic for managing vendors.
 * It uses a repository to interact with the domain and provides business use cases.
 */
@Injectable()
export class VendorService {
  getVendorProducts(vendorId: number) {
    throw new Error('Method not implemented.');
  }
  getVendorSubscription(vendorId: number) {
    throw new Error('Method not implemented.');
  }
  getVendorShop(vendorId: number) {
    throw new Error('Method not implemented.');
  }
  getLatestVendor() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject('IVendorRepository')
    private readonly vendorRepository: IVendorRepository,
    private readonly subscriptionService: SubscriptionService,
    private readonly shopService: ShopService,
  ) { }


  /**
   * Creates a new vendor based on the provided DTO.
   * @param vendorDTO - The DTO containing vendor information.
   * @returns The newly created Vendor entity.
   */
  async createVendor(vendorDTO: VendorDTO): Promise<Vendor> {
    const vendorEntity = fromVendorDTO(vendorDTO);
    return await this.vendorRepository.create(vendorEntity);
  }

  /**
   * Finds a vendor by its ID.
   * @param id - The unique identifier of the vendor.
   * @returns The Vendor entity if found, otherwise null.
   */
  async findVendorById(id: number): Promise<Vendor | null> {
    return await this.vendorRepository.findById(id);
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
    return await this.vendorRepository.update(id, updatedVendor);
  }

  /**
   * Deletes a vendor by its ID.
   * @param id - The unique identifier of the vendor to delete.
   * @returns True if deletion was successful, otherwise false.
   */
  async deleteVendor(id: number): Promise<boolean> {
    return await this.vendorRepository.delete(id);
  }

  /**
   * Finds vendors by their store name.
   * @param storeName - The name of the store to search for.
   * @returns An array of vendors matching the given store name.
   */
  async findVendorsByStoreName(storeName: string): Promise<Vendor[]> {
    return await this.vendorRepository.findByStoreName(storeName);
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

    return await this.vendorRepository.addProduct(vendorId, productEntity);
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
    return await this.vendorRepository.removeProduct(vendorId, productId);
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
    await this.subscriptionService.createSubscription(subscriptionDTO);
    return await this.vendorRepository.findById(vendorId);
  }

  /**
   * Associates a shop with a vendor.
   * @param vendorId - The unique identifier of the vendor.
   * @param shopDTO - The DTO containing shop information.
   * @returns The updated Vendor entity with the associated shop.
   */
  async setVendorShop(vendorId: number, shopDTO: ShopDTO): Promise<Vendor> {
    await this.shopService.createShop(shopDTO);
    return await this.vendorRepository.findById(vendorId);
  }

  /**
   * Finds vendors by the user they are associated with.
   * @param userId - The unique identifier of the user.
   * @returns An array of vendors associated with the user.
   */
  async findVendorsByUser(userId: number): Promise<Vendor[]> {
    return await this.vendorRepository.findByUser(userId);
  }

  /**
   * Finds vendors with a specific subscription.
   * @param subscriptionId - The unique identifier of the subscription.
   * @returns An array of vendors with the specified subscription.
   */
  async findVendorsBySubscription(subscriptionId: number): Promise<Vendor[]> {
    return await this.vendorRepository.findBySubscription(subscriptionId);
  }

  /**
   * Execute the vendor-list use case.
   * @returns A promise that resolves to an array of Vendors.
   */
  async getAllVendors(): Promise<Vendor[]> {
    return await this.vendorRepository.getAll();
  }
}


let myMap = new Map();

myMap.set('baahir', 'ina');

console.log(myMap.get('baahir'));

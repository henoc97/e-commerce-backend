import { Inject, Injectable } from '@nestjs/common';

import { Shop } from 'src/domain/entities/shop.entity';
import { IShopRepository } from 'src/domain/repositories/shop.repository';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { fromShopDTO } from '../helper/to-entity/to.shop.entity';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';
import ProductService from './product.service';
import { OrderService } from './order.service';
import { CategoryService } from './category.service';

/**
 * Service for managing shop-related operations.
 * Implements business logic for interacting with the shop repository.
 */
@Injectable()
export class ShopService {
  constructor(
    @Inject('IShopRepository')
    private readonly shopRepository: IShopRepository,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly categoryService: CategoryService,
  ) { }

  /**
   * Creates a new shop.
   * @param shopDTO - Data Transfer Object containing shop details.
   * @returns The created Shop entity.
   */
  async createShop(shopDTO: ShopDTO): Promise<Shop> {
    // Convert DTO to Entity
    const shop = fromShopDTO(shopDTO);
    // Call repository method to create the shop
    return await this.shopRepository.create(shop);
  }

  /**
   * Retrieves a shop by its ID.
   * @param id - The ID of the shop to retrieve.
   * @returns The Shop entity, or null if not found.
   */
  async getShopById(id: number): Promise<Shop | null> {
    return await this.shopRepository.getById(id);
  }

  /**
   * Updates an existing shop.
   * @param id - The ID of the shop to update.
   * @param updates - Partial shop data to update.
   * @returns The updated Shop entity.
   */
  async updateShop(id: number, updates: Partial<ShopDTO>): Promise<Shop> {
    const updatedShop = fromShopDTO(updates);
    return await this.shopRepository.update(id, updatedShop);
  }

  /**
   * Deletes a shop.
   * @param id - The ID of the shop to delete.
   * @returns True if the shop was successfully deleted.
   */
  async deleteShop(id: number): Promise<boolean> {
    return await this.shopRepository.delete(id);
  }

  /**
   * Searches for shops by name.
   * @param name - The name of the shop to search for.
   * @returns An array of matching Shop entities.
   */
  async searchShopsByName(name: string): Promise<Shop[]> {
    return await this.shopRepository.searchByName(name);
  }

  /**
   * Adds a product to a shop.
   * @param shopId - The ID of the shop.
   * @param product - The product to add.
   * @returns The updated Shop entity.
   */
  async addProductToShop(shopId: number, product: ProductDTO): Promise<Shop> {
    await this.productService.createProduct(product);
    return await this.shopRepository.getById(shopId);
  }

  /**
   * Removes a product from a shop.
   * @param shopId - The ID of the shop.
   * @param productId - The ID of the product to remove.
   * @returns The updated Shop entity.
   */
  async removeProductFromShop(
    shopId: number,
    productId: number,
  ): Promise<Shop> {
    await this.productService.deleteProduct(productId);
    return await this.shopRepository.getById(shopId);
  }

  /**
   * Adds an order to a shop.
   * @param shopId - The ID of the shop.
   * @param order - The order to add.
   * @returns The updated Shop entity.
   */
  async addOrderToShop(shopId: number, order: OrderDTO): Promise<Shop> {
    await this.orderService.createOrder(order);
    return await this.shopRepository.getById(shopId);
  }

  /**
   * Adds a category to a shop.
   * @param shopId - The ID of the shop.
   * @param category - The category to add.
   * @returns The updated Shop entity.
   */
  async addCategoryToShop(
    shopId: number,
    category: CategoryDTO,
  ): Promise<Shop> {
    await this.categoryService.createCategory(category);
    return await this.shopRepository.getById(shopId);
  }

  /**
   * Removes a category from a shop.
   * @param shopId - The ID of the shop.
   * @param categoryId - The ID of the category to remove.
   * @returns The updated Shop entity.
   */
  async removeCategoryFromShop(
    shopId: number,
    categoryId: number,
  ): Promise<Shop> {
    await this.categoryService.deleteCategory(categoryId);
    return await this.shopRepository.getById(shopId);
  }

  /**
   * Associates a marketplace with a shop.
   * @param shopId - The ID of the shop.
   * @param marketplaceId - The ID of marketplace to associate.
   * @returns The updated Shop entity.
   */
  async associateMarketplaceWithShop(
    shopId: number,
    marketplaceId: number,
  ): Promise<Shop> {
    return await this.shopRepository.associateMarketplace(shopId, marketplaceId);
  }

  /**
   * Retrieves all shops for a specific vendor.
   * @param vendorId - The ID of the vendor.
   * @returns An array of Shop entities.
   */
  async listShopsByVendor(vendorId: number): Promise<Shop[]> {
    return await this.shopRepository.listByVendor(vendorId);
  }

  /**
   * Retrieves the most recently updated shop.
   * @returns The most recently updated Shop entity, or null.
   */
  async getMostRecentShop(): Promise<Shop | null> {
    return await this.shopRepository.getMostRecent();
  }

  /**
   * Retrieves the total sales of a shop.
   * @param shopId - The ID of the shop.
   * @returns The total sales amount for the shop.
   */
  async getTotalSalesForShop(shopId: number): Promise<number> {
    return await this.shopRepository.getTotalSales(shopId);
  }

  /**
   * Retrieves a report of orders based on time periods.
   * @param shopId - The ID of the shop.
   * @param startDate - Start of the time range.
   * @param endDate - End of the time range.
   * @returns A report summarizing the orders within the time range.
   */
  async getOrderReportForShop(
    shopId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    return await this.shopRepository.getOrderReport(shopId, startDate, endDate);
  }
}

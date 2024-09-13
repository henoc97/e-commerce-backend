import { Injectable } from '@nestjs/common';
import { Category } from 'src/domain/entities/category.entity';
import { Marketplace } from 'src/domain/entities/marketplace.entity';
import { Order } from 'src/domain/entities/order.entity';
import { Product } from 'src/domain/entities/product.entity';
import { Shop } from 'src/domain/entities/shop.entity';
import { IShopRepository } from 'src/domain/repositories/shop.repository';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';

/**
 * Service for managing shop-related operations.
 * Implements business logic for interacting with the shop repository.
 */
@Injectable()
export class ShopService {
  constructor(private readonly shopRepository: IShopRepository) {}

  /**
   * Creates a new shop.
   * @param shopDTO - Data Transfer Object containing shop details.
   * @returns The created Shop entity.
   */
  async createShop(shopDTO: ShopDTO): Promise<Shop> {
    // Convert DTO to Entity
    const shop = new Shop(
      shopDTO.id,
      shopDTO.name,
      shopDTO.url,
      null,
      shopDTO.vendorId,
      null,
      null,
      null,
      shopDTO.createdAt,
      shopDTO.updatedAt,
      shopDTO.description,
      null,
      shopDTO.marketplaceId,
    );

    // Call repository method to create the shop
    return this.shopRepository.create(shop);
  }

  /**
   * Retrieves a shop by its ID.
   * @param id - The ID of the shop to retrieve.
   * @returns The Shop entity, or null if not found.
   */
  async getShopById(id: number): Promise<Shop | null> {
    return this.shopRepository.getById(id);
  }

  /**
   * Updates an existing shop.
   * @param id - The ID of the shop to update.
   * @param updates - Partial shop data to update.
   * @returns The updated Shop entity.
   */
  async updateShop(id: number, updates: Partial<Shop>): Promise<Shop> {
    return this.shopRepository.update(id, updates);
  }

  /**
   * Deletes a shop.
   * @param id - The ID of the shop to delete.
   * @returns True if the shop was successfully deleted.
   */
  async deleteShop(id: number): Promise<boolean> {
    return this.shopRepository.delete(id);
  }

  /**
   * Searches for shops by name.
   * @param name - The name of the shop to search for.
   * @returns An array of matching Shop entities.
   */
  async searchShopsByName(name: string): Promise<Shop[]> {
    return this.shopRepository.searchByName(name);
  }

  /**
   * Adds a product to a shop.
   * @param shopId - The ID of the shop.
   * @param product - The product to add.
   * @returns The updated Shop entity.
   */
  async addProductToShop(shopId: number, product: Product): Promise<Shop> {
    return this.shopRepository.addProduct(shopId, product);
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
    return this.shopRepository.removeProduct(shopId, productId);
  }

  /**
   * Retrieves all products for a shop.
   * @param shopId - The ID of the shop.
   * @returns An array of Product entities.
   */
  async listProductsForShop(shopId: number): Promise<Product[]> {
    return this.shopRepository.listProducts(shopId);
  }

  /**
   * Adds an order to a shop.
   * @param shopId - The ID of the shop.
   * @param order - The order to add.
   * @returns The updated Shop entity.
   */
  async addOrderToShop(shopId: number, order: Order): Promise<Shop> {
    return this.shopRepository.addOrder(shopId, order);
  }

  /**
   * Retrieves all orders for a shop.
   * @param shopId - The ID of the shop.
   * @returns An array of Order entities.
   */
  async listOrdersForShop(shopId: number): Promise<Order[]> {
    return this.shopRepository.listOrders(shopId);
  }

  /**
   * Adds a category to a shop.
   * @param shopId - The ID of the shop.
   * @param category - The category to add.
   * @returns The updated Shop entity.
   */
  async addCategoryToShop(shopId: number, category: Category): Promise<Shop> {
    return this.shopRepository.addCategory(shopId, category);
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
    return this.shopRepository.removeCategory(shopId, categoryId);
  }

  /**
   * Retrieves all categories for a shop.
   * @param shopId - The ID of the shop.
   * @returns An array of Category entities.
   */
  async listCategoriesForShop(shopId: number): Promise<Category[]> {
    return this.shopRepository.listCategories(shopId);
  }

  /**
   * Associates a marketplace with a shop.
   * @param shopId - The ID of the shop.
   * @param marketplace - The marketplace to associate.
   * @returns The updated Shop entity.
   */
  async associateMarketplaceWithShop(
    shopId: number,
    marketplace: Marketplace,
  ): Promise<Shop> {
    return this.shopRepository.associateMarketplace(shopId, marketplace);
  }

  /**
   * Retrieves the marketplace associated with a shop.
   * @param shopId - The ID of the shop.
   * @returns The Marketplace entity, or null if not found.
   */
  async getMarketplaceForShop(shopId: number): Promise<Marketplace | null> {
    return this.shopRepository.getMarketplace(shopId);
  }

  /**
   * Retrieves all shops for a specific vendor.
   * @param vendorId - The ID of the vendor.
   * @returns An array of Shop entities.
   */
  async listShopsByVendor(vendorId: number): Promise<Shop[]> {
    return this.shopRepository.listByVendor(vendorId);
  }

  /**
   * Retrieves the most recently updated shop.
   * @returns The most recently updated Shop entity, or null.
   */
  async getMostRecentShop(): Promise<Shop | null> {
    return this.shopRepository.getMostRecent();
  }

  /**
   * Retrieves the total sales of a shop.
   * @param shopId - The ID of the shop.
   * @returns The total sales amount for the shop.
   */
  async getTotalSalesForShop(shopId: number): Promise<number> {
    return this.shopRepository.getTotalSales(shopId);
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
    return this.shopRepository.getOrderReport(shopId, startDate, endDate);
  }

  /**
   * Retrieves the most popular product for a shop.
   * @param shopId - The ID of the shop.
   * @returns The most sold Product entity.
   */
  async getTopProductForShop(shopId: number): Promise<Product> {
    return this.shopRepository.getTopProduct(shopId);
  }
}

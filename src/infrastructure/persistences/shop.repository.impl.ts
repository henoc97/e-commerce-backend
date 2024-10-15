import { PrismaService } from 'prisma/prisma.service';
import { fromShopPrisma } from 'src/application/helper/from-prisma/to.shop.entity';
import { Shop } from 'src/domain/entities/shop.entity';
import { IShopRepository } from 'src/domain/repositories/shop.repository';

export class ShopRepository implements IShopRepository {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * Creates a new shop in the database.
   * @param shop - The shop entity to create.
   * @returns The created shop.
   */
  async create(shop: Shop): Promise<Shop> {
    try {
      const { id, vendor, products, orders, categories, Marketplace, ...data } =
        shop;
      const result = await this.prisma.shop.create({
        data: data,
      });
      return fromShopPrisma(result);
    } catch (error) {
      throw new Error(`Failed to create shop: ${error.message}`);
    }
  }

  /**
   * Retrieves a shop by its ID.
   * @param id - The ID of the shop to retrieve.
   * @returns The shop if found, or null.
   */
  async getById(id: number): Promise<Shop | null> {
    try {
      const result = await this.prisma.shop.findUnique({
        where: { id },
      });
      return fromShopPrisma(result);
    } catch (error) {
      throw new Error(
        `Failed to retrieve shop with ID ${id}: ${error.message}`,
      );
    }
  }

  /**
   * Updates a shop with new values.
   * @param id - The ID of the shop to update.
   * @param updates - The fields to update.
   * @returns The updated shop.
   */
  async update(id: number, updates: Partial<Shop>): Promise<Shop> {
    try {
      const { vendor, products, orders, categories, Marketplace, ...data } =
        updates;
      const result = await this.prisma.shop.update({
        where: { id },
        data: data,
      });
      return fromShopPrisma(result);
    } catch (error) {
      throw new Error(`Failed to update shop with ID ${id}: ${error.message}`);
    }
  }

  /**
   * Deletes a shop by its ID.
   * @param id - The ID of the shop to delete.
   * @returns A boolean indicating if the deletion was successful.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.shop.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error(`Failed to delete shop with ID ${id}: ${error.message}`);
      return false;
    }
  }

  /**
   * Searches for shops by their name.
   * @param name - The name to search for.
   * @returns An array of shops that match the name.
   */
  async searchByName(name: string): Promise<Shop[]> {
    try {
      const result = await this.prisma.shop.findMany({
        where: { name: { contains: name } },
      });
      return result.map(fromShopPrisma);
    } catch (error) {
      throw new Error(
        `Failed to search shops by name "${name}": ${error.message}`,
      );
    }
  }

  /**
   * Lists all shops for a specific vendor.
   * @param vendorId - The ID of the vendor.
   * @returns A list of shops for the vendor.
   */
  async listByVendor(vendorId: number): Promise<Shop[]> {
    try {
      const shops = await this.prisma.shop.findMany({
        where: { vendorId },
      });
      return shops.map(fromShopPrisma);
    } catch (error) {
      throw new Error(`Failed to list shops for vendor: ${error.message}`);
    }
  }

  /**
   * Retrieves the most recently created shop.
   * @returns The most recent shop or null if none exists.
   */
  async getMostRecent(): Promise<Shop | null> {
    try {
      const shop = await this.prisma.shop.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      return fromShopPrisma(shop);
    } catch (error) {
      throw new Error(`Failed to get most recent shop: ${error.message}`);
    }
  }

  /**
   * Associates a shop with a marketplace.
   * @param shopId - The ID of the shop.
   * @param marketplaceId - The ID of the marketplace.
   * @returns The updated shop with the associated marketplace.
   */
  async associateMarketplace(
    shopId: number,
    marketplaceId: number,
  ): Promise<Shop> {
    try {
      const result = await this.prisma.shop.update({
        where: { id: shopId },
        data: {
          marketplace: {
            connect: { id: marketplaceId },
          },
        },
      });
      return fromShopPrisma(result);
    } catch (error) {
      throw new Error(
        `Failed to associate shop with marketplace: ${error.message}`,
      );
    }
  }

  /**
   * Calculates the total sales for a shop.
   * @param shopId - The ID of the shop.
   * @returns The total sales amount.
   */
  async getTotalSales(shopId: number): Promise<number> {
    try {
      const orders = await this.prisma.order.findMany({
        where: { shopId },
        select: {
          totalAmount: true, // Select the total amount from each order
        },
      });

      // Sum up the total amount from each order
      const totalSales = orders.reduce(
        (acc, order) => acc + order.totalAmount,
        0,
      );

      return totalSales;
    } catch (error) {
      throw new Error(
        `Failed to calculate total sales for shop ID ${shopId}: ${error.message}`,
      );
    }
  }

  /**
   * Generates an order report for a shop between two dates.
   * @param shopId - The ID of the shop.
   * @param startDate - The start date of the report.
   * @param endDate - The end date of the report.
   * @returns The order report.
   */
  async getOrderReport(
    shopId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    try {
      const report = await this.prisma.order.findMany({
        where: {
          shopId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return report;
    } catch (error) {
      throw new Error(`Failed to get order report: ${error.message}`);
    }
  }
}

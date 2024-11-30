import { fromMarketplacePrisma } from 'src/application/helper/from-prisma/to.marketplace.entity';
import { Marketplace } from 'src/domain/entities/marketplace.entity';
import { Shop } from 'src/domain/entities/shop.entity';
import { IMarketplaceRepository } from 'src/domain/repositories/marketplace.repository';
import prisma from 'prisma/prisma.service';

export class MarketplaceRepository implements IMarketplaceRepository {


  /**
   * Creates a new marketplace.
   * @param marketplace The marketplace entity to create.
   * @returns The created marketplace.
   */
  async create(marketplace: Marketplace): Promise<Marketplace> {
    try {
      const { id, shops, ...data } = marketplace;
      const result = await prisma.marketplace.create({
        data: data,
      });
      return fromMarketplacePrisma(result);
    } catch (error) {
      console.error('Error creating marketplace:', error);
      throw error;
    }
  }

  /**
   * Retrieves a marketplace by its ID.
   * @param id The ID of the marketplace.
   * @returns The marketplace if found, otherwise null.
   */
  async getById(id: number): Promise<Marketplace | null> {
    try {
      const result = await prisma.marketplace.findUnique({
        where: { id },
      });
      return result ? fromMarketplacePrisma(result) : null;
    } catch (error) {
      console.error('Error retrieving marketplace by ID:', error);
      throw error;
    }
  }

  /**
   * Lists all marketplaces.
   * @returns An array of marketplaces.
   */
  async list(): Promise<Marketplace[]> {
    try {
      const result = await prisma.marketplace.findMany();
      return result?.map(fromMarketplacePrisma);
    } catch (error) {
      console.error('Error listing marketplaces:', error);
      throw error;
    }
  }

  /**
   * Updates a marketplace by its ID.
   * @param id The ID of the marketplace.
   * @param data The partial data to update the marketplace with.
   * @returns The updated marketplace.
   */
  async update(id: number, data: Partial<Marketplace>): Promise<Marketplace> {
    try {
      const { shops, ...marketplaceData } = data;
      const result = await prisma.marketplace.update({
        where: { id },
        data: marketplaceData,
      });
      return fromMarketplacePrisma(result);
    } catch (error) {
      console.error('Error updating marketplace:', error);
      throw error;
    }
  }

  /**
   * Deletes a marketplace by its ID.
   * @param id The ID of the marketplace.
   * @returns True if the marketplace was deleted, false otherwise.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.marketplace.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting marketplace:', error);
      return false;
    }
  }

  /**
   * Retrieves all shops associated with a marketplace.
   * @param marketplaceId The ID of the marketplace.
   * @returns An array of shops belonging to the marketplace.
   */
  async getShops(marketplaceId: number): Promise<Shop[]> {
    try {
      const result = await prisma.marketplace.findMany({
        where: { id: marketplaceId },
      });
      const { shops } = fromMarketplacePrisma(result);
      return shops;
    } catch (error) {
      console.error('Error retrieving shops by marketplace ID:', error);
      throw error;
    }
  }

  /**
   * Retrieves the marketplace associated with a given shop ID.
   * @param shopId The ID of the shop.
   * @returns The marketplace the shop belongs to, or null if not found.
   */
  async getMarketplaceByShopId(shopId: number): Promise<Marketplace | null> {
    try {
      const result = await prisma.marketplace.findFirst({
        where: { shops: { some: { id: shopId } } },
      });
      return fromMarketplacePrisma(result);
    } catch (error) {
      console.error('Error retrieving marketplace by shop ID:', error);
      throw error;
    }
  }
}

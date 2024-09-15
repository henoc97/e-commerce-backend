import { Injectable } from '@nestjs/common';
import { Marketplace } from 'src/domain/entities/marketplace.entity';
import { Shop } from 'src/domain/entities/shop.entity';
import { IMarketplaceRepository } from 'src/domain/repositories/marketplace.repository';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';
import { fromMarketplaceDTO } from '../helper/to-entity/to.marketplace.entity';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { fromShopDTO } from '../helper/to-entity/to.shop.entity';
/**
 * Service for handling marketplace-related operations.
 * This service contains business logic for managing marketplaces, including CRUD operations and association with shops.
 */
@Injectable()
export class MarketplaceService {
  constructor(private readonly marketplaceRepository: IMarketplaceRepository) {}

  /**
   * Creates a new Marketplace.
   * @param marketplace - The Marketplace entity to create.
   * @returns A promise that resolves to the created Marketplace.
   * @throws Error if creation fails.
   */
  async createMarketplace(dto: MarketplaceDTO): Promise<Marketplace> {
    const marketplace = fromMarketplaceDTO(dto);
    return await this.marketplaceRepository.create(marketplace);
  }

  /**
   * Retrieves a Marketplace by its unique ID.
   * @param id - The unique ID of the Marketplace.
   * @returns A promise that resolves to the Marketplace if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  async getMarketplaceById(id: number): Promise<Marketplace | null> {
    return await this.marketplaceRepository.getById(id);
  }

  /**
   * Lists all Marketplaces.
   * @returns A promise that resolves to an array of all Marketplaces.
   * @throws Error if retrieval fails.
   */
  async listMarketplaces(): Promise<Marketplace[]> {
    return await this.marketplaceRepository.list();
  }

  /**
   * Updates an existing Marketplace.
   * @param id - The unique ID of the Marketplace to update.
   * @param data - The updated Marketplace data.
   * @returns A promise that resolves to the updated Marketplace.
   * @throws Error if update fails.
   */
  async updateMarketplace(
    id: number,
    data: Partial<MarketplaceDTO>,
  ): Promise<Marketplace> {
    const updatedData = fromMarketplaceDTO(data);
    return await this.marketplaceRepository.update(id, updatedData);
  }

  /**
   * Deletes a Marketplace by its unique ID.
   * @param id - The unique ID of the Marketplace to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  async deleteMarketplace(id: number): Promise<boolean> {
    return await this.marketplaceRepository.delete(id);
  }

  /**
   * Associates a Shop with a Marketplace.
   * @param marketplaceId - The unique ID of the Marketplace.
   * @param shopDTO - The Shop dto to add.
   * @returns A promise that resolves to the updated Marketplace.
   * @throws Error if association fails.
   */
  async addShopToMarketplace(
    marketplaceId: number,
    shopDTO: ShopDTO,
  ): Promise<Marketplace> {
    const shop = fromShopDTO(shopDTO);
    return await this.marketplaceRepository.addShop(marketplaceId, shop);
  }

  /**
   * Disassociates a Shop from a Marketplace.
   * @param marketplaceId - The unique ID of the Marketplace.
   * @param shopId - The unique ID of the Shop to remove.
   * @returns A promise that resolves to the updated Marketplace.
   * @throws Error if disassociation fails.
   */
  async removeShopFromMarketplace(
    marketplaceId: number,
    shopId: number,
  ): Promise<Marketplace> {
    return await this.marketplaceRepository.removeShop(marketplaceId, shopId);
  }

  /**
   * Retrieves all shops within a Marketplace.
   * @param marketplaceId - The unique ID of the Marketplace.
   * @returns A promise that resolves to an array of Shops in the Marketplace.
   * @throws Error if retrieval fails.
   */
  async getShopsInMarketplace(marketplaceId: number): Promise<Shop[]> {
    return await this.marketplaceRepository.getShops(marketplaceId);
  }

  /**
   * Retrieves the Marketplace by a specific Shop's ID.
   * @param shopId - The unique ID of the Shop.
   * @returns A promise that resolves to the Marketplace containing the Shop, or null if not found.
   * @throws Error if retrieval fails.
   */
  async getMarketplaceByShopId(shopId: number): Promise<Marketplace | null> {
    return await this.marketplaceRepository.getMarketplaceByShopId(shopId);
  }
}

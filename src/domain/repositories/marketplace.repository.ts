import { Marketplace } from '../entities/marketplace.entity';
import { Shop } from '../entities/shop.entity';

/**
 * Interface for managing marketplace operations and business rules.
 */
export interface IMarketplaceRepository {
  /**
   * Creates and stores a new Marketplace.
   * @param marketplace - The Marketplace entity to create.
   * @returns A promise that resolves to the created Marketplace.
   * @throws Error if creation fails.
   */
  create(marketplace: Marketplace): Promise<Marketplace>;

  /**
   * Retrieves a Marketplace by its unique ID.
   * @param id - The unique ID of the Marketplace.
   * @returns A promise that resolves to the Marketplace if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<Marketplace | null>;

  /**
   * Lists all Marketplaces.
   * @returns A promise that resolves to an array of all Marketplaces.
   * @throws Error if retrieval fails.
   */
  list(): Promise<Marketplace[]>;

  /**
   * Updates an existing Marketplace.
   * @param id - The unique ID of the Marketplace to update.
   * @param data - The updated Marketplace data.
   * @returns A promise that resolves to the updated Marketplace.
   * @throws Error if update fails.
   */
  update(id: number, data: Partial<Marketplace>): Promise<Marketplace>;

  /**
   * Deletes a Marketplace by its unique ID.
   * @param id - The unique ID of the Marketplace to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Associates a Shop with a Marketplace.
   * @param marketplaceId - The unique ID of the Marketplace.
   * @param shop - The Shop entity to add.
   * @returns A promise that resolves to the updated Marketplace.
   * @throws Error if association fails.
   */
  addShop(marketplaceId: number, shop: Shop): Promise<Marketplace>;

  /**
   * Disassociates a Shop from a Marketplace.
   * @param marketplaceId - The unique ID of the Marketplace.
   * @param shopId - The unique ID of the Shop to remove.
   * @returns A promise that resolves to the updated Marketplace.
   * @throws Error if disassociation fails.
   */
  removeShop(marketplaceId: number, shopId: number): Promise<Marketplace>;

  /**
   * Retrieves all shops within a Marketplace.
   * @param marketplaceId - The unique ID of the Marketplace.
   * @returns A promise that resolves to an array of Shops in the Marketplace.
   * @throws Error if retrieval fails.
   */
  getShops(marketplaceId: number): Promise<Shop[]>;

  /**
   * Retrieves the Marketplace by a specific Shop's ID.
   * @param shopId - The unique ID of the Shop.
   * @returns A promise that resolves to the Marketplace containing the Shop, or null if not found.
   * @throws Error if retrieval fails.
   */
  getMarketplaceByShopId(shopId: number): Promise<Marketplace | null>;
}

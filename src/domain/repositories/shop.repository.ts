import { Category } from "../entities/category.entity";
import { Marketplace } from "../entities/marketplace.entity";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { Shop } from "../entities/shop.entity";

/**
 * Repository interface for managing shop entities with business logic.
 */
export interface IShopRepository {
    /**
     * Creates a new shop.
     * @param shop - The shop entity to create.
     * @returns The created Shop entity.
     */
    create(shop: Shop): Promise<Shop>;

    /**
     * Retrieves a shop by its ID.
     * @param id - Shop ID.
     * @returns The Shop entity, or null if not found.
     */
    getById(id: number): Promise<Shop | null>;

    /**
     * Updates a shop's information.
     * @param id - Shop ID.
     * @param updates - Data to update.
     * @returns The updated Shop entity.
     */
    update(id: number, updates: Partial<Shop>): Promise<Shop>;

    /**
     * Deletes a shop.
     * @param id - Shop ID.
     * @returns True if the shop was successfully deleted.
     */
    delete(id: number): Promise<boolean>;

    /**
     * Searches for shops by name.
     * @param name - Shop name to search for.
     * @returns An array of matching Shop entities.
     */
    searchByName(name: string): Promise<Shop[]>;

    /**
     * Adds a product to a shop.
     * @param shopId - Shop ID.
     * @param product - Product to add.
     * @returns The updated Shop entity.
     */
    addProduct(shopId: number, product: Product): Promise<Shop>;

    /**
     * Removes a product from a shop.
     * @param shopId - Shop ID.
     * @param productId - Product ID to remove.
     * @returns The updated Shop entity.
     */
    removeProduct(shopId: number, productId: number): Promise<Shop>;

    /**
     * Gets all products for a shop.
     * @param shopId - Shop ID.
     * @returns An array of Product entities.
     */
    listProducts(shopId: number): Promise<Product[]>;

    /**
     * Adds an order to a shop.
     * @param shopId - Shop ID.
     * @param order - Order to associate.
     * @returns The updated Shop entity.
     */
    addOrder(shopId: number, order: Order): Promise<Shop>;

    /**
     * Retrieves all orders for a shop.
     * @param shopId - Shop ID.
     * @returns An array of Order entities.
     */
    listOrders(shopId: number): Promise<Order[]>;

    /**
     * Adds a category to a shop.
     * @param shopId - Shop ID.
     * @param category - Category to associate.
     * @returns The updated Shop entity.
     */
    addCategory(shopId: number, category: Category): Promise<Shop>;

    /**
     * Removes a category from a shop.
     * @param shopId - Shop ID.
     * @param categoryId - Category ID to remove.
     * @returns The updated Shop entity.
     */
    removeCategory(shopId: number, categoryId: number): Promise<Shop>;

    /**
     * Gets all categories for a shop.
     * @param shopId - Shop ID.
     * @returns An array of Category entities.
     */
    listCategories(shopId: number): Promise<Category[]>;

    /**
     * Associates a marketplace with a shop.
     * @param shopId - Shop ID.
     * @param marketplace - Marketplace to associate.
     * @returns The updated Shop entity.
     */
    associateMarketplace(shopId: number, marketplace: Marketplace): Promise<Shop>;

    /**
     * Retrieves the marketplace associated with a shop.
     * @param shopId - Shop ID.
     * @returns The Marketplace entity, or null if not found.
     */
    getMarketplace(shopId: number): Promise<Marketplace | null>;

    /**
     * Retrieves all shops for a specific vendor.
     * @param vendorId - Vendor ID.
     * @returns An array of Shop entities.
     */
    listByVendor(vendorId: number): Promise<Shop[]>;

    /**
     * Retrieves the most recently updated shop.
     * @returns The most recently updated Shop entity, or null.
     */
    getMostRecent(): Promise<Shop | null>;

    // Additional methods for enhanced business logic

    /**
     * Retrieves the total sales of a shop.
     * @param shopId - Shop ID.
     * @returns The total sales amount for the shop.
     */
    getTotalSales(shopId: number): Promise<number>;

    /**
     * Retrieves a report of orders based on time periods.
     * @param shopId - Shop ID.
     * @param startDate - Start of the time range.
     * @param endDate - End of the time range.
     * @returns A report summarizing the orders within the time range.
     */
    getOrderReport(shopId: number, startDate: Date, endDate: Date): Promise<any>;

    /**
     * Retrieves the most popular product for a shop.
     * @param shopId - Shop ID.
     * @returns The most sold Product entity.
     */
    getTopProduct(shopId: number): Promise<Product>;
}

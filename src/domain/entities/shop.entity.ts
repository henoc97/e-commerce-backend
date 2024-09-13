import { Category } from './category.entity';
import { Marketplace } from './marketplace.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { Vendor } from './vendor.entity';

/**
 * Represents a shop entity in the system.
 */
export class Shop {
    id: number;
    name: string;
    url: string;
    description?: string;
    vendor: Vendor;
    vendorId: number;
    products: Product[];
    orders: Order[];
    categories: Category[];
    createdAt: Date;
    updatedAt: Date;
    Marketplace?: Marketplace;
    marketplaceId?: number;

    /**
     * Creates a new instance of Shop.
     * @param id - The unique identifier for the shop.
     * @param name - The name of the shop.
     * @param url - The URL of the shop's website.
     * @param vendor - The vendor associated with the shop.
     * @param vendorId - The ID of the vendor associated with the shop.
     * @param products - An optional array of products available in the shop.
     * @param orders - An optional array of orders associated with the shop.
     * @param categories - An optional array of categories associated with the shop.
     * @param createdAt - The date and time when the shop was created.
     * @param updatedAt - The date and time when the shop was last updated.
     * @param description - An optional description of the shop.
     * @param Marketplace - An optional marketplace where the shop is listed.
     * @param marketplaceId - An optional ID of the marketplace where the shop is listed.
     */
    constructor(
        id: number,
        name: string,
        url: string,
        vendor: Vendor,
        vendorId: number,
        products: Product[] = [],
        orders: Order[] = [],
        categories: Category[] = [],
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        description?: string,
        Marketplace?: Marketplace,
        marketplaceId?: number
    ) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.vendor = vendor;
        this.vendorId = vendorId;
        this.products = products;
        this.orders = orders;
        this.categories = categories;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.Marketplace = Marketplace;
        this.marketplaceId = marketplaceId;
    }
}

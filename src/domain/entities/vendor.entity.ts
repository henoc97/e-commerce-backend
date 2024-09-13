import { Product } from './product.entity';
import { Shop } from './shop.entity';
import { Subscription } from './subscription.entity';
import { User } from './user.entity';

/**
 * Represents a vendor entity in the system.
 */
export class Vendor {
  id: number;
  userId: number;
  user: User;
  storeName: string;
  products?: Product[];
  subscription?: Subscription;
  subscriptionId?: number;
  Shop?: Shop;

  /**
   * Creates a new instance of Vendor.
   * @param id - The unique identifier for the vendor.
   * @param userId - The ID of the user associated with the vendor.
   * @param user - The user associated with the vendor.
   * @param storeName - The name of the vendor's store.
   * @param products - An optional array of products associated with the vendor.
   * @param subscription - An optional subscription associated with the vendor.
   * @param subscriptionId - An optional ID of the subscription.
   * @param Shop - An optional shop associated with the vendor.
   */
  constructor(
    id: number,
    userId: number,
    user: User,
    storeName: string,
    products: Product[] = [],
    subscription?: Subscription,
    subscriptionId?: number,
    Shop?: Shop,
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.storeName = storeName;
    this.products = products;
    this.subscription = subscription;
    this.subscriptionId = subscriptionId;
    this.Shop = Shop;
  }
}

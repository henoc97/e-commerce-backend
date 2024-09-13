import { IsInt, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductDTO } from './product.dto';
import { ShopDTO } from './shop.dto';
import { SubscriptionDTO } from './subscription.dto';
import { UserDTO } from './user.dto';

/**
 * Data Transfer Object for Vendor.
 * Used for validating and transforming vendor data in API requests and responses.
 */
export class VendorDTO {
  /**
   * Unique identifier for the vendor.
   */
  @IsInt()
  id: number;

  /**
   * Identifier of the user associated with the vendor.
   */
  @IsInt()
  userId: number;

  /**
   * User associated with the vendor.
   */
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  /**
   * Name of the vendor's store.
   */
  @IsString()
  storeName: string;

  /**
   * Optional list of products associated with the vendor.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  products?: ProductDTO[];

  /**
   * Optional subscription associated with the vendor.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => SubscriptionDTO)
  subscription?: SubscriptionDTO;

  /**
   * Optional ID of the subscription.
   */
  @IsOptional()
  @IsInt()
  subscriptionId?: number;

  /**
   * Optional shop associated with the vendor.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => ShopDTO)
  Shop?: ShopDTO;

  /**
   * Creates a new VendorDTO instance.
   * @param id - The unique identifier for the vendor.
   * @param userId - The ID of the user associated with the vendor.
   * @param user - The user associated with the vendor.
   * @param storeName - The name of the vendor's store.
   * @param products - Optional array of products associated with the vendor.
   * @param subscription - Optional subscription associated with the vendor.
   * @param subscriptionId - Optional ID of the subscription.
   * @param Shop - Optional shop associated with the vendor.
   */
  constructor(
    id: number,
    userId: number,
    user: UserDTO,
    storeName: string,
    products?: ProductDTO[],
    subscription?: SubscriptionDTO,
    subscriptionId?: number,
    Shop?: ShopDTO,
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

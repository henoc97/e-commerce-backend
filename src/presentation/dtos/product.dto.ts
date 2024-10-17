import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDTO } from './category.dto';
import { ProductImageDTO } from './product-image.dto';
import { ProductVariantDTO } from './product-variant.dto';
import { CartItemDTO } from './cart-item.dto';
import { OrderItemDTO } from './order-item.dto';
import { PromotionDTO } from './promotion.dto';
import { ReviewDTO } from './review.dto';
import { ShopDTO } from './shop.dto';
import { VendorDTO } from './vendor.dto';

/**
 * Data Transfer Object for Product.
 * Used for validating and transforming product data in API requests and responses.
 */
export class ProductDTO {
  /**
   * Unique identifier for the Product.
   */
  @IsInt()
  id: number;

  /**
   * The name of the Product.
   */
  @IsString()
  name: string;

  /**
   * An optional description of the Product.
   */
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * The price of the Product.
   */
  @IsNumber()
  price: number;

  /**
   * Optional array of promotions associated with the Product.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PromotionDTO)
  promotions?: PromotionDTO[];

  /**
   * The category to which the Product belongs.
   */
  @ValidateNested()
  @Type(() => CategoryDTO)
  category: CategoryDTO;

  /**
   * The ID of the category to which the Product belongs.
   */
  @IsInt()
  categoryId: number;

  /**
   * Optional array of images associated with the Product.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductImageDTO)
  images?: ProductImageDTO[];

  /**
   * Optional array of variants for the Product.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDTO)
  variants?: ProductVariantDTO[];

  /**
   * The stock quantity of the Product.
   */
  @IsInt()
  stock: number;

  /**
   * Optional Vendor associated with the Product.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => VendorDTO)
  vendor?: VendorDTO;

  /**
   * Optional ID of the Vendor associated with the Product.
   */
  @IsOptional()
  @IsInt()
  vendorId?: number;

  /**
   * The Shop where the Product is listed.
   */
  @ValidateNested()
  @Type(() => ShopDTO)
  shop?: ShopDTO; // Rendre 'shop' optionnel

  /**
   * The ID of the Shop where the Product is listed.
   */
  @IsInt()
  shopId: number;

  /**
   * Date and time when the Product was created.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * Date and time when the Product was last updated.
   */
  @IsDateString()
  updatedAt: Date;

  /**
   * Optional array of CartItems associated with the Product.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CartItemDTO)
  CartItem?: CartItemDTO[];

  /**
   * Optional array of OrderItems associated with the Product.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  OrderItem?: OrderItemDTO[];

  /**
   * Optional array of Reviews for the Product.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReviewDTO)
  Review?: ReviewDTO[];

  /**
   * Creates a new ProductDTO instance.
   * @param id - Unique identifier for the Product.
   * @param name - The name of the Product.
   * @param price - The price of the Product.
   * @param promotions - Optional promotions associated with the Product.
   * @param category - The category of the Product.
   * @param categoryId - The ID of the category.
   * @param images - Optional images associated with the Product.
   * @param variants - Optional variants of the Product.
   * @param stock - The stock quantity of the Product.
   * @param shop - The Shop where the Product is listed.
   * @param shopId - The ID of the Shop.
   * @param createdAt - Date and time of Product creation.
   * @param updatedAt - Date and time of Product last update.
   * @param CartItem - Optional cart items associated with the Product.
   * @param OrderItem - Optional order items associated with the Product.
   * @param Review - Optional reviews for the Product.
   * @param description - Optional description of the Product.
   * @param vendor - Optional Vendor associated with the Product.
   * @param vendorId - Optional ID of the Vendor.
   */
  constructor(
    id: number,
    name: string,
    price: number,
    promotions: PromotionDTO[] = [],
    category: CategoryDTO,
    categoryId: number,
    images: ProductImageDTO[] = [],
    variants: ProductVariantDTO[] = [],
    stock: number,
    shop: ShopDTO,
    shopId: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    CartItem: CartItemDTO[] = [],
    OrderItem: OrderItemDTO[] = [],
    Review: ReviewDTO[] = [],
    description?: string,
    vendor?: VendorDTO,
    vendorId?: number,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.promotions = promotions;
    this.category = category;
    this.categoryId = categoryId;
    this.images = images;
    this.variants = variants;
    this.stock = stock;
    this.shop = shop;
    this.shopId = shopId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.CartItem = CartItem;
    this.OrderItem = OrderItem;
    this.Review = Review;
    this.description = description;
    this.vendor = vendor;
    this.vendorId = vendorId;
  }
}

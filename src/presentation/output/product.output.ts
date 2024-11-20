import { Field, ObjectType } from "@nestjs/graphql";
import { CategoryOutput } from "./category.output";
import { ProductVariantOutput } from "./product-variant.output";
import { PromotionOutput } from "./promotion.output";
import { ProductImageOutput } from "./product-image.output";
import { VendorOutput } from "./vendor.output";
import { ShopOutput } from "./shop.output";
import { CartItemOutput } from "./cart-item.output";
import { OrderItemOutput } from "./order-item.output";
import { ReviewOutput } from "./review.output";


/**
 * Data Transfer Object for Product.
 * Used for validating and transforming product data in API requests and responses.
 */
@ObjectType()
export class ProductOutput {
  /**
   * Unique identifier for the Product.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * The name of the Product.
   */
  @Field()
  name: string;

  /**
   * An optional description of the Product.
   */
  @Field({ nullable: true })
  description?: string;

  /**
   * The price of the Product.
   */
  @Field()
  price: number;

  /**
   * Optional array of promotions associated with the Product.
   */
  @Field(() => PromotionOutput, { nullable: true })
  promotions?: PromotionOutput[];

  /**
   * The category to which the Product belongs.
   */
  @Field(() => CategoryOutput, { nullable: true })
  category: CategoryOutput;

  /**
   * The ID of the category to which the Product belongs.
   */
  @Field()
  categoryId: number;

  /**
   * Optional array of images associated with the Product.
   */
  @Field(() => [ProductImageOutput], { nullable: true })
  images?: ProductImageOutput[];

  /**
   * Optional array of variants for the Product.
   */
  @Field(() => [ProductVariantOutput], { nullable: true })
  variants?: ProductVariantOutput[];

  /**
   * The stock quantity of the Product.
   */
  @Field()
  stock: number;

  /**
   * Optional Vendor associated with the Product.
   */
  @Field(() => VendorOutput, { nullable: true })
  vendor?: VendorOutput;

  /**
   * Optional ID of the Vendor associated with the Product.
   */
  @Field({ nullable: true })
  vendorId?: number;

  /**
   * The Shop where the Product is listed.
   */
  @Field(() => ShopOutput, { nullable: true })
  shop?: ShopOutput; // Rendre 'shop' optionnel

  /**
   * The ID of the Shop where the Product is listed.
   */
  @Field()
  shopId: number;

  /**
   * Date and time when the Product was created.
   */
  @Field()
  createdAt: Date;

  /**
   * Date and time when the Product was last updated.
   */
  @Field()
  updatedAt: Date;

  /**
   * Optional array of CartItems associated with the Product.
   */
  @Field(() => CartItemOutput, { nullable: true })
  cartItem?: CartItemOutput[];

  /**
   * Optional array of OrderItems associated with the Product.
   */
  @Field(() => OrderItemOutput, { nullable: true })
  orderItem?: OrderItemOutput[];

  /**
   * Optional array of Reviews for the Product.
   */
  @Field(() => ReviewOutput, { nullable: true })
  review?: ReviewOutput[];

  /**
   * Creates a new ProductOutput instance.
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
   * @param cartItem - Optional cart items associated with the Product.
   * @param orderItem - Optional order items associated with the Product.
   * @param Review - Optional reviews for the Product.
   * @param rescription - Optional description of the Product.
   * @param vendor - Optional Vendor associated with the Product.
   * @param vendorId - Optional ID of the Vendor.
   */
  constructor(
    id: number,
    name: string,
    price: number,
    promotions: PromotionOutput[] = [],
    category: CategoryOutput,
    categoryId: number,
    images: ProductImageOutput[] = [],
    variants: ProductVariantOutput[] = [],
    stock: number,
    shop: ShopOutput,
    shopId: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    cartItem: CartItemOutput[] = [],
    orderItem: OrderItemOutput[] = [],
    review: ReviewOutput[] = [],
    description?: string,
    vendor?: VendorOutput,
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
    this.cartItem = cartItem;
    this.orderItem = orderItem;
    this.review = review;
    this.description = description;
    this.vendor = vendor;
    this.vendorId = vendorId;
  }
}

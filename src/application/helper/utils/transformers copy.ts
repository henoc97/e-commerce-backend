// import { Address, Cart, Product, User, Order, Shop, Ticket, AuditLog, Subsite, Category, Vendor, Notification, Subscription, NewsletterSubscription, ProductImage, ProductVariant, UserProfile, OrderItem, CartItem, Marketplace, Review, UserActivity, Refund, Payment, Currency, PaymentStatus, RefundStatus, NotificationType, UserActivityAction, TicketStatus, AuditLogAction, OrderStatus, Promotion, UserRole, DiscountType } from '../../../generated/graphql';
// import { AddressDTO } from '../../../presentation/dtos/address.dto';
// import { AuditLogDTO } from '../../../presentation/dtos/audit-log.dto';
// import { CartItemDTO } from '../../../presentation/dtos/cart-item.dto';
// import { CartDTO } from '../../../presentation/dtos/cart.dto';
// import { CategoryDTO } from '../../../presentation/dtos/category.dto';
// import { MarketplaceDTO } from '../../../presentation/dtos/marketplace.dto';
// import { NotificationDTO } from '../../../presentation/dtos/notification.dto';
// import { OrderItemDTO } from '../../../presentation/dtos/order-item.dto';
// import { PaymentDTO } from '../../../presentation/dtos/payment.dto';
// import { ProductDTO } from '../../../presentation/dtos/product.dto';
// import { UserDTO } from '../../../presentation/dtos/user.dto';
// import { ShopDTO } from '../../../presentation/dtos/shop.dto';
// import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
// import { VendorDTO } from '../../../presentation/dtos/vendor.dto';
// import { SubscriptionDTO } from '../../../presentation/dtos/subscription.dto';
// import { RefundDTO } from '../../../presentation/dtos/refund.dto';
// import { ReviewDTO } from '../../../presentation/dtos/review.dto';
// import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';
// import { UserActivityDTO } from '../../../presentation/dtos/user-activity.dto';
// import { NewsletterSubscriptionDTO } from '../../../presentation/dtos/newsletter-subscription.dto';
// import { ProductImageDTO } from '../../../presentation/dtos/product-image.dto';
// import { ProductVariantDTO } from '../../../presentation/dtos/product-variant.dto';
// import { UserProfileDTO } from '../../../presentation/dtos/user-profile.dto';
// import { OrderDTO } from '../../../presentation/dtos/order.dto';
// import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';
// import { CartOutput } from 'src/presentation/output/cart.output';
// import { ProductOutput } from 'src/presentation/output/product.output';
// import { CategoryOutput } from 'src/presentation/output/category.output';
// import { AuditLogOutput } from 'src/presentation/output/audit-log.output';
// import { VendorOutput } from 'src/presentation/output/vendor.output';
// import { UserProfileOutput } from 'src/presentation/output/user-profile.output';
// import { SubscriptionOutput } from 'src/presentation/output/subscription.output';
// import { CartItemOutput } from 'src/presentation/output/cart-item.output';
// import { OrderItemOutput } from 'src/presentation/output/order-item.output';
// import { PaymentOutput } from 'src/presentation/output/payment.output';
// import { RefundOutput } from 'src/presentation/output/refund.output';
// import { ReviewOutput } from 'src/presentation/output/review.output';







// export function transformAuditLogDTOToGraphQL(auditLogDTO: AuditLogDTO): AuditLogOutput {
//     return new AuditLogOutput(
//         auditLogDTO.userId,
//         auditLogDTO.action,
//         auditLogDTO.entity,
//         auditLogDTO.entityId,
//         auditLogDTO.changes,
//         auditLogDTO.createdAt,
//         auditLogDTO.id,
//         transformUserDTOToGraphQL(auditLogDTO.user),
//     );
// }
// export function transformCategoryDTOToGraphQL(categoryDTO: CategoryDTO): CategoryOutput {
//     return new CategoryOutput(
//         categoryDTO.name,
//         categoryDTO.id,
//         categoryDTO.parentId,
//         categoryDTO.parent ? transformCategoryDTOToGraphQL(categoryDTO.parent) : null,
//         categoryDTO.children ? categoryDTO.children.map(transformCategoryDTOToGraphQL) : [],
//         categoryDTO.products?.map(transformProductDTOToGraphQL),
//         categoryDTO.shopId,
//         categoryDTO.shop ? transformShopDTOToGraphQL(categoryDTO.shop) : null,
//     );
// }

// export function transformVendorDTOToGraphQL(vendorDTO: VendorDTO): VendorOutput {
//     return new VendorOutput(
//         vendorDTO.id,
//         vendorDTO.userId,
//         transformUserDTOToGraphQL(vendorDTO.user),
//         vendorDTO.storeName,
//         vendorDTO.products ? vendorDTO.products.map(transformProductDTOToGraphQL) : [],
//         vendorDTO.subscriptionId,
//         vendorDTO.subscription ? transformSubscriptionDTOToGraphQL(vendorDTO.subscription) : null,
//         vendorDTO.shop ? transformShopDTOToGraphQL(vendorDTO.shop) : null,
//     );
// }

// export function transformSubscriptionDTOToGraphQL(subscriptionDTO: SubscriptionDTO): SubscriptionOutput {
//     return new SubscriptionOutput(
//         subscriptionDTO.id,
//         subscriptionDTO.name,
//         subscriptionDTO.price,
//         subscriptionDTO.duration,
//         subscriptionDTO.description,
//         subscriptionDTO.vendors ? subscriptionDTO.vendors.map(transformVendorDTOToGraphQL) : [],
//         subscriptionDTO.createdAt,
//         subscriptionDTO.updatedAt,
//     );
// }

// export function transformCartItemDTOToGraphQL(cartItemDTO: CartItemDTO): CartItem {
//     return new CartItemOutput(
//         cartItemDTO.cartId,
//         cartItemDTO.product ? transformProductDTOToGraphQL(cartItemDTO.product) : null,
//         cartItemDTO.quantity,
//         cartItemDTO.id,
//         cartItemDTO.cart ? transformCartDTOToGraphQL(cartItemDTO.cart) : null,
//     );
// }
// export function transformOrderItemDTOToGraphQL(orderItemDTO: OrderItemDTO): OrderItem {
//     return new OrderItemOutput(
//         orderItemDTO.orderId,
//         orderItemDTO.productId,
//         orderItemDTO.quantity,
//         orderItemDTO.price,
//         orderItemDTO.id,
//         orderItemDTO.order ? transformOrderDTOToGraphQL(orderItemDTO.order) : null,
//         orderItemDTO.product ? transformProductDTOToGraphQL(orderItemDTO.product) : null,
//     );
// }
// export function transformPaymentDTOToGraphQL(paymentDTO: PaymentDTO): PaymentOutput {
//     return new PaymentOutput(
//         paymentDTO.id,
//         paymentDTO.orderId,
//         paymentDTO.order ? transformOrderDTOToGraphQL(paymentDTO.order) : null,
//         paymentDTO.method,
//         paymentDTO.status,
//         paymentDTO.amount,
//         paymentDTO.currency,
//         paymentDTO.providerId,
//         paymentDTO.metadata,
//     );
// }
// export function transformRefundDTOToGraphQL(refundDTO: RefundDTO): RefundOutput {
//     return new RefundOutput(
//         refundDTO.id,
//         refundDTO.orderId,
//         refundDTO.order,
//         refundDTO.reason,
//         refundDTO.amount,
//         refundDTO.status,
//         refundDTO.createdAt,
//     );
// }

// export function transformReviewDTOToGraphQL(reviewDTO: ReviewDTO): ReviewOutput {
//     return new ReviewOutput(
//         reviewDTO.id,
//         reviewDTO.productId,
//         reviewDTO.product,
//         reviewDTO.userId,
//         reviewDTO.user,
//         reviewDTO.rating,
//         reviewDTO.comment,
//         reviewDTO.createdAt,
//         // updatedAt: reviewDTO.updatedAt,
//     );
// }
// export function transformNotificationDTOToGraphQL(notificationDTO: NotificationDTO): Notification {
//     return new NotificationOutput(
//         notificationDTO.id,
//         notificationDTO.userId,
//         notificationDTO.content,
//         notificationDTO.type,
//         notificationDTO.sentAt,
//     );
// }

// export function transformSubsiteDTOToGraphQL(subsiteDTO: SubsiteDTO): Subsite {
//     return new SubsiteOutput(
//         subsiteDTO.id,
//         subsiteDTO.title,
//         subsiteDTO.userId,
//         transformUserDTOToGraphQL(subsiteDTO.user),
//         subsiteDTO.config,
//         subsiteDTO.createdAt,
//     );
// }

// export function transformUserActivityDTOToGraphQL(userActivityDTO: UserActivityDTO): UserActivity {
//     return new UserActivityOutput(
//         userActivityDTO.id,
//         userActivityDTO.userId,
//         userActivityDTO.action,
//         userActivityDTO.timestamp,
//         userActivityDTO.productId,
//     );
// }

// export function transformMarketplaceDTOToGraphQL(marketplaceDTO: MarketplaceDTO): Marketplace {
//     return new MarketplaceOutput(
//         marketplaceDTO.id,
//         marketplaceDTO.name,
//         marketplaceDTO.description,
//         marketplaceDTO.shops ? marketplaceDTO.shops.map(transformShopDTOToGraphQL) : [],
//     );
// }

// export function transformNewsletterDTOToGraphQL(newsletterDTO: NewsletterSubscriptionDTO): NewsletterSubscription {
//     return new NewsletterSubscriptionOutput(
//         newsletterDTO.id,
//         newsletterDTO.email,
//         newsletterDTO.subscribedAt
//     );
// }

// export function transformProductImageDTOToGraphQL(productImageDTO: ProductImageDTO): ProductImage {
//     return new ProductImageOutput(
//         productImageDTO.id,
//         productImageDTO.productId,
//         productImageDTO.url,
//         transformProductDTOToGraphQL(productImageDTO.product)
//     );
// }
// export function transformProductVariantDTOToGraphQL(productVariantDTO: ProductVariantDTO): ProductVariantOutput {
//     return new ProductVariantOutput(
//         productVariantDTO.id,
//         productVariantDTO.productId,
//         productVariantDTO.name,
//         transformProductDTOToGraphQL(productVariantDTO.product),
//         productVariantDTO.value
//     );
// }

// export function transformUserProfileDTOToGraphQL(userProfileDTO: UserProfileDTO): UserProfile {
//     return new UserProfileOutput(
//         userProfileDTO.id,
//         userProfileDTO.userId,
//         transformUserDTOToGraphQL(userProfileDTO.user),
//         userProfileDTO.phone,
//         userProfileDTO.birthday,
//         userProfileDTO.gender
//     );
// }

// // Ajoutez d'autres fonctions de transformation pour les DTO restants ici... 
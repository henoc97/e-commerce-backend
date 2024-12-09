import { AddressDTO } from '../../../presentation/dtos/address.dto';
import { AuditLogDTO } from '../../../presentation/dtos/audit-log.dto';
import { CartItemDTO } from '../../../presentation/dtos/cart-item.dto';
import { CartDTO } from '../../../presentation/dtos/cart.dto';
import { CategoryDTO } from '../../../presentation/dtos/category.dto';
import { MarketplaceDTO } from '../../../presentation/dtos/marketplace.dto';
import { NotificationDTO } from '../../../presentation/dtos/notification.dto';
import { OrderItemDTO } from '../../../presentation/dtos/order-item.dto';
import { PaymentDTO } from '../../../presentation/dtos/payment.dto';
import { ProductDTO } from '../../../presentation/dtos/product.dto';
import { UserDTO } from '../../../presentation/dtos/user.dto';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { VendorDTO } from '../../../presentation/dtos/vendor.dto';
import { SubscriptionDTO } from '../../../presentation/dtos/subscription.dto';
import { RefundDTO } from '../../../presentation/dtos/refund.dto';
import { ReviewDTO } from '../../../presentation/dtos/review.dto';
import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';
import { UserActivityDTO } from '../../../presentation/dtos/user-activity.dto';
import { NewsletterSubscriptionDTO } from '../../../presentation/dtos/newsletter-subscription.dto';
import { ProductImageDTO } from '../../../presentation/dtos/product-image.dto';
import { ProductVariantDTO } from '../../../presentation/dtos/product-variant.dto';
import { UserProfileDTO } from '../../../presentation/dtos/user-profile.dto';
import { OrderDTO } from '../../../presentation/dtos/order.dto';
import { PromotionDTO } from '../../../presentation/dtos/promotion.dto';

import { plainToInstance } from 'class-transformer';
import { AddressOutput } from '../../../presentation/output/address.output';
import { CartOutput } from '../../../presentation/output/cart.output';
import { ProductOutput } from '../../../presentation/output/product.output';
import { UserProfileOutput } from '../../../presentation/output/user-profile.output';
import { MarketplaceOutput } from '../../../presentation/output/marketplace.output';
import { UserActivityOutput } from '../../../presentation/output/user-activity.output';
import { SubsiteOutput } from '../../../presentation/output/subsite.output';
import { ProductVariantOutput } from '../../../presentation/output/product-variant.output';
import { ProductImageOutput } from '../../../presentation/output/product-image.output';
import { PromotionOutput } from '../../../presentation/output/promotion.output';
import { UserOutput } from '../../../presentation/output/user.output';
import { OrderOutput } from '../../../presentation/output/order.output';
import { ShopOutput } from '../../../presentation/output/shop.output';
import { TicketOutput } from '../../../presentation/output/ticket.output';
import { AuditLogOutput } from '../../../presentation/output/audit-log.output';
import { CategoryOutput } from '../../../presentation/output/category.output';
import { VendorOutput } from '../../../presentation/output/vendor.output';
import { SubscriptionOutput } from '../../../presentation/output/subscription.output';
import { CartItemOutput } from '../../../presentation/output/cart-item.output';
import { OrderItemOutput } from '../../../presentation/output/order-item.output';
import { PaymentOutput } from '../../../presentation/output/payment.output';
import { RefundOutput } from '../../../presentation/output/refund.output';
import { ReviewOutput } from '../../../presentation/output/review.output';
import { NotificationOutput } from '../../../presentation/output/notification.output';
import { NewsletterSubscriptionOutput } from '../../../presentation/output/newsletter-subscription.output';

/**
 * Transforme une instance d'un DTO en une instance d'Output.
 * @param source L'instance source (DTO).
 * @param targetClass Le constructeur de la classe cible (Output).
 * @returns Une instance de la classe cible.
 */
function transform<T, U>(source: T, targetClass: new () => U): U {
    return plainToInstance(targetClass, source);
}


export function transformAddressDTOToGraphQL(addressDTO: AddressDTO): AddressOutput {
    return transform(addressDTO, AddressOutput);
}

export function transformCartDTOToGraphQL(cartDTO: CartDTO): CartOutput {
    return transform(cartDTO, CartOutput);
}

export function transformProductDTOToGraphQL(productDTO: ProductDTO): ProductOutput {
    return transform(productDTO, ProductOutput);
}

export function transformPromotionDTOToGraphQL(promotionDTO: PromotionDTO): PromotionOutput {
    return transform(promotionDTO, PromotionOutput);
}
export function transformUserDTOToGraphQL(userDTO: UserDTO): UserOutput {
    return transform(userDTO, UserOutput);
}

export function transformOrderDTOToGraphQL(orderDTO: OrderDTO): OrderOutput {
    return transform(orderDTO, OrderOutput);
}
export function transformShopDTOToGraphQL(shopDTO: ShopDTO): ShopOutput {
    return transform(shopDTO, ShopOutput);
}

export function transformTicketDTOToGraphQL(ticketDTO: TicketDTO): TicketOutput {
    return transform(ticketDTO, TicketOutput);
}

export function transformAuditLogDTOToGraphQL(auditLogDTO: AuditLogDTO): AuditLogOutput {
    return transform(auditLogDTO, AuditLogOutput);
}
export function transformCategoryDTOToGraphQL(categoryDTO: CategoryDTO): CategoryOutput {
    return transform(categoryDTO, CategoryOutput);
}

export function transformVendorDTOToGraphQL(vendorDTO: VendorDTO): VendorOutput {
    return transform(vendorDTO, VendorOutput);
}

export function transformSubscriptionDTOToGraphQL(subscriptionDTO: SubscriptionDTO): SubscriptionOutput {
    return transform(subscriptionDTO, SubscriptionOutput);
}

export function transformCartItemDTOToGraphQL(cartItemDTO: CartItemDTO): CartItemOutput {
    return transform(cartItemDTO, CartItemOutput);
}
export function transformOrderItemDTOToGraphQL(orderItemDTO: OrderItemDTO): OrderItemOutput {
    return transform(orderItemDTO, OrderItemOutput);
}
export function transformPaymentDTOToGraphQL(paymentDTO: PaymentDTO): PaymentOutput {
    return transform(paymentDTO, PaymentOutput);
}
export function transformRefundDTOToGraphQL(refundDTO: RefundDTO): RefundOutput {
    return transform(refundDTO, RefundOutput);
}

export function transformReviewDTOToGraphQL(reviewDTO: ReviewDTO): ReviewOutput {
    return transform(reviewDTO, ReviewOutput);
}
export function transformNotificationDTOToGraphQL(notificationDTO: NotificationDTO): NotificationOutput {
    return transform(notificationDTO, NotificationOutput);
}

export function transformSubsiteDTOToGraphQL(subsiteDTO: SubsiteDTO): SubsiteOutput {
    return transform(subsiteDTO, SubsiteOutput);
}

export function transformUserActivityDTOToGraphQL(userActivityDTO: UserActivityDTO): UserActivityOutput {
    return transform(userActivityDTO, UserActivityOutput);
}

export function transformMarketplaceDTOToGraphQL(marketplaceDTO: MarketplaceDTO): MarketplaceOutput {
    return transform(marketplaceDTO, MarketplaceOutput);
}

export function transformNewsletterDTOToGraphQL(newsletterDTO: NewsletterSubscriptionDTO): NewsletterSubscriptionOutput {
    return transform(newsletterDTO, NewsletterSubscriptionOutput);
}

export function transformProductImageDTOToGraphQL(productImageDTO: ProductImageDTO): ProductImageOutput {
    return transform(productImageDTO, ProductImageOutput);
}

export function transformProductVariantDTOToGraphQL(productVariantDTO: ProductVariantDTO): ProductVariantOutput {
    return transform(productVariantDTO, ProductVariantOutput);
}

export function transformUserProfileDTOToGraphQL(userProfileDTO: UserProfileDTO): UserProfileOutput {
    return transform(userProfileDTO, UserProfileOutput);
}

// Ajoutez d'autres fonctions de transformation pour les DTO restants ici... 
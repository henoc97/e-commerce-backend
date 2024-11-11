import { Address, Cart, Product, User, Order, Shop, Ticket, AuditLog, Subsite, Category, Vendor, Notification, Subscription, NewsletterSubscription, ProductImage, ProductVariant, UserProfile, OrderItem, CartItem, Marketplace, Review, UserActivity, Refund, Payment, Currency, PaymentStatus, RefundStatus, NotificationType, UserActivityAction, TicketStatus, AuditLogAction, OrderStatus, Promotion, UserRole, DiscountType } from '../../../generated/graphql';
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
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';

export function transformAddressDTOToGraphQL(addressDTO: AddressDTO): Address {
    return {
        __typename: 'Address',
        id: addressDTO.id?.toString(),
        userId: addressDTO.userId.toString(),
        street: addressDTO.street,
        city: addressDTO.city,
        state: addressDTO.state,
        postalCode: addressDTO.postalCode,
        country: addressDTO.country,
        user: addressDTO.user ? transformUserDTOToGraphQL(addressDTO.user) : null,
    };
}

export function transformCartDTOToGraphQL(cartDTO: CartDTO): Cart {
    return {
        __typename: 'Cart',
        id: cartDTO.id?.toString(),
        // userId: cartDTO.userId?.toString(),
        totalPrice: cartDTO.totalPrice,
        totalQuantity: cartDTO.totalQuantity,
        estimatedShippingCost: cartDTO.estimatedShippingCost,
        lastSaved: cartDTO.lastSaved.toISOString(), // Convert Date to string
        items: cartDTO.items ? cartDTO.items.map(transformCartItemDTOToGraphQL) : [],
        user: cartDTO.user ? transformUserDTOToGraphQL(cartDTO.user) : null,
    };
}

export function transformProductDTOToGraphQL(productDTO: ProductDTO): Product {
    return {
        __typename: 'Product',
        id: productDTO.id.toString(),
        name: productDTO.name,
        description: productDTO.description,
        price: productDTO.price,
        promotions: productDTO.promotions ? productDTO.promotions.map(transformPromotionDTOToGraphQL) : [],
        category: transformCategoryDTOToGraphQL(productDTO.category),
        categoryId: productDTO.categoryId.toString(),
        images: productDTO.images?.map(transformProductImageDTOToGraphQL),
        variants: productDTO.variants?.map(transformProductVariantDTOToGraphQL),
        stock: productDTO.stock,
        vendor: productDTO.vendor ? transformVendorDTOToGraphQL(productDTO.vendor) : null,
        vendorId: productDTO.vendorId.toString(),
        shop: productDTO.shop ? transformShopDTOToGraphQL(productDTO.shop) : null,
        shopId: productDTO.shopId.toString(),
        createdAt: productDTO.createdAt.toISOString(),
        updatedAt: productDTO.updatedAt.toISOString(),
        cartItems: productDTO.cartItem?.map(transformCartItemDTOToGraphQL),
        orderItems: productDTO.orderItem?.map(transformOrderItemDTOToGraphQL),
        reviews: productDTO.review?.map(transformReviewDTOToGraphQL),
    };
}

export function transformPromotionDTOToGraphQL(promotionDTO: PromotionDTO): Promotion {
    return {
        __typename: 'Promotion',
        id: promotionDTO.id.toString(),
        name: promotionDTO.name,
        discountValue: promotionDTO.discountValue,
        discountType: promotionDTO.discountType as unknown as DiscountType,
        startDate: promotionDTO.startDate.toISOString(),
        endDate: promotionDTO.endDate.toISOString(),
        productId: promotionDTO.productId.toString(),
        product: promotionDTO.product ? transformProductDTOToGraphQL(promotionDTO.product) : null,
        createdAt: promotionDTO.createdAt.toISOString(),
        updatedAt: promotionDTO.updatedAt.toISOString(),
    };
}
export function transformUserDTOToGraphQL(userDTO: UserDTO): User {
    return {
        __typename: 'User',
        id: userDTO.id.toString(),
        email: userDTO.email,
        role: userDTO.role as unknown as UserRole,
        password: userDTO.password,
        name: userDTO.name,
        createdAt: userDTO.createdAt.toISOString(),
        updatedAt: userDTO.updatedAt.toISOString(),
        addresses: userDTO.addresses.map(transformAddressDTOToGraphQL),
        orders: userDTO.orders.map(transformOrderDTOToGraphQL),
        vendor: userDTO.vendor ? transformVendorDTOToGraphQL(userDTO.vendor) : null,
        carts: userDTO.carts.map(transformCartDTOToGraphQL),
        notifications: userDTO.notifications?.map(transformNotificationDTOToGraphQL) || [],
        tickets: userDTO.tickets?.map(transformTicketDTOToGraphQL) || [],
        subsites: userDTO.subsites?.map(transformSubsiteDTOToGraphQL) || [],
        userActivities: userDTO.userActivities?.map(transformUserActivityDTOToGraphQL) || [],
        auditLogs: userDTO.auditLogs?.map(transformAuditLogDTOToGraphQL) || [],
    };
}

export function transformOrderDTOToGraphQL(orderDTO: OrderDTO): Order {
    return {
        __typename: 'Order',
        id: orderDTO.id?.toString(),
        userId: orderDTO.userId.toString(),
        shopId: orderDTO.shopId.toString(),
        status: orderDTO.status as unknown as OrderStatus,
        totalAmount: orderDTO.totalAmount,
        paymentId: orderDTO.paymentId?.toString(),
        trackingNumber: orderDTO.trackingNumber,
        createdAt: orderDTO.createdAt?.toISOString(),
        updatedAt: orderDTO.updatedAt?.toISOString(),
        items: orderDTO.items?.map(transformOrderItemDTOToGraphQL),
        payments: orderDTO.payments ? orderDTO.payments.map(transformPaymentDTOToGraphQL) : [],
        refunds: orderDTO.refunds ? orderDTO.refunds.map(transformRefundDTOToGraphQL) : [],
    };
}
export function transformShopDTOToGraphQL(shopDTO: ShopDTO): Shop {
    return {
        __typename: 'Shop',
        id: shopDTO.id.toString(),
        name: shopDTO.name,
        url: shopDTO.url,
        createdAt: shopDTO.createdAt.toISOString(),
        updatedAt: shopDTO.updatedAt.toISOString(),
        description: shopDTO.description,
        vendor: shopDTO.vendor ? transformVendorDTOToGraphQL(shopDTO.vendor) : null,
        vendorId: shopDTO.vendorId.toString(),
        products: shopDTO.products ? shopDTO.products.map(transformProductDTOToGraphQL) : [],
        orders: shopDTO.orders ? shopDTO.orders.map(transformOrderDTOToGraphQL) : [],
        categories: shopDTO.categories ? shopDTO.categories.map(transformCategoryDTOToGraphQL) : [],
    };
}

export function transformTicketDTOToGraphQL(ticketDTO: TicketDTO): Ticket {
    return {
        __typename: 'Ticket',
        id: ticketDTO.id.toString(),
        userId: ticketDTO.userId.toString(),
        user: transformUserDTOToGraphQL(ticketDTO.user),
        subject: ticketDTO.subject,
        description: ticketDTO.description,
        status: ticketDTO.status as unknown as TicketStatus,
        createdAt: ticketDTO.createdAt.toISOString(),
        updatedAt: ticketDTO.updatedAt.toISOString(),
    };
}

export function transformAuditLogDTOToGraphQL(auditLogDTO: AuditLogDTO): AuditLog {
    return {
        __typename: 'AuditLog',
        id: auditLogDTO.id?.toString(),
        user: transformUserDTOToGraphQL(auditLogDTO.user),
        action: auditLogDTO.action as unknown as AuditLogAction,
        entity: auditLogDTO.entity,
        entityId: auditLogDTO.entityId?.toString(),
        changes: auditLogDTO.changes,
        createdAt: auditLogDTO.createdAt?.toISOString(),
    };
}
export function transformCategoryDTOToGraphQL(categoryDTO: CategoryDTO): Category {
    return {
        __typename: 'Category',
        id: categoryDTO.id?.toString(),
        name: categoryDTO.name,
        parentId: categoryDTO.parentId?.toString(),
        children: categoryDTO.children ? categoryDTO.children.map(transformCategoryDTOToGraphQL) : [],
        parent: categoryDTO.parent ? transformCategoryDTOToGraphQL(categoryDTO.parent) : null,
        products: categoryDTO.products?.map(transformProductDTOToGraphQL),
        shop: categoryDTO.shop ? transformShopDTOToGraphQL(categoryDTO.shop) : null,
        shopId: categoryDTO.shopId.toString(),
    };
}

export function transformVendorDTOToGraphQL(vendorDTO: VendorDTO): Vendor {
    return {
        __typename: 'Vendor',
        id: vendorDTO.id.toString(),
        storeName: vendorDTO.storeName,
        products: vendorDTO.products ? vendorDTO.products.map(transformProductDTOToGraphQL) : [],
        shop: vendorDTO.shop ? transformShopDTOToGraphQL(vendorDTO.shop) : null,
        subscription: vendorDTO.subscription ? transformSubscriptionDTOToGraphQL(vendorDTO.subscription) : null,
        subscriptionId: vendorDTO.subscriptionId?.toString(),
        user: transformUserDTOToGraphQL(vendorDTO.user),
        userId: vendorDTO.userId.toString(),
    };
}

export function transformSubscriptionDTOToGraphQL(subscriptionDTO: SubscriptionDTO): Subscription {
    return {
        __typename: 'Subscription',
        id: subscriptionDTO.id.toString(),
        name: subscriptionDTO.name,
        description: subscriptionDTO.description,
        duration: subscriptionDTO.duration,
        price: subscriptionDTO.price,
        createdAt: subscriptionDTO.createdAt.toISOString(),
        updatedAt: subscriptionDTO.updatedAt.toISOString(),
        vendors: subscriptionDTO.vendors ? subscriptionDTO.vendors.map(transformVendorDTOToGraphQL) : [],
    };
}

export function transformCartItemDTOToGraphQL(cartItemDTO: CartItemDTO): CartItem {
    return {
        __typename: 'CartItem',
        id: cartItemDTO.id?.toString(),
        product: cartItemDTO.product ? transformProductDTOToGraphQL(cartItemDTO.product) : null,
        quantity: cartItemDTO.quantity,
        cart: cartItemDTO.cart ? transformCartDTOToGraphQL(cartItemDTO.cart) : null,
    };
}
export function transformOrderItemDTOToGraphQL(orderItemDTO: OrderItemDTO): OrderItem {
    return {
        __typename: 'OrderItem',
        id: orderItemDTO.id?.toString(),
        orderId: orderItemDTO.orderId.toString(),
        productId: orderItemDTO.productId.toString(),
        price: orderItemDTO.price,
        quantity: orderItemDTO.quantity,
        product: orderItemDTO.product ? transformProductDTOToGraphQL(orderItemDTO.product) : null,
    };
}
export function transformPaymentDTOToGraphQL(paymentDTO: PaymentDTO): Payment {
    return {
        __typename: 'Payment',
        id: paymentDTO.id.toString(),
        orderId: paymentDTO.orderId?.toString(),
        amount: paymentDTO.amount,
        currency: paymentDTO.currency as unknown as Currency,
        method: paymentDTO.method,
        status: paymentDTO.status as unknown as PaymentStatus,
        createdAt: paymentDTO.createdAt.toISOString(),
    };
}
export function transformRefundDTOToGraphQL(refundDTO: RefundDTO): Refund {
    return {
        __typename: 'Refund',
        id: refundDTO.id.toString(),
        amount: refundDTO.amount,
        reason: refundDTO.reason,
        status: refundDTO.status as unknown as RefundStatus,
        createdAt: refundDTO.createdAt.toISOString(),
    };
}

export function transformReviewDTOToGraphQL(reviewDTO: ReviewDTO): Review {
    return {
        __typename: 'Review',
        id: reviewDTO.id.toString(),
        productId: reviewDTO.productId.toString(),
        userId: reviewDTO.userId.toString(),
        rating: reviewDTO.rating,
        comment: reviewDTO.comment,
        createdAt: reviewDTO.createdAt.toISOString(),
        // updatedAt: reviewDTO.updatedAt.toISOString(),
    };
}
export function transformNotificationDTOToGraphQL(notificationDTO: NotificationDTO): Notification {
    return {
        __typename: 'Notification',
        id: notificationDTO.id?.toString(),
        userId: notificationDTO.userId.toString(),
        content: notificationDTO.content,
        type: notificationDTO.type as unknown as NotificationType,
        sentAt: notificationDTO.sentAt?.toISOString(),
    };
}

export function transformSubsiteDTOToGraphQL(subsiteDTO: SubsiteDTO): Subsite {
    return {
        __typename: 'Subsite',
        id: subsiteDTO.id.toString(),
        title: subsiteDTO.title,
        userId: subsiteDTO.userId.toString(),
        user: transformUserDTOToGraphQL(subsiteDTO.user),
        config: subsiteDTO.config,
        createdAt: subsiteDTO.createdAt.toISOString(),
    };
}

export function transformUserActivityDTOToGraphQL(userActivityDTO: UserActivityDTO): UserActivity {
    return {
        __typename: 'UserActivity',
        id: userActivityDTO.id.toString(),
        userId: userActivityDTO.userId.toString(),
        action: userActivityDTO.action as unknown as UserActivityAction,
        timestamp: userActivityDTO.timestamp.toISOString(),
        productId: userActivityDTO.productId?.toString(),
    };
}

export function transformMarketplaceDTOToGraphQL(marketplaceDTO: MarketplaceDTO): Marketplace {
    return {
        __typename: 'Marketplace',
        id: marketplaceDTO.id?.toString(),
        name: marketplaceDTO.name,
        description: marketplaceDTO.description,
        shops: marketplaceDTO.shops ? marketplaceDTO.shops.map(transformShopDTOToGraphQL) : [],
    };
}

export function transformNewsletterDTOToGraphQL(newsletterDTO: NewsletterSubscriptionDTO): NewsletterSubscription {
    return {
        __typename: 'NewsletterSubscription',
        id: newsletterDTO.id?.toString(),
        email: newsletterDTO.email,
        subscribedAt: newsletterDTO.subscribedAt?.toISOString()
    };
}

export function transformProductImageDTOToGraphQL(productImageDTO: ProductImageDTO): ProductImage {
    return {
        __typename: 'ProductImage',
        id: productImageDTO.id.toString(),
        productId: productImageDTO.productId.toString(),
        url: productImageDTO.url,
        product: transformProductDTOToGraphQL(productImageDTO.product)
    };
}
export function transformProductVariantDTOToGraphQL(productVariantDTO: ProductVariantDTO): ProductVariant {
    return {
        __typename: 'ProductVariant',
        id: productVariantDTO.id.toString(),
        productId: productVariantDTO.productId.toString(),
        name: productVariantDTO.name,
        product: transformProductDTOToGraphQL(productVariantDTO.product),
        value: productVariantDTO.value
    };
}

export function transformUserProfileDTOToGraphQL(userProfileDTO: UserProfileDTO): UserProfile {
    return {
        __typename: 'UserProfile',
        id: userProfileDTO.id.toString(),
        userId: userProfileDTO.userId.toString(),
        user: transformUserDTOToGraphQL(userProfileDTO.user),
        phone: userProfileDTO.phone,
        birthday: userProfileDTO.birthday?.toISOString(),
        gender: userProfileDTO.gender
    };
}

// Ajoutez d'autres fonctions de transformation pour les DTO restants ici... 
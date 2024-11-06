// src/presentation/graphql/resolvers/resolver.index.ts
import { AddressResolver } from './resolvers/address.resolver';
import { AuditLogResolver } from './resolvers/audit-log.resolver';
import { CartItemResolver } from './resolvers/cart-item.resolver';
import { CartResolver } from './resolvers/cart.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { MarketplaceResolver } from './resolvers/marketplace.resolver';
import { NewsletterSubscriptionResolver } from './resolvers/newsletter-subscription.resolver';
import { NotificationResolver } from './resolvers/notification.resolver';
import { OrderItemResolver } from './resolvers/order-item.resolver';
import { OrderResolver } from './resolvers/order.resolver';
import { PaymentResolver } from './resolvers/payment.resolver';
import { ProductImageResolver } from './resolvers/product-image.resolver';
import { ProductVariantResolver } from './resolvers/product-variant.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { PromotionResolver } from './resolvers/promotion.resolver';
import { RefundResolver } from './resolvers/refund.resolver';
import { ReviewResolver } from './resolvers/review.resolver';
import { ShopResolver } from './resolvers/shop.resolver';
import { SubscriptionResolver } from './resolvers/subscription.resolver';
import { SubsiteResolver } from './resolvers/subsite.resolver';
import { TicketResolver } from './resolvers/ticket.resolver';
import { UserActivityResolver } from './resolvers/user-activity.resolver';
import { UserProfileResolver } from './resolvers/user-profile.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { VendorResolver } from './resolvers/vendor.resolver';

// All resolvers merged
export const resolvers = [
  AddressResolver,
  AuditLogResolver,
  CartItemResolver,
  CartResolver,
  CategoryResolver,
  MarketplaceResolver,
  NewsletterSubscriptionResolver,
  NotificationResolver,
  OrderItemResolver,
  OrderResolver,
  PaymentResolver,
  ProductImageResolver,
  ProductVariantResolver,
  ProductResolver,
  PromotionResolver,
  RefundResolver,
  ReviewResolver,
  ShopResolver,
  SubscriptionResolver,
  SubsiteResolver,
  TicketResolver,
  UserActivityResolver,
  UserProfileResolver,
  UserResolver,
  VendorResolver,
];

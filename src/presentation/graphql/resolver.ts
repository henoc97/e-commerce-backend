import { mergeResolvers } from '@graphql-tools/merge';
import addressResolver from './all-resolvers';
import auditLogResolver from './resolvers/audit-log.resolver';
import cartItemResolver from './resolvers/cart-item.resolver';
import cartResolver from './resolvers/cart.resolver';
import categoryResolver from './resolvers/category.resolver';
import marketplaceResolver from './resolvers/marketplace.resolver';
import newsletterSubscriptionResolver from './resolvers/newsletter-subscription.resolver';
import notificationResolver from './resolvers/notification.resolver';
import orderResolver from './resolvers/order.resolver';
import paymentResolver from './resolvers/payment.resolver';
import productImageResolver from './resolvers/product-image.resolver';
import productVariantResolver from './resolvers/product-variant.resolver';
import productResolver from './resolvers/product.resolver';
import promotionResolver from './resolvers/promotion.resolver';
import refundResolver from './resolvers/refund.resolver';
import reviewResolver from './resolvers/review.resolver';
import shopResolver from './resolvers/shop.resolver';
import subscriptionResolver from './all-reso/lvers/subscription.resolver';
import subsiteResolver from './resolvers/subsite.resolver';
import ticketResolver from './resolvers/ticket.resolver';
import userActivityResolver from './resolvers/user-activity.resolver';
import userProfileResolver from './resolvers/user-profile.resolver';
import userResolver from './resolvers/user.resolver';
import vendorResolver from './resolvers/vendor.resolver';

// Combine all resolvers
export const resolvers = mergeResolvers([
  addressResolver,
  auditLogResolver,
  cartItemResolver,
  cartResolver,
  categoryResolver,
  marketplaceResolver,
  newsletterSubscriptionResolver,
  notificationResolver,
  orderResolver,
  paymentResolver,
  productImageResolver,
  productVariantResolver,
  productResolver,
  promotionResolver,
  refundResolver,
  reviewResolver,
  shopResolver,
  subscriptionResolver,
  subsiteResolver,
  ticketResolver,
  userActivityResolver,
  userProfileResolver,
  userResolver,
  vendorResolver,
]);

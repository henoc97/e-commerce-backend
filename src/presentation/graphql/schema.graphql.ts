import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';

// Helper function to read and parse GraphQL files
const readGraphQLFile = (filePath: string) => {
  const fullPath = join(__dirname, 'schemas', filePath);
  if (existsSync(fullPath)) {
    return readFileSync(fullPath, 'utf-8');
  } else {
    console.error(`File not found: ${fullPath}`);
    return '';
  }
};

// Load all type definitions
const addressTypeDefs = readGraphQLFile('address.graphql');
const auditLogTypeDefs = readGraphQLFile('audit-log.graphql');
const cartItemTypeDefs = readGraphQLFile('cart-item.graphql');
const cartTypeDefs = readGraphQLFile('cart.graphql');
const categoryTypeDefs = readGraphQLFile('category.graphql');
const marketplaceTypeDefs = readGraphQLFile('marketplace.graphql');
const newsletterSubscriptionTypeDefs = readGraphQLFile(
  'newsletter-subscription.graphql',
);
const notificationTypeDefs = readGraphQLFile('notification.graphql');
const orderTypeDefs = readGraphQLFile('order.graphql');
const paymentTypeDefs = readGraphQLFile('payment.graphql');
const productImageTypeDefs = readGraphQLFile('product-image.graphql');
const productVariantTypeDefs = readGraphQLFile('product-variant.graphql');
const productTypeDefs = readGraphQLFile('product.graphql');
const promotionTypeDefs = readGraphQLFile('promotion.graphql');
const refundTypeDefs = readGraphQLFile('refund.graphql');
const reviewTypeDefs = readGraphQLFile('review.graphql');
const shopTypeDefs = readGraphQLFile('shop.graphql');
const subscriptionTypeDefs = readGraphQLFile('subscription.graphql');
const subsiteTypeDefs = readGraphQLFile('subsite.graphql');
const ticketTypeDefs = readGraphQLFile('ticket.graphql');
const userActivityTypeDefs = readGraphQLFile('user-activity.graphql');
const userProfileTypeDefs = readGraphQLFile('user-profile.graphql');
const userTypeDefs = readGraphQLFile('user.graphql');
const vendorTypeDefs = readGraphQLFile('vendor.graphql');

// Combine all type definitions
export const typeDefs = mergeTypeDefs([
  addressTypeDefs,
  auditLogTypeDefs,
  cartItemTypeDefs,
  cartTypeDefs,
  categoryTypeDefs,
  marketplaceTypeDefs,
  newsletterSubscriptionTypeDefs,
  notificationTypeDefs,
  orderTypeDefs,
  paymentTypeDefs,
  productImageTypeDefs,
  productVariantTypeDefs,
  productTypeDefs,
  promotionTypeDefs,
  refundTypeDefs,
  reviewTypeDefs,
  shopTypeDefs,
  subscriptionTypeDefs,
  subsiteTypeDefs,
  ticketTypeDefs,
  userActivityTypeDefs,
  userProfileTypeDefs,
  userTypeDefs,
  vendorTypeDefs,
]);

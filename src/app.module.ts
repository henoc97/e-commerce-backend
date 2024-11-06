import { Module } from '@nestjs/common';
// Importation des modules
import { AddressModule } from './application/modules/address.module';
import { AuditLogModule } from './application/modules/audit-log.module';
import { CartItemModule } from './application/modules/cart-item.module';
import { CartModule } from './application/modules/cart.module';
import { CategoryModule } from './application/modules/category.module';
import { MarketplaceModule } from './application/modules/marketplace.module';
import { NewsletterSubscriptionModule } from './application/modules/newsletter-subscription.module';
import { NotificationModule } from './application/modules/notification.module';
import { OrderModule } from './application/modules/order.module';
import { PaymentModule } from './application/modules/payment.module';
import { ProductImageModule } from './application/modules/product-image.module';
import { ProductVariantModule } from './application/modules/product-variant.module';
import { ProductModule } from './application/modules/product.module';
import { PromotionModule } from './application/modules/promotion.module';
import { RefundModule } from './application/modules/refund.module';
import { ReviewModule } from './application/modules/review.module';
import { ShopModule } from './application/modules/shop.module';
import { SubscriptionModule } from './application/modules/subscription.module';
import { SubsiteModule } from './application/modules/subsite.module';
import { TicketModule } from './application/modules/ticket.module';
import { UserActivityModule } from './application/modules/user-activity.module';
import { UserProfileModule } from './application/modules/user-profile.module';
import { UserModule } from './application/modules/user.module';
import { VendorModule } from './application/modules/vendor.module';
import { MyGraphQLModule } from './presentation/graphql/graphql.module';
import { KafkaModule } from './infrastructure/external-servicies/kafka/kafka.module';

@Module({
  imports: [
    AddressModule,
    AuditLogModule,
    CartItemModule,
    CartModule,
    CategoryModule,
    MarketplaceModule,
    NewsletterSubscriptionModule,
    NotificationModule,
    OrderModule,
    PaymentModule,
    ProductImageModule,
    ProductVariantModule,
    ProductModule,
    PromotionModule,
    RefundModule,
    ReviewModule,
    ShopModule,
    SubscriptionModule,
    SubsiteModule,
    TicketModule,
    UserActivityModule,
    UserProfileModule,
    UserModule,
    VendorModule,
    MyGraphQLModule,
    KafkaModule
  ],
  // ... autres configurations si nécessaire ...
})
export class AppModule {}

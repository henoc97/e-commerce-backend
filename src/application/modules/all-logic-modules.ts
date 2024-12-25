import { ShopModule } from './shop.module';
import { VendorModule } from './vendor.module';
import { MarketplaceModule } from './marketplace.module';
import { TicketModule } from './ticket.module';
import { AuditLogModule } from './audit-log.module';
import { AddressModule } from './address.module';
import { CategoryModule } from './category.module';
import { OrderModule } from './order.module';
import { CartModule } from './cart.module';
import { NewsletterSubscriptionModule } from './newsletter-subscription.module';
import { ProductModule } from './product.module';
import { PaymentModule } from './payment.module';
import { ProductImageModule } from './product-image.module';
import { OrderItemModule } from './order-item.module';
import { SubscriptionModule } from './subscription.module';
import { UserProfileModule } from './user-profile.module';
import { NotificationModule } from './notification.module';
import { ReviewModule } from './review.module';
import { RefundModule } from './refund.module';
import { PromotionModule } from './promotion.module';
import { SubsiteModule } from './subsite.module';
import { CartItemModule } from './cart-item.module';
import { ProductVariantModule } from './product-variant.module';
import { UserActivityModule } from './user-activity.module';
import { UserModule } from './user.module';
import { KafkaModule } from '../../infrastructure/external-services/kafka/kafka.module';
import { MyGraphQLModule } from '../../presentation/graphql/graphql.module';
import { AuthModule } from '../../infrastructure/external-services/auth/auth.module';

const allLogicModules = [
    AddressModule,
    AuditLogModule,
    CartItemModule,
    CartModule,
    CategoryModule,
    MarketplaceModule,
    NewsletterSubscriptionModule,
    NotificationModule,
    OrderItemModule,
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
    // MyGraphQLModule,
    KafkaModule,
    AuthModule
];

export default allLogicModules;


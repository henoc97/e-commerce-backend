import { Module } from '@nestjs/common';
import { OrderItemService } from '../services/order-item.service';
import { OrderItemRepository } from 'src/infrastructure/persistences/order-item.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderItem } from '../use-cases/order-item.use-case/create-order-item.use-case';
import { FetchOrderItemsByOrderId } from '../use-cases/order-item.use-case/fetch-order-items-by-order-id.use-case';
import { FetchOrderItemsByProductId } from '../use-cases/order-item.use-case/fetch-order-items-by-product-id.use-case';
import { UpdateOrderItem } from '../use-cases/order-item.use-case/update-order-item.use-case';
import { FetchRecentOrderItems } from '../use-cases/order-item.use-case/fetch-recent-order-items.use-case';
import { DeleteOrderItem } from '../use-cases/order-item.use-case/delete-order-item.use-case';
import { FetchOrderItemById } from '../use-cases/order-item.use-case/fetch-order-item-by-id.use-case';
import { CalculateTotalPriceForOrder } from '../use-cases/order-item.use-case/calculate-total-price-for-order.use-case';
import { FetchLowStockItems } from '../use-cases/order-item.use-case/fetch-low-stock-items.use-case';
import { KafkaModule } from 'src/infrastructure/external-servicies/kafka/kafka.module';

const orderItemUseCases = [
    CreateOrderItem,
    FetchOrderItemsByOrderId,
    FetchOrderItemsByProductId,
    UpdateOrderItem,
    FetchRecentOrderItems,
    DeleteOrderItem,
    FetchOrderItemById,
    CalculateTotalPriceForOrder,
    FetchLowStockItems,
];

@Module({
    imports: [KafkaModule],
    providers: [
        OrderItemService,
        PrismaService,
        {
            provide: 'IOrderItemRepository',
            useClass: OrderItemRepository,
        },
        ...orderItemUseCases,
    ],
    exports: [OrderItemService, ...orderItemUseCases],
})
export class OrderItemModule { }

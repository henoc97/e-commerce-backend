import { Module } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderRepository } from 'src/infrastructure/persistences/order.repository.impl';
import { CreateOrder } from '../use-cases/order.use-cases/create-order.use-case';
import { AddPaymentToOrder } from '../use-cases/order.use-cases/add-payment-to-order.use-case';
import { UpdateOrder } from '../use-cases/order.use-cases/update-order.use-case';
import { AddRefundToOrder } from '../use-cases/order.use-cases/add-refund-to-order.use-case';
import { UpdateOrderStatus } from '../use-cases/order.use-cases/update-order-status.use-case';
import { FetchOrdersByUserId } from '../use-cases/order.use-cases/fetch-orders-by-user-id.use-case';
import { FetchOrders } from '../use-cases/order.use-cases/fetch-orders.use-case';
import { DeleteOrder } from '../use-cases/order.use-cases/delete-order.use-case';
import { FetchOrderById } from '../use-cases/order.use-cases/fetch-order-by-id.use-case';
import { FetchOrderByTrackingNumber } from '../use-cases/order.use-cases/fetch-order-by-tracking-number.use-case';
import { FetchOrdersByShopId } from '../use-cases/order.use-cases/fetch-orders-by-shop-id.use-case';
import { FetchOrdersByStatus } from '../use-cases/order.use-cases/fetch-orders-by-status.use-case';
import { FetchTopOrdersByAmount } from '../use-cases/order.use-cases/fetch-top-orders-by-amount.use-case';
import { FetchRecentOrdersByShop } from '../use-cases/order.use-cases/fetch-recent-orders-by-shop.use-case';
import { FetchOrdersByDateRange } from '../use-cases/order.use-cases/fetch-orders-by-date-range.use-case';
import { Kafka } from 'kafkajs';
import { KafkaModule } from 'src/infrastructure/external-services/kafka/kafka.module';

const orderUseCases = [
  CreateOrder,
  AddPaymentToOrder,
  UpdateOrder,
  AddRefundToOrder,
  UpdateOrderStatus,
  FetchOrdersByUserId,
  FetchOrders,
  DeleteOrder,
  FetchOrderById,
  FetchOrderByTrackingNumber,
  FetchOrdersByShopId,
  FetchOrdersByStatus,
  FetchTopOrdersByAmount,
  FetchRecentOrdersByShop,
  FetchOrdersByDateRange,
];

@Module({
  imports: [KafkaModule],
  providers: [
    OrderService,

    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
    ...orderUseCases,
  ],
  exports: [OrderService, ...orderUseCases],
})
export class OrderModule { }

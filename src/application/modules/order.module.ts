import { Module } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { OrderRepository } from 'src/infrastructure/persistences/order.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    OrderService,
    PrismaService,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}

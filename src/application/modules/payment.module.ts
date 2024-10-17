import { Module } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { PaymentRepository } from 'src/infrastructure/persistences/payment.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    PaymentService,
    PrismaService,
    {
      provide: 'IPaymentRepository',
      useClass: PaymentRepository,
    },
  ],
  exports: [PaymentService],
})
export class PaymentModule {}


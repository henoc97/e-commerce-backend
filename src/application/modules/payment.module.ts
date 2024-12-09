import { Module } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { PaymentRepository } from '../../infrastructure/persistences/payment.repository.impl';
import { CreatePayment } from '../use-cases/payment.use-cases/create-payment.use-case';
import { UpdatePayment } from '../use-cases/payment.use-cases/update-payment.use-case';
import { DeletePayment } from '../use-cases/payment.use-cases/delete-payment.use-case';
import { FetchPaymentsGroupedByMethod } from '../use-cases/payment.use-cases/fetch-payments-grouped-by-method.use-case';
import { FetchPaymentsByMethod } from '../use-cases/payment.use-cases/fetch-payments-by-method.use-case';
import { FetchPaymentById } from '../use-cases/payment.use-cases/fetch-payment-by-id.use-case';
import { FetchPaymentsByStatus } from '../use-cases/payment.use-cases/fetch-payments-by-status.use-case';
import { FetchPaymentsByOrderId } from '../use-cases/payment.use-cases/fetch-payments-by-order-id.use-case';
import { FetchMostRecentPaymentByOrderId } from '../use-cases/payment.use-cases/fetch-most-recent-payment-by-order-id.use-case';
import { FetchTotalAmountByDateRange } from '../use-cases/payment.use-cases/fetch-total-amount-by-date-range.use-case';
import { FetchPaymentsByDateRange } from '../use-cases/payment.use-cases/fetch-payments-by-date-range.use-case';

const paymentUseCases = [
  CreatePayment,
  UpdatePayment,
  DeletePayment,
  FetchPaymentsGroupedByMethod,
  FetchPaymentsByMethod,
  FetchPaymentById,
  FetchPaymentsByStatus,
  FetchPaymentsByOrderId,
  FetchMostRecentPaymentByOrderId,
  FetchTotalAmountByDateRange,
  FetchPaymentsByDateRange,
];

@Module({
  providers: [
    PaymentService,

    {
      provide: 'IPaymentRepository',
      useClass: PaymentRepository,
    },
    ...paymentUseCases,
  ],
  exports: [PaymentService, ...paymentUseCases],
})
export class PaymentModule { }

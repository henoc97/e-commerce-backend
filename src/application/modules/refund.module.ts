import { Module } from '@nestjs/common';
import { RefundService } from '../services/refund.service';
import { RefundRepository } from 'src/infrastructure/persistences/refund.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    RefundService,
    PrismaService,
    {
      provide: 'IRefundRepository',
      useClass: RefundRepository,
    },
  ],
  exports: [RefundService],
})
export class RefundModule {}

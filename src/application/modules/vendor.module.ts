import { Module } from '@nestjs/common';
import { VendorService } from '../services/vendor.service';
import { VendorRepository } from 'src/infrastructure/persistences/vendor.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    VendorService,
    PrismaService,
    {
      provide: 'IVendorRepository',
      useClass: VendorRepository,
    },
  ],
  exports: [VendorService],
})
export class VendorModule {}

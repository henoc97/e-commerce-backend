import { Module } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { AddressRepository } from 'src/infrastructure/persistences/address.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    AddressService,
    PrismaService,
    {
      provide: 'IAddressRepository',
      useClass: AddressRepository,
    },
  ],
  exports: [AddressService],
})
export class AddressModule {}


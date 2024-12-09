import { Module } from '@nestjs/common';
import { VendorService } from '../services/vendor.service';
import { VendorRepository } from '../../infrastructure/persistences/vendor.repository.impl';
import { CreateVendor } from '../use-cases/vendor.use-cases/create-vendor.use-case';
import { FindVendorsByUser } from '../use-cases/vendor.use-cases/find-vendors-by-user.use-case';
import { VendorList } from '../use-cases/vendor.use-cases/vendor-list.use-case';
import { AddProductToVendor } from '../use-cases/vendor.use-cases/add-product-to-vendor.use-case';
import { UpdateVendor } from '../use-cases/vendor.use-cases/update-vendor.use-case';
import { SetVendorSubscription } from '../use-cases/vendor.use-cases/set-vendor-subscription.use-case';
import { FindVendorsBySubscription } from '../use-cases/vendor.use-cases/find-vendors-by-subscription.use-case';
import { FindVendorById } from '../use-cases/vendor.use-cases/find-vendor-by-id.use-case';
import { DeleteVendor } from '../use-cases/vendor.use-cases/delete-vendor.use-case';
import { SetVendorShop } from '../use-cases/vendor.use-cases/set-vendor-shop.use-case';
import { FindVendorsByStoreName } from '../use-cases/vendor.use-cases/find-vendors-by-store-name.use-case';
import { SubscriptionModule } from './subscription.module';
import { ShopModule } from './shop.module';
import { RemoveProductFromVendor } from '../use-cases/vendor.use-cases/remove-product-from-vendor.use-case';

const vendorUseCases = [
  CreateVendor,
  FindVendorsByUser,
  VendorList,
  AddProductToVendor,
  UpdateVendor,
  SetVendorSubscription,
  FindVendorsBySubscription,
  FindVendorById,
  DeleteVendor,
  SetVendorShop,
  RemoveProductFromVendor,
  FindVendorsByStoreName,
];

@Module({
  imports: [SubscriptionModule, ShopModule],
  providers: [
    VendorService,

    {
      provide: 'IVendorRepository',
      useClass: VendorRepository,
    },
    ...vendorUseCases,
  ],
  exports: [VendorService, ...vendorUseCases],
})
export class VendorModule { }

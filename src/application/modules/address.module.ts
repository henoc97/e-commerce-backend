import { Module } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { AddressRepository } from 'src/infrastructure/persistences/address.repository.impl';
import { CreateAddress } from '../use-cases/address.use-cases/create-address.use-case';
import { ListAddressesByUser } from '../use-cases/address.use-cases/list-addresses-by-user.use-case';
import { ListAddressesByCountry } from '../use-cases/address.use-cases/list-addresses-by-country.use-case';
import { ListAddressesByState } from '../use-cases/address.use-cases/list-addresses-by-state.use-case';
import { RemoveAddressById } from '../use-cases/address.use-cases/remove-address-by-id.use-case';
import { ListAddressesByCity } from '../use-cases/address.use-cases/list-addresses-by-city.use-case';
import { ListAddressesByPostalCode } from '../use-cases/address.use-cases/list-addresses-by-postal-code.use-case';
import { FetchAddressById } from '../use-cases/address.use-cases/fetch-address-by-id.use-case';
import { FetchAddressByUserAndId } from '../use-cases/address.use-cases/fetch-address-by-user-and-id.use-case';
import { ModifyAddressById } from '../use-cases/address.use-cases/modify-address-by-id.use-case';

const addressUseCases = [
  CreateAddress,
  ListAddressesByUser,
  ListAddressesByCountry,
  ListAddressesByState,
  RemoveAddressById,
  ListAddressesByCity,
  ListAddressesByPostalCode,
  FetchAddressById,
  FetchAddressByUserAndId,
  ModifyAddressById,
];

@Module({
  providers: [
    AddressService,
    {
      provide: 'IAddressRepository',
      useClass: AddressRepository,
    },
    ...addressUseCases,
  ],
  exports: [AddressService, ...addressUseCases],
})
export class AddressModule { }

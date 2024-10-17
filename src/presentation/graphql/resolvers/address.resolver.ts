import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddressDTO } from 'src/presentation/dtos/address.dto';
import { CreateAddress } from 'src/application/use-cases/address.use-cases/create-address.use-case';
import { FetchAddressById } from 'src/application/use-cases/address.use-cases/fetch-address-by-id.use-case';
import { ListAddressesByCity } from 'src/application/use-cases/address.use-cases/list-addresses-by-city.use-case';
import { ModifyAddressById } from 'src/application/use-cases/address.use-cases/modify-address-by-id.use-case';
import { RemoveAddressById } from 'src/application/use-cases/address.use-cases/remove-address-by-id.use-case';
import { ListAddressesByCountry } from 'src/application/use-cases/address.use-cases/list-addresses-by-country.use-case';
import { ListAddressesByState } from 'src/application/use-cases/address.use-cases/list-addresses-by-state.use-case';
import { ListAddressesByPostalCode } from 'src/application/use-cases/address.use-cases/list-addresses-by-postal-code.use-case';
import { ListAddressesByUser } from 'src/application/use-cases/address.use-cases/list-addresses-by-user.use-case';

@Resolver(AddressDTO)
export class AddressResolver {
  constructor(
    private readonly createAddress: CreateAddress,
    private readonly fetchAddressById: FetchAddressById,
    private readonly listAddressesByCity: ListAddressesByCity,
    private readonly modifyAddressById: ModifyAddressById,
    private readonly removeAddressById: RemoveAddressById,
    private readonly listAddressesByCountry: ListAddressesByCountry,
    private readonly listAddressesByState: ListAddressesByState,
    private readonly listAddressesByPostalCode: ListAddressesByPostalCode,
    private readonly listAddressesByUser: ListAddressesByUser,
  ) {}

  @Query(() => AddressDTO, { nullable: true })
  async address(@Args('id') id: number): Promise<AddressDTO | null> {
    return this.fetchAddressById.execute(id);
  }

  @Query(() => [AddressDTO])
  async addressesByCity(@Args('city') city: string): Promise<AddressDTO[]> {
    return this.listAddressesByCity.execute(city);
  }

  @Mutation(() => AddressDTO)
  async createNewAddress(
    @Args('addressInput') addressInput: AddressDTO,
  ): Promise<AddressDTO> {
    return this.createAddress.execute(addressInput);
  }

  @Mutation(() => AddressDTO)
  async updateAddress(
    @Args('id') id: number,
    @Args('addressInput') addressInput: AddressDTO,
  ): Promise<AddressDTO> {
    return this.modifyAddressById.execute(id, addressInput);
  }

  @Mutation(() => Boolean)
  async deleteAddress(@Args('id') id: number): Promise<boolean> {
    return this.removeAddressById.execute(id);
  }

  @Query(() => [AddressDTO])
  async addressesByCountry(
    @Args('country') country: string,
  ): Promise<AddressDTO[]> {
    return this.listAddressesByCountry.execute(country);
  }

  @Query(() => [AddressDTO])
  async addressesByState(@Args('state') state: string): Promise<AddressDTO[]> {
    return this.listAddressesByState.execute(state);
  }

  @Query(() => [AddressDTO])
  async addressesByPostalCode(
    @Args('postalCode') postalCode: string,
  ): Promise<AddressDTO[]> {
    return this.listAddressesByPostalCode.execute(postalCode);
  }

  @Query(() => [AddressDTO])
  async addressesByUser(@Args('userId') userId: number): Promise<AddressDTO[]> {
    return this.listAddressesByUser.execute(userId);
  }
}

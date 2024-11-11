import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateAddress } from 'src/application/use-cases/address.use-cases/create-address.use-case';
import { FetchAddressById } from 'src/application/use-cases/address.use-cases/fetch-address-by-id.use-case';
import { ListAddressesByCity } from 'src/application/use-cases/address.use-cases/list-addresses-by-city.use-case';
import { ModifyAddressById } from 'src/application/use-cases/address.use-cases/modify-address-by-id.use-case';
import { RemoveAddressById } from 'src/application/use-cases/address.use-cases/remove-address-by-id.use-case';
import { ListAddressesByCountry } from 'src/application/use-cases/address.use-cases/list-addresses-by-country.use-case';
import { ListAddressesByState } from 'src/application/use-cases/address.use-cases/list-addresses-by-state.use-case';
import { ListAddressesByPostalCode } from 'src/application/use-cases/address.use-cases/list-addresses-by-postal-code.use-case';
import { ListAddressesByUser } from 'src/application/use-cases/address.use-cases/list-addresses-by-user.use-case';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infrastructure/external-servicies/auth/jwt-auth.guard';
import { Address, AddressInput } from 'src/generated/graphql';
import { transformAddressDTOToGraphQL } from 'src/application/helper/utils/transformers';

@Resolver(() => 'Address')
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
  ) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => 'Address', { nullable: true })
  async address(@Args('id') id: number): Promise<Address | null> {
    const result = await this.fetchAddressById.execute(id)
    return transformAddressDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['Address'])
  async addressesByCity(@Args('city') city: string): Promise<Address[]> {
    const result = await this.listAddressesByCity.execute(city)
    return result.map(transformAddressDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'Address')
  async createNewAddress(
    @Args('addressInput') addressInput: AddressInput,
  ): Promise<Address> {
    const result = await this.createAddress.execute(addressInput);
    return transformAddressDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => 'Address')
  async updateAddress(
    @Args('id') id: number,
    @Args('addressInput') addressInput: AddressInput,
  ): Promise<Address> {
    const result = await this.modifyAddressById.execute(id, addressInput);
    return transformAddressDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteAddress(@Args('id') id: number): Promise<boolean> {
    return this.removeAddressById.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['Address'])
  async addressesByCountry(
    @Args('country') country: string,
  ): Promise<Address[]> {
    const result = await this.listAddressesByCountry.execute(country);
    return result.map(transformAddressDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['Address'])
  async addressesByState(@Args('state') state: string): Promise<Address[]> {
    const result = await this.listAddressesByState.execute(state);
    return result.map(transformAddressDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['Address'])
  async addressesByPostalCode(
    @Args('postalCode') postalCode: string,
  ): Promise<Address[]> {
    const result = await this.listAddressesByPostalCode.execute(postalCode);
    return result.map(transformAddressDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ['Address'])
  async addressesByUser(@Args('userId') userId: number): Promise<Address[]> {
    const result = await this.listAddressesByUser.execute(userId);
    return result.map(transformAddressDTOToGraphQL);
  }
}

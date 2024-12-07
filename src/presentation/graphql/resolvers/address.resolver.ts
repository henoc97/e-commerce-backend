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
import { JwtAuthGuard } from 'src/infrastructure/external-services/auth/jwt-auth.guard';
import { transformAddressDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { AddressOutput } from 'src/presentation/output/address.output';
import { AddressInput } from 'src/presentation/input/address.input';

@Resolver(() => AddressOutput)
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
  @Query(() => AddressOutput, { nullable: true })
  async address(@Args('id') id: number): Promise<AddressOutput | null> {
    const result = await this.fetchAddressById.execute(id)
    return transformAddressDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AddressOutput])
  async addressesByCity(@Args('city') city: string): Promise<AddressOutput[]> {
    const result = await this.listAddressesByCity.execute(city)
    return result?.map(transformAddressDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AddressOutput)
  async createNewAddress(
    @Args('addressInput') addressInput: AddressInput,
  ): Promise<AddressOutput> {
    const result = await this.createAddress.execute(addressInput);
    return transformAddressDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AddressOutput)
  async updateAddress(
    @Args('id') id: number,
    @Args('addressInput') addressInput: AddressInput,
  ): Promise<AddressOutput> {
    const result = await this.modifyAddressById.execute(id, addressInput);
    return transformAddressDTOToGraphQL(result);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteAddress(@Args('id') id: number): Promise<boolean> {
    return this.removeAddressById.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AddressOutput])
  async addressesByCountry(
    @Args('country') country: string,
  ): Promise<AddressOutput[]> {
    const result = await this.listAddressesByCountry.execute(country);
    return result?.map(transformAddressDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AddressOutput])
  async addressesByState(@Args('state') state: string): Promise<AddressOutput[]> {
    const result = await this.listAddressesByState.execute(state);
    return result?.map(transformAddressDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AddressOutput])
  async addressesByPostalCode(
    @Args('postalCode') postalCode: string,
  ): Promise<AddressOutput[]> {
    const result = await this.listAddressesByPostalCode.execute(postalCode);
    return result?.map(transformAddressDTOToGraphQL);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AddressOutput])
  async addressesByUser(@Args('userId') userId: number): Promise<AddressOutput[]> {
    const result = await this.listAddressesByUser.execute(userId);
    return result?.map(transformAddressDTOToGraphQL);
  }
}

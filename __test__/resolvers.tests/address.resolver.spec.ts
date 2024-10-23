import { Test, TestingModule } from '@nestjs/testing';
import { AddressResolver } from '../../src/presentation/graphql/resolvers/address.resolver';
import { CreateAddress } from '../../src/application/use-cases/address.use-cases/create-address.use-case';
import { FetchAddressById } from '../../src/application/use-cases/address.use-cases/fetch-address-by-id.use-case';
import { ListAddressesByCity } from '../../src/application/use-cases/address.use-cases/list-addresses-by-city.use-case';
import { ModifyAddressById } from '../../src/application/use-cases/address.use-cases/modify-address-by-id.use-case';
import { RemoveAddressById } from '../../src/application/use-cases/address.use-cases/remove-address-by-id.use-case';
import { ListAddressesByCountry } from '../../src/application/use-cases/address.use-cases/list-addresses-by-country.use-case';
import { ListAddressesByState } from '../../src/application/use-cases/address.use-cases/list-addresses-by-state.use-case';
import { ListAddressesByPostalCode } from '../../src/application/use-cases/address.use-cases/list-addresses-by-postal-code.use-case';
import { ListAddressesByUser } from '../../src/application/use-cases/address.use-cases/list-addresses-by-user.use-case';

describe('AddressResolver', () => {
  let resolver: AddressResolver;
  let createAddress: CreateAddress;
  let fetchAddressById: FetchAddressById;
  let listAddressesByCity: ListAddressesByCity;
  let modifyAddressById: ModifyAddressById;
  let removeAddressById: RemoveAddressById;
  let listAddressesByCountry: ListAddressesByCountry;
  let listAddressesByState: ListAddressesByState;
  let listAddressesByPostalCode: ListAddressesByPostalCode;
  let listAddressesByUser: ListAddressesByUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressResolver,
        { provide: CreateAddress, useValue: { execute: jest.fn() } },
        { provide: FetchAddressById, useValue: { execute: jest.fn() } },
        { provide: ListAddressesByCity, useValue: { execute: jest.fn() } },
        { provide: ModifyAddressById, useValue: { execute: jest.fn() } },
        { provide: RemoveAddressById, useValue: { execute: jest.fn() } },
        { provide: ListAddressesByCountry, useValue: { execute: jest.fn() } },
        { provide: ListAddressesByState, useValue: { execute: jest.fn() } },
        { provide: ListAddressesByPostalCode, useValue: { execute: jest.fn() } },
        { provide: ListAddressesByUser, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    resolver = module.get<AddressResolver>(AddressResolver);
    createAddress = module.get<CreateAddress>(CreateAddress);
    fetchAddressById = module.get<FetchAddressById>(FetchAddressById);
    listAddressesByCity = module.get<ListAddressesByCity>(ListAddressesByCity);
    modifyAddressById = module.get<ModifyAddressById>(ModifyAddressById);
    removeAddressById = module.get<RemoveAddressById>(RemoveAddressById);
    listAddressesByCountry = module.get<ListAddressesByCountry>(ListAddressesByCountry);
    listAddressesByState = module.get<ListAddressesByState>(ListAddressesByState);
    listAddressesByPostalCode = module.get<ListAddressesByPostalCode>(ListAddressesByPostalCode);
    listAddressesByUser = module.get<ListAddressesByUser>(ListAddressesByUser);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // Ajoutez des tests pour chaque méthode du résolveur
  it('should fetch address by id', async () => {
    const id = 1;
    const expectedResult = { id, street: '123 Main St', userId: 1, city: 'Ville', state: 'État', postalCode: '12345', country: 'Pays' };
    jest.spyOn(fetchAddressById, 'execute').mockResolvedValue(expectedResult);

    const result = await resolver.address(id);
    expect(result).toEqual(expectedResult);
  });

  it('should create a new address', async () => {
    const addressInput = { id: 1, street: '123 Main St', userId: 1, city: 'City', state: 'State', postalCode: '12345', country: 'Country' };
    jest.spyOn(createAddress, 'execute').mockResolvedValue(addressInput);

    const result = await resolver.createNewAddress(addressInput);
    expect(result).toEqual(addressInput);
  });

  it('should update an address', async () => {
    const id = 1;
    const addressInput = { id, street: '456 Elm St', userId: 1, city: 'City', state: 'State', postalCode: '12345', country: 'Country' };
    jest.spyOn(modifyAddressById, 'execute').mockResolvedValue(addressInput);

    const result = await resolver.updateAddress(id, addressInput);
    expect(result).toEqual(addressInput);
  });

  it('should delete an address', async () => {
    const id = 1;
    jest.spyOn(removeAddressById, 'execute').mockResolvedValue(true);

    const result = await resolver.deleteAddress(id);
    expect(result).toBe(true);
  });

  it('should list addresses by city', async () => {
    const city = 'City';
    const expectedResult = [{ id: 1, street: '123 Main St', city, userId: 1, state: 'État', postalCode: '12345', country: 'Pays' }];
    jest.spyOn(listAddressesByCity, 'execute').mockResolvedValue(expectedResult);

    const result = await resolver.addressesByCity(city);
    expect(result).toEqual(expectedResult);
  });

  it('should list addresses by country', async () => {
    const country = 'Country';
    const expectedResult = [{ id: 1, street: '123 Main St', city: 'Ville', state: 'État', postalCode: '12345', country, userId: 1 }];
    jest.spyOn(listAddressesByCountry, 'execute').mockResolvedValue(expectedResult);

    const result = await resolver.addressesByCountry(country);
    expect(result).toEqual(expectedResult);
  });

  it('should list addresses by state', async () => {
    const state = 'State';
    const expectedResult = [{ id: 1, street: '123 Main St', city: 'Ville', state, postalCode: '12345', country: 'Pays', userId: 1 }];
    jest.spyOn(listAddressesByState, 'execute').mockResolvedValue(expectedResult);

    const result = await resolver.addressesByState(state);
    expect(result).toEqual(expectedResult);
  });

  it('should list addresses by postal code', async () => {
    const postalCode = '12345';
    const expectedResult = [{ id: 1, street: '123 Main St', city: 'Ville', state: 'État', postalCode, country: 'Pays', userId: 1 }];
    jest.spyOn(listAddressesByPostalCode, 'execute').mockResolvedValue(expectedResult);

    const result = await resolver.addressesByPostalCode(postalCode);
    expect(result).toEqual(expectedResult);
  });

  it('should list addresses by user', async () => {
    const userId = 1;
    const expectedResult = [{ id: 1, street: '123 Main St', city: 'Ville', state: 'État', postalCode: '12345', country: 'Pays', userId }];
    jest.spyOn(listAddressesByUser, 'execute').mockResolvedValue(expectedResult);

    const result = await resolver.addressesByUser(userId);
    expect(result).toEqual(expectedResult);
  });

  // Ajoutez d'autres tests pour les autres méthodes...
});

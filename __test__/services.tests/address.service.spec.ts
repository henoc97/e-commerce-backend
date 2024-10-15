import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../../src/application/services/address.service';
import { IAddressRepository } from '../../src/domain/repositories/address.repository';
import { Address } from '../../src/domain/entities/address.entity';
import { AddressDTO } from '../../src/presentation/dtos/address.dto';
import { InternalServerErrorException } from '@nestjs/common';


const mockAddressRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
  getAllByUserId: jest.fn(),
  getByUserIdAndId: jest.fn(),
  getByCity: jest.fn(),
  getByState: jest.fn(),
  getByCountry: jest.fn(),
  getByPostalCode: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: IAddressRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: 'IAddressRepository',
          useValue: mockAddressRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<AddressService>(AddressService);
    addressRepository = module.get<IAddressRepository>('IAddressRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  /* create address success and failure tests */
  it('should create address', async () => {
    /** 
     * Tests the create address method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's createAddress method is called with the correct data.
     */

    const addressDTO: AddressDTO = new AddressDTO(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    );
    ;

    const returnOject: Address = new Address(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    );

    mockAddressRepository.create.mockResolvedValue(returnOject);

    const result = await service.createAddress(addressDTO);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.create).toHaveBeenCalledWith(addressDTO);
  });

  it('should throw an error when create address method fails', async () => {

    const addressDTO: AddressDTO = new AddressDTO(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    );
    ;

    // Simulate a failure when calling the repository 
    mockAddressRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createAddress(addressDTO)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get address by id success and failure tests */
  it('should get address by id', async () => {
    /** 
     * Tests the get address by id method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's getAddressById method is called with the correct data.
     */

    const id: number = 1;

    const returnObject: Address | null = new Address(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    );

    mockAddressRepository.getById.mockResolvedValue(returnObject);

    const result = await service.getAddressById(id);
    expect(result).toEqual(returnObject);
    expect(mockAddressRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get address by id method fails', async () => {

    const id: number = 1;

    // Simulate a failure when calling the repository 
    mockAddressRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getAddressById(id)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  it('should return null when address is not found by id', async () => {
    const id: number = 999;
    mockAddressRepository.getById.mockResolvedValue(null);

    const result = await service.getAddressById(id);
    expect(result).toBeNull();
    expect(mockAddressRepository.getById).toHaveBeenCalledWith(id);
  });

  /* update address by id success and failure tests */
  it('should update address by id', async () => {
    const id: number = 1;
    const data: Partial<AddressDTO> = {
      street: '456 Elm St',
      city: 'New Springfield'
    };

    const returnObject: Address = new Address(
      1, 1, '456 Elm St', 'New Springfield', 'IL', '62701', 'USA',
    );

    mockAddressRepository.updateById.mockResolvedValue(returnObject);

    const result = await service.updateAddressById(id, data);
    expect(result).toEqual(returnObject);
    expect(mockAddressRepository.updateById).toHaveBeenCalledWith(id, data);
  });

  it('should throw an error when update address by id method fails', async () => {

    const id: number = 1;
    const data: Partial<AddressDTO> = new AddressDTO(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    );
    ;

    // Simulate a failure when calling the repository 
    mockAddressRepository.updateById.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateAddressById(id,
      data,)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* delete address by id success and failure tests */
  it('should delete address by id', async () => {
    /** 
     * Tests the delete address by id method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's deleteAddressById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true

    mockAddressRepository.deleteById.mockResolvedValue(returnOject);

    const result = await service.deleteAddressById(id);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.deleteById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete address by id method fails', async () => {

    const id: number = 1;

    // Simulate a failure when calling the repository 
    mockAddressRepository.deleteById.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteAddressById(id)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get addresses by user id success and failure tests */
  it('should get addresses by user id', async () => {
    /** 
     * Tests the get addresses by user id method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's getAddressesByUserId method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Address[] = [new Address(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    )];

    mockAddressRepository.getAllByUserId.mockResolvedValue(returnOject);

    const result = await service.getAddressesByUserId(userId);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getAllByUserId).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get addresses by user id method fails', async () => {

    const userId: number = 1;

    // Simulate a failure when calling the repository 
    mockAddressRepository.getAllByUserId.mockRejectedValue(new Error('Repository error'));

    await expect(service.getAddressesByUserId(userId)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get address by user id and id success and failure tests */
  it('should get address by user id and id', async () => {
    /** 
     * Tests the get address by user id and id method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's getAddressByUserIdAndId method is called with the correct data.
     */

    const userId: number = 1;
    const addressId: number = 1;

    const returnObject: Address | null = new Address(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    );

    mockAddressRepository.getByUserIdAndId.mockResolvedValue(returnObject);

    const result = await service.getAddressByUserIdAndId(userId,
      addressId,);
    expect(result).toEqual(returnObject);
    expect(mockAddressRepository.getByUserIdAndId).toHaveBeenCalledWith(userId,
      addressId,);
  });

  it('should throw an error when get address by user id and id method fails', async () => {

    const userId: number = 1;
    const addressId: number = 1;

    // Simulate a failure when calling the repository 
    mockAddressRepository.getByUserIdAndId.mockRejectedValue(new Error('Repository error'));

    await expect(service.getAddressByUserIdAndId(userId,
      addressId,)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  it('should return null when address is not found for user', async () => {
    const userId: number = 1;
    const addressId: number = 999;

    mockAddressRepository.getByUserIdAndId.mockResolvedValue(null);

    const result = await service.getAddressByUserIdAndId(userId, addressId);
    expect(result).toBeNull();
    expect(mockAddressRepository.getByUserIdAndId).toHaveBeenCalledWith(userId, addressId);
  });

  /* get addresses by city success and failure tests */
  it('should get addresses by city', async () => {
    /** 
     * Tests the get addresses by city method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's getAddressesByCity method is called with the correct data.
     */

    const city: string = 'city';

    const returnOject: Address[] = [new Address(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    )];

    mockAddressRepository.getByCity.mockResolvedValue(returnOject);

    const result = await service.getAddressesByCity(city);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getByCity).toHaveBeenCalledWith(city);
  });

  it('should throw an error when get addresses by city method fails', async () => {

    const city: string = 'city';

    // Simulate a failure when calling the repository 
    mockAddressRepository.getByCity.mockRejectedValue(new Error('Repository error'));

    await expect(service.getAddressesByCity(city)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  it('should return empty array when no addresses found for city', async () => {
    const city: string = 'NonexistentCity';
    mockAddressRepository.getByCity.mockResolvedValue([]);

    const result = await service.getAddressesByCity(city);
    expect(result).toEqual([]);
    expect(mockAddressRepository.getByCity).toHaveBeenCalledWith(city);
  });

  /* get addresses by state success and failure tests */
  it('should get addresses by state', async () => {
    /** 
     * Tests the get addresses by state method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's getAddressesByState method is called with the correct data.
     */

    const state: string = 'state';

    const returnOject: Address[] = [new Address(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    )];

    mockAddressRepository.getByState.mockResolvedValue(returnOject);

    const result = await service.getAddressesByState(state);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getByState).toHaveBeenCalledWith(state);
  });

  it('should throw an error when get addresses by state method fails', async () => {

    const state: string = 'state';

    // Simulate a failure when calling the repository 
    mockAddressRepository.getByState.mockRejectedValue(new Error('Repository error'));

    await expect(service.getAddressesByState(state)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get addresses by country success and failure tests */
  it('should get addresses by country', async () => {
    /** 
     * Tests the get addresses by country method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's getAddressesByCountry method is called with the correct data.
     */

    const country: string = 'country';

    const returnOject: Address[] = [new Address(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    )];

    mockAddressRepository.getByCountry.mockResolvedValue(returnOject);

    const result = await service.getAddressesByCountry(country);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getByCountry).toHaveBeenCalledWith(country);
  });

  it('should throw an error when get addresses by country method fails', async () => {

    const country: string = 'country';

    // Simulate a failure when calling the repository 
    mockAddressRepository.getByCountry.mockRejectedValue(new Error('Repository error'));

    await expect(service.getAddressesByCountry(country)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get addresses by postal code success and failure tests */
  it('should get addresses by postal code', async () => {
    /** 
     * Tests the get addresses by postal code method.
     * Verifies that the returned address matches the expected one 
     * and that the repository's getAddressesByPostalCode method is called with the correct data.
     */

    const postalCode: string = 'postalCode';

    const returnOject: Address[] = [new Address(
      1, 1, '123 Main St', 'Springfield', 'IL', '62701', 'USA',
    )];

    mockAddressRepository.getByPostalCode.mockResolvedValue(returnOject);

    const result = await service.getAddressesByPostalCode(postalCode);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getByPostalCode).toHaveBeenCalledWith(postalCode);
  });

  it('should throw an error when get addresses by postal code method fails', async () => {

    const postalCode: string = 'postalCode';

    // Simulate a failure when calling the repository 
    mockAddressRepository.getByPostalCode.mockRejectedValue(new Error('Repository error'));

    await expect(service.getAddressesByPostalCode(postalCode)).rejects.toThrow(InternalServerErrorException);

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

})
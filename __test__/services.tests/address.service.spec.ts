import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../../src/application/services/address.service';
import { IAddressRepository } from '../../src/domain/repositories/address.repository';
import { Address } from '../../src/domain/entities/address.entity';
import { AddressDTO } from '../../src/presentation/dtos/address.dto';

const mockAddressRepository = {
  createAddress: jest.fn(),
  getAddressById: jest.fn(),
  updateAddressById: jest.fn(),
  deleteAddressById: jest.fn(),
  getAddressesByUserId: jest.fn(),
  getAddressByUserIdAndId: jest.fn(),
  getAddressesByCity: jest.fn(),
  getAddressesByState: jest.fn(),
  getAddressesByCountry: jest.fn(),
  getAddressesByPostalCode: jest.fn(),
};

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: IAddressRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: 'AddressRepository',
          useValue: mockAddressRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<AddressService>(AddressService);
    addressRepository = module.get<IAddressRepository>('AddressRepository');
  });

  /* create address success and failure tests */
  it('should create address', async () => {
    /**
     * Tests the create address method.
     * Verifies that the returned address matches the expected one
     * and that the repository's createAddress method is called with the correct data.
     */

    const addressDTO: AddressDTO = {
      /* data */
    };

    const returnOject: Address = { id: 1 /* others data */ };

    mockAddressRepository.createAddress.mockResolvedValue(returnOject);

    const result = await service.createAddress(addressDTO);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.createAddress).toHaveBeenCalledWith(
      addressDTO,
    );
  });

  it('should throw an error when create address method fails', async () => {
    const addressDTO: AddressDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockAddressRepository.createAddress.mockResolvedValue(' Repository error');

    const result = await service.createAddress(addressDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get address by id success and failure tests */
  it('should get address by id', async () => {
    /**
     * Tests the get address by id method.
     * Verifies that the returned address matches the expected one
     * and that the repository's getAddressById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Address | null = { id: 1 /* others data */ };

    mockAddressRepository.getAddressById.mockResolvedValue(returnOject);

    const result = await service.getAddressById(id);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getAddressById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get address by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockAddressRepository.getAddressById.mockResolvedValue(' Repository error');

    const result = await service.getAddressById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update address by id success and failure tests */
  it('should update address by id', async () => {
    /**
     * Tests the update address by id method.
     * Verifies that the returned address matches the expected one
     * and that the repository's updateAddressById method is called with the correct data.
     */

    const id: number = 1;
    const data: Partial<AddressDTO> = {
      /* data */
    };

    const returnOject: Address = { id: 1 /* others data */ };

    mockAddressRepository.updateAddressById.mockResolvedValue(returnOject);

    const result = await service.updateAddressById(id, data);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.updateAddressById).toHaveBeenCalledWith(
      id,
      data,
    );
  });

  it('should throw an error when update address by id method fails', async () => {
    const id: number = 1;
    const data: Partial<AddressDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockAddressRepository.updateAddressById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateAddressById(id, data);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete address by id success and failure tests */
  it('should delete address by id', async () => {
    /**
     * Tests the delete address by id method.
     * Verifies that the returned address matches the expected one
     * and that the repository's deleteAddressById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockAddressRepository.deleteAddressById.mockResolvedValue(returnOject);

    const result = await service.deleteAddressById(id);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.deleteAddressById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete address by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockAddressRepository.deleteAddressById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteAddressById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get addresses by user id success and failure tests */
  it('should get addresses by user id', async () => {
    /**
     * Tests the get addresses by user id method.
     * Verifies that the returned address matches the expected one
     * and that the repository's getAddressesByUserId method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Address[] = [{ id: 1 /* others data */ }];

    mockAddressRepository.getAddressesByUserId.mockResolvedValue(returnOject);

    const result = await service.getAddressesByUserId(userId);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getAddressesByUserId).toHaveBeenCalledWith(
      userId,
    );
  });

  it('should throw an error when get addresses by user id method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockAddressRepository.getAddressesByUserId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getAddressesByUserId(userId);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: Address | null = { id: 1 /* others data */ };

    mockAddressRepository.getAddressByUserIdAndId.mockResolvedValue(
      returnOject,
    );

    const result = await service.getAddressByUserIdAndId(userId, addressId);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getAddressByUserIdAndId).toHaveBeenCalledWith(
      userId,
      addressId,
    );
  });

  it('should throw an error when get address by user id and id method fails', async () => {
    const userId: number = 1;
    const addressId: number = 1;

    // Simulate a failure when calling the repository
    mockAddressRepository.getAddressByUserIdAndId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getAddressByUserIdAndId(userId, addressId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get addresses by city success and failure tests */
  it('should get addresses by city', async () => {
    /**
     * Tests the get addresses by city method.
     * Verifies that the returned address matches the expected one
     * and that the repository's getAddressesByCity method is called with the correct data.
     */

    const city: string = 'city';

    const returnOject: Address[] = [{ id: 1 /* others data */ }];

    mockAddressRepository.getAddressesByCity.mockResolvedValue(returnOject);

    const result = await service.getAddressesByCity(city);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getAddressesByCity).toHaveBeenCalledWith(city);
  });

  it('should throw an error when get addresses by city method fails', async () => {
    const city: string = 'city';

    // Simulate a failure when calling the repository
    mockAddressRepository.getAddressesByCity.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getAddressesByCity(city);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get addresses by state success and failure tests */
  it('should get addresses by state', async () => {
    /**
     * Tests the get addresses by state method.
     * Verifies that the returned address matches the expected one
     * and that the repository's getAddressesByState method is called with the correct data.
     */

    const state: string = 'state';

    const returnOject: Address[] = [{ id: 1 /* others data */ }];

    mockAddressRepository.getAddressesByState.mockResolvedValue(returnOject);

    const result = await service.getAddressesByState(state);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getAddressesByState).toHaveBeenCalledWith(
      state,
    );
  });

  it('should throw an error when get addresses by state method fails', async () => {
    const state: string = 'state';

    // Simulate a failure when calling the repository
    mockAddressRepository.getAddressesByState.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getAddressesByState(state);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get addresses by country success and failure tests */
  it('should get addresses by country', async () => {
    /**
     * Tests the get addresses by country method.
     * Verifies that the returned address matches the expected one
     * and that the repository's getAddressesByCountry method is called with the correct data.
     */

    const country: string = 'country';

    const returnOject: Address[] = [{ id: 1 /* others data */ }];

    mockAddressRepository.getAddressesByCountry.mockResolvedValue(returnOject);

    const result = await service.getAddressesByCountry(country);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getAddressesByCountry).toHaveBeenCalledWith(
      country,
    );
  });

  it('should throw an error when get addresses by country method fails', async () => {
    const country: string = 'country';

    // Simulate a failure when calling the repository
    mockAddressRepository.getAddressesByCountry.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getAddressesByCountry(country);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get addresses by postal code success and failure tests */
  it('should get addresses by postal code', async () => {
    /**
     * Tests the get addresses by postal code method.
     * Verifies that the returned address matches the expected one
     * and that the repository's getAddressesByPostalCode method is called with the correct data.
     */

    const postalCode: string = 'postalCode';

    const returnOject: Address[] = [{ id: 1 /* others data */ }];

    mockAddressRepository.getAddressesByPostalCode.mockResolvedValue(
      returnOject,
    );

    const result = await service.getAddressesByPostalCode(postalCode);
    expect(result).toEqual(returnOject);
    expect(mockAddressRepository.getAddressesByPostalCode).toHaveBeenCalledWith(
      postalCode,
    );
  });

  it('should throw an error when get addresses by postal code method fails', async () => {
    const postalCode: string = 'postalCode';

    // Simulate a failure when calling the repository
    mockAddressRepository.getAddressesByPostalCode.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getAddressesByPostalCode(postalCode);
    expect(result).rejects.toThrow('Repository error');
  });
});

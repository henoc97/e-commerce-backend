import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../../../src/application/services/address.service';
import { ListAddressesByCity } from '../../../src/application/use-cases/address.use-cases/list-addresses-by-city.use-case';
import { AddressDTO } from '../../../src/presentation/dtos/address.dto';
import { toAddressDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the ListAddressesByCity use case.
 * This test covers the initialization and behavior of the ListAddressesByCity class.
 * It mocks the AddressService service and verifies that the use case handles the business logic as expected.
 */
describe('ListAddressesByCity', () => {
  let listAddressesByCity: ListAddressesByCity;
  let addressService: AddressService;

  // Mock implementation of the AddressService service with jest functions
  const mockAddressService = {
    listAddressesByCity: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const city: string = 'city';

  // Mock version of  to be used as input and expected output
  const mockAddressDTO: AddressDTO = {
    // TODO: Fill in your AddressDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListAddressesByCity,
        {
          provide: AddressService,
          useValue: mockAddressService,
        },
      ],
    }).compile();

    listAddressesByCity = module.get<ListAddressesByCity>(ListAddressesByCity);
    addressService = module.get<AddressService>(AddressService);
  });

  /**
   * After each test, clear all jest mocks.
   * This ensures no interference between tests and guarantees a clean test environment.
   */
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test case to verify that the use case executes successfully and returns a DTO.
   * This test ensures that the service method is called correctly and that the result is processed by 	o.
   */
  it('should create and return an address DTO', async () => {
    // Mock service returning the expected DTO
    mockAddressService.listAddressesByCity.mockResolvedValue(mockAddressDTO);
    (toAddressDTO as jest.Mock).mockReturnValue(mockAddressDTO);

    // Execute the use case with provided parameters
    const result = await listAddressesByCity.execute(city);

    // Verify that the service was called with the expected arguments
    expect(mockAddressService.listAddressesByCity).toHaveBeenCalledWith(city);

    // Verify that the transformation to DTO was called with the service result
    expect(toAddressDTO).toHaveBeenCalledWith(mockAddressDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockAddressDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when listAddressesByCity execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockAddressService.listAddressesByCity.mockRejectedValue(
      'Service method error',
    );

    // Verify that the use case throws an error when service method fails
    await expect(listAddressesByCity.execute(city)).rejects.toThrow(
      'Service method error',
    );
  });
});

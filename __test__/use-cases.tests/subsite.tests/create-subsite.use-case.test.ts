import { Test, TestingModule } from '@nestjs/testing';
import { SubsiteService } from '../../../src/application/services/subsite.service';
import { CreateSubsite } from '../../../src/application/use-cases/subsite.use-cases/create-subsite.use-case';
import { SubsiteDTO } from '../../../src/presentation/dtos/subsite.dto';
import { toSubsiteDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the CreateSubsite use case.
 * This test covers the initialization and behavior of the CreateSubsite class.
 * It mocks the SubsiteService service and verifies that the use case handles the business logic as expected.
 */
describe('CreateSubsite', () => {
  let createSubsite: CreateSubsite;
  let subsiteService: SubsiteService;

  // Mock implementation of the SubsiteService service with jest functions
  const mockSubsiteService = {
    createSubsite: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const subsiteDTO: SubsiteDTO = { /* data */ };

  // Mock version of  to be used as input and expected output
  const mockSubsiteDTO: SubsiteDTO = {
    // TODO: Fill in your SubsiteDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSubsite,
        {
          provide: SubsiteService,
          useValue: mockSubsiteService,
        },
      ],
    }).compile();

    createSubsite = module.get<CreateSubsite>(CreateSubsite);
    subsiteService = module.get<SubsiteService>(SubsiteService);
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
    mockSubsiteService.createSubsite.mockResolvedValue(mockSubsiteDTO);
    (toSubsiteDTO as jest.Mock).mockReturnValue(mockSubsiteDTO);

    // Execute the use case with provided parameters
    const result = await createSubsite.execute(subsiteDTO);

    // Verify that the service was called with the expected arguments
    expect(mockSubsiteService.createSubsite).toHaveBeenCalledWith(subsiteDTO);

    // Verify that the transformation to DTO was called with the service result
    expect(toSubsiteDTO).toHaveBeenCalledWith(mockSubsiteDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockSubsiteDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when createSubsite execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockSubsiteService.createSubsite.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(createSubsite.execute(subsiteDTO)).rejects.toThrow('Service method error');
  });
});

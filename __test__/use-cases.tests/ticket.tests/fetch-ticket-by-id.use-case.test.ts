import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from '../../../src/application/services/ticket.service';
import { FetchTicketById } from '../../../src/application/use-cases/ticket.use-cases/fetch-ticket-by-id.use-case';
import { TicketDTO } from '../../../src/presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the FetchTicketById use case.
 * This test covers the initialization and behavior of the FetchTicketById class.
 * It mocks the TicketService service and verifies that the use case handles the business logic as expected.
 */
describe('FetchTicketById', () => {
  let fetchTicketById: FetchTicketById;
  let ticketService: TicketService;

  // Mock implementation of the TicketService service with jest functions
  const mockTicketService = {
    fetchTicketById: jest.fn(),
  };

  // Define parameters for the use case to be used during testing

  const id: number = 1;

  // Mock version of  to be used as input and expected output
  const mockTicketDTO: TicketDTO = {
    // TODO: Fill in your TicketDTO properties
  };

  /**
   * Before each test, initialize the module and mock dependencies.
   * This ensures each test runs in isolation and has fresh instances of use case and service.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FetchTicketById,
        {
          provide: TicketService,
          useValue: mockTicketService,
        },
      ],
    }).compile();

    fetchTicketById = module.get<FetchTicketById>(FetchTicketById);
    ticketService = module.get<TicketService>(TicketService);
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
    mockTicketService.fetchTicketById.mockResolvedValue(mockTicketDTO);
    (toTicketDTO as jest.Mock).mockReturnValue(mockTicketDTO);

    // Execute the use case with provided parameters
    const result = await fetchTicketById.execute(id);

    // Verify that the service was called with the expected arguments
    expect(mockTicketService.fetchTicketById).toHaveBeenCalledWith(id);

    // Verify that the transformation to DTO was called with the service result
    expect(toTicketDTO).toHaveBeenCalledWith(mockTicketDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockTicketDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when fetchTicketById execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockTicketService.fetchTicketById.mockRejectedValue('Service method error');

    // Verify that the use case throws an error when service method fails
    await expect(fetchTicketById.execute(id)).rejects.toThrow(
      'Service method error',
    );
  });
});

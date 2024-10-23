import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from '../../../src/application/services/ticket.service';
import { ListTicketsByStatus } from '../../../src/application/use-cases/ticket.use-cases/list-tickets-by-status.use-case';
import { TicketDTO } from '../../../src/presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the ListTicketsByStatus use case.
 * This test covers the initialization and behavior of the ListTicketsByStatus class.
 * It mocks the TicketService service and verifies that the use case handles the business logic as expected.
 */
describe('ListTicketsByStatus', () => {
  let listTicketsByStatus: ListTicketsByStatus;
  let ticketService: TicketService;

  // Mock implementation of the TicketService service with jest functions
  const mockTicketService = {
    listTicketsByStatus: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  
     const status: TicketStatus = { /* data */ };

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
        ListTicketsByStatus,
        {
          provide: TicketService,
          useValue: mockTicketService,
        },
      ],
    }).compile();

    listTicketsByStatus = module.get<ListTicketsByStatus>(ListTicketsByStatus);
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
    mockTicketService.listTicketsByStatus.mockResolvedValue(mockTicketDTO);
    (toTicketDTO as jest.Mock).mockReturnValue(mockTicketDTO);

    // Execute the use case with provided parameters
    const result = await listTicketsByStatus.execute(status);

    // Verify that the service was called with the expected arguments
    expect(mockTicketService.listTicketsByStatus).toHaveBeenCalledWith(status);

    // Verify that the transformation to DTO was called with the service result
    expect(toTicketDTO).toHaveBeenCalledWith(mockTicketDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockTicketDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when listTicketsByStatus execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockTicketService.listTicketsByStatus.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(listTicketsByStatus.execute(status)).rejects.toThrow('Service method error');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from '../../../src/application/services/ticket.service';
import { ListHighPriorityTickets } from '../../../src/application/use-cases/ticket.use-cases/list-high-priority-tickets.use-case';
import { TicketDTO } from '../../../src/presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../src/application/helper/to-dto/to.address.dto';

/**
 * Test suite for the ListHighPriorityTickets use case.
 * This test covers the initialization and behavior of the ListHighPriorityTickets class.
 * It mocks the TicketService service and verifies that the use case handles the business logic as expected.
 */
describe('ListHighPriorityTickets', () => {
  let listHighPriorityTickets: ListHighPriorityTickets;
  let ticketService: TicketService;

  // Mock implementation of the TicketService service with jest functions
  const mockTicketService = {
    listHighPriorityTickets: jest.fn(),
  };

  // Define parameters for the use case to be used during testing
  

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
        ListHighPriorityTickets,
        {
          provide: TicketService,
          useValue: mockTicketService,
        },
      ],
    }).compile();

    listHighPriorityTickets = module.get<ListHighPriorityTickets>(ListHighPriorityTickets);
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
    mockTicketService.listHighPriorityTickets.mockResolvedValue(mockTicketDTO);
    (toTicketDTO as jest.Mock).mockReturnValue(mockTicketDTO);

    // Execute the use case with provided parameters
    const result = await listHighPriorityTickets.execute();

    // Verify that the service was called with the expected arguments
    expect(mockTicketService.listHighPriorityTickets).toHaveBeenCalledWith();

    // Verify that the transformation to DTO was called with the service result
    expect(toTicketDTO).toHaveBeenCalledWith(mockTicketDTO);

    // Ensure the result matches the expected DTO
    expect(result).toEqual(mockTicketDTO);
  });

  /**
   * Test case to verify that the use case throws an error when the service method fails.
   * This test ensures proper error handling when the service rejects the promise.
   */
  it('should throw an error when listHighPriorityTickets execute method fails', async () => {
    // Simulate a failure when calling the service method
    mockTicketService.listHighPriorityTickets.mockRejectedValue("Service method error");

    // Verify that the use case throws an error when service method fails
    await expect(listHighPriorityTickets.execute()).rejects.toThrow('Service method error');
  });
});

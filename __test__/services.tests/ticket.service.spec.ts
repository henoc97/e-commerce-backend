import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from '../../src/application/services/ticket.service';
import { ITicketRepository } from '../../src/domain/repositories/ticket.repository';
import { Ticket } from '../../src/domain/entities/ticket.entity';
import { TicketDTO } from '../../src/presentation/dtos/ticket.dto';

const mockTicketRepository = {
  createTicket: jest.fn(),
  getTicketById: jest.fn(),
  updateTicket: jest.fn(),
  deleteTicket: jest.fn(),
  getTicketsByUser: jest.fn(),
  getTicketsByStatus: jest.fn(),
  getTicketsByDateRange: jest.fn(),
  getLatestTicket: jest.fn(),
  countOpenTicketsByUser: jest.fn(),
  getHighPriorityTickets: jest.fn(),
  closeTicket: jest.fn(),
};

describe('TicketService', () => {
  let service: TicketService;
  let ticketRepository: ITicketRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: 'TicketRepository',
          useValue: mockTicketRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<TicketService>(TicketService);
    ticketRepository = module.get<ITicketRepository>('TicketRepository');
  });

  /* create ticket success and failure tests */
  it('should create ticket', async () => {
    /**
     * Tests the create ticket method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's createTicket method is called with the correct data.
     */

    const ticketDTO: TicketDTO = {
      /* data */
    };

    const returnOject: Ticket = { id: 1 /* others data */ };

    mockTicketRepository.createTicket.mockResolvedValue(returnOject);

    const result = await service.createTicket(ticketDTO);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.createTicket).toHaveBeenCalledWith(ticketDTO);
  });

  it('should throw an error when create ticket method fails', async () => {
    const ticketDTO: TicketDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockTicketRepository.createTicket.mockResolvedValue(' Repository error');

    const result = await service.createTicket(ticketDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get ticket by id success and failure tests */
  it('should get ticket by id', async () => {
    /**
     * Tests the get ticket by id method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's getTicketById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Ticket | null = { id: 1 /* others data */ };

    mockTicketRepository.getTicketById.mockResolvedValue(returnOject);

    const result = await service.getTicketById(id);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getTicketById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get ticket by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockTicketRepository.getTicketById.mockResolvedValue(' Repository error');

    const result = await service.getTicketById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update ticket success and failure tests */
  it('should update ticket', async () => {
    /**
     * Tests the update ticket method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's updateTicket method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<TicketDTO> = {
      /* data */
    };

    const returnOject: Ticket = { id: 1 /* others data */ };

    mockTicketRepository.updateTicket.mockResolvedValue(returnOject);

    const result = await service.updateTicket(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.updateTicket).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update ticket method fails', async () => {
    const id: number = 1;
    const updates: Partial<TicketDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockTicketRepository.updateTicket.mockResolvedValue(' Repository error');

    const result = await service.updateTicket(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete ticket success and failure tests */
  it('should delete ticket', async () => {
    /**
     * Tests the delete ticket method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's deleteTicket method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockTicketRepository.deleteTicket.mockResolvedValue(returnOject);

    const result = await service.deleteTicket(id);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.deleteTicket).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete ticket method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockTicketRepository.deleteTicket.mockResolvedValue(' Repository error');

    const result = await service.deleteTicket(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get tickets by user success and failure tests */
  it('should get tickets by user', async () => {
    /**
     * Tests the get tickets by user method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's getTicketsByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Ticket[] = [{ id: 1 /* others data */ }];

    mockTicketRepository.getTicketsByUser.mockResolvedValue(returnOject);

    const result = await service.getTicketsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getTicketsByUser).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get tickets by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockTicketRepository.getTicketsByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getTicketsByUser(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get tickets by status success and failure tests */
  it('should get tickets by status', async () => {
    /**
     * Tests the get tickets by status method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's getTicketsByStatus method is called with the correct data.
     */

    const status: TicketStatus = {
      /* data */
    };

    const returnOject: Ticket[] = [{ id: 1 /* others data */ }];

    mockTicketRepository.getTicketsByStatus.mockResolvedValue(returnOject);

    const result = await service.getTicketsByStatus(status);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getTicketsByStatus).toHaveBeenCalledWith(
      status,
    );
  });

  it('should throw an error when get tickets by status method fails', async () => {
    const status: TicketStatus = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockTicketRepository.getTicketsByStatus.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getTicketsByStatus(status);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get tickets by date range success and failure tests */
  it('should get tickets by date range', async () => {
    /**
     * Tests the get tickets by date range method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's getTicketsByDateRange method is called with the correct data.
     */

    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    const returnOject: Ticket[] = [{ id: 1 /* others data */ }];

    mockTicketRepository.getTicketsByDateRange.mockResolvedValue(returnOject);

    const result = await service.getTicketsByDateRange(startDate, endDate);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getTicketsByDateRange).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });

  it('should throw an error when get tickets by date range method fails', async () => {
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockTicketRepository.getTicketsByDateRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getTicketsByDateRange(startDate, endDate);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get latest ticket success and failure tests */
  it('should get latest ticket', async () => {
    /**
     * Tests the get latest ticket method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's getLatestTicket method is called with the correct data.
     */

    const returnOject: Ticket = { id: 1 /* others data */ };

    mockTicketRepository.getLatestTicket.mockResolvedValue(returnOject);

    const result = await service.getLatestTicket();
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getLatestTicket).toHaveBeenCalledWith();
  });

  it('should throw an error when get latest ticket method fails', async () => {
    // Simulate a failure when calling the repository
    mockTicketRepository.getLatestTicket.mockResolvedValue(' Repository error');

    const result = await service.getLatestTicket();
    expect(result).rejects.toThrow('Repository error');
  });

  /* count open tickets by user success and failure tests */
  it('should count open tickets by user', async () => {
    /**
     * Tests the count open tickets by user method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's countOpenTicketsByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: number = 1;

    mockTicketRepository.countOpenTicketsByUser.mockResolvedValue(returnOject);

    const result = await service.countOpenTicketsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.countOpenTicketsByUser).toHaveBeenCalledWith(
      userId,
    );
  });

  it('should throw an error when count open tickets by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockTicketRepository.countOpenTicketsByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.countOpenTicketsByUser(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get high priority tickets success and failure tests */
  it('should get high priority tickets', async () => {
    /**
     * Tests the get high priority tickets method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's getHighPriorityTickets method is called with the correct data.
     */

    const returnOject: Ticket[] = [{ id: 1 /* others data */ }];

    mockTicketRepository.getHighPriorityTickets.mockResolvedValue(returnOject);

    const result = await service.getHighPriorityTickets();
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getHighPriorityTickets).toHaveBeenCalledWith();
  });

  it('should throw an error when get high priority tickets method fails', async () => {
    // Simulate a failure when calling the repository
    mockTicketRepository.getHighPriorityTickets.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getHighPriorityTickets();
    expect(result).rejects.toThrow('Repository error');
  });

  /* close ticket success and failure tests */
  it('should close ticket', async () => {
    /**
     * Tests the close ticket method.
     * Verifies that the returned ticket matches the expected one
     * and that the repository's closeTicket method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Ticket = { id: 1 /* others data */ };

    mockTicketRepository.closeTicket.mockResolvedValue(returnOject);

    const result = await service.closeTicket(id);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.closeTicket).toHaveBeenCalledWith(id);
  });

  it('should throw an error when close ticket method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockTicketRepository.closeTicket.mockResolvedValue(' Repository error');

    const result = await service.closeTicket(id);
    expect(result).rejects.toThrow('Repository error');
  });
});

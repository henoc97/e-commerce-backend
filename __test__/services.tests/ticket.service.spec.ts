import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from '../../src/application/services/ticket.service';
import { ITicketRepository } from '../../src/domain/repositories/ticket.repository';
import { Ticket } from '../../src/domain/entities/ticket.entity';
import { TicketDTO } from '../../src/presentation/dtos/ticket.dto';


const mockTicketRepository = {
  create: jest.fn(),
getById: jest.fn(),
update: jest.fn(),
remove: jest.fn(),
getByUser: jest.fn(),
getByStatus: jest.fn(),
getByDateRange: jest.fn(),
getLatest: jest.fn(),
countOpenByUser: jest.fn(),
getHighPriority: jest.fn(),
closeTicket: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('TicketService', () => {
    let service: TicketService;
    let ticketRepository: ITicketRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: 'ITicketRepository',
          useValue: mockTicketRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<TicketService>(TicketService);
    ticketRepository = module.get<ITicketRepository>('ITicketRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create ticket success and failure tests */
it('should create ticket', async () => {
    /** 
     * Tests the create ticket method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's createTicket method is called with the correct data.
     */
    
     const ticketDTO: TicketDTO = { /* data */ };

    const returnOject: Ticket = { id: 1, /* others data */ };
    
    mockTicketRepository.create.mockResolvedValue(returnOject);

    const result = await service.createTicket(ticketDTO);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.create).toHaveBeenCalledWith(ticketDTO);
});

it('should throw an error when create ticket method fails', async () => {
    
     const ticketDTO: TicketDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createTicket(ticketDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get ticket by id success and failure tests */
it('should get ticket by id', async () => {
    /** 
     * Tests the get ticket by id method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's getTicketById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Ticket | null = { id: 1, /* others data */ };
    
    mockTicketRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getTicketById(id);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get ticket by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getTicketById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update ticket success and failure tests */
it('should update ticket', async () => {
    /** 
     * Tests the update ticket method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's updateTicket method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<TicketDTO> = { /* data */ };

    const returnOject: Ticket = { id: 1, /* others data */ };
    
    mockTicketRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateTicket(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.update).toHaveBeenCalledWith(id, updates);
});

it('should throw an error when update ticket method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<TicketDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateTicket(id, updates)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete ticket success and failure tests */
it('should delete ticket', async () => {
    /** 
     * Tests the delete ticket method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's deleteTicket method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockTicketRepository.remove.mockResolvedValue(returnOject);

    const result = await service.deleteTicket(id);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.remove).toHaveBeenCalledWith(id);
});

it('should throw an error when delete ticket method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.remove.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteTicket(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get tickets by user success and failure tests */
it('should get tickets by user', async () => {
    /** 
     * Tests the get tickets by user method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's getTicketsByUser method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Ticket[] = [{ id: 1, /* others data */ }];
    
    mockTicketRepository.getByUser.mockResolvedValue(returnOject);

    const result = await service.getTicketsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getByUser).toHaveBeenCalledWith(userId);
});

it('should throw an error when get tickets by user method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.getByUser.mockRejectedValue(new Error('Repository error'));

    await expect(service.getTicketsByUser(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get tickets by status success and failure tests */
it('should get tickets by status', async () => {
    /** 
     * Tests the get tickets by status method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's getTicketsByStatus method is called with the correct data.
     */
    
     const status: TicketStatus = { /* data */ };

    const returnOject: Ticket[] = [{ id: 1, /* others data */ }];
    
    mockTicketRepository.getByStatus.mockResolvedValue(returnOject);

    const result = await service.getTicketsByStatus(status);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getByStatus).toHaveBeenCalledWith(status);
});

it('should throw an error when get tickets by status method fails', async () => {
    
     const status: TicketStatus = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.getByStatus.mockRejectedValue(new Error('Repository error'));

    await expect(service.getTicketsByStatus(status)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get tickets by date range success and failure tests */
it('should get tickets by date range', async () => {
    /** 
     * Tests the get tickets by date range method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's getTicketsByDateRange method is called with the correct data.
     */
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };

    const returnOject: Ticket[] = [{ id: 1, /* others data */ }];
    
    mockTicketRepository.getByDateRange.mockResolvedValue(returnOject);

    const result = await service.getTicketsByDateRange(startDate,
    endDate,);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getByDateRange).toHaveBeenCalledWith(startDate,
    endDate,);
});

it('should throw an error when get tickets by date range method fails', async () => {
    
     const startDate: Date = { /* data */ };
     const endDate: Date = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.getByDateRange.mockRejectedValue(new Error('Repository error'));

    await expect(service.getTicketsByDateRange(startDate,
    endDate,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get latest ticket success and failure tests */
it('should get latest ticket', async () => {
    /** 
     * Tests the get latest ticket method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's getLatestTicket method is called with the correct data.
     */
    

    const returnOject: Ticket = { id: 1, /* others data */ };
    
    mockTicketRepository.getLatest.mockResolvedValue(returnOject);

    const result = await service.getLatestTicket();
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getLatest).toHaveBeenCalledWith();
});

it('should throw an error when get latest ticket method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.getLatest.mockRejectedValue(new Error('Repository error'));

    await expect(service.getLatestTicket()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* count open tickets by user success and failure tests */
it('should count open tickets by user', async () => {
    /** 
     * Tests the count open tickets by user method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's countOpenTicketsByUser method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: number = 1
    
    mockTicketRepository.countOpenByUser.mockResolvedValue(returnOject);

    const result = await service.countOpenTicketsByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.countOpenByUser).toHaveBeenCalledWith(userId);
});

it('should throw an error when count open tickets by user method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.countOpenByUser.mockRejectedValue(new Error('Repository error'));

    await expect(service.countOpenTicketsByUser(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get high priority tickets success and failure tests */
it('should get high priority tickets', async () => {
    /** 
     * Tests the get high priority tickets method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's getHighPriorityTickets method is called with the correct data.
     */
    

    const returnOject: Ticket[] = [{ id: 1, /* others data */ }];
    
    mockTicketRepository.getHighPriority.mockResolvedValue(returnOject);

    const result = await service.getHighPriorityTickets();
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.getHighPriority).toHaveBeenCalledWith();
});

it('should throw an error when get high priority tickets method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.getHighPriority.mockRejectedValue(new Error('Repository error'));

    await expect(service.getHighPriorityTickets()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* close ticket success and failure tests */
it('should close ticket', async () => {
    /** 
     * Tests the close ticket method.
     * Verifies that the returned ticket matches the expected one 
     * and that the repository's closeTicket method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Ticket = { id: 1, /* others data */ };
    
    mockTicketRepository.closeTicket.mockResolvedValue(returnOject);

    const result = await service.closeTicket(id);
    expect(result).toEqual(returnOject);
    expect(mockTicketRepository.closeTicket).toHaveBeenCalledWith(id);
});

it('should throw an error when close ticket method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockTicketRepository.closeTicket.mockRejectedValue(new Error('Repository error'));

    await expect(service.closeTicket(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

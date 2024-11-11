import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CreateTicket } from 'src/application/use-cases/ticket.use-cases/create-ticket.use-case';
import { CloseTicket } from 'src/application/use-cases/ticket.use-cases/close-ticket.use-case';
import { FetchTicketById } from 'src/application/use-cases/ticket.use-cases/fetch-ticket-by-id.use-case';
import { ListTicketsByUser } from 'src/application/use-cases/ticket.use-cases/list-tickets-by-user.use-case';
import { DeleteTicket } from 'src/application/use-cases/ticket.use-cases/delete-ticket.use-case';
import { FetchLatestTicket } from 'src/application/use-cases/ticket.use-cases/fetch-latest-ticket.use-case';
import { ListHighPriorityTickets } from 'src/application/use-cases/ticket.use-cases/list-high-priority-tickets.use-case';
import { ListTicketsByDateRange } from 'src/application/use-cases/ticket.use-cases/list-tickets-by-date-range.use-case';
import { ListTicketsByStatus } from 'src/application/use-cases/ticket.use-cases/list-tickets-by-status.use-case';
import { UpdateTicket } from 'src/application/use-cases/ticket.use-cases/update-ticket.use-case';
import { TicketDTO } from 'src/presentation/dtos/ticket.dto';
import { TicketStatus } from 'src/domain/enums/ticket-status.enum';
import { CountOpenTicketsByUser } from 'src/application/use-cases/ticket.use-cases/count-open-tickets-by-user.use-case';

@Resolver(() => TicketDTO)
export class TicketResolver {
  constructor(
    private readonly createTicketUseCase: CreateTicket,
    private readonly closeTicketUseCase: CloseTicket,
    private readonly fetchTicketByIdUseCase: FetchTicketById,
    private readonly listTicketsByUserUseCase: ListTicketsByUser,
    private readonly deleteTicketUseCase: DeleteTicket,
    private readonly fetchLatestTicketUseCase: FetchLatestTicket,
    private readonly listHighPriorityTicketsUseCase: ListHighPriorityTickets,
    private readonly listTicketsByDateRangeUseCase: ListTicketsByDateRange,
    private readonly listTicketsByStatusUseCase: ListTicketsByStatus,
    private readonly updateTicketUseCase: UpdateTicket,
    private readonly countOpenTicketsByUserUseCase: CountOpenTicketsByUser,
  ) { }

  @Mutation(() => TicketDTO, { nullable: true })
  async createTicket(
    @Args('ticketDTO') ticketDTO: TicketDTO,
  ): Promise<TicketDTO | null> {
    return this.createTicketUseCase.execute(ticketDTO);
  }

  @Mutation(() => TicketDTO, { nullable: true })
  async closeTicket(@Args('id') id: number): Promise<TicketDTO | null> {
    return this.closeTicketUseCase.execute(id);
  }

  @Query(() => TicketDTO, { nullable: true })
  async fetchTicketById(@Args('id') id: number): Promise<TicketDTO | null> {
    return this.fetchTicketByIdUseCase.execute(id);
  }

  @Query(() => [TicketDTO])
  async listTicketsByUser(
    @Args('userId') userId: number,
  ): Promise<TicketDTO[]> {
    return this.listTicketsByUserUseCase.execute(userId);
  }

  @Mutation(() => Boolean)
  async deleteTicket(@Args('id') id: number): Promise<boolean> {
    return this.deleteTicketUseCase.execute(id);
  }

  @Query(() => TicketDTO, { nullable: true })
  async fetchLatestTicket(): Promise<TicketDTO | null> {
    return this.fetchLatestTicketUseCase.execute();
  }

  @Query(() => [TicketDTO])
  async listHighPriorityTickets(): Promise<TicketDTO[]> {
    return this.listHighPriorityTicketsUseCase.execute();
  }

  @Query(() => [TicketDTO])
  async listTicketsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<TicketDTO[]> {
    return this.listTicketsByDateRangeUseCase.execute(startDate, endDate);
  }

  @Query(() => [TicketDTO])
  async listTicketsByStatus(
    @Args('status') status: TicketStatus,
  ): Promise<TicketDTO[]> {
    return this.listTicketsByStatusUseCase.execute(status);
  }

  @Mutation(() => TicketDTO, { nullable: true })
  async updateTicket(
    @Args('id') id: number,
    @Args('updates') updates: TicketDTO,
  ): Promise<TicketDTO | null> {
    return this.updateTicketUseCase.execute(id, updates);
  }

  @Query(() => Number)
  async countOpenTicketsByUser(
    @Args('userId') userId: number,
  ): Promise<number> {
    return this.countOpenTicketsByUserUseCase.execute(userId);
  }
}

import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CreateTicket } from '../../../application/use-cases/ticket.use-cases/create-ticket.use-case';
import { CloseTicket } from '../../../application/use-cases/ticket.use-cases/close-ticket.use-case';
import { FetchTicketById } from '../../../application/use-cases/ticket.use-cases/fetch-ticket-by-id.use-case';
import { ListTicketsByUser } from '../../../application/use-cases/ticket.use-cases/list-tickets-by-user.use-case';
import { DeleteTicket } from '../../../application/use-cases/ticket.use-cases/delete-ticket.use-case';
import { FetchLatestTicket } from '../../../application/use-cases/ticket.use-cases/fetch-latest-ticket.use-case';
import { ListHighPriorityTickets } from '../../../application/use-cases/ticket.use-cases/list-high-priority-tickets.use-case';
import { ListTicketsByDateRange } from '../../../application/use-cases/ticket.use-cases/list-tickets-by-date-range.use-case';
import { ListTicketsByStatus } from '../../../application/use-cases/ticket.use-cases/list-tickets-by-status.use-case';
import { UpdateTicket } from '../../../application/use-cases/ticket.use-cases/update-ticket.use-case';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { TicketStatus } from '../../../domain/enums/ticket-status.enum';
import { CountOpenTicketsByUser } from '../../../application/use-cases/ticket.use-cases/count-open-tickets-by-user.use-case';
import { transformTicketDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { TicketOutput } from '../../../presentation/output/ticket.output';
import { TicketInput } from '../../../presentation/input/ticket.input';
import { toTicketDTO } from '../../../application/helper/to-dto/to.ticket.dto';

@Resolver(() => TicketOutput)
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

  @Mutation(() => TicketOutput, { nullable: true })
  async createTicket(
    @Args('ticket') ticket: TicketInput,
  ): Promise<TicketOutput | null> {
    const dto = toTicketDTO(ticket)
    const result = await this.createTicketUseCase.execute(dto);
    return transformTicketDTOToGraphQL(result);
  }

  @Mutation(() => TicketOutput, { nullable: true })
  async closeTicket(@Args('id') id: number): Promise<TicketOutput | null> {
    const result = await this.closeTicketUseCase.execute(id);
    return transformTicketDTOToGraphQL(result);
  }

  @Query(() => TicketOutput, { nullable: true })
  async fetchTicketById(@Args('id') id: number): Promise<TicketOutput | null> {
    const result = await this.fetchTicketByIdUseCase.execute(id);
    return transformTicketDTOToGraphQL(result);
  }

  @Query(() => [TicketOutput])
  async listTicketsByUser(
    @Args('userId') userId: number,
  ): Promise<TicketOutput[]> {
    const result = await this.listTicketsByUserUseCase.execute(userId);
    return result?.map(transformTicketDTOToGraphQL)
  }

  @Mutation(() => Boolean)
  async deleteTicket(@Args('id') id: number): Promise<boolean> {
    return this.deleteTicketUseCase.execute(id);
  }

  @Query(() => TicketOutput, { nullable: true })
  async fetchLatestTicket(): Promise<TicketOutput | null> {
    const result = await this.fetchLatestTicketUseCase.execute();
    return transformTicketDTOToGraphQL(result);
  }

  @Query(() => [TicketOutput])
  async listHighPriorityTickets(): Promise<TicketOutput[]> {
    const result = await this.listHighPriorityTicketsUseCase.execute();
    return result?.map(transformTicketDTOToGraphQL)
  }

  @Query(() => [TicketOutput])
  async listTicketsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<TicketOutput[]> {
    const result = await this.listTicketsByDateRangeUseCase.execute(startDate, endDate);
    return result?.map(transformTicketDTOToGraphQL)
  }

  @Query(() => [TicketOutput])
  async listTicketsByStatus(
    @Args('status') status: TicketStatus,
  ): Promise<TicketOutput[]> {
    const result = await this.listTicketsByStatusUseCase.execute(status);
    return result?.map(transformTicketDTOToGraphQL)
  }

  @Mutation(() => TicketOutput, { nullable: true })
  async updateTicket(
    @Args('id') id: number,
    @Args('updates') updates: TicketInput,
  ): Promise<TicketOutput | null> {
    const result = await this.updateTicketUseCase.execute(id, updates);
    return transformTicketDTOToGraphQL(result);
  }

  @Query(() => Number)
  async countOpenTicketsByUser(
    @Args('userId') userId: number,
  ): Promise<number> {
    return this.countOpenTicketsByUserUseCase.execute(userId);
  }
}

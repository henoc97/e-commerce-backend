import { Module } from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { TicketRepository } from '../../infrastructure/persistences/ticket.repository.impl';
import { ListTicketsByUser } from '../use-cases/ticket.use-cases/list-tickets-by-user.use-case';
import { CountOpenTicketsByUser } from '../use-cases/ticket.use-cases/count-open-tickets-by-user.use-case';
import { CreateTicket } from '../use-cases/ticket.use-cases/create-ticket.use-case';
import { UpdateTicket } from '../use-cases/ticket.use-cases/update-ticket.use-case';
import { ListHighPriorityTickets } from '../use-cases/ticket.use-cases/list-high-priority-tickets.use-case';
import { ListTicketsByStatus } from '../use-cases/ticket.use-cases/list-tickets-by-status.use-case';
import { CloseTicket } from '../use-cases/ticket.use-cases/close-ticket.use-case';
import { FetchTicketById } from '../use-cases/ticket.use-cases/fetch-ticket-by-id.use-case';
import { DeleteTicket } from '../use-cases/ticket.use-cases/delete-ticket.use-case';
import { FetchLatestTicket } from '../use-cases/ticket.use-cases/fetch-latest-ticket.use-case';
import { ListTicketsByDateRange } from '../use-cases/ticket.use-cases/list-tickets-by-date-range.use-case';

const ticketUseCases = [
  ListTicketsByUser,
  CountOpenTicketsByUser,
  CreateTicket,
  UpdateTicket,
  ListHighPriorityTickets,
  ListTicketsByStatus,
  CloseTicket,
  FetchTicketById,
  DeleteTicket,
  FetchLatestTicket,
  ListTicketsByDateRange,
];

@Module({
  providers: [
    TicketService,

    {
      provide: 'ITicketRepository',
      useClass: TicketRepository,
    },
    ...ticketUseCases,
  ],
  exports: [TicketService, ...ticketUseCases],
})
export class TicketModule { }

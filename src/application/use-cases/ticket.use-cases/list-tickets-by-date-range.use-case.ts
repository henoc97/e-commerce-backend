import { Injectable } from '@nestjs/common';
import { TicketService } from '../../../application/services/ticket.service';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for listing tickets by date range.
 * This class interacts with the Ticket service to retrieve tickets created within a specific date range.
 */
@Injectable()
export class ListTicketsByDateRange {
  constructor(private readonly ticketService: TicketService) { }

  /**
   * Execute the list-tickets-by-date-range use case.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns An array of TicketDTOs created within the specified date range.
   */
  async execute(startDate: Date, endDate: Date): Promise<TicketDTO[]> {
    const tickets = await this.ticketService.getTicketsByDateRange(
      startDate,
      endDate,
    );

    return tickets?.map(toTicketDTO);
  }
}

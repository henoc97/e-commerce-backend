import { Module } from '@nestjs/common';
import { TicketService } from '../services/ticket.service';
import { TicketRepository } from 'src/infrastructure/persistences/ticket.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    TicketService,
    PrismaService,
    {
      provide: 'ITicketRepository',
      useClass: TicketRepository,
    },
  ],
  exports: [TicketService],
})
export class TicketModule {}


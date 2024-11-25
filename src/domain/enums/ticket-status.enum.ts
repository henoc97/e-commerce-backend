import { registerEnumType } from '@nestjs/graphql';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  HIGH = 'HIGH',
  CLOSED = 'CLOSED',
}

registerEnumType(TicketStatus, {
  name: 'TicketStatus', // le nom utilisé dans GraphQL
});

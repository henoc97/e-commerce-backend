import { registerEnumType } from '@nestjs/graphql';

export enum RefundStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(RefundStatus, {
  name: 'RefundStatus', // le nom utilisé dans GraphQL
});

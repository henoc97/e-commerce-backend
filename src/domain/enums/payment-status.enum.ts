import { registerEnumType } from '@nestjs/graphql';

export enum PaymentStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus', // le nom utilisé dans GraphQL
});
import { registerEnumType } from '@nestjs/graphql';

export enum NotificationType {
  PROMOTION = 'PROMOTION',
  ORDER_UPDATE = 'ORDER_UPDATE',
  INFO = 'INFO',
  WARNING = 'WARNING',
}

registerEnumType(NotificationType, {
  name: 'NotificationType', // le nom utilisé dans GraphQL
});
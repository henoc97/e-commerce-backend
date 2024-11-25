import { registerEnumType } from '@nestjs/graphql';

export enum AuditLogAction {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

registerEnumType(AuditLogAction, {
  name: 'AuditLogAction', // le nom utilisé dans GraphQL
});
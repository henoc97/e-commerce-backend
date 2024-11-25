import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}

registerEnumType(UserRole, {
  name: 'UserRole', // le nom utilisé dans GraphQL
});

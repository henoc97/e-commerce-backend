import { registerEnumType } from '@nestjs/graphql';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

registerEnumType(DiscountType, {
  name: 'DiscountType', // le nom utilisé dans GraphQL
});

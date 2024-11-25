import { registerEnumType } from '@nestjs/graphql';

export enum ShippingMethod {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS',
  OVERNIGHT = 'OVERNIGHT',
  SAME_DAY = 'SAME_DAY',
  ECONOMY = 'ECONOMY',
  TWO_DAY = 'TWO_DAY',
}

registerEnumType(ShippingMethod, {
  name: 'ShippingMethod', // le nom utilisé dans GraphQL
});
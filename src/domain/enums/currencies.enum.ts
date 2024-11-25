import { registerEnumType } from '@nestjs/graphql';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CNY = 'CNY',
  XOF = 'XOF',
  AUD = 'AUD',
  CAD = 'CAD',
  CHF = 'CHF',
  INR = 'INR',
  BRL = 'BRL',
  ZAR = 'ZAR',
}

registerEnumType(Currency, {
  name: 'Currency', // le nom utilisé dans GraphQL
});
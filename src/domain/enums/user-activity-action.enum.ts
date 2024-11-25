import { registerEnumType } from '@nestjs/graphql';

export enum UserActivityAction {
  LOGIN = 'LOGIN',
  VIEW_PRODUCT = 'VIEW_PRODUCT',
  PURCHASE = 'PURCHASE',
  LOGOUT = 'LOGOUT',
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  SEARCH = 'SEARCH',
  OTHER = 'OTHER',
}

registerEnumType(UserActivityAction, {
  name: 'UserActivityAction', // le nom utilisé dans GraphQL
});
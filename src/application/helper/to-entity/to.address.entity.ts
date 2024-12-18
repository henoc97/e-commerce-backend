﻿import { AddressDTO } from "../../../presentation/dtos/address.dto";
import { fromUserDTO } from './to.user.entity';
import { Address } from '../../../domain/entities/address.entity';

/**
 * Converts an AddressDTO to an Address entity.
 * @param addressDTO - The AddressDTO to convert.
 * @returns The corresponding Address entity.
 */
export function fromAddressDTO(
  addressDTO: AddressDTO | Partial<AddressDTO>,
): Address {
  return new Address(
    addressDTO.id,
    addressDTO.userId,
    addressDTO.street,
    addressDTO.city,
    addressDTO.state,
    addressDTO.postalCode,
    addressDTO.country,
    addressDTO.user ? fromUserDTO(addressDTO.user) : undefined,
  );
}

import { AddressDTO } from '../../../presentation/dtos/address.dto';

/**
 * Converts an Address entity to an AddressDTO.
 * @param address - The Address entity to convert.
 * @returns The corresponding AddressDTO.
 */
export function toAddressDTO(address: any): AddressDTO {
  return new AddressDTO(
    address.id,
    address.userId,
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  );
}

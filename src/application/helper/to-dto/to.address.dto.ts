import { Address } from 'src/domain/entities/address.entity';
import { AddressDTO } from 'src/presentation/dtos/address.dto';

/**
 * Converts an Address entity to an AddressDTO.
 * @param address - The Address entity to convert.
 * @returns The corresponding AddressDTO.
 */
export function toAddressDTO(address: Address): AddressDTO {
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

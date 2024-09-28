import { Address } from 'src/domain/entities/address.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts an AddressPrisma to an Address entity.
 * @param addressPrisma - The AddressPrisma to convert.
 * @returns The corresponding Address entity.
 */
export function fromAddressPrisma(addressPrisma: any): Address {
  return new Address(
    addressPrisma.id,
    addressPrisma.userId,
    addressPrisma.street,
    addressPrisma.city,
    addressPrisma.state,
    addressPrisma.postalCode,
    addressPrisma.country,
    addressPrisma.user ? fromUserPrisma(addressPrisma.user) : undefined,
  );
}

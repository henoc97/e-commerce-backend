import { PrismaClient } from '@prisma/client';
import { fromAddressDTO } from 'src/application/helper/to-entity/to.address.entity';
import { Address } from 'src/domain/entities/address.entity';
import { IAddressRepository } from 'src/domain/repositories/address.repository';

export class AddressRepository implements IAddressRepository {
  private prisma = new PrismaClient();

  async create(address: Address): Promise<Address> {
    // Exclure le champ `id` car il est généré automatiquement par Prisma
    // Adapter l'entité Address à l'entrée de création Prisma
    // const { id, user, ...addressData } = address;

    return this.prisma.address.create({
      data: {
        ...addressData, // Le reste des champs que Prisma attend
        user: { connect: { id: address.user.id } }, // Connexion avec l'utilisateur via son ID
      },
    });
  }

  async getById(id: number): Promise<Address | null> {
    const result = await this.prisma.address.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
    return fromAddressDTO(result);
  }

  async updateById(id: number, updateData: Partial<Address>): Promise<Address> {
    return this.prisma.address.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      await this.prisma.address.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      return false;
    }
  }

  async getAllByUserId(userId: number): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { userId },
    });
  }

  async getByUserIdAndId(
    userId: number,
    addressId: number,
  ): Promise<Address | null> {
    return this.prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    });
  }

  async getByCity(city: string): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { city },
    });
  }

  async getByState(state: string): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { state },
    });
  }

  async getByCountry(country: string): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { country },
    });
  }

  async getByPostalCode(postalCode: string): Promise<Address[]> {
    return this.prisma.address.findMany({
      where: { postalCode },
    });
  }
}

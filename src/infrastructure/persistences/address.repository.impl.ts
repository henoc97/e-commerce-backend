
import { PrismaClient } from '@prisma/client';
import { Address } from 'src/domain/entities/address.entity';
import { IAddressRepository } from 'src/domain/repositories/address.repository';

export class AddressRepository implements IAddressRepository {
  private prisma = new PrismaClient();

  async create(address: Address): Promise<Address> {
    return this.prisma.address.create({
      data: address,
    });
  }

  async getById(id: number): Promise<Address | null> {
    return this.prisma.address.findUnique({
      where: { id },
      include: {
        user : true,
      }
    });
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

  async getByUserIdAndId(userId: number, addressId: number): Promise<Address | null> {
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

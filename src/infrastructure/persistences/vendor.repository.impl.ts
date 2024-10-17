import { PrismaService } from 'prisma/prisma.service';
import { fromVendorPrisma } from 'src/application/helper/from-prisma/to.vendor.entity';
import { Product } from 'src/domain/entities/product.entity';
import { Shop } from 'src/domain/entities/shop.entity';
import { Subscription } from 'src/domain/entities/subscription.entity';
import { Vendor } from 'src/domain/entities/vendor.entity';
import { IVendorRepository } from 'src/domain/repositories/vendor.repository';

/**
 * Repository class for managing vendor-related data operations.
 */
export class VendorRepository implements IVendorRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new vendor.
   * @param vendor - The vendor data to create.
   * @returns Promise<Vendor> - The created vendor object.
   */
  async create(vendor: Vendor): Promise<Vendor> {
    try {
      const { id, user, products, subscription, shop, ...data } = vendor;
      const result = this.prisma.vendor.create({ data: data });
      return fromVendorPrisma(result);
    } catch (error) {
      console.error('Error creating vendor:', error);
      throw new Error('Failed to create vendor.');
    }
  }

  /**
   * Find a vendor by their ID.
   * @param id - The ID of the vendor to find.
   * @returns Promise<Vendor | null> - The found vendor or null if not found.
   */
  async findById(id: number): Promise<Vendor | null> {
    try {
      const result = this.prisma.vendor.findUnique({ where: { id } });
      return fromVendorPrisma(result);
    } catch (error) {
      console.error('Error finding vendor by ID:', error);
      throw new Error('Failed to find vendor by ID.');
    }
  }

  /**
   * Update a vendor's information.
   * @param id - The ID of the vendor to update.
   * @param data - The partial data to update.
   * @returns Promise<Vendor> - The updated vendor object.
   */
  async update(id: number, data: Partial<Vendor>): Promise<Vendor> {
    try {
      const { user, products, subscription, shop, ...updates } = data;
      const result = await this.prisma.vendor.update({
        where: { id },
        data: updates,
      });
      return fromVendorPrisma(result);
    } catch (error) {
      console.error('Error updating vendor:', error);
      throw new Error('Failed to update vendor.');
    }
  }

  /**
   * Delete a vendor by their ID.
   * @param id - The ID of the vendor to delete.
   * @returns Promise<boolean> - True if deleted successfully, otherwise false.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.vendor.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting vendor:', error);
      throw new Error('Failed to delete vendor.');
    }
  }

  /**
   * Find vendors by their store name.
   * @param storeName - The store name to search for.
   * @returns Promise<Vendor[]> - List of vendors matching the store name.
   */
  async findByStoreName(storeName: string): Promise<Vendor[]> {
    try {
      const result = await this.prisma.vendor.findMany({
        where: { storeName },
      });
      return result.map(fromVendorPrisma);
    } catch (error) {
      console.error('Error finding vendors by store name:', error);
      throw new Error('Failed to find vendors by store name.');
    }
  }

  /**
   * Add a product to a vendor's product list.
   * @param vendorId - The ID of the vendor.
   * @param product - The product to add.
   * @returns Promise<Vendor> - The updated vendor object.
   */
  async addProduct(vendorId: number, product: Product): Promise<Vendor> {
    try {
      const result = this.prisma.vendor.update({
        where: { id: vendorId },
        data: { products: { connect: { id: product.id } } },
      });
      return fromVendorPrisma(result);
    } catch (error) {
      console.error('Error adding product to vendor:', error);
      throw new Error('Failed to add product to vendor.');
    }
  }

  /**
   * Remove a product from a vendor's product list.
   * @param vendorId - The ID of the vendor.
   * @param productId - The ID of the product to remove.
   * @returns Promise<Vendor> - The updated vendor object.
   */
  async removeProduct(vendorId: number, productId: number): Promise<Vendor> {
    try {
      const result = this.prisma.vendor.update({
        where: { id: vendorId },
        data: { products: { disconnect: { id: productId } } },
      });
      return fromVendorPrisma(result);
    } catch (error) {
      console.error('Error removing product from vendor:', error);
      throw new Error('Failed to remove product from vendor.');
    }
  }

  /**
   * Set the subscription for a vendor.
   * @param vendorId - The ID of the vendor.
   * @param subscription - The subscription to set.
   * @returns Promise<Vendor> - The updated vendor object.
   */
  async setSubscription(
    vendorId: number,
    subscription: Subscription,
  ): Promise<Vendor> {
    try {
      const result = this.prisma.vendor.update({
        where: { id: vendorId },
        data: { subscription: { connect: { id: subscription.id } } },
      });
      return fromVendorPrisma(result);
    } catch (error) {
      console.error('Error setting vendor subscription:', error);
      throw new Error('Failed to set vendor subscription.');
    }
  }

  /**
   * Set the shop information for a vendor.
   * @param vendorId - The ID of the vendor.
   * @param shop - The shop data to set.
   * @returns Promise<Vendor> - The updated vendor object.
   */
  async setShop(vendorId: number, shop: Shop): Promise<Vendor> {
    try {
      const result = this.prisma.vendor.update({
        where: { id: vendorId },
        data: { shop: { connect: { id: shop.id } } },
      });
      return fromVendorPrisma(result);
    } catch (error) {
      console.error('Error setting vendor shop:', error);
      throw new Error('Failed to set vendor shop.');
    }
  }

  /**
   * Find vendors associated with a specific user.
   * @param userId - The ID of the user to find vendors for.
   * @returns Promise<Vendor[]> - List of vendors associated with the user.
   */
  async findByUser(userId: number): Promise<Vendor[]> {
    try {
      const result = await this.prisma.vendor.findMany({ where: { userId } });
      return result.map(fromVendorPrisma);
    } catch (error) {
      console.error('Error finding vendors by user:', error);
      throw new Error('Failed to find vendors by user.');
    }
  }

  /**
   * Find vendors by their subscription ID.
   * @param subscriptionId - The ID of the subscription to search for.
   * @returns Promise<Vendor[]> - List of vendors associated with the subscription.
   */
  async findBySubscription(subscriptionId: number): Promise<Vendor[]> {
    try {
      const result = await this.prisma.vendor.findMany({
        where: { subscriptionId },
      });
      return result.map(fromVendorPrisma);
    } catch (error) {
      console.error('Error finding vendors by subscription ID:', error);
      throw new Error('Failed to find vendors by subscription ID.');
    }
  }

  /**
   * Get all vendors.
   * @returns Promise<Vendor[]> - List of all vendors.
   */
  async getAll(): Promise<Vendor[]> {
    try {
      const result = await this.prisma.vendor.findMany();
      return result.map(fromVendorPrisma);
    } catch (error) {
      console.error('Error fetching all vendors:', error);
      throw new Error('Failed to fetch all vendors.');
    }
  }

}

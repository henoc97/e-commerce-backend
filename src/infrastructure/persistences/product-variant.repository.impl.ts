import { PrismaService } from 'prisma/prisma.service';
import { fromProductVariantPrisma } from 'src/application/helper/from-prisma/to.product-variant.entity';
import { ProductVariant } from 'src/domain/entities/product-variant.entity';
import { IProductVariantRepository } from 'src/domain/repositories/product-variant.repository';

export class ProductVariantRepository implements IProductVariantRepository {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * Creates a new ProductVariant in the database.
   * @param variant - The product variant to be created.
   * @returns The created ProductVariant.
   * @throws Error if creation fails.
   */
  async create(variant: ProductVariant): Promise<ProductVariant> {
    try {
      const { id, product, ...data } = variant;
      const newVariant = await this.prisma.productVariant.create({
        data: data,
      });
      return fromProductVariantPrisma(newVariant);
    } catch (error) {
      throw new Error(`Error creating product variant: ${error.message}`);
    }
  }

  /**
   * Retrieves a ProductVariant by its ID.
   * @param id - The ID of the product variant.
   * @returns The ProductVariant if found, null otherwise.
   * @throws Error if retrieval fails.
   */
  async getById(id: number): Promise<ProductVariant | null> {
    try {
      const variant = await this.prisma.productVariant.findUnique({
        where: { id },
      });
      return fromProductVariantPrisma(variant);
    } catch (error) {
      throw new Error(
        `Error retrieving product variant with ID ${id}: ${error.message}`,
      );
    }
  }

  /**
   * Updates a ProductVariant by its ID.
   * @param id - The ID of the product variant to update.
   * @param updates - The partial updates to apply.
   * @returns The updated ProductVariant.
   * @throws Error if update fails.
   */
  async update(
    id: number,
    updates: Partial<ProductVariant>,
  ): Promise<ProductVariant> {
    try {
      const { id, product, ...data } = updates;
      const updatedVariant = await this.prisma.productVariant.update({
        where: { id },
        data: data,
      });
      return fromProductVariantPrisma(updatedVariant);
    } catch (error) {
      throw new Error(
        `Error updating product variant with ID ${id}: ${error.message}`,
      );
    }
  }

  /**
   * Deletes a ProductVariant by its ID.
   * @param id - The ID of the product variant to delete.
   * @returns True if deletion was successful, false otherwise.
   * @throws Error if deletion fails.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.productVariant.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(
        `Error deleting product variant with ID ${id}: ${error.message}`,
      );
      return false;
    }
  }

  /**
   * Retrieves all variants associated with a given product.
   * @param productId - The ID of the product.
   * @returns A list of ProductVariant entities.
   * @throws Error if retrieval fails.
   */
  async getByProductId(productId: number): Promise<ProductVariant[]> {
    try {
      const variants = await this.prisma.productVariant.findMany({
        where: { productId },
      });
      return variants.map(fromProductVariantPrisma);
    } catch (error) {
      throw new Error(
        `Error retrieving variants for product with ID ${productId}: ${error.message}`,
      );
    }
  }

  /**
   * Deletes all variants associated with a given product.
   * @param productId - The ID of the product.
   * @returns True if deletion is successful, false otherwise.
   * @throws Error if deletion fails.
   */
  async deleteByProductId(productId: number): Promise<boolean> {
    try {
      await this.prisma.productVariant.deleteMany({
        where: { productId },
      });
      return true;
    } catch (error) {
      console.error(
        `Error deleting variants for product with ID ${productId}: ${error.message}`,
      );
      return true;
    }
  }

  /**
   * Checks if a variant exists by product ID, name, and value.
   * @param productId - The ID of the product.
   * @param name - The name of the variant (e.g., 'Color').
   * @param value - The value of the variant (e.g., 'Red').
   * @returns True if the variant exists, false otherwise.
   * @throws Error if existence check fails.
   */
  async exists(
    productId: number,
    name: string,
    value: string,
  ): Promise<boolean> {
    try {
      const variant = await this.prisma.productVariant.findFirst({
        where: {
          productId,
          name,
          value,
        },
      });
      return !!variant;
    } catch (error) {
      throw new Error(
        `Error checking existence of variant for product with ID ${productId}, name ${name}, and value ${value}: ${error.message}`,
      );
    }
  }

  /**
   * Updates the name or value of a ProductVariant.
   * @param id - The ID of the product variant to update.
   * @param name - The new name of the variant (optional).
   * @param value - The new value of the variant (optional).
   * @returns The updated ProductVariant.
   * @throws Error if update fails.
   */
  async updateDetails(
    id: number,
    name?: string,
    value?: string,
  ): Promise<ProductVariant> {
    try {
      const updatedVariant = await this.prisma.productVariant.update({
        where: { id },
        data: {
          name: name ? name : undefined,
          value: value ? value : undefined,
        },
      });
      return fromProductVariantPrisma(updatedVariant);
    } catch (error) {
      throw new Error(
        `Error updating details of variant with ID ${id}: ${error.message}`,
      );
    }
  }

  /**
   * Retrieves all variants with a specific name for a given product.
   * @param productId - The ID of the product.
   * @param name - The name of the variant (e.g., 'Color').
   * @returns A list of ProductVariant entities with the specified name.
   * @throws Error if retrieval fails.
   */
  async getByName(productId: number, name: string): Promise<ProductVariant[]> {
    try {
      const variants = await this.prisma.productVariant.findMany({
        where: {
          productId,
          name,
        },
      });
      return variants.map(fromProductVariantPrisma);
    } catch (error) {
      throw new Error(
        `Error retrieving variants for product with ID ${productId} and name ${name}: ${error.message}`,
      );
    }
  }

  /**
   * Retrieves the most popular variant for a given product.
   * This could be based on some custom business logic, e.g., the first created.
   * @param productId - The ID of the product.
   * @returns The most popular ProductVariant or null if none found.
   * @throws Error if retrieval fails.
   */
  async getMostPopularVariant(
    productId: number,
  ): Promise<ProductVariant | null> {
    try {
      const popularVariant = await this.prisma.productVariant.findFirst({
        where: { productId },
        orderBy: {
          // Replace with the logic to determine the "most popular" (e.g., by sales count)
          id: 'asc',
        },
      });
      return fromProductVariantPrisma(popularVariant);
    } catch (error) {
      throw new Error(
        `Error retrieving the most popular variant for product with ID ${productId}: ${error.message}`,
      );
    }
  }
}

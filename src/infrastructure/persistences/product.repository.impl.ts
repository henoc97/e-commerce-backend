import { fromProductPrisma } from 'src/application/helper/from-prisma/to.product.entity';
import { Product } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import prisma from 'prisma/prisma.service';

export class ProductRepository implements IProductRepository {

  getFeaturedProducts(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  /**
   * Creates a new product in the database.
   * @param product - The product entity to create.
   * @returns The created product.
   */
  async create(product: Product): Promise<Product> {
    try {
      const {
        id,
        promotions,
        category,
        images,
        variants,
        vendor,
        shop,
        cartItem,
        orderItem,
        review,
        ...data
      } = product;
      const result = await prisma.product.create({ data: data });
      return fromProductPrisma(result);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product.
   * @returns The product or null if not found.
   */
  async getById(id: number): Promise<Product | null> {
    try {
      const result = await prisma.product.findUnique({ where: { id } });
      return fromProductPrisma(result);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }

  /**
   * Updates a product by its ID.
   * @param id - The ID of the product to update.
   * @param updates - The partial updates to apply.
   * @returns The updated product.
   */
  async update(id: number, updates: Partial<Product>): Promise<Product> {
    try {
      const {
        promotions,
        category,
        images,
        variants,
        vendor,
        shop,
        cartItem,
        orderItem,
        review,
        ...data
      } = updates;

      const result = await prisma.product.update({
        where: { id },
        data: data,
      });
      return fromProductPrisma(result);
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  /**
   * Deletes a product by its ID.
   * @param id - The ID of the product to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.product.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  /**
   * Finds products by their name.
   * @param name - The name of the product.
   * @returns An array of matching products.
   */
  async findByName(name: string): Promise<Product[]> {
    try {
      const result = await prisma.product.findMany({
        where: { name: { contains: name } },
      });
      return result.map(fromProductPrisma);
    } catch (error) {
      console.error('Error finding products by name:', error);
      throw error;
    }
  }

  /**
   * Finds products by their vendor.
   * @param vendorId - The id of the vendor.
   * @returns An array of matching products.
   */
  async findByVendor(vendorId: number): Promise<Product[]> {
    try {
      const result = await prisma.product.findMany({
        where: { vendorId },
      });
      return result.map(fromProductPrisma);
    } catch (error) {
      console.error('Error finding products by vendor:', error);
      throw error;
    }
  }

  /**
   * Finds products by category ID.
   * @param categoryId - The category ID to search for.
   * @returns An array of products in the specified category.
   */
  async findByCategory(categoryId: number): Promise<Product[]> {
    try {
      const result = await prisma.product.findMany({
        where: { categoryId },
      });
      return result.map(fromProductPrisma);
    } catch (error) {
      console.error('Error finding products by category:', error);
      throw error;
    }
  }

  /**
   * Updates the stock of a product by a specified quantity.
   * @param productId - The ID of the product whose stock needs to be updated.
   * @param quantity - The quantity to increment the stock by.
   *                   Use a negative number to decrement the stock.
   * @returns The updated product after the stock has been modified.
   * @throws An error if the update operation fails.
   */
  async updateStock(productId: number, quantity: number): Promise<Product> {
    try {
      const result = await prisma.product.update({
        where: { id: productId },
        data: { stock: { increment: quantity } },
      });
      return fromProductPrisma(result);
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }

  /**
   * Retrieves products within a specified price range.
   * @param minPrice - The minimum price of the products to find.
   * @param maxPrice - The maximum price of the products to find.
   * @returns An array of products whose prices are within the specified range.
   * @throws An error if the fetch operation fails.
   */
  async findByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Product[]> {
    try {
      const result = await prisma.product.findMany({
        where: {
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      });
      return result.map(fromProductPrisma);
    } catch (error) {
      console.error('Error finding products by price range:', error);
      throw error;
    }
  }

  // async getFeaturedProducts(): Promise<Product[]> {
  //     try {
  //         const result = await prisma.product.findMany({
  //             where: { isFeatured: true }, // Assuming there's a boolean field 'isFeatured'
  //         });
  //         return result.map(fromProductPrisma);
  //     } catch (error) {
  //         console.error("Error fetching featured products:", error);
  //         throw error;
  //     }
  // }
}

import { fromProductImagePrisma } from 'src/application/helper/from-prisma/to.product-image.entity';
import { ProductImage } from 'src/domain/entities/product-image.entity';
import { IProductImageRepository } from 'src/domain/repositories/product-image.repository';
import prisma from 'prisma/prisma.service';

export class ProductImageRepository implements IProductImageRepository {

  /**
   * Creates a new ProductImage record in the database.
   * @param image - The product image entity to be created.
   * @returns The created ProductImage.
   * @throws Error if the creation fails.
   */
  async create(image: ProductImage): Promise<ProductImage> {
    try {
      const { id, product, ...data } = image;
      const newImage = await prisma.productImage.create({
        data: data,
      });
      return fromProductImagePrisma(newImage);
    } catch (error) {
      throw new Error(`Error creating product image: ${error}`);
    }
  }

  /**
   * Retrieves a ProductImage by its ID.
   * @param id - The ID of the product image to retrieve.
   * @returns The ProductImage or null if not found.
   * @throws Error if retrieval fails.
   */
  async getById(id: number): Promise<ProductImage | null> {
    try {
      const image = await prisma.productImage.findUnique({
        where: { id },
      });
      return fromProductImagePrisma(image);
    } catch (error) {
      throw new Error(
        `Error retrieving product image with ID ${id}: ${error}`,
      );
    }
  }

  /**
   * Updates a ProductImage by its ID.
   * @param id - The ID of the product image to update.
   * @param updates - Partial updates to apply to the product image.
   * @returns The updated ProductImage.
   * @throws Error if update fails.
   */
  async update(
    id: number,
    updates: Partial<ProductImage>,
  ): Promise<ProductImage> {
    try {
      const { product, ...data } = updates;
      const updatedImage = await prisma.productImage.update({
        where: { id },
        data: data,
      });
      return fromProductImagePrisma(updatedImage);
    } catch (error) {
      throw new Error(
        `Error updating product image with ID ${id}: ${error}`,
      );
    }
  }

  /**
   * Deletes a ProductImage by its ID.
   * @param id - The ID of the product image to delete.
   * @returns True if the image was deleted, false otherwise.
   * @throws Error if deletion fails.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.productImage.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(
        `Error deleting product image with ID ${id}: ${error}`,
      );
      return false;
    }
  }

  /**
   * Retrieves all images associated with a given product.
   * @param productId - The ID of the product whose images are to be retrieved.
   * @returns A list of ProductImage entities.
   * @throws Error if retrieval fails.
   */
  async getByProductId(productId: number): Promise<ProductImage[]> {
    try {
      const images = await prisma.productImage.findMany({
        where: { productId },
      });
      return images?.map(fromProductImagePrisma);
    } catch (error) {
      throw new Error(
        `Error retrieving images for product with ID ${productId}: ${error}`,
      );
    }
  }

  /**
   * Deletes all images associated with a given product.
   * @param productId - The ID of the product whose images are to be deleted.
   * @returns True if deletion is successful, false otherwise.
   * @throws Error if deletion fails.
   */
  async deleteByProductId(productId: number): Promise<boolean> {
    try {
      await prisma.productImage.deleteMany({
        where: { productId },
      });
      return true;
    } catch (error) {
      console.error(
        `Error deleting images for product with ID ${productId}: ${error}`,
      );
      return true;
    }
  }

  /**
   * Updates the URL of a ProductImage by its ID.
   * @param id - The ID of the product image to update.
   * @param url - The new URL of the product image.
   * @returns The updated ProductImage.
   * @throws Error if update fails.
   */
  async updateUrl(id: number, url: string): Promise<ProductImage> {
    try {
      const updatedImage = await prisma.productImage.update({
        where: { id },
        data: { url },
      });
      return fromProductImagePrisma(updatedImage);
    } catch (error) {
      throw new Error(
        `Error updating URL for product image with ID ${id}: ${error}`,
      );
    }
  }

  /**
   * Checks if a product image exists by product ID and URL.
   * @param productId - The ID of the product.
   * @param url - The URL of the product image.
   * @returns True if the image exists, false otherwise.
   * @throws Error if existence check fails.
   */
  async exists(productId: number, url: string): Promise<boolean> {
    try {
      const image = await prisma.productImage.findFirst({
        where: {
          productId,
          url,
        },
      });
      return !!image;
    } catch (error) {
      throw new Error(
        `Error checking existence of image for product with ID ${productId} and URL ${url}: ${error}`,
      );
    }
  }

  /**
   * Retrieves the primary image for a given product.
   * @param productId - The ID of the product.
   * @returns The primary ProductImage or null if not found.
   * @throws Error if retrieval fails.
   */
  async getPrimaryImage(productId: number): Promise<ProductImage | null> {
    try {
      const image = await prisma.productImage.findFirst({
        where: { productId },
        orderBy: {
          id: 'asc', // Assuming the primary image is the first one created
        },
      });
      return fromProductImagePrisma(image);
    } catch (error) {
      throw new Error(
        `Error retrieving primary image for product with ID ${productId}: ${error}`,
      );
    }
  }

  /**
   * Counts the number of images associated with a product.
   * @param productId - The ID of the product.
   * @returns The number of images associated with the product.
   * @throws Error if counting fails.
   */
  async countImagesByProductId(productId: number): Promise<number> {
    try {
      const count = await prisma.productImage.count({
        where: { productId },
      });
      return count;
    } catch (error) {
      throw new Error(
        `Error counting images for product with ID ${productId}: ${error}`,
      );
    }
  }
}

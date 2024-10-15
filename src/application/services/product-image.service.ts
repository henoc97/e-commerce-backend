import { Inject, Injectable } from '@nestjs/common';
import { ProductImage } from 'src/domain/entities/product-image.entity';
import { IProductImageRepository } from 'src/domain/repositories/product-image.repository';
import { ProductImageDTO } from 'src/presentation/dtos/product-image.dto';
import { fromProductImageDTO } from '../helper/to-entity/to.product-image.entity';
/**
 * Service for managing product images.
 * Handles business logic for operations related to ProductImage entities.
 */
@Injectable()
export class ProductImageService {
  constructor(
    @Inject('IProductImageRepository')
    private readonly productImageRepository: IProductImageRepository,
  ) {}

  /**
   * Creates a new ProductImage.
   * @param imageDTO - The data transfer object containing the information for the new ProductImage.
   * @returns A promise that resolves to the created ProductImage.
   */
  async createProductImage(imageDTO: ProductImageDTO): Promise<ProductImage> {
    const image = fromProductImageDTO(imageDTO);
    return await this.productImageRepository.create(image);
  }

  /**
   * Retrieves a ProductImage by its unique ID.
   * @param id - The unique ID of the ProductImage.
   * @returns A promise that resolves to the ProductImage if found, otherwise null.
   */
  async getProductImageById(id: number): Promise<ProductImage | null> {
    return await this.productImageRepository.getById(id);
  }

  /**
   * Updates an existing ProductImage with new data.
   * @param id - The unique ID of the ProductImage.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated ProductImage.
   */
  async updateProductImage(
    id: number,
    updates: Partial<ProductImageDTO>,
  ): Promise<ProductImage> {
    const updateImage = fromProductImageDTO(updates);
    return await this.productImageRepository.update(id, updateImage);
  }

  /**
   * Deletes a ProductImage by its unique ID.
   * @param id - The unique ID of the ProductImage.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteProductImage(id: number): Promise<boolean> {
    return await this.productImageRepository.delete(id);
  }

  /**
   * Retrieves all ProductImages associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of ProductImages.
   */
  async getProductImagesByProductId(
    productId: number,
  ): Promise<ProductImage[]> {
    return await this.productImageRepository.getByProductId(productId);
  }

  /**
   * Deletes all ProductImages associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteProductImagesByProductId(productId: number): Promise<boolean> {
    return await this.productImageRepository.deleteByProductId(productId);
  }

  /**
   * Updates the URL of a specific ProductImage.
   * @param id - The unique ID of the ProductImage.
   * @param url - The new URL of the ProductImage.
   * @returns A promise that resolves to the updated ProductImage.
   */
  async updateProductImageUrl(id: number, url: string): Promise<ProductImage> {
    return await this.productImageRepository.updateUrl(id, url);
  }

  /**
   * Checks if a ProductImage exists for a specific product and URL.
   * @param productId - The unique ID of the product.
   * @param url - The URL of the ProductImage.
   * @returns A promise that resolves to true if the image exists, otherwise false.
   */
  async doesProductImageExist(
    productId: number,
    url: string,
  ): Promise<boolean> {
    return await this.productImageRepository.exists(productId, url);
  }

  /**
   * Retrieves the primary (main) image for a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the primary ProductImage if found, otherwise null.
   */
  async getPrimaryProductImage(
    productId: number,
  ): Promise<ProductImage | null> {
    return await this.productImageRepository.getPrimaryImage(productId);
  }

  /**
   * Retrieves the total count of images for a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the total count of images for the product.
   */
  async countProductImagesByProductId(productId: number): Promise<number> {
    return await this.productImageRepository.countImagesByProductId(productId);
  }
}

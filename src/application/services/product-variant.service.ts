import { ProductVariant } from 'src/domain/entities/product-variant.entity';
import { IProductVariantRepository } from 'src/domain/repositories/product-variant.repository';
import { ProductVariantDTO } from 'src/presentation/dtos/product-variant.dto';

/**
 * Service class for handling business logic related to ProductVariant entities.
 * Utilizes repository methods to perform CRUD operations and implement use case logic.
 */
export class ProductVariantService {
  private readonly repository: IProductVariantRepository;

  /**
   * Creates an instance of ProductVariantService.
   * @param repository - An instance of the repository to manage ProductVariant entities.
   */
  constructor(repository: IProductVariantRepository) {
    this.repository = repository;
  }

  /**
   * Creates and saves a new ProductVariant.
   * @param variantDTO - The ProductVariantDTO containing data to create the new ProductVariant.
   * @returns A promise that resolves to the created ProductVariant.
   */
  async createProductVariant(
    variantDTO: ProductVariantDTO,
  ): Promise<ProductVariant> {
    const variant = new ProductVariant(
      variantDTO.id,
      variantDTO.productId,
      null,
      variantDTO.name,
      variantDTO.value,
    );
    return this.repository.create(variant);
  }

  /**
   * Retrieves a ProductVariant by its unique ID.
   * @param id - The unique ID of the ProductVariant.
   * @returns A promise that resolves to the ProductVariant if found, otherwise null.
   */
  async getProductVariantById(id: number): Promise<ProductVariant | null> {
    return this.repository.getById(id);
  }

  /**
   * Updates an existing ProductVariant with new data.
   * @param id - The unique ID of the ProductVariant to update.
   * @param updates - The partial data to update the ProductVariant.
   * @returns A promise that resolves to the updated ProductVariant.
   */
  async updateProductVariant(
    id: number,
    updates: Partial<ProductVariantDTO>,
  ): Promise<ProductVariant> {
    // Convert DTO to entity for the update operation
    const updatedEntity = new ProductVariant(
      updates.id,
      updates.productId,
      null,
      updates.name,
      updates.value,
    );
    return this.repository.update(id, updatedEntity);
  }

  /**
   * Deletes a ProductVariant by its unique ID.
   * @param id - The unique ID of the ProductVariant to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteProductVariant(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }

  /**
   * Retrieves all ProductVariants associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of ProductVariants.
   */
  async getProductVariantsByProductId(
    productId: number,
  ): Promise<ProductVariant[]> {
    return this.repository.getByProductId(productId);
  }

  /**
   * Deletes all ProductVariants associated with a specific product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteProductVariantsByProductId(productId: number): Promise<boolean> {
    return this.repository.deleteByProductId(productId);
  }

  /**
   * Checks if a ProductVariant with a specific name and value exists for a product.
   * @param productId - The unique ID of the product.
   * @param name - The name of the ProductVariant.
   * @param value - The value of the ProductVariant.
   * @returns A promise that resolves to true if the variant exists, otherwise false.
   */
  async productVariantExists(
    productId: number,
    name: string,
    value: string,
  ): Promise<boolean> {
    return this.repository.exists(productId, name, value);
  }

  /**
   * Updates the name and/or value of a specific ProductVariant.
   * @param id - The unique ID of the ProductVariant.
   * @param name - The new name for the ProductVariant (optional).
   * @param value - The new value for the ProductVariant (optional).
   * @returns A promise that resolves to the updated ProductVariant.
   */
  async updateProductVariantDetails(
    id: number,
    name?: string,
    value?: string,
  ): Promise<ProductVariant> {
    return this.repository.updateDetails(id, name, value);
  }

  /**
   * Retrieves all ProductVariants with a specific name for a given product.
   * @param productId - The unique ID of the product.
   * @param name - The name of the ProductVariants to retrieve.
   * @returns A promise that resolves to an array of ProductVariants with the given name.
   */
  async getProductVariantsByName(
    productId: number,
    name: string,
  ): Promise<ProductVariant[]> {
    return this.repository.getByName(productId, name);
  }

  /**
   * Retrieves the most popular variant for a given product based on sales or views.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the most popular ProductVariant if found, otherwise null.
   */
  async getMostPopularVariant(
    productId: number,
  ): Promise<ProductVariant | null> {
    return this.repository.getMostPopularVariant(productId);
  }
}

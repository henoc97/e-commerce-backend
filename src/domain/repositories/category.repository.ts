import { Category } from "../entities/category.entity";
import { Product } from "../entities/product.entity";

/**
 * Interface for managing categories with business rules.
 */
export interface ICategoryRepository {

  /**
   * Creates and stores a new Category.
   * @param category - The Category entity to create.
   * @returns A promise that resolves to the created Category.
   * @throws Error if the creation fails.
   */
  create(category: Category): Promise<Category>;

  /**
   * Retrieves a Category by its ID.
   * @param id - The unique ID of the Category.
   * @returns A promise that resolves to the Category if found, otherwise null.
   * @throws Error if the retrieval fails.
   */
  getById(id: number): Promise<Category | null>;

  /**
   * Updates an existing Category with new data.
   * @param id - The unique ID of the Category to update.
   * @param data - The new data for the Category.
   * @returns A promise that resolves to the updated Category.
   * @throws Error if the update fails.
   */
  update(id: number, data: Partial<Category>): Promise<Category>;

  /**
   * Deletes a Category by its ID.
   * @param id - The unique ID of the Category to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if the deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves all child categories of a specific parent category.
   * @param parentId - The unique ID of the parent Category.
   * @returns A promise that resolves to an array of child Categories.
   * @throws Error if the retrieval fails.
   */
  getChildren(parentId: number): Promise<Category[]>;

  /**
   * Retrieves all products associated with a specific Category.
   * @param categoryId - The unique ID of the Category.
   * @returns A promise that resolves to an array of Products.
   * @throws Error if the retrieval fails.
   */
  getProducts(categoryId: number): Promise<Product[]>;

  /**
   * Updates the parent category of a specific Category.
   * @param id - The unique ID of the Category to update.
   * @param newParentId - The unique ID of the new parent Category.
   * @returns A promise that resolves to the updated Category.
   * @throws Error if the update fails.
   */
  setParent(id: number, newParentId: number): Promise<Category>;

  /**
   * Checks if a Category with a specific name exists within a given shop.
   * @param name - The name of the Category to check.
   * @param shopId - The unique ID of the Shop.
   * @returns A promise that resolves to true if the Category exists, otherwise false.
   * @throws Error if the check fails.
   */
  exists(name: string, shopId: number): Promise<boolean>;

  /**
   * Retrieves all top-level categories (categories without a parent).
   * @returns A promise that resolves to an array of top-level Categories.
   * @throws Error if the retrieval fails.
   */
  getTopLevelCategories(): Promise<Category[]>;

  /**
   * Retrieves the category hierarchy (including all children) of a specific Category.
   * @param categoryId - The unique ID of the Category to retrieve the hierarchy for.
   * @returns A promise that resolves to an array of Categories representing the hierarchy.
   * @throws Error if the retrieval fails.
   */
  getCategoryHierarchy(categoryId: number): Promise<Category[]>;
}

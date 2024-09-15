import { Category } from 'src/domain/entities/category.entity';
import { Product } from 'src/domain/entities/product.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';
import { fromCategoryDTO } from '../helper/to-entity/to.category.entity';

/**
 * Service class for managing categories.
 * Implements business logic and interacts with the category repository.
 */
export class CategoryService {
  private categoryRepository: ICategoryRepository;

  /**
   * Creates an instance of CategoryService.
   * @param categoryRepository - The repository to manage Category entities.
   */
  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  /**
   * Creates a new Category and stores it in the repository.
   * @param categoryDTO - Data Transfer Object for creating a Category.
   * @returns A promise that resolves to the created Category entity.
   */
  async createCategory(categoryDTO: CategoryDTO): Promise<Category> {
    const category = fromCategoryDTO(categoryDTO);
    return this.categoryRepository.create(category);
  }

  /**
   * Retrieves a Category by its ID.
   * @param id - The unique identifier of the Category to retrieve.
   * @returns A promise that resolves to the Category entity if found, otherwise null.
   */
  async getCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.getById(id);
  }

  /**
   * Updates an existing Category with new data.
   * @param id - The unique identifier of the Category to update.
   * @param categoryDTO - Data Transfer Object containing updated information for the Category.
   * @returns A promise that resolves to the updated Category entity.
   */
  async updateCategory(
    id: number,
    categoryDTO: Partial<CategoryDTO>,
  ): Promise<Category> {
    const category = fromCategoryDTO(categoryDTO);
    return this.categoryRepository.update(id, category);
  }

  /**
   * Deletes a Category by its ID.
   * @param id - The unique identifier of the Category to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteCategory(id: number): Promise<boolean> {
    return this.categoryRepository.delete(id);
  }

  /**
   * Retrieves all child categories of a specific parent category.
   * @param parentId - The unique identifier of the parent Category.
   * @returns A promise that resolves to an array of child Categories.
   */
  async getChildren(parentId: number): Promise<Category[]> {
    return this.categoryRepository.getChildren(parentId);
  }

  /**
   * Retrieves all products associated with a specific Category.
   * @param categoryId - The unique identifier of the Category.
   * @returns A promise that resolves to an array of Products.
   */
  async getProducts(categoryId: number): Promise<Product[]> {
    return this.categoryRepository.getProducts(categoryId);
  }

  /**
   * Updates the parent category of a specific Category.
   * @param id - The unique identifier of the Category to update.
   * @param newParentId - The unique identifier of the new parent Category.
   * @returns A promise that resolves to the updated Category entity.
   */
  async setCategoryParent(id: number, newParentId: number): Promise<Category> {
    return this.categoryRepository.setParent(id, newParentId);
  }

  /**
   * Checks if a Category with a specific name exists within a given shop.
   * @param name - The name of the Category to check.
   * @param shopId - The unique identifier of the Shop.
   * @returns A promise that resolves to true if the Category exists, otherwise false.
   */
  async categoryExists(name: string, shopId: number): Promise<boolean> {
    return this.categoryRepository.exists(name, shopId);
  }

  /**
   * Retrieves all top-level categories (categories without a parent).
   * @returns A promise that resolves to an array of top-level Categories.
   */
  async getTopLevelCategories(): Promise<Category[]> {
    return this.categoryRepository.getTopLevelCategories();
  }

  /**
   * Retrieves the category hierarchy (including all children) of a specific Category.
   * @param categoryId - The unique identifier of the Category to retrieve the hierarchy for.
   * @returns A promise that resolves to an array of Categories representing the hierarchy.
   */
  async getCategoryHierarchy(categoryId: number): Promise<Category[]> {
    return this.categoryRepository.getCategoryHierarchy(categoryId);
  }
}

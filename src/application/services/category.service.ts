import { Category } from 'src/domain/entities/category.entity';
import { Product } from 'src/domain/entities/product.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';
import { fromCategoryDTO } from '../helper/to-entity/to.category.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import ProductService from './product.service';

/**
 * Service class for managing categories.
 * Implements business logic and interacts with the category repository.
 */
export class CategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    private readonly productService: ProductService,
  ) {}

  /**
   * Creates a new category.
   * @param categoryDTO - The data transfer object containing category details.
   * @returns The created Category object.
   * @throws InternalServerErrorException if the creation fails.
   */
  async createCategory(categoryDTO: CategoryDTO): Promise<Category> {
    const category = fromCategoryDTO(categoryDTO);
    return await this.categoryRepository.create(category);
  }

  /**
   * Retrieves a category by its ID.
   * @param id - The ID of the category to retrieve.
   * @returns The Category object if found, otherwise null.
   * @throws NotFoundException if the category is not found.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getCategoryById(id: number): Promise<Category | null> {
    const category = await this.categoryRepository.getById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  /**
   * Updates an existing category by its ID.
   * @param id - The ID of the category to update.
   * @param categoryDTO - The data transfer object containing updated category details.
   * @returns The updated Category object.
   * @throws InternalServerErrorException if the update fails.
   */
  async updateCategory(
    id: number,
    categoryDTO: Partial<CategoryDTO>,
  ): Promise<Category> {
    const category = fromCategoryDTO(categoryDTO);
    return await this.categoryRepository.update(id, category);
  }

  /**
   * Deletes a category by its ID.
   * @param id - The ID of the category to delete.
   * @returns A boolean indicating whether the deletion was successful.
   * @throws NotFoundException if the category is not found.
   * @throws InternalServerErrorException if the deletion fails.
   */
  async deleteCategory(id: number): Promise<boolean> {
    const deleted = await this.categoryRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return deleted;
  }

  /**
   * Retrieves child categories of a given parent category.
   * @param parentId - The ID of the parent category.
   * @returns An array of child Category objects.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getChildren(parentId: number): Promise<Category[]> {
    return await this.categoryRepository.getChildren(parentId);
  }

  /**
   * Retrieves products associated with a specific category.
   * @param categoryId - The ID of the category.
   * @returns An array of Product objects associated with the category.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getProducts(categoryId: number): Promise<Product[]> {
    return await this.productService.findProductsByCategory(categoryId);
  }

  /**
   * Sets a new parent for the specified category.
   * @param id - The ID of the category to update.
   * @param newParentId - The ID of the new parent category.
   * @returns The updated Category object.
   * @throws InternalServerErrorException if the operation fails.
   */
  async setCategoryParent(id: number, newParentId: number): Promise<Category> {
    return await this.categoryRepository.setParent(id, newParentId);
  }

  /**
   * Checks if a category exists by its name and associated shop ID.
   * @param name - The name of the category.
   * @param shopId - The ID of the shop.
   * @returns A boolean indicating whether the category exists.
   * @throws InternalServerErrorException if the check fails.
   */
  async categoryExists(name: string, shopId: number): Promise<boolean> {
    return await this.categoryRepository.exists(name, shopId);
  }

  /**
   * Retrieves top-level categories.
   * @returns An array of top-level Category objects.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getTopLevelCategories(): Promise<Category[]> {
    return await this.categoryRepository.getTopLevelCategories();
  }

  /**
   * Retrieves the hierarchy of categories for a specific category ID.
   * @param categoryId - The ID of the category.
   * @returns An array of Category objects representing the hierarchy.
   * @throws InternalServerErrorException if retrieval fails.
   */
  async getCategoryHierarchy(categoryId: number): Promise<Category[]> {
    return await this.categoryRepository.getCategoryHierarchy(categoryId);
  }
}

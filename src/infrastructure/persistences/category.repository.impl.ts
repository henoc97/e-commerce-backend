import { fromCategoryPrisma } from 'src/application/helper/from-prisma/to.category.entity';
import { Category } from 'src/domain/entities/category.entity';
import { ICategoryRepository } from 'src/domain/repositories/category.repository';
import prisma from 'prisma/prisma.service';

export class CategoryRepository implements ICategoryRepository {


  /**
   * Creates a new category.
   * @param category The category entity to create.
   * @returns The created category.
   */
  async create(category: Category): Promise<Category> {
    try {
      const { id, parent, children, products, shop, ...data } = category;
      const result = await prisma.category.create({
        data: data,
      });
      return fromCategoryPrisma(result);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  /**
   * Retrieves a category by its ID.
   * @param id The ID of the category.
   * @returns The category if found, otherwise null.
   */
  async getById(id: number): Promise<Category | null> {
    try {
      const result = await prisma.category.findUnique({
        where: { id },
      });
      return fromCategoryPrisma(result);
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  }

  /**
   * Updates a category by its ID.
   * @param id The ID of the category.
   * @param data Partial data to update the category with.
   * @returns The updated category.
   */
  async update(id: number, data: Partial<Category>): Promise<Category> {
    try {
      const { parent, children, products, shop, ...categoryData } = data;
      const result = await prisma.category.update({
        where: { id },
        data: categoryData,
      });
      return fromCategoryPrisma(result);
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  }

  /**
   * Deletes a category by its ID.
   * @param id The ID of the category.
   * @returns True if the category was deleted, false otherwise.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.category.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  }

  /**
   * Retrieves the children categories of a parent category.
   * @param parentId The ID of the parent category.
   * @returns An array of child categories.
   */
  async getChildren(parentId: number): Promise<Category[]> {
    try {
      const result = await prisma.category.findMany({
        where: { parentId },
      });
      return result.map(fromCategoryPrisma);
    } catch (error) {
      console.error('Error fetching child categories:', error);
      throw error;
    }
  }

  /**
   * Sets a new parent for a category.
   * @param id The ID of the category to update.
   * @param newParentId The ID of the new parent category.
   * @returns The updated category.
   */
  async setParent(id: number, newParentId: number): Promise<Category> {
    try {
      const result = await prisma.category.update({
        where: { id },
        data: { parentId: newParentId },
      });
      return fromCategoryPrisma(result);
    } catch (error) {
      console.error('Error setting new parent for category:', error);
      throw error;
    }
  }

  /**
   * Checks if a category with the given name exists in the shop.
   * @param name The name of the category.
   * @param shopId The ID of the shop.
   * @returns True if the category exists, false otherwise.
   */
  async exists(name: string, shopId: number): Promise<boolean> {
    try {
      const result = await prisma.category.findFirst({
        where: {
          name,
          shopId,
        },
      });
      return result !== null;
    } catch (error) {
      console.error('Error checking category existence:', error);
      throw error;
    }
  }

  /**
   * Retrieves the top-level categories (categories without a parent).
   * @returns An array of top-level categories.
   */
  async getTopLevelCategories(): Promise<Category[]> {
    try {
      const result = await prisma.category.findMany({
        where: { parentId: null },
      });
      return result.map(fromCategoryPrisma);
    } catch (error) {
      console.error('Error fetching top-level categories:', error);
      throw error;
    }
  }

  /**
   * Retrieves the hierarchy of categories for a given category ID.
   * @param categoryId The ID of the category to retrieve the hierarchy for.
   * @returns An array representing the category hierarchy.
   */
  async getCategoryHierarchy(categoryId: number): Promise<Category[]> {
    try {
      const hierarchy: Category[] = [];
      let currentCategory = await this.getById(categoryId);

      while (currentCategory) {
        hierarchy.unshift(fromCategoryPrisma(currentCategory));
        currentCategory = currentCategory.parentId
          ? await this.getById(currentCategory.parentId)
          : null;
      }

      return hierarchy;
    } catch (error) {
      console.error('Error fetching category hierarchy:', error);
      throw error;
    }
  }
}

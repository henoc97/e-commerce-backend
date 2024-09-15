import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/application/services/category.service';

/**
 * Use case class for deleting categories.
 * This class encapsulates the business logic for deleting a category.
 * It interacts with the Category service to perform operations on the category repository.
 */
@Injectable()
export class DeleteCategory {
  constructor(private readonly service: CategoryService) {}

  /**
   * Execute the delete-category use case.
   * @param id - The ID of the category to be deleted.
   * @returns A promise that resolves to true if the category was deleted successfully, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return await this.service.deleteCategory(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/application/services/category.service';

/**
 * Use case class for checking category existence.
 * This class encapsulates the business logic for verifying if a category exists.
 * It interacts with the Category service to perform operations on category repository.
 */
@Injectable()
export class CheckCategoryExistence {
  constructor(private readonly service: CategoryService) {}

  /**
   * Execute the check-category-existence use case.
   * @param name - The name of the category to check.
   * @param shopId - The ID of the shop where the category should be checked.
   * @returns A promise that resolves to true if the category exists, otherwise false.
   */
  async execute(name: string, shopId: number): Promise<boolean> {
    return await this.service.categoryExists(name, shopId);
  }
}

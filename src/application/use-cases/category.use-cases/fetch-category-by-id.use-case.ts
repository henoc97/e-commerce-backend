import { Injectable } from '@nestjs/common';
import { toCategoryDTO } from 'src/application/helper/to-dto/to.category.dto';
import { CategoryService } from 'src/application/services/category.service';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';

/**
 * Use case class for fetching a category by ID.
 * This class encapsulates the business logic for retrieving a category.
 * It interacts with the Category service to perform operations on the category repository.
 */
@Injectable()
export class FetchCategoryById {
  constructor(private readonly service: CategoryService) {}

  /**
   * Execute the fetch-category-by-id use case.
   * @param id - The ID of the category to retrieve.
   * @returns A promise that resolves to the CategoryDTO if found, otherwise null.
   */
  async execute(id: number): Promise<CategoryDTO | null> {
    const category = await this.service.getCategoryById(id);

    if (!category) return null;

    return toCategoryDTO(category);
  }
}

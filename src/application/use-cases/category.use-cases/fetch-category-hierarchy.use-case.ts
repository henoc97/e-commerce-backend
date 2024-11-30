import { Injectable } from '@nestjs/common';
import { toCategoryDTO } from 'src/application/helper/to-dto/to.category.dto';
import { CategoryService } from 'src/application/services/category.service';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';

/**
 * Use case class for fetching the category hierarchy.
 * This class encapsulates the business logic for retrieving the category hierarchy.
 * It interacts with the Category service to perform operations on the category repository.
 */
@Injectable()
export class FetchCategoryHierarchy {
  constructor(private readonly service: CategoryService) { }

  /**
   * Execute the fetch-category-hierarchy use case.
   * @param categoryId - The ID of the category to retrieve the hierarchy for.
   * @returns A promise that resolves to an array of CategoryDTO representing the hierarchy.
   */
  async execute(categoryId: number): Promise<CategoryDTO[]> {
    const categories = await this.service.getCategoryHierarchy(categoryId);

    return categories?.map((category) => toCategoryDTO(category));
  }
}

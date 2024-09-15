import { Injectable } from '@nestjs/common';
import { toCategoryDTO } from 'src/application/helper/to-dto/to.category.dto';
import { CategoryService } from 'src/application/services/category.service';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';

/**
 * Use case class for fetching top-level categories.
 * This class encapsulates the business logic for retrieving top-level categories.
 * It interacts with the Category service to perform operations on the category repository.
 */
@Injectable()
export class FetchTopLevelCategories {
  constructor(private readonly service: CategoryService) {}

  /**
   * Execute the fetch-top-level-categories use case.
   * @returns A promise that resolves to an array of CategoryDTO representing the top-level categories.
   */
  async execute(): Promise<CategoryDTO[]> {
    const categories = await this.service.getTopLevelCategories();

    return categories.map((category) => toCategoryDTO(category));
  }
}

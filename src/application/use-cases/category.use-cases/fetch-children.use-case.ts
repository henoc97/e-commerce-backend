import { Injectable } from '@nestjs/common';
import { toCategoryDTO } from 'src/application/helper/to-dto/to.category.dto';
import { CategoryService } from 'src/application/services/category.service';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';

/**
 * Use case class for fetching child categories.
 * This class encapsulates the business logic for retrieving child categories.
 * It interacts with the Category service to perform operations on the category repository.
 */
@Injectable()
export class FetchChildren {
  constructor(private readonly service: CategoryService) {}

  /**
   * Execute the fetch-children use case.
   * @param parentId - The ID of the parent category to retrieve children for.
   * @returns A promise that resolves to an array of CategoryDTO representing the child categories.
   */
  async execute(parentId: number): Promise<CategoryDTO[]> {
    const categories = await this.service.getChildren(parentId);

    return categories.map((category) => toCategoryDTO(category));
  }
}

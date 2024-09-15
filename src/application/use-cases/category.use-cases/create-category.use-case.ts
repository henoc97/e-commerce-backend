import { Injectable } from '@nestjs/common';
import { toCategoryDTO } from 'src/application/helper/to-dto/to.category.dto';
import { CategoryService } from 'src/application/services/category.service';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';

/**
 * Use case class for creating categories.
 * This class encapsulates the business logic for creating a category.
 * It interacts with the Category service to perform operations on the category repository.
 */
@Injectable()
export class CreateCategory {
  constructor(private readonly service: CategoryService) {}

  /**
   * Execute the create-category use case.
   * @param categoryDTO - The CategoryDTO containing the category data to be created.
   * @returns A promise that resolves to the created Category entity.
   */
  async execute(categoryDTO: CategoryDTO): Promise<CategoryDTO> {
    const category = await this.service.createCategory(categoryDTO);

    return toCategoryDTO(category);
  }
}

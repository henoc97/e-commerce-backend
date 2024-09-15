import { Injectable } from '@nestjs/common';
import { toCategoryDTO } from 'src/application/helper/to-dto/to.category.dto';
import { CategoryService } from 'src/application/services/category.service';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';

/**
 * Use case class for setting the parent of a category.
 * This class encapsulates the business logic for updating the parent category.
 * It interacts with the Category service to perform operations on the category repository.
 */
@Injectable()
export class SetParent {
  constructor(private readonly service: CategoryService) {}

  /**
   * Execute the set-parent use case.
   * @param id - The ID of the category to update.
   * @param newParentId - The ID of the new parent category.
   * @returns A promise that resolves to the updated CategoryDTO.
   */
  async execute(id: number, newParentId: number): Promise<CategoryDTO> {
    const category = await this.service.setCategoryParent(id, newParentId);

    return toCategoryDTO(category);
  }
}

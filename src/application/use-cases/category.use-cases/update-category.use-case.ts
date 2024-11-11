import { Injectable } from '@nestjs/common';
import { toCategoryDTO } from 'src/application/helper/to-dto/to.category.dto';
import { CategoryService } from 'src/application/services/category.service';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';

@Injectable()
export class UpdateCategory {
  constructor(private readonly categoryService: CategoryService) { }

  /**
   * Executes the update category use case.
   * @param id - The ID of the category to update.
   * @param categoryDTO - The data transfer object containing updated category details.
   * @returns The updated Category object.
   */
  async execute(id: number, categoryDTO: Partial<CategoryDTO>): Promise<CategoryDTO> {
    const category = await this.categoryService.updateCategory(id, categoryDTO);
    return toCategoryDTO(category);
  }
}

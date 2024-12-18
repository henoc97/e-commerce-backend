﻿import { Category } from '../../../domain/entities/category.entity';
import { CategoryDTO } from '../../../presentation/dtos/category.dto';
import { fromShopDTO } from './to.shop.entity';
import { fromProductDTO } from './to.product.entity';

/**
 * Converts a categoryDTO to a category entity.
 * @param categoryDTO - The categoryDTO to convert.
 * @returns The corresponding category entity.
 */
export function fromCategoryDTO(
  categoryDTO: CategoryDTO | Partial<CategoryDTO>,
): Category {
  return new Category(
    categoryDTO.id,
    categoryDTO.name,
    categoryDTO.parentId,
    categoryDTO.parent ? fromCategoryDTO(categoryDTO.parent) : undefined,
    categoryDTO.children?.map((child) => fromCategoryDTO(child)),
    categoryDTO.products?.map((product) => fromProductDTO(product)),
    categoryDTO.shopId,
    categoryDTO.shop ? fromShopDTO(categoryDTO.shop) : undefined,
  );
}

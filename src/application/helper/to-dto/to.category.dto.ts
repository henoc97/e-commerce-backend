import { CategoryDTO } from 'src/presentation/dtos/category.dto';
import { toProductDTO } from './to.product.dto';
import { toShopDTO } from './to.shop.dto';

/**
 * Converts a category entity to a categoryDTO.
 * @param category - The category entity to convert.
 * @returns The corresponding categoryDTO.
 */
export function toCategoryDTO(category: any): CategoryDTO {
  return new CategoryDTO(
    category.name,
    category.id,
    category.parentId,
    category.parent ? toCategoryDTO(category.parent) : undefined,
    category.children?.map((child) => toCategoryDTO(child)),
    category.products?.map((product) => toProductDTO(product)),
    category.shopId,
    category.shop ? toShopDTO(category.shop) : undefined,
  );
}

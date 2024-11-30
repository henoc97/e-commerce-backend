import { Category } from 'src/domain/entities/category.entity';
import { fromProductPrisma } from './to.product.entity';
import { fromShopPrisma } from './to.shop.entity';

/**
 * Converts a categoryPrisma to a category entity.
 * @param categoryPrisma - The categoryPrisma to convert.
 * @returns The corresponding category entity.
 */
export function fromCategoryPrisma(categoryPrisma: any): Category {
  return new Category(
    categoryPrisma.id,
    categoryPrisma.name,
    categoryPrisma.parentId,
    categoryPrisma.parent
      ? fromCategoryPrisma(categoryPrisma.parent)
      : undefined,
    categoryPrisma.children?.map((chid: any) => fromCategoryPrisma(chid)),
    categoryPrisma.products?.map((product: any) => fromProductPrisma(product)),
    categoryPrisma.shopId,
    categoryPrisma.shop ? fromShopPrisma(categoryPrisma.shop) : undefined,
  );
}

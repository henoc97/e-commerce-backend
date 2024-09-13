import { Product } from './product.entity';
import { Shop } from './shop.entity';

/**
 * Represents a category for organizing products.
 * Categories can have parent and child categories.
 */
export class Category {
  /**
   * Unique identifier for the Category.
   */
  id: number;

  /**
   * Name of the Category.
   */
  name: string;

  /**
   * The parent category of this category, if any.
   */
  parent?: Category;

  /**
   * ID of the parent Category.
   */
  parentId?: number;

  /**
   * Child categories of this category.
   */
  children: Category[];

  /**
   * Products associated with this Category.
   */
  products: Product[];

  /**
   * The Shop this category belongs to, if any.
   */
  Shop?: Shop;

  /**
   * ID of the Shop this category belongs to.
   */
  shopId?: number;

  /**
   * Creates a new Category instance.
   * @param id - Unique identifier for the Category.
   * @param name - Name of the Category.
   * @param parent - The parent category of this category (optional).
   * @param parentId - ID of the parent Category (optional).
   * @param children - Child categories of this category (optional).
   * @param products - Products associated with this Category (optional).
   * @param Shop - The Shop this category belongs to (optional).
   * @param shopId - ID of the Shop this category belongs to (optional).
   */
  constructor(
    id: number,
    name: string,
    parent?: Category,
    parentId?: number,
    children: Category[] = [],
    products: Product[] = [],
    Shop?: Shop,
    shopId?: number
  ) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.parentId = parentId;
    this.children = children;
    this.products = products;
    this.Shop = Shop;
    this.shopId = shopId;
  }
}

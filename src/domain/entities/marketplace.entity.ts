import { Shop } from './shop.entity';

/**
 * Represents a marketplace in the system.
 * A marketplace consists of multiple shops and may have a description.
 */
export class Marketplace {
  /**
   * Unique identifier for the marketplace.
   * This ID is used to uniquely identify each marketplace in the system.
   */
  id: number;

  /**
   * Name of the marketplace.
   * Represents the name of the marketplace for display and identification.
   */
  name: string;

  /**
   * Description of the marketplace.
   * An optional field that provides additional information about the marketplace.
   */
  description?: string;

  /**
   * List of shops within the marketplace.
   * Represents the shops that are part of this marketplace.
   */
  shops: Shop[];

  /**
   * Constructs a new Marketplace instance.
   * @param id - Unique identifier for the marketplace.
   * @param name - Name of the marketplace.
   * @param description - (Optional) Description of the marketplace.
   * @param shops - (Optional) List of shops within the marketplace.
   */
  constructor(
    id: number,
    name: string,
    description?: string,
    shops: Shop[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.shops = shops;
  }
}

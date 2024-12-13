import { fromCartItemPrisma } from '../../application/helper/from-prisma/to.cart-item.entity';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { ICartItemRepository } from '../../domain/repositories/cart-item.repository';
import prisma from '../../../prisma/prisma.service';

export class CartItemRepository implements ICartItemRepository {


  /**
   * Creates a new cart item.
   * @param item The CartItem entity to be created.
   * @returns The created CartItem entity.
   */
  async create(item: CartItem): Promise<CartItem> {
    try {
      const { id, cart, product, ...cartItem } = item;
      const result = await prisma.cartItem.create({
        data: cartItem, include: { product: true, cart: true }
      });
      return fromCartItemPrisma(result);
    } catch (error) {
      console.error('Error creating cart item:', error);
      throw error;
    }
  }

  /**
   * Retrieves a cart item by its ID.
   * @param id The ID of the cart item.
   * @returns The CartItem entity or null if not found.
   */
  async getById(id: number): Promise<CartItem | null> {
    try {
      const result = await prisma.cartItem.findUnique({
        where: { id },
      });
      return result ? fromCartItemPrisma(result) : null;
    } catch (error) {
      console.error('Error retrieving cart item by ID:', error);
      throw error;
    }
  }

  /**
   * Updates a cart item by its ID.
   * @param id The ID of the cart item to update.
   * @param data Partial data to update the cart item.
   * @returns The updated CartItem entity.
   */
  async update(id: number, data: Partial<CartItem>): Promise<CartItem> {
    try {
      const { cart, product, ...cartItem } = data;
      const result = await prisma.cartItem.update({
        where: { id },
        data: cartItem,
      });
      return fromCartItemPrisma(result);
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }

  /**
   * Removes a cart item by its ID.
   * @param id The ID of the cart item to remove.
   * @returns True if the item was successfully removed, false otherwise..
   */
  async remove(id: number): Promise<boolean> {
    try {
      await prisma.cartItem.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error removing cart item:', error);
      return false;
    }
  }

  /**
   * Retrieves all cart items by a cart ID.
   * @param cartId The ID of the cart.
   * @returns A list of CartItem entities.
   */
  async getByCartId(cartId: number): Promise<CartItem[]> {
    try {
      const result = await prisma.cartItem.findMany({
        where: { cartId },
      });
      return result?.map(fromCartItemPrisma);
    } catch (error) {
      console.error('Error retrieving cart items by cart ID:', error);
      throw error;
    }
  }

  /**
   * Retrieves a cart item by product ID and cart ID.
   * @param productId The ID of the product.
   * @param cartId The ID of the cart.
   * @returns The CartItem entity or null if not found.
   */
  async getByProductAndCart(
    productId: number,
    cartId: number,
  ): Promise<CartItem | null> {
    try {
      const result = await prisma.cartItem.findMany({
        where: { productId, cartId },
      });
      return result.length > 0 ? fromCartItemPrisma(result[0]) : null;
    } catch (error) {
      console.error(
        'Error retrieving cart item by product and cart ID:',
        error,
      );
      throw error;
    }
  }

  /**
   * Gets the total number of items in a cart.
   * @param cartId The ID of the cart.
   * @returns The total number of items in the cart.
   */
  async getItemCount(cartId: number): Promise<number> {
    try {
      const count = await prisma.cartItem.count({
        where: { cartId },
      });
      return count;
    } catch (error) {
      console.error('Error getting item count in cart:', error);
      throw error;
    }
  }

  /**
   * Updates the quantity of a cart item.
   * @param id The ID of the cart item to update.
   * @param quantity The new quantity to set.
   * @returns The updated CartItem entity.
   */
  async updateQuantity(id: number, quantity: number): Promise<CartItem> {
    try {
      const result = await prisma.cartItem.update({
        where: { id },
        data: { quantity },
      });
      return fromCartItemPrisma(result);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  }

  /**
   * Clears all items from a cart.
   * @param cartId The ID of the cart to clear.
   * @returns True if the cart was successfully cleared.
   */
  async clearCart(cartId: number): Promise<boolean> {
    try {
      await prisma.cartItem.deleteMany({
        where: { cartId },
      });
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }

  /**
   * Calculates the total cost of all items in a cart.
   * @param cartId The ID of the cart to calculate the total for.
   * @returns The total price of the cart.
   */
  async calculateCartTotal(cartId: number): Promise<number> {
    try {
      const items = await prisma.cartItem.findMany({
        where: { cartId },
        include: { product: true },
      });

      // Calculate total by summing (quantity * product price) for each item
      const total = items.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
      }, 0);

      return total;
    } catch (error) {
      console.error('Error calculating cart total:', error);
      throw error;
    }
  }

  /**
   * Retrieves the cart item with the highest quantity in a cart.
   * @param cartId The ID of the cart.
   * @returns The cart item with the highest quantity or null if no items are found.
   */
  async getHighestQuantityItem(cartId: number): Promise<CartItem | null> {
    try {
      const highestItem = await prisma.cartItem.findFirst({
        where: { cartId },
        orderBy: {
          quantity: 'desc',
        },
      });

      return highestItem ? fromCartItemPrisma(highestItem) : null;
    } catch (error) {
      console.error('Error retrieving item with highest quantity:', error);
      throw error;
    }
  }
}

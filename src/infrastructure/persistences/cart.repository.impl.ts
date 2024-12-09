import { fromCartPrisma } from '../../application/helper/from-prisma/to.cart.entity';
import { Cart } from '../../domain/entities/cart.entity';
import { ICartRepository } from '../../domain/repositories/cart.repository';
import prisma from '../../../prisma/prisma.service';

export class CartRepository implements ICartRepository {


  /**
   * Creates a new cart.
   * @param cart The cart entity to create.
   * @returns The created cart.
   */
  async create(cart: Cart): Promise<Cart> {
    try {
      const { id, user, items, ...cartData } = cart;
      const result = await prisma.cart.create({
        data: cartData,
      });
      return fromCartPrisma(result);
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  }

  /**
   * Retrieves a cart by its ID.
   * @param id The ID of the cart.
   * @returns The cart with the given ID or null if not found.
   */
  async getById(id: number): Promise<Cart | null> {
    try {
      const result = await prisma.cart.findUnique({
        where: { id },
      });
      return result ? fromCartPrisma(result) : null;
    } catch (error) {
      console.error('Error retrieving cart by ID:', error);
      throw error;
    }
  }

  /**
   * Updates a cart by its ID.
   * @param id The ID of the cart.
   * @param data The partial cart data to update.
   * @returns The updated cart.
   */
  async update(id: number, data: Partial<Cart>): Promise<Cart> {
    try {
      const { user, items, ...cartData } = data;
      const result = await prisma.cart.update({
        where: { id },
        data: cartData,
      });
      return fromCartPrisma(result);
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  }

  /**
   * Deletes a cart by its ID.
   * @param id The ID of the cart.
   * @returns True if the cart was deleted successfully, false otherwise..
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.cart.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting cart:', error);
      return false;
    }
  }

  /**
   * Retrieves the carts by the user ID.
   * @param userId The ID of the user.
   * @returns The cart belonging to the user.
   */
  async getByUserId(userId: number): Promise<Cart[]> {
    try {
      const result = await prisma.cart.findMany({
        where: { userId },
      });
      return result?.map(fromCartPrisma);
    } catch (error) {
      console.error('Error retrieving cart by user ID:', error);
      throw error;
    }
  }
}

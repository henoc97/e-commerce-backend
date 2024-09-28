import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../../src/application/services/cart.service';
import { ICartRepository } from '../../src/domain/repositories/cart.repository';
import { Cart } from '../../src/domain/entities/cart.entity';
import { CartDTO } from '../../src/presentation/dtos/cart.dto';

const mockCartRepository = {
  createCart: jest.fn(),
  getCartById: jest.fn(),
  updateCart: jest.fn(),
  deleteCart: jest.fn(),
  addItemToCart: jest.fn(),
  removeItemFromCart: jest.fn(),
  getCartItems: jest.fn(),
  clearCart: jest.fn(),
  getCartByUserId: jest.fn(),
  mergeCarts: jest.fn(),
  getItemCount: jest.fn(),
  getTotalValue: jest.fn(),
};

describe('CartService', () => {
  let service: CartService;
  let cartRepository: ICartRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: 'CartRepository',
          useValue: mockCartRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<CartService>(CartService);
    cartRepository = module.get<ICartRepository>('CartRepository');
  });

  /* create cart success and failure tests */
  it('should create cart', async () => {
    /**
     * Tests the create cart method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's createCart method is called with the correct data.
     */

    const cartDTO: CartDTO = {
      /* data */
    };

    const returnOject: Cart = { id: 1 /* others data */ };

    mockCartRepository.createCart.mockResolvedValue(returnOject);

    const result = await service.createCart(cartDTO);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.createCart).toHaveBeenCalledWith(cartDTO);
  });

  it('should throw an error when create cart method fails', async () => {
    const cartDTO: CartDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockCartRepository.createCart.mockResolvedValue(' Repository error');

    const result = await service.createCart(cartDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get cart by id success and failure tests */
  it('should get cart by id', async () => {
    /**
     * Tests the get cart by id method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's getCartById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Cart | null = { id: 1 /* others data */ };

    mockCartRepository.getCartById.mockResolvedValue(returnOject);

    const result = await service.getCartById(id);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.getCartById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get cart by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.getCartById.mockResolvedValue(' Repository error');

    const result = await service.getCartById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update cart success and failure tests */
  it('should update cart', async () => {
    /**
     * Tests the update cart method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's updateCart method is called with the correct data.
     */

    const id: number = 1;
    const data: Partial<CartDTO> = {
      /* data */
    };

    const returnOject: Cart = { id: 1 /* others data */ };

    mockCartRepository.updateCart.mockResolvedValue(returnOject);

    const result = await service.updateCart(id, data);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.updateCart).toHaveBeenCalledWith(id, data);
  });

  it('should throw an error when update cart method fails', async () => {
    const id: number = 1;
    const data: Partial<CartDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockCartRepository.updateCart.mockResolvedValue(' Repository error');

    const result = await service.updateCart(id, data);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete cart success and failure tests */
  it('should delete cart', async () => {
    /**
     * Tests the delete cart method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's deleteCart method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockCartRepository.deleteCart.mockResolvedValue(returnOject);

    const result = await service.deleteCart(id);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.deleteCart).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete cart method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.deleteCart.mockResolvedValue(' Repository error');

    const result = await service.deleteCart(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* add item to cart success and failure tests */
  it('should add item to cart', async () => {
    /**
     * Tests the add item to cart method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's addItemToCart method is called with the correct data.
     */

    const cartId: number = 1;
    const item: CartItemDTO = {
      /* data */
    };

    const returnOject: Cart = { id: 1 /* others data */ };

    mockCartRepository.addItemToCart.mockResolvedValue(returnOject);

    const result = await service.addItemToCart(cartId, item);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.addItemToCart).toHaveBeenCalledWith(cartId, item);
  });

  it('should throw an error when add item to cart method fails', async () => {
    const cartId: number = 1;
    const item: CartItemDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockCartRepository.addItemToCart.mockResolvedValue(' Repository error');

    const result = await service.addItemToCart(cartId, item);
    expect(result).rejects.toThrow('Repository error');
  });

  /* remove item from cart success and failure tests */
  it('should remove item from cart', async () => {
    /**
     * Tests the remove item from cart method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's removeItemFromCart method is called with the correct data.
     */

    const cartId: number = 1;
    const itemId: number = 1;

    const returnOject: Cart = { id: 1 /* others data */ };

    mockCartRepository.removeItemFromCart.mockResolvedValue(returnOject);

    const result = await service.removeItemFromCart(cartId, itemId);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.removeItemFromCart).toHaveBeenCalledWith(
      cartId,
      itemId,
    );
  });

  it('should throw an error when remove item from cart method fails', async () => {
    const cartId: number = 1;
    const itemId: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.removeItemFromCart.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.removeItemFromCart(cartId, itemId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get cart items success and failure tests */
  it('should get cart items', async () => {
    /**
     * Tests the get cart items method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's getCartItems method is called with the correct data.
     */

    const cartId: number = 1;

    const returnOject: CartItem[] = [{ id: 1 /* others data */ }];

    mockCartRepository.getCartItems.mockResolvedValue(returnOject);

    const result = await service.getCartItems(cartId);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.getCartItems).toHaveBeenCalledWith(cartId);
  });

  it('should throw an error when get cart items method fails', async () => {
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.getCartItems.mockResolvedValue(' Repository error');

    const result = await service.getCartItems(cartId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* clear cart success and failure tests */
  it('should clear cart', async () => {
    /**
     * Tests the clear cart method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's clearCart method is called with the correct data.
     */

    const cartId: number = 1;

    const returnOject: Cart = { id: 1 /* others data */ };

    mockCartRepository.clearCart.mockResolvedValue(returnOject);

    const result = await service.clearCart(cartId);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.clearCart).toHaveBeenCalledWith(cartId);
  });

  it('should throw an error when clear cart method fails', async () => {
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.clearCart.mockResolvedValue(' Repository error');

    const result = await service.clearCart(cartId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get cart by user id success and failure tests */
  it('should get cart by user id', async () => {
    /**
     * Tests the get cart by user id method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's getCartByUserId method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Cart | null = { id: 1 /* others data */ };

    mockCartRepository.getCartByUserId.mockResolvedValue(returnOject);

    const result = await service.getCartByUserId(userId);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.getCartByUserId).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get cart by user id method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.getCartByUserId.mockResolvedValue(' Repository error');

    const result = await service.getCartByUserId(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* merge carts success and failure tests */
  it('should merge carts', async () => {
    /**
     * Tests the merge carts method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's mergeCarts method is called with the correct data.
     */

    const sourceCartId: number = 1;
    const targetCartId: number = 1;

    const returnOject: Cart = { id: 1 /* others data */ };

    mockCartRepository.mergeCarts.mockResolvedValue(returnOject);

    const result = await service.mergeCarts(sourceCartId, targetCartId);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.mergeCarts).toHaveBeenCalledWith(
      sourceCartId,
      targetCartId,
    );
  });

  it('should throw an error when merge carts method fails', async () => {
    const sourceCartId: number = 1;
    const targetCartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.mergeCarts.mockResolvedValue(' Repository error');

    const result = await service.mergeCarts(sourceCartId, targetCartId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get item count success and failure tests */
  it('should get item count', async () => {
    /**
     * Tests the get item count method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's getItemCount method is called with the correct data.
     */

    const cartId: number = 1;

    const returnOject: number = 1;

    mockCartRepository.getItemCount.mockResolvedValue(returnOject);

    const result = await service.getItemCount(cartId);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.getItemCount).toHaveBeenCalledWith(cartId);
  });

  it('should throw an error when get item count method fails', async () => {
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.getItemCount.mockResolvedValue(' Repository error');

    const result = await service.getItemCount(cartId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get total value success and failure tests */
  it('should get total value', async () => {
    /**
     * Tests the get total value method.
     * Verifies that the returned cart matches the expected one
     * and that the repository's getTotalValue method is called with the correct data.
     */

    const cartId: number = 1;

    const returnOject: number = 1;

    mockCartRepository.getTotalValue.mockResolvedValue(returnOject);

    const result = await service.getTotalValue(cartId);
    expect(result).toEqual(returnOject);
    expect(mockCartRepository.getTotalValue).toHaveBeenCalledWith(cartId);
  });

  it('should throw an error when get total value method fails', async () => {
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartRepository.getTotalValue.mockResolvedValue(' Repository error');

    const result = await service.getTotalValue(cartId);
    expect(result).rejects.toThrow('Repository error');
  });
});

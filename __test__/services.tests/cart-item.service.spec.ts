import { Test, TestingModule } from '@nestjs/testing';
import { CartItemService } from '../../src/application/services/cart-item.service';
import { ICartItemRepository } from '../../src/domain/repositories/cart-item.repository';
import { CartItem } from '../../src/domain/entities/cart-item.entity';
import { CartItemDTO } from '../../src/presentation/dtos/cart-item.dto';

const mockCartItemRepository = {
  createCartItem: jest.fn(),
  getCartItemById: jest.fn(),
  updateCartItem: jest.fn(),
  deleteCartItem: jest.fn(),
  getCartItemsByCartId: jest.fn(),
  getCartItemByProductAndCart: jest.fn(),
  updateCartItemQuantity: jest.fn(),
  clearCart: jest.fn(),
  calculateCartTotal: jest.fn(),
  getHighestQuantityItem: jest.fn(),
};

describe('CartItemService', () => {
  let service: CartItemService;
  let cartItemRepository: ICartItemRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemService,
        {
          provide: 'CartItemRepository',
          useValue: mockCartItemRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<CartItemService>(CartItemService);
    cartItemRepository = module.get<ICartItemRepository>('CartItemRepository');
  });

  /* create cart item success and failure tests */
  it('should create cart item', async () => {
    /**
     * Tests the create cart item method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's createCartItem method is called with the correct data.
     */

    const cartItemDTO: CartItemDTO = {
      /* data */
    };

    const returnOject: CartItem = { id: 1 /* others data */ };

    mockCartItemRepository.createCartItem.mockResolvedValue(returnOject);

    const result = await service.createCartItem(cartItemDTO);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.createCartItem).toHaveBeenCalledWith(
      cartItemDTO,
    );
  });

  it('should throw an error when create cart item method fails', async () => {
    const cartItemDTO: CartItemDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockCartItemRepository.createCartItem.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createCartItem(cartItemDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get cart item by id success and failure tests */
  it('should get cart item by id', async () => {
    /**
     * Tests the get cart item by id method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's getCartItemById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: CartItem | null = { id: 1 /* others data */ };

    mockCartItemRepository.getCartItemById.mockResolvedValue(returnOject);

    const result = await service.getCartItemById(id);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.getCartItemById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get cart item by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockCartItemRepository.getCartItemById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getCartItemById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update cart item success and failure tests */
  it('should update cart item', async () => {
    /**
     * Tests the update cart item method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's updateCartItem method is called with the correct data.
     */

    const id: number = 1;
    const cartItemDTO: CartItemDTO = {
      /* data */
    };

    const returnOject: CartItem = { id: 1 /* others data */ };

    mockCartItemRepository.updateCartItem.mockResolvedValue(returnOject);

    const result = await service.updateCartItem(id, cartItemDTO);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.updateCartItem).toHaveBeenCalledWith(
      id,
      cartItemDTO,
    );
  });

  it('should throw an error when update cart item method fails', async () => {
    const id: number = 1;
    const cartItemDTO: CartItemDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockCartItemRepository.updateCartItem.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateCartItem(id, cartItemDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete cart item success and failure tests */
  it('should delete cart item', async () => {
    /**
     * Tests the delete cart item method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's deleteCartItem method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockCartItemRepository.deleteCartItem.mockResolvedValue(returnOject);

    const result = await service.deleteCartItem(id);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.deleteCartItem).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete cart item method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockCartItemRepository.deleteCartItem.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteCartItem(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get cart items by cart id success and failure tests */
  it('should get cart items by cart id', async () => {
    /**
     * Tests the get cart items by cart id method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's getCartItemsByCartId method is called with the correct data.
     */

    const cartId: number = 1;

    const returnOject: CartItem[] = [{ id: 1 /* others data */ }];

    mockCartItemRepository.getCartItemsByCartId.mockResolvedValue(returnOject);

    const result = await service.getCartItemsByCartId(cartId);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.getCartItemsByCartId).toHaveBeenCalledWith(
      cartId,
    );
  });

  it('should throw an error when get cart items by cart id method fails', async () => {
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartItemRepository.getCartItemsByCartId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getCartItemsByCartId(cartId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get cart item by product and cart success and failure tests */
  it('should get cart item by product and cart', async () => {
    /**
     * Tests the get cart item by product and cart method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's getCartItemByProductAndCart method is called with the correct data.
     */

    const productId: number = 1;
    const cartId: number = 1;

    const returnOject: CartItem | null = { id: 1 /* others data */ };

    mockCartItemRepository.getCartItemByProductAndCart.mockResolvedValue(
      returnOject,
    );

    const result = await service.getCartItemByProductAndCart(productId, cartId);
    expect(result).toEqual(returnOject);
    expect(
      mockCartItemRepository.getCartItemByProductAndCart,
    ).toHaveBeenCalledWith(productId, cartId);
  });

  it('should throw an error when get cart item by product and cart method fails', async () => {
    const productId: number = 1;
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartItemRepository.getCartItemByProductAndCart.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getCartItemByProductAndCart(productId, cartId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update cart item quantity success and failure tests */
  it('should update cart item quantity', async () => {
    /**
     * Tests the update cart item quantity method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's updateCartItemQuantity method is called with the correct data.
     */

    const id: number = 1;
    const quantity: number = 1;

    const returnOject: CartItem = { id: 1 /* others data */ };

    mockCartItemRepository.updateCartItemQuantity.mockResolvedValue(
      returnOject,
    );

    const result = await service.updateCartItemQuantity(id, quantity);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.updateCartItemQuantity).toHaveBeenCalledWith(
      id,
      quantity,
    );
  });

  it('should throw an error when update cart item quantity method fails', async () => {
    const id: number = 1;
    const quantity: number = 1;

    // Simulate a failure when calling the repository
    mockCartItemRepository.updateCartItemQuantity.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateCartItemQuantity(id, quantity);
    expect(result).rejects.toThrow('Repository error');
  });

  /* clear cart success and failure tests */
  it('should clear cart', async () => {
    /**
     * Tests the clear cart method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's clearCart method is called with the correct data.
     */

    const cartId: number = 1;

    const returnOject: boolean = true;

    mockCartItemRepository.clearCart.mockResolvedValue(returnOject);

    const result = await service.clearCart(cartId);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.clearCart).toHaveBeenCalledWith(cartId);
  });

  it('should throw an error when clear cart method fails', async () => {
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartItemRepository.clearCart.mockResolvedValue(' Repository error');

    const result = await service.clearCart(cartId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* calculate cart total success and failure tests */
  it('should calculate cart total', async () => {
    /**
     * Tests the calculate cart total method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's calculateCartTotal method is called with the correct data.
     */

    const cartId: number = 1;

    const returnOject: number = 1;

    mockCartItemRepository.calculateCartTotal.mockResolvedValue(returnOject);

    const result = await service.calculateCartTotal(cartId);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.calculateCartTotal).toHaveBeenCalledWith(
      cartId,
    );
  });

  it('should throw an error when calculate cart total method fails', async () => {
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartItemRepository.calculateCartTotal.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.calculateCartTotal(cartId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get highest quantity item success and failure tests */
  it('should get highest quantity item', async () => {
    /**
     * Tests the get highest quantity item method.
     * Verifies that the returned cartItem matches the expected one
     * and that the repository's getHighestQuantityItem method is called with the correct data.
     */

    const cartId: number = 1;

    const returnOject: CartItem | null = { id: 1 /* others data */ };

    mockCartItemRepository.getHighestQuantityItem.mockResolvedValue(
      returnOject,
    );

    const result = await service.getHighestQuantityItem(cartId);
    expect(result).toEqual(returnOject);
    expect(mockCartItemRepository.getHighestQuantityItem).toHaveBeenCalledWith(
      cartId,
    );
  });

  it('should throw an error when get highest quantity item method fails', async () => {
    const cartId: number = 1;

    // Simulate a failure when calling the repository
    mockCartItemRepository.getHighestQuantityItem.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getHighestQuantityItem(cartId);
    expect(result).rejects.toThrow('Repository error');
  });
});

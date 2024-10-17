import { Test, TestingModule } from '@nestjs/testing';
import { CartItemService } from '../../src/application/services/cart-item.service';
import { ICartItemRepository } from '../../src/domain/repositories/cart-item.repository';
import { CartItem } from '../../src/domain/entities/cart-item.entity';
import { CartItemDTO } from '../../src/presentation/dtos/cart-item.dto';
import { InternalServerErrorException } from '@nestjs/common';


const mockCartItemRepository = {
    create: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getByCartId: jest.fn(),
    getByProductAndCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    calculateCartTotal: jest.fn(),
    getHighestQuantityItem: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('CartItemService', () => {
    let service: CartItemService;
    let cartItemRepository: ICartItemRepository;

    beforeEach(async () => {
        // Set up the testing module with the service and the mock repository
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CartItemService,
                {
                    provide: 'ICartItemRepository',
                    useValue: mockCartItemRepository, // Use the mock
                },
            ],
        }).compile();

        // Retrieve instances of the service and repository
        service = module.get<CartItemService>(CartItemService);
        cartItemRepository = module.get<ICartItemRepository>('ICartItemRepository');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    /* create cart item success and failure tests */
    it('should create cart item', async () => {
        /** 
         * Tests the create cart item method.
         * Verifies that the returned cartItem matches the expected one 
         * and that the repository's createCartItem method is called with the correct data.
         */

        const cartItemDTO: CartItemDTO = new CartItemDTO(1, 1, 1, 2);

        const returnOject: CartItem = new CartItem(1, 1, 1, 2);

        mockCartItemRepository.create.mockResolvedValue(returnOject);

        const result = await service.createCartItem(cartItemDTO);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.create).toHaveBeenCalledWith(cartItemDTO);
    });

    it('should throw an error when create cart item method fails', async () => {
        const cartItemDTO: CartItemDTO = new CartItemDTO(1, 1, 1, 2);

        // Simulate a failure when calling the repository
        mockCartItemRepository.create.mockRejectedValue(new Error('Repository error'));

        await expect(service.createCartItem(cartItemDTO)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

    /* get cart item by id success and failure tests */
    it('should get cart item by id', async () => {
        /** 
         * Tests the get cart item by id method.
         * Verifies that the returned cartItem matches the expected one 
         * and that the repository's getCartItemById method is called with the correct data.
         */

        const id: number = 1;

        const returnOject: CartItem | null = new CartItem(1, 1, 1, 2);

        mockCartItemRepository.getById.mockResolvedValue(returnOject);

        const result = await service.getCartItemById(id);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.getById).toHaveBeenCalledWith(id);
    });

    it('should throw an error when get cart item by id method fails', async () => {
        const id: number = 1;

        // Simulate a failure when calling the repository
        mockCartItemRepository.getById.mockRejectedValue(new Error('Repository error'));

        await expect(service.getCartItemById(id)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

    /* update cart item success and failure tests */
    it('should update cart item', async () => {
        /** 
         * Tests the update cart item method.
         * Verifies that the returned cartItem matches the expected one 
         * and that the repository's updateCartItem method is called with the correct data.
         */

        const id: number = 1;
        const cartItemDTO: CartItemDTO = new CartItemDTO(1, 1, 1, 2);

        const returnOject: CartItem = new CartItem(1, 1, 1, 2);

        mockCartItemRepository.update.mockResolvedValue(returnOject);

        const result = await service.updateCartItem(id,
            cartItemDTO,);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.update).toHaveBeenCalledWith(id,
            cartItemDTO,);
    });

    it('should throw an error when update cart item method fails', async () => {
        const id: number = 1;
        const cartItemDTO: CartItemDTO = new CartItemDTO(1, 1, 1, 2);

        // Simulate a failure when calling the repository
        mockCartItemRepository.update.mockRejectedValue(new Error('Repository error'));

        await expect(service.updateCartItem(id, cartItemDTO)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

    /* delete cart item success and failure tests */
    it('should delete cart item', async () => {
        /** 
         * Tests the delete cart item method.
         * Verifies that the returned cartItem matches the expected one 
         * and that the repository's deleteCartItem method is called with the correct data.
         */

        const id: number = 1;

        const returnOject: boolean = true

        mockCartItemRepository.remove.mockResolvedValue(returnOject);

        const result = await service.deleteCartItem(id);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.remove).toHaveBeenCalledWith(id);
    });

    it('should throw an error when delete cart item method fails', async () => {
        const id: number = 1;

        // Simulate a failure when calling the repository
        mockCartItemRepository.remove.mockRejectedValue(new Error('Repository error'));

        await expect(service.deleteCartItem(id)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

    /* get cart items by cart id success and failure tests */
    it('should get cart items by cart id', async () => {
        /** 
         * Tests the get cart items by cart id method.
         * Verifies that the returned cartItem matches the expected one 
         * and that the repository's getCartItemsByCartId method is called with the correct data.
         */

        const cartId: number = 1;

        const returnOject: CartItem[] = [new CartItem(1, 1, 1, 2)];

        mockCartItemRepository.getByCartId.mockResolvedValue(returnOject);

        const result = await service.getCartItemsByCartId(cartId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.getByCartId).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when get cart items by cart id method fails', async () => {
        const cartId: number = 1;

        // Simulate a failure when calling the repository
        mockCartItemRepository.getByCartId.mockRejectedValue(new Error('Repository error'));

        await expect(service.getCartItemsByCartId(cartId)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
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

        const returnOject: CartItem | null = new CartItem(1, 1, 1, 2);

        mockCartItemRepository.getByProductAndCart.mockResolvedValue(returnOject);

        const result = await service.getCartItemByProductAndCart(productId,
            cartId,);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.getByProductAndCart).toHaveBeenCalledWith(productId,
            cartId,);
    });

    it('should throw an error when get cart item by product and cart method fails', async () => {
        const productId: number = 1;
        const cartId: number = 1;

        // Simulate a failure when calling the repository
        mockCartItemRepository.getByProductAndCart.mockRejectedValue(new Error('Repository error'));

        await expect(service.getCartItemByProductAndCart(productId, cartId)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
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

        const returnOject: CartItem = new CartItem(1, 1, 1, 2);

        mockCartItemRepository.updateQuantity.mockResolvedValue(returnOject);

        const result = await service.updateCartItemQuantity(id,
            quantity,);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.updateQuantity).toHaveBeenCalledWith(id,
            quantity,);
    });

    it('should throw an error when update cart item quantity method fails', async () => {
        const id: number = 1;
        const quantity: number = 1;

        // Simulate a failure when calling the repository
        mockCartItemRepository.updateQuantity.mockRejectedValue(new Error('Repository error'));

        await expect(service.updateCartItemQuantity(id, quantity)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

    /* clear cart success and failure tests */
    it('should clear cart', async () => {
        /** 
         * Tests the clear cart method.
         * Verifies that the returned cartItem matches the expected one 
         * and that the repository's clearCart method is called with the correct data.
         */

        const cartId: number = 1;

        const returnOject: boolean = true

        mockCartItemRepository.clearCart.mockResolvedValue(returnOject);

        const result = await service.clearCart(cartId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.clearCart).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when clear cart method fails', async () => {
        const cartId: number = 1;

        // Simulate a failure when calling the repository
        mockCartItemRepository.clearCart.mockRejectedValue(new Error('Repository error'));

        await expect(service.clearCart(cartId)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

    /* calculate cart total success and failure tests */
    it('should calculate cart total', async () => {
        /** 
         * Tests the calculate cart total method.
         * Verifies that the returned cartItem matches the expected one 
         * and that the repository's calculateCartTotal method is called with the correct data.
         */

        const cartId: number = 1;

        const returnOject: number = 1

        mockCartItemRepository.calculateCartTotal.mockResolvedValue(returnOject);

        const result = await service.calculateCartTotal(cartId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.calculateCartTotal).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when calculate cart total method fails', async () => {
        const cartId: number = 1;

        // Simulate a failure when calling the repository
        mockCartItemRepository.calculateCartTotal.mockRejectedValue(new Error('Repository error'));

        await expect(service.calculateCartTotal(cartId)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

    /* get highest quantity item success and failure tests */
    it('should get highest quantity item', async () => {
        /** 
         * Tests the get highest quantity item method.
         * Verifies that the returned cartItem matches the expected one 
         * and that the repository's getHighestQuantityItem method is called with the correct data.
         */

        const cartId: number = 1;

        const returnOject: CartItem | null = new CartItem(1, 1, 1, 2);

        mockCartItemRepository.getHighestQuantityItem.mockResolvedValue(returnOject);

        const result = await service.getHighestQuantityItem(cartId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemRepository.getHighestQuantityItem).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when get highest quantity item method fails', async () => {
        const cartId: number = 1;

        // Simulate a failure when calling the repository
        mockCartItemRepository.getHighestQuantityItem.mockRejectedValue(new Error('Repository error'));

        await expect(service.getHighestQuantityItem(cartId)).rejects.toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

})
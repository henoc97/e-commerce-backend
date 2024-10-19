import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../../src/application/services/cart.service';
import { ICartRepository } from '../../src/domain/repositories/cart.repository';
import { Cart } from '../../src/domain/entities/cart.entity';
import { CartDTO } from '../../src/presentation/dtos/cart.dto';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';
import { CartItem } from 'src/domain/entities/cart-item.entity';
import { CartItemService } from 'src/application/services/cart-item.service';


const mockCartRepository = {
    create: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getByUserId: jest.fn(),
};

const mockCartItemService = {
    createCartItem: jest.fn(),
    getItemsByCartId: jest.fn(),
    deleteCartItem: jest.fn(),
    clearCart: jest.fn(),
    getItemCount: jest.fn(),
    calculateCartTotal: jest.fn(),
    getCartItemsByCartId: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('CartService', () => {
    let service: CartService;
    let cartRepository: ICartRepository;

    beforeEach(async () => {
        // Set up the testing module with the service and the mock repository
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CartService,
                {
                    provide: 'ICartRepository',
                    useValue: mockCartRepository, // Use the mock
                },
                {
                    provide: CartItemService,
                    useValue: mockCartItemService, // Mock the CartItemService
                },
            ],
        }).compile();

        // Retrieve instances of the service and repository
        service = module.get<CartService>(CartService);
        cartRepository = module.get<ICartRepository>('ICartRepository');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    /* create cart success and failure tests */
    it('should create cart', async () => {
        /** 
         * Tests the create cart method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's createCart method is called with the correct data.
         */

        const cartDTO: CartDTO = new CartDTO(1, 1);

        const returnOject: Cart = new Cart(1, 1, []); // Assurez-vous que l'objet Cart a une propriété items

        mockCartRepository.create.mockResolvedValue(returnOject);

        const result = await service.createCart(cartDTO);
        expect(result).toEqual(returnOject);
        expect(mockCartRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            id: cartDTO.id,
            userId: cartDTO.userId,
            items: expect.any(Array) // Vérifiez que items est un tableau
        }));
    });

    it('should throw an error when create cart method fails', async () => {

        const cartDTO: CartDTO = new CartDTO(1, 1);

        // Simulate a failure when calling the repository 
        mockCartRepository.create.mockRejectedValue(new Error('Repository error'));

        await expect(service.createCart(cartDTO)).rejects.toThrow(Error);
    });

    /* get cart by id success and failure tests */
    it('should get cart by id', async () => {
        /** 
         * Tests the get cart by id method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's getCartById method is called with the correct data.
         */

        const id: number = 1;

        const returnOject: Cart | null = new Cart(1, 1);

        mockCartRepository.getById.mockResolvedValue(returnOject);

        const result = await service.getCartById(id);
        expect(result).toEqual(returnOject);
        expect(mockCartRepository.getById).toHaveBeenCalledWith(id);
    });

    it('should throw an error when get cart by id method fails', async () => {

        const id: number = 1;

        // Simulate a failure when calling the repository 
        mockCartRepository.getById.mockRejectedValue(new Error('Repository error'));

        await expect(service.getCartById(id)).rejects.toThrow(Error);
    });

    /* update cart success and failure tests */
    it('should update cart', async () => {
        /** 
         * Tests the update cart method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's updateCart method is called with the correct data.
         */

        const id: number = 1;
        const data: Partial<CartDTO> = new CartDTO(1, 1, [new CartItemDTO(1, 1, 1, 2)]);

        const returnOject: Cart = new Cart(1, 1, [new CartItem(1, 1, 1, 2)]);

        mockCartRepository.update.mockResolvedValue(returnOject);

        const result = await service.updateCart(id, data as Partial<CartDTO>);
        expect(result).toEqual(returnOject);
        expect(mockCartRepository.update).toHaveBeenCalledWith(id, data);
    });

    it('should throw an error when update cart method fails', async () => {

        const id: number = 1;
        const data: Partial<CartDTO> = new CartDTO(1, 1, [new CartItemDTO(1, 1, 1, 2)]);

        // Simulate a failure when calling the repository 
        mockCartRepository.update.mockRejectedValue(new Error('Repository error'));

        await expect(service.updateCart(id, data)).rejects.toThrow(Error);
    });

    /* delete cart success and failure tests */
    it('should delete cart', async () => {
        /** 
         * Tests the delete cart method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's deleteCart method is called with the correct data.
         */

        const id: number = 1;

        const returnOject: boolean = true

        mockCartRepository.delete.mockResolvedValue(returnOject);

        const result = await service.deleteCart(id);
        expect(result).toEqual(returnOject);
        expect(mockCartRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw an error when delete cart method fails', async () => {

        const id: number = 1;

        // Simulate a failure when calling the repository 
        mockCartRepository.delete.mockRejectedValue(new Error('Repository error'));

        await expect(service.deleteCart(id)).rejects.toThrow(Error);
    });

    /* add item to cart success and failure tests */
    it('should add item to cart', async () => {
        /** 
         * Tests the add item to cart method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's addItemToCart method is called with the correct data.
         */

        const cartId: number = 1;
        const item: CartItemDTO = new CartItemDTO(cartId, 1, 1, 2);

        const returnOject: Cart = new Cart(1, 1, [new CartItem(1, 1, 1, 2)]);

        mockCartItemService.createCartItem.mockResolvedValue(null);
        mockCartRepository.getById.mockResolvedValue(returnOject);

        const result = await service.addItemToCart(cartId, item);
        expect(result).toEqual(returnOject);
        expect(mockCartItemService.createCartItem).toHaveBeenCalledWith(item);
        expect(mockCartRepository.getById).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when add item to cart method fails', async () => {

        const cartId: number = 1;
        const item: CartItemDTO = new CartItemDTO(cartId, 1, 1, 2);

        // Simulate a failure when calling the repository 
        mockCartRepository.getById.mockRejectedValue(new Error('Repository error'));

        await expect(service.addItemToCart(cartId, item)).rejects.toThrow(Error);
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

        const returnOject: Cart = new Cart(1, 1, []);

        mockCartItemService.deleteCartItem.mockResolvedValue(null); // Créer les articles dans le targetCart
        mockCartRepository.getById.mockResolvedValue(returnOject);

        const result = await service.removeItemFromCart(cartId, itemId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemService.deleteCartItem).toHaveBeenCalledWith(itemId);
        expect(mockCartRepository.getById).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when remove item from cart method fails', async () => {

        const cartId: number = 1;
        const itemId: number = 1;

        // Simulate a failure when calling the repository 
        mockCartItemService.deleteCartItem.mockRejectedValue(new Error('Repository error'));
        mockCartRepository.getById.mockRejectedValue(new Error('Repository error'));

        await expect(service.removeItemFromCart(cartId, itemId)).rejects.toThrow(Error);
    });

    /* get cart items success and failure tests */
    it('should get cart items', async () => {
        /** 
         * Tests the get cart items method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's getCartItems method is called with the correct data.
         */

        const cartId: number = 1;

        const returnOject: CartItem[] = [new CartItem(1, 1, 1, 2)];

        mockCartItemService.getCartItemsByCartId.mockResolvedValue(returnOject);

        const result = await service.getCartItems(cartId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemService.getCartItemsByCartId).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when get cart items method fails', async () => {

        const cartId: number = 1;

        // Simulate a failure when calling the repository 
        mockCartItemService.getCartItemsByCartId.mockRejectedValue(new Error('Repository error'));

        await expect(service.getCartItems(cartId)).rejects.toThrow(Error);
    });

    /* clear cart success and failure tests */
    it('should clear cart', async () => {
        /** 
         * Tests the clear cart method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's clearCart method is called with the correct data.
         */

        const cartId: number = 1;

        const returnOject: Cart = new Cart(1, 1, []);

        mockCartItemService.clearCart.mockResolvedValue(null);
        mockCartRepository.getById.mockResolvedValue(returnOject);

        const result = await service.clearCart(cartId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemService.clearCart).toHaveBeenCalledWith(cartId);
        expect(mockCartRepository.getById).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when clear cart method fails', async () => {

        const cartId: number = 1;

        // Simulate a failure when calling the repository 
        mockCartItemService.clearCart.mockRejectedValue(new Error('Repository error'));
        mockCartRepository.getById.mockRejectedValue(new Error('Repository error'));

        await expect(service.clearCart(cartId)).rejects.toThrow(Error);
    });

    /* get cart by user id success and failure tests */
    it('should get cart by user id', async () => {
        /** 
         * Tests the get cart by user id method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's getCartByUserId method is called with the correct data.
         */

        const userId: number = 1;

        const returnOject: Cart[] = [new Cart(1, 1)];

        mockCartRepository.getByUserId.mockResolvedValue(returnOject);

        const result = await service.getCartByUserId(userId);
        expect(result).toEqual(returnOject);
        expect(mockCartRepository.getByUserId).toHaveBeenCalledWith(userId);
    });

    it('should throw an error when get cart by user id method fails', async () => {

        const userId: number = 1;

        // Simulate a failure when calling the repository 
        mockCartRepository.getByUserId.mockRejectedValue(new Error('Repository error'));

        await expect(service.getCartByUserId(userId)).rejects.toThrow(Error);
    });

    /* merge carts success and failure tests */
    it('should merge carts', async () => {
        const sourceCartId = 1;
        const targetCartId = 2;

        const sourceItems = [
            { id: 1, cartId: sourceCartId, productId: 1, quantity: 2 },
            { id: 2, cartId: sourceCartId, productId: 2, quantity: 1 },
        ];

        const targetCart = { id: targetCartId, items: [] };

        // Mock service calls
        mockCartItemService.getCartItemsByCartId.mockResolvedValue(sourceItems);
        mockCartItemService.createCartItem.mockResolvedValue(null);
        mockCartRepository.getById.mockResolvedValue(targetCart);
        mockCartRepository.delete.mockResolvedValue(null);

        const result = await service.mergeCarts(sourceCartId, targetCartId);

        // Assertions
        expect(mockCartItemService.getCartItemsByCartId).toHaveBeenCalledWith(sourceCartId);

        for (const item of sourceItems) {
            expect(mockCartItemService.createCartItem).toHaveBeenCalledWith(expect.objectContaining({
                cartId: targetCartId,
                productId: item.productId,
                quantity: item.quantity
            }));
        }

        expect(mockCartRepository.delete).toHaveBeenCalledWith(sourceCartId);
        expect(mockCartRepository.getById).toHaveBeenCalledWith(targetCartId);
        expect(result).toEqual(targetCart);
    });


    it('should throw an error when merge carts method fails', async () => {
        const sourceCartId: number = 1;
        const targetCartId: number = 1;

        // Simulate a failure when calling the repository 
        mockCartItemService.getItemsByCartId.mockRejectedValue(new Error('Repository error'));
        mockCartItemService.createCartItem.mockRejectedValue(new Error('Repository error'));
        mockCartRepository.getById.mockRejectedValue(new Error('Repository error'));
        mockCartRepository.delete.mockRejectedValue(new Error('Repository error'));

        await expect(service.mergeCarts(sourceCartId, targetCartId))
            .rejects
            .toThrow(Error);

        // Restore console.error
        consoleErrorMock.mockRestore();
    });

    /* get item count success and failure tests */
    it('should get item count', async () => {
        /** 
         * Tests the get item count method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's getItemCount method is called with the correct data.
         */

        const cartId: number = 1;

        const returnOject: number = 10;

        mockCartItemService.getItemCount.mockResolvedValue(returnOject);

        const result = await service.getItemCount(cartId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemService.getItemCount).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when get item count method fails', async () => {

        const cartId: number = 1;

        // Simulate a failure when calling the repository 
        mockCartItemService.getItemCount.mockRejectedValue(new Error('Repository error'));

        await expect(service.getItemCount(cartId)).rejects.toThrow(Error);
    });

    /* get total value success and failure tests */
    it('should get total value', async () => {
        /** 
         * Tests the get total value method.
         * Verifies that the returned cart matches the expected one 
         * and that the repository's getTotalValue method is called with the correct data.
         */

        const cartId: number = 1;

        const returnOject: number = 2

        mockCartItemService.calculateCartTotal.mockResolvedValue(returnOject);

        const result = await service.getTotalValue(cartId);
        expect(result).toEqual(returnOject);
        expect(mockCartItemService.calculateCartTotal).toHaveBeenCalledWith(cartId);
    });

    it('should throw an error when get total value method fails', async () => {

        const cartId: number = 1;

        // Simulate a failure when calling the repository 
        mockCartItemService.calculateCartTotal.mockRejectedValue(new Error('Repository error'));

        await expect(service.getTotalValue(cartId)).rejects.toThrow(Error);
    });

})
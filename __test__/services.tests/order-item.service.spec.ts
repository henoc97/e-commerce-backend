import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from '../../src/application/services/order-item.service';
import { IOrderItemRepository } from '../../src/domain/repositories/order-item.repository';
import { OrderItemDTO } from '../../src/presentation/dtos/order-item.dto';
import { OrderItem } from 'src/domain/entities/order-item.enttity';

const mockOrderItemRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getByOrderId: jest.fn(),
  getByProductId: jest.fn(),
  calculateTotalPrice: jest.fn(),
  getRecentItems: jest.fn(),
  getLowStockItems: jest.fn(),
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('OrderItemService', () => {
  let service: OrderItemService;
  let orderItemRepository: IOrderItemRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        {
          provide: 'IOrderItemRepository',
          useValue: mockOrderItemRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<OrderItemService>(OrderItemService);
    orderItemRepository = module.get<IOrderItemRepository>(
      'IOrderItemRepository',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /* create success and failure tests */
  it('should create', async () => {
    /**
     * Tests the create method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's create method is called with the correct data.
     */

    const dto: OrderItemDTO = {
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
      createdAt: new Date('2024-10-17T10:10:03.619Z'),
    };

    const returnOject: OrderItem = {
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
      createdAt: new Date('2024-10-17T10:10:03.619Z'),
      order: undefined, // Ajoutez cette ligne si nécessaire
      product: undefined, // Ajoutez cette ligne si nécessaire
    };

    mockOrderItemRepository.create.mockResolvedValue(returnOject);

    const result = await service.create(dto);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.create).toHaveBeenCalledWith(expect.objectContaining({
      orderId: dto.orderId,
      productId: dto.productId,
      quantity: dto.quantity,
      price: dto.price,
    }));
  });

  it('should throw an error when create method fails', async () => {
    const dto: OrderItemDTO = {
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
    };

    // Simulate a failure when calling the repository
    mockOrderItemRepository.create.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.create(dto)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get by id success and failure tests */
  it('should get by id', async () => {
    /**
     * Tests the get by id method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: OrderItem | null = {
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
      createdAt: new Date('2024-10-17T10:10:03.619Z'),
    };

    mockOrderItemRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getById(id);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.getById.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* update success and failure tests */
  it('should update', async () => {
    /**
     * Tests the update method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's update method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<OrderItemDTO> = {
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
    };

    const returnOject: OrderItem = {
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
      createdAt: new Date('2024-10-17T10:10:03.619Z'),
      order: undefined, // Ajoutez cette ligne si nécessaire
      product: undefined, // Ajoutez cette ligne si nécessaire
    };

    mockOrderItemRepository.update.mockResolvedValue(returnOject);

    const result = await service.update(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.update).toHaveBeenCalledWith(id, expect.objectContaining({
      orderId: updates.orderId,
      productId: updates.productId,
      quantity: updates.quantity,
      price: updates.price,
    }));
  });

  it('should throw an error when update method fails', async () => {
    const id: number = 1;
    const updates: Partial<OrderItemDTO> = {
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
    };

    // Simulate a failure when calling the repository
    mockOrderItemRepository.update.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.update(id, updates)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* delete success and failure tests */
  it('should delete', async () => {
    /**
     * Tests the delete method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's delete method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockOrderItemRepository.delete.mockResolvedValue(returnOject);

    const result = await service.delete(id);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.delete.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.delete(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get by order id success and failure tests */
  it('should get by order id', async () => {
    /**
     * Tests the get by order id method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getByOrderId method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: OrderItem[] = [{
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
      createdAt: new Date('2024-10-17T10:10:03.619Z'),
      /* others data */
    }];

    mockOrderItemRepository.getByOrderId.mockResolvedValue(returnOject);

    const result = await service.getByOrderId(orderId);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.getByOrderId).toHaveBeenCalledWith(orderId);
  });

  it('should throw an error when get by order id method fails', async () => {
    const orderId: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.getByOrderId.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getByOrderId(orderId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get by product id success and failure tests */
  it('should get by product id', async () => {
    /**
     * Tests the get by product id method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getByProductId method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: OrderItem[] = [{
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
      createdAt: new Date('2024-10-17T10:10:03.619Z'),
      /* others data */
    }];

    mockOrderItemRepository.getByProductId.mockResolvedValue(returnOject);

    const result = await service.getByProductId(productId);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.getByProductId).toHaveBeenCalledWith(
      productId,
    );
  });

  it('should throw an error when get by product id method fails', async () => {
    const productId: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.getByProductId.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getByProductId(productId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* calculate total price success and failure tests */
  it('should calculate total price', async () => {
    /**
     * Tests the calculate total price method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's calculateTotalPrice method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: number = 1;

    mockOrderItemRepository.calculateTotalPrice.mockResolvedValue(returnOject);

    const result = await service.calculateTotalPrice(orderId);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.calculateTotalPrice).toHaveBeenCalledWith(
      orderId,
    );
  });

  it('should throw an error when calculate total price method fails', async () => {
    const orderId: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.calculateTotalPrice.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.calculateTotalPrice(orderId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get recent items success and failure tests */
  it('should get recent items', async () => {
    /**
     * Tests the get recent items method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getRecentItems method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: OrderItem[] = [{
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
      createdAt: new Date('2024-10-17T10:10:03.619Z'),
      /* others data */
    }];

    mockOrderItemRepository.getRecentItems.mockResolvedValue(returnOject);

    const result = await service.getRecentItems(orderId);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.getRecentItems).toHaveBeenCalledWith(
      orderId,
    );
  });

  it('should throw an error when get recent items method fails', async () => {
    const orderId: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.getRecentItems.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getRecentItems(orderId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get low stock items success and failure tests */
  it('should get low stock items', async () => {
    /**
     * Tests the get low stock items method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getLowStockItems method is called with the correct data.
     */

    const threshold: number = 1;

    const returnOject: OrderItem[] = [{
      id: 1,
      orderId: 1,
      productId: 1,
      quantity: 1,
      price: 1,
      createdAt: new Date('2024-10-17T10:10:03.619Z'),
      /* others data */
    }];

    mockOrderItemRepository.getLowStockItems.mockResolvedValue(returnOject);

    const result = await service.getLowStockItems(threshold);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.getLowStockItems).toHaveBeenCalledWith(
      threshold,
    );
  });

  it('should throw an error when get low stock items method fails', async () => {
    const threshold: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.getLowStockItems.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getLowStockItems(threshold)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from '../../src/application/services/order-item.service';
import { IOrderItemRepository } from '../../src/domain/repositories/order-item.repository';
import { OrderItem } from '../../src/domain/entities/order-item.entity';
import { OrderItemDTO } from '../../src/presentation/dtos/order-item.dto';

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

describe('OrderItemService', () => {
  let service: OrderItemService;
  let orderItemRepository: IOrderItemRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemService,
        {
          provide: 'OrderItemRepository',
          useValue: mockOrderItemRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<OrderItemService>(OrderItemService);
    orderItemRepository = module.get<IOrderItemRepository>(
      'OrderItemRepository',
    );
  });

  /* create success and failure tests */
  it('should create', async () => {
    /**
     * Tests the create method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's create method is called with the correct data.
     */

    const dto: OrderItemDTO = {
      /* data */
    };

    const returnOject: OrderItem = { id: 1 /* others data */ };

    mockOrderItemRepository.create.mockResolvedValue(returnOject);

    const result = await service.create(dto);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should throw an error when create method fails', async () => {
    const dto: OrderItemDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockOrderItemRepository.create.mockResolvedValue(' Repository error');

    const result = await service.create(dto);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get by id success and failure tests */
  it('should get by id', async () => {
    /**
     * Tests the get by id method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: OrderItem | null = { id: 1 /* others data */ };

    mockOrderItemRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getById(id);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.getById.mockResolvedValue(' Repository error');

    const result = await service.getById(id);
    expect(result).rejects.toThrow('Repository error');
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
      /* data */
    };

    const returnOject: OrderItem = { id: 1 /* others data */ };

    mockOrderItemRepository.update.mockResolvedValue(returnOject);

    const result = await service.update(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.update).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update method fails', async () => {
    const id: number = 1;
    const updates: Partial<OrderItemDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockOrderItemRepository.update.mockResolvedValue(' Repository error');

    const result = await service.update(id, updates);
    expect(result).rejects.toThrow('Repository error');
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
    mockOrderItemRepository.delete.mockResolvedValue(' Repository error');

    const result = await service.delete(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get by order id success and failure tests */
  it('should get by order id', async () => {
    /**
     * Tests the get by order id method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getByOrderId method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: OrderItem[] = [{ id: 1 /* others data */ }];

    mockOrderItemRepository.getByOrderId.mockResolvedValue(returnOject);

    const result = await service.getByOrderId(orderId);
    expect(result).toEqual(returnOject);
    expect(mockOrderItemRepository.getByOrderId).toHaveBeenCalledWith(orderId);
  });

  it('should throw an error when get by order id method fails', async () => {
    const orderId: number = 1;

    // Simulate a failure when calling the repository
    mockOrderItemRepository.getByOrderId.mockResolvedValue(' Repository error');

    const result = await service.getByOrderId(orderId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get by product id success and failure tests */
  it('should get by product id', async () => {
    /**
     * Tests the get by product id method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getByProductId method is called with the correct data.
     */

    const productId: number = 1;

    const returnOject: OrderItem[] = [{ id: 1 /* others data */ }];

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
    mockOrderItemRepository.getByProductId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getByProductId(productId);
    expect(result).rejects.toThrow('Repository error');
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
    mockOrderItemRepository.calculateTotalPrice.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.calculateTotalPrice(orderId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get recent items success and failure tests */
  it('should get recent items', async () => {
    /**
     * Tests the get recent items method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getRecentItems method is called with the correct data.
     */

    const orderId: number = 1;

    const returnOject: OrderItem[] = [{ id: 1 /* others data */ }];

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
    mockOrderItemRepository.getRecentItems.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getRecentItems(orderId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get low stock items success and failure tests */
  it('should get low stock items', async () => {
    /**
     * Tests the get low stock items method.
     * Verifies that the returned orderItem matches the expected one
     * and that the repository's getLowStockItems method is called with the correct data.
     */

    const threshold: number = 1;

    const returnOject: OrderItem[] = [{ id: 1 /* others data */ }];

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
    mockOrderItemRepository.getLowStockItems.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getLowStockItems(threshold);
    expect(result).rejects.toThrow('Repository error');
  });
});

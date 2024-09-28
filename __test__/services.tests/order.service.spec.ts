import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../../src/application/services/order.service';
import { IOrderRepository } from '../../src/domain/repositories/order.repository';
import { Order } from '../../src/domain/entities/order.entity';
import { OrderDTO } from '../../src/presentation/dtos/order.dto';

const mockOrderRepository = {
  createOrder: jest.fn(),
  getOrderById: jest.fn(),
  updateOrder: jest.fn(),
  deleteOrder: jest.fn(),
  getOrdersByUserId: jest.fn(),
  getOrdersByShopId: jest.fn(),
  getOrdersByStatus: jest.fn(),
  updateOrderStatus: jest.fn(),
  addPaymentToOrder: jest.fn(),
  addRefundToOrder: jest.fn(),
  getOrderByTrackingNumber: jest.fn(),
  getOrdersByDateRange: jest.fn(),
  getRecentOrdersByShop: jest.fn(),
  getTopOrdersByAmount: jest.fn(),
};

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: IOrderRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'OrderRepository',
          useValue: mockOrderRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<IOrderRepository>('OrderRepository');
  });

  /* create order success and failure tests */
  it('should create order', async () => {
    /**
     * Tests the create order method.
     * Verifies that the returned order matches the expected one
     * and that the repository's createOrder method is called with the correct data.
     */

    const orderDTO: OrderDTO = {
      /* data */
    };

    const returnOject: Order = { id: 1 /* others data */ };

    mockOrderRepository.createOrder.mockResolvedValue(returnOject);

    const result = await service.createOrder(orderDTO);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.createOrder).toHaveBeenCalledWith(orderDTO);
  });

  it('should throw an error when create order method fails', async () => {
    const orderDTO: OrderDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockOrderRepository.createOrder.mockResolvedValue(' Repository error');

    const result = await service.createOrder(orderDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get order by id success and failure tests */
  it('should get order by id', async () => {
    /**
     * Tests the get order by id method.
     * Verifies that the returned order matches the expected one
     * and that the repository's getOrderById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Order | null = { id: 1 /* others data */ };

    mockOrderRepository.getOrderById.mockResolvedValue(returnOject);

    const result = await service.getOrderById(id);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.getOrderById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get order by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockOrderRepository.getOrderById.mockResolvedValue(' Repository error');

    const result = await service.getOrderById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update order success and failure tests */
  it('should update order', async () => {
    /**
     * Tests the update order method.
     * Verifies that the returned order matches the expected one
     * and that the repository's updateOrder method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<OrderDTO> = {
      /* data */
    };

    const returnOject: Order = { id: 1 /* others data */ };

    mockOrderRepository.updateOrder.mockResolvedValue(returnOject);

    const result = await service.updateOrder(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.updateOrder).toHaveBeenCalledWith(id, updates);
  });

  it('should throw an error when update order method fails', async () => {
    const id: number = 1;
    const updates: Partial<OrderDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockOrderRepository.updateOrder.mockResolvedValue(' Repository error');

    const result = await service.updateOrder(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete order success and failure tests */
  it('should delete order', async () => {
    /**
     * Tests the delete order method.
     * Verifies that the returned order matches the expected one
     * and that the repository's deleteOrder method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockOrderRepository.deleteOrder.mockResolvedValue(returnOject);

    const result = await service.deleteOrder(id);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.deleteOrder).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete order method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockOrderRepository.deleteOrder.mockResolvedValue(' Repository error');

    const result = await service.deleteOrder(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get orders by user id success and failure tests */
  it('should get orders by user id', async () => {
    /**
     * Tests the get orders by user id method.
     * Verifies that the returned order matches the expected one
     * and that the repository's getOrdersByUserId method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Order[] = [{ id: 1 /* others data */ }];

    mockOrderRepository.getOrdersByUserId.mockResolvedValue(returnOject);

    const result = await service.getOrdersByUserId(userId);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.getOrdersByUserId).toHaveBeenCalledWith(userId);
  });

  it('should throw an error when get orders by user id method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockOrderRepository.getOrdersByUserId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getOrdersByUserId(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get orders by shop id success and failure tests */
  it('should get orders by shop id', async () => {
    /**
     * Tests the get orders by shop id method.
     * Verifies that the returned order matches the expected one
     * and that the repository's getOrdersByShopId method is called with the correct data.
     */

    const shopId: number = 1;

    const returnOject: Order[] = [{ id: 1 /* others data */ }];

    mockOrderRepository.getOrdersByShopId.mockResolvedValue(returnOject);

    const result = await service.getOrdersByShopId(shopId);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.getOrdersByShopId).toHaveBeenCalledWith(shopId);
  });

  it('should throw an error when get orders by shop id method fails', async () => {
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockOrderRepository.getOrdersByShopId.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getOrdersByShopId(shopId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get orders by status success and failure tests */
  it('should get orders by status', async () => {
    /**
     * Tests the get orders by status method.
     * Verifies that the returned order matches the expected one
     * and that the repository's getOrdersByStatus method is called with the correct data.
     */

    const status: OrderStatus = {
      /* data */
    };

    const returnOject: Order[] = [{ id: 1 /* others data */ }];

    mockOrderRepository.getOrdersByStatus.mockResolvedValue(returnOject);

    const result = await service.getOrdersByStatus(status);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.getOrdersByStatus).toHaveBeenCalledWith(status);
  });

  it('should throw an error when get orders by status method fails', async () => {
    const status: OrderStatus = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockOrderRepository.getOrdersByStatus.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getOrdersByStatus(status);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update order status success and failure tests */
  it('should update order status', async () => {
    /**
     * Tests the update order status method.
     * Verifies that the returned order matches the expected one
     * and that the repository's updateOrderStatus method is called with the correct data.
     */

    const id: number = 1;
    const status: OrderStatus = {
      /* data */
    };

    const returnOject: Order = { id: 1 /* others data */ };

    mockOrderRepository.updateOrderStatus.mockResolvedValue(returnOject);

    const result = await service.updateOrderStatus(id, status);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.updateOrderStatus).toHaveBeenCalledWith(
      id,
      status,
    );
  });

  it('should throw an error when update order status method fails', async () => {
    const id: number = 1;
    const status: OrderStatus = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockOrderRepository.updateOrderStatus.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateOrderStatus(id, status);
    expect(result).rejects.toThrow('Repository error');
  });

  /* add payment to order success and failure tests */
  it('should add payment to order', async () => {
    /**
     * Tests the add payment to order method.
     * Verifies that the returned order matches the expected one
     * and that the repository's addPaymentToOrder method is called with the correct data.
     */

    const orderId: number = 1;
    const paymentId: string = 'paymentId';

    const returnOject: Order = { id: 1 /* others data */ };

    mockOrderRepository.addPaymentToOrder.mockResolvedValue(returnOject);

    const result = await service.addPaymentToOrder(orderId, paymentId);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.addPaymentToOrder).toHaveBeenCalledWith(
      orderId,
      paymentId,
    );
  });

  it('should throw an error when add payment to order method fails', async () => {
    const orderId: number = 1;
    const paymentId: string = 'paymentId';

    // Simulate a failure when calling the repository
    mockOrderRepository.addPaymentToOrder.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.addPaymentToOrder(orderId, paymentId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* add refund to order success and failure tests */
  it('should add refund to order', async () => {
    /**
     * Tests the add refund to order method.
     * Verifies that the returned order matches the expected one
     * and that the repository's addRefundToOrder method is called with the correct data.
     */

    const orderId: number = 1;
    const refundId: string = 'refundId';

    const returnOject: Order = { id: 1 /* others data */ };

    mockOrderRepository.addRefundToOrder.mockResolvedValue(returnOject);

    const result = await service.addRefundToOrder(orderId, refundId);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.addRefundToOrder).toHaveBeenCalledWith(
      orderId,
      refundId,
    );
  });

  it('should throw an error when add refund to order method fails', async () => {
    const orderId: number = 1;
    const refundId: string = 'refundId';

    // Simulate a failure when calling the repository
    mockOrderRepository.addRefundToOrder.mockResolvedValue(' Repository error');

    const result = await service.addRefundToOrder(orderId, refundId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get order by tracking number success and failure tests */
  it('should get order by tracking number', async () => {
    /**
     * Tests the get order by tracking number method.
     * Verifies that the returned order matches the expected one
     * and that the repository's getOrderByTrackingNumber method is called with the correct data.
     */

    const trackingNumber: string = 'trackingNumber';

    const returnOject: Order | null = { id: 1 /* others data */ };

    mockOrderRepository.getOrderByTrackingNumber.mockResolvedValue(returnOject);

    const result = await service.getOrderByTrackingNumber(trackingNumber);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.getOrderByTrackingNumber).toHaveBeenCalledWith(
      trackingNumber,
    );
  });

  it('should throw an error when get order by tracking number method fails', async () => {
    const trackingNumber: string = 'trackingNumber';

    // Simulate a failure when calling the repository
    mockOrderRepository.getOrderByTrackingNumber.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getOrderByTrackingNumber(trackingNumber);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get orders by date range success and failure tests */
  it('should get orders by date range', async () => {
    /**
     * Tests the get orders by date range method.
     * Verifies that the returned order matches the expected one
     * and that the repository's getOrdersByDateRange method is called with the correct data.
     */

    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    const returnOject: Order[] = [{ id: 1 /* others data */ }];

    mockOrderRepository.getOrdersByDateRange.mockResolvedValue(returnOject);

    const result = await service.getOrdersByDateRange(startDate, endDate);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.getOrdersByDateRange).toHaveBeenCalledWith(
      startDate,
      endDate,
    );
  });

  it('should throw an error when get orders by date range method fails', async () => {
    const startDate: Date = {
      /* data */
    };
    const endDate: Date = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockOrderRepository.getOrdersByDateRange.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getOrdersByDateRange(startDate, endDate);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get recent orders by shop success and failure tests */
  it('should get recent orders by shop', async () => {
    /**
     * Tests the get recent orders by shop method.
     * Verifies that the returned order matches the expected one
     * and that the repository's getRecentOrdersByShop method is called with the correct data.
     */

    const shopId: number = 1;
    const limit: number = 1;

    const returnOject: Order[] = [{ id: 1 /* others data */ }];

    mockOrderRepository.getRecentOrdersByShop.mockResolvedValue(returnOject);

    const result = await service.getRecentOrdersByShop(shopId, limit);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.getRecentOrdersByShop).toHaveBeenCalledWith(
      shopId,
      limit,
    );
  });

  it('should throw an error when get recent orders by shop method fails', async () => {
    const shopId: number = 1;
    const limit: number = 1;

    // Simulate a failure when calling the repository
    mockOrderRepository.getRecentOrdersByShop.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getRecentOrdersByShop(shopId, limit);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get top orders by amount success and failure tests */
  it('should get top orders by amount', async () => {
    /**
     * Tests the get top orders by amount method.
     * Verifies that the returned order matches the expected one
     * and that the repository's getTopOrdersByAmount method is called with the correct data.
     */

    const topN: number = 1;

    const returnOject: Order[] = [{ id: 1 /* others data */ }];

    mockOrderRepository.getTopOrdersByAmount.mockResolvedValue(returnOject);

    const result = await service.getTopOrdersByAmount(topN);
    expect(result).toEqual(returnOject);
    expect(mockOrderRepository.getTopOrdersByAmount).toHaveBeenCalledWith(topN);
  });

  it('should throw an error when get top orders by amount method fails', async () => {
    const topN: number = 1;

    // Simulate a failure when calling the repository
    mockOrderRepository.getTopOrdersByAmount.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getTopOrdersByAmount(topN);
    expect(result).rejects.toThrow('Repository error');
  });
});

import { Inject, Injectable } from '@nestjs/common';
import { Payment } from 'src/domain/entities/payment.entity';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { IPaymentRepository } from 'src/domain/repositories/payment.repository';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { fromPaymentDTO } from '../helper/to-entity/to.payment.entity';
/**
 * Service for managing payments.
 * Provides methods to perform CRUD operations and other business logic related to payments.
 */
@Injectable()
export class PaymentService {
  constructor(
    @Inject('IPaymentRepository')
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  /**
   * Creates a new payment record.
   * @param paymentDTO - The PaymentDTO containing the payment data.
   * @returns A promise that resolves to the created Payment entity.
   */
  async createPayment(paymentDTO: PaymentDTO): Promise<Payment> {
    // Convert DTO to entity
    const payment = fromPaymentDTO(paymentDTO);
    // Delegate creation to the repository
    return this.paymentRepository.create(payment);
  }

  /**
   * Retrieves a Payment by its unique ID.
   * @param id - The unique ID of the Payment.
   * @returns A promise that resolves to the Payment entity if found, otherwise null.
   */
  async getPaymentById(id: number): Promise<Payment | null> {
    return this.paymentRepository.getById(id);
  }

  /**
   * Updates an existing Payment record.
   * @param id - The unique ID of the Payment.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated Payment entity.
   */
  async updatePayment(
    id: number,
    updates: Partial<PaymentDTO>,
  ): Promise<Payment> {
    const updatedPayment = fromPaymentDTO(updates);
    return this.paymentRepository.update(id, updatedPayment);
  }

  /**
   * Deletes a Payment by its unique ID.
   * @param id - The unique ID of the Payment.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deletePayment(id: number): Promise<boolean> {
    return this.paymentRepository.delete(id);
  }

  /**
   * Retrieves all Payments associated with a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to an array of Payments for the specified Order.
   */
  async getPaymentsByOrderId(orderId: number): Promise<Payment[]> {
    return this.paymentRepository.getByOrderId(orderId);
  }

  /**
   * Retrieves all Payments made using a specific method.
   * @param method - The payment method used (e.g., Stripe, PayPal).
   * @returns A promise that resolves to an array of Payments for the specified method.
   */
  async getPaymentsByMethod(method: string): Promise<Payment[]> {
    return this.paymentRepository.getByMethod(method);
  }

  /**
   * Retrieves all Payments with a specific status.
   * @param status - The status of Payments to retrieve (e.g., SUCCESS, FAILED).
   * @returns A promise that resolves to an array of Payments with the specified status.
   */
  async getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]> {
    return this.paymentRepository.getByStatus(status);
  }

  /**
   * Retrieves Payments made within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Payments within the specified date range.
   */
  async getPaymentsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Payment[]> {
    return this.paymentRepository.getByDateRange(startDate, endDate);
  }

  /**
   * Retrieves the total amount of Payments made within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to the total amount of Payments in the date range.
   */
  async getTotalAmountByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<number> {
    return this.paymentRepository.getTotalAmountByDateRange(startDate, endDate);
  }

  /**
   * Retrieves the most recent Payment for a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to the most recent Payment for the specified Order.
   */
  async getMostRecentPaymentByOrderId(
    orderId: number,
  ): Promise<Payment | null> {
    return this.paymentRepository.getMostRecentPaymentByOrderId(orderId);
  }

  /**
   * Retrieves Payments grouped by payment method.
   * @returns A promise that resolves to a map of payment methods to arrays of Payments.
   */
  async getPaymentsGroupedByMethod(): Promise<Map<string, Payment[]>> {
    return this.paymentRepository.getPaymentsGroupedByMethod();
  }
}

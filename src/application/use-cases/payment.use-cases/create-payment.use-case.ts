import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../../application/services/payment.service';
import { PaymentDTO } from '../../../presentation/dtos/payment.dto';
import { toPaymentDTO } from '../../../application/helper/to-dto/to.payment.dto';
import { PayPalService } from '../../../infrastructure/external-services/payment-service/paypal.service';
import { StripeService } from '../../../infrastructure/external-services/payment-service/stripe.service';

/**
 * Use case class for creating payments.
 */
@Injectable()
export class CreatePayment {
  constructor(private readonly paymentService: PaymentService,
    private readonly paypalService: PayPalService,
    private readonly stripeService: StripeService,
  ) { }

  /**
   * Execute the create-payment use case.
   * @param paymentDTO - The PaymentDTO containing the payment data.
   * @returns A promise that resolves to the created Payment DTO.
   */
  async execute(paymentDTO: PaymentDTO): Promise<PaymentDTO | null> {
    var paymentResult: any;
    try {
      if (paymentDTO.method.toUpperCase() == 'PAYPAL') {
        paymentResult = await this.paypalService.createOrder(paymentDTO.currency, paymentDTO.amount)
      } else if (paymentDTO.method.toUpperCase() == 'STRIPE') {
        console.log('Début du paiement avec les données:', paymentDTO);
        paymentResult = await this.stripeService.createPaymentIntent(paymentDTO.currency, paymentDTO.amount)
      } else {
        console.log('La methode de paiment spécifiée n\'est pas prise en compte: ' + paymentDTO.method);
        return;
      }
      console.log('resultat du paiement: ' + JSON.stringify(paymentResult));
      const payment = await this.paymentService.createPayment(paymentDTO);
      if (!payment) return null;
      return toPaymentDTO(payment);
    } catch (error) {
      console.log("Failed to create payment: " + error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // @ts-ignore
      apiVersion: null,
    });
  }

  async createPaymentIntent(currency: string, amount: number) {
    try {
      console.log('Tentative de création du paiement Stripe:', { currency, amount });
      console.log('Clé Stripe utilisée:', process.env.STRIPE_SECRET_KEY?.substring(0, 8) + '...');

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: currency.toLowerCase(),
      });

      console.log('PaymentIntent créé:', paymentIntent.id);
      return paymentIntent;
    } catch (error) {
      console.error('Erreur Stripe détaillée:', error);
      throw error;
    }
  }
}

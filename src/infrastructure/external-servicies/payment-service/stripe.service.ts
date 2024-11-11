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

  async createPaymentIntent(amount: number, currency: string) {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
}

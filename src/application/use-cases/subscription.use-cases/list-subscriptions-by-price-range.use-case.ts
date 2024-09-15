import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from 'src/application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from 'src/application/services/subscription.service';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';

/**
 * Use case class for listing subscriptions within a price range.
 * This class encapsulates the business logic for retrieving subscriptions within a specific price range.
 */
@Injectable()
export class ListSubscriptionsByPriceRange {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Execute the list-subscriptions-by-price-range use case.
   * @param minPrice - Minimum price.
   * @param maxPrice - Maximum price.
   * @returns A promise that resolves to an array of Subscription DTOs within the price range.
   */
  async execute(
    minPrice: number,
    maxPrice: number,
  ): Promise<SubscriptionDTO[]> {
    const subscriptions =
      await this.subscriptionService.getSubscriptionsByPriceRange(
        minPrice,
        maxPrice,
      );
    return subscriptions.map(toSubscriptionDTO);
  }
}

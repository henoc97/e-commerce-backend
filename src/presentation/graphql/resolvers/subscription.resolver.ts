import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';
import { CountSubscriptionsByVendor } from 'src/application/use-cases/subscription.use-cases/count-subscriptions-by-vendor.use-case';
import { CreateSubscription } from 'src/application/use-cases/subscription.use-cases/create-subscription.use-case';
import { DeleteSubscription } from 'src/application/use-cases/subscription.use-cases/delete-subscription.use-case';
import { FetchLatestSubscription } from 'src/application/use-cases/subscription.use-cases/fetch-latest-subscription.use-case';
import { FetchSubscriptionById } from 'src/application/use-cases/subscription.use-cases/fetch-subscription-by-id.use-case';
import { ListActiveSubscriptions } from 'src/application/use-cases/subscription.use-cases/list-active-subscriptions.use-case';
import { ListExpiredSubscriptions } from 'src/application/use-cases/subscription.use-cases/list-expired-subscriptions.use-case';
import { ListExpiringSubscriptions } from 'src/application/use-cases/subscription.use-cases/list-expiring-subscriptions.use-case';
import { ListSubscriptionsByPriceRange } from 'src/application/use-cases/subscription.use-cases/list-subscriptions-by-price-range.use-case';
import { ListSubscriptionsByVendor } from 'src/application/use-cases/subscription.use-cases/list-subscriptions-by-vendor.use-case';
import { UpdateSubscription } from 'src/application/use-cases/subscription.use-cases/update-subscription.use-case';

@Resolver(() => SubscriptionDTO)
export class SubscriptionResolver {
  constructor(
    private readonly countSubscriptionsByVendorUseCase: CountSubscriptionsByVendor,
    private readonly createSubscriptionUseCase: CreateSubscription,
    private readonly deleteSubscriptionUseCase: DeleteSubscription,
    private readonly fetchLatestSubscriptionUseCase: FetchLatestSubscription,
    private readonly fetchSubscriptionByIdUseCase: FetchSubscriptionById,
    private readonly listActiveSubscriptionsUseCase: ListActiveSubscriptions,
    private readonly listExpiredSubscriptionsUseCase: ListExpiredSubscriptions,
    private readonly listExpiringSubscriptionsUseCase: ListExpiringSubscriptions,
    private readonly listSubscriptionsByPriceRangeUseCase: ListSubscriptionsByPriceRange,
    private readonly listSubscriptionsByVendorUseCase: ListSubscriptionsByVendor,
    private readonly updateSubscriptionUseCase: UpdateSubscription,
  ) {}

  @Query(() => [SubscriptionDTO])
  async listActiveSubscriptions() {
    return this.listActiveSubscriptionsUseCase.execute();
  }

  @Query(() => [SubscriptionDTO])
  async listExpiredSubscriptions() {
    return this.listExpiredSubscriptionsUseCase.execute();
  }

  @Query(() => [SubscriptionDTO])
  async listExpiringSubscriptions(@Args('days') days: number) {
    return this.listExpiringSubscriptionsUseCase.execute(days);
  }

  @Query(() => [SubscriptionDTO])
  async listSubscriptionsByPriceRange(
    @Args('minPrice') minPrice: number,
    @Args('maxPrice') maxPrice: number,
  ) {
    return this.listSubscriptionsByPriceRangeUseCase.execute(
      minPrice,
      maxPrice,
    );
  }

  @Query(() => [SubscriptionDTO])
  async listSubscriptionsByVendor(@Args('vendorId') vendorId: number) {
    return this.listSubscriptionsByVendorUseCase.execute(vendorId);
  }

  @Query(() => SubscriptionDTO, { nullable: true })
  async fetchSubscriptionById(@Args('id') id: number) {
    return this.fetchSubscriptionByIdUseCase.execute(id);
  }

  @Query(() => SubscriptionDTO, { nullable: true })
  async fetchLatestSubscription() {
    return this.fetchLatestSubscriptionUseCase.execute();
  }

  @Mutation(() => SubscriptionDTO, { nullable: true })
  async createSubscription(
    @Args('subscriptionDTO') subscriptionDTO: SubscriptionDTO,
  ) {
    return this.createSubscriptionUseCase.execute(subscriptionDTO);
  }

  @Mutation(() => Boolean)
  async deleteSubscription(@Args('id') id: number) {
    return this.deleteSubscriptionUseCase.execute(id);
  }

  @Mutation(() => SubscriptionDTO, { nullable: true })
  async updateSubscription(
    @Args('id') id: number,
    @Args('updates') updates: Partial<SubscriptionDTO>,
  ) {
    return this.updateSubscriptionUseCase.execute(id, updates);
  }

  @Query(() => Number)
  async countSubscriptionsByVendor(@Args('vendorId') vendorId: number) {
    return this.countSubscriptionsByVendorUseCase.execute(vendorId);
  }
}

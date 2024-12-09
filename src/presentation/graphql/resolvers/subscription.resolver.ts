import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubscriptionDTO } from '../../../presentation/dtos/subscription.dto';
import { CountSubscriptionsByVendor } from '../../../application/use-cases/subscription.use-cases/count-subscriptions-by-vendor.use-case';
import { CreateSubscription } from '../../../application/use-cases/subscription.use-cases/create-subscription.use-case';
import { DeleteSubscription } from '../../../application/use-cases/subscription.use-cases/delete-subscription.use-case';
import { FetchLatestSubscription } from '../../../application/use-cases/subscription.use-cases/fetch-latest-subscription.use-case';
import { FetchSubscriptionById } from '../../../application/use-cases/subscription.use-cases/fetch-subscription-by-id.use-case';
import { ListActiveSubscriptions } from '../../../application/use-cases/subscription.use-cases/list-active-subscriptions.use-case';
import { ListExpiredSubscriptions } from '../../../application/use-cases/subscription.use-cases/list-expired-subscriptions.use-case';
import { ListExpiringSubscriptions } from '../../../application/use-cases/subscription.use-cases/list-expiring-subscriptions.use-case';
import { ListSubscriptionsByPriceRange } from '../../../application/use-cases/subscription.use-cases/list-subscriptions-by-price-range.use-case';
import { ListSubscriptionsByVendor } from '../../../application/use-cases/subscription.use-cases/list-subscriptions-by-vendor.use-case';
import { UpdateSubscription } from '../../../application/use-cases/subscription.use-cases/update-subscription.use-case';
import { transformSubscriptionDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { SubscriptionOutput } from '../../../presentation/output/subscription.output';
import { toSubscriptionDTO } from '../../../application/helper/to-dto/to.subscription.dto';
import { SubscriptionInput } from '../../../presentation/input/subscription.input';

@Resolver(() => SubscriptionOutput)
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
  ) { }

  @Query(() => [SubscriptionOutput])
  async listActiveSubscriptions(): Promise<SubscriptionOutput[]> {
    const result = await this.listActiveSubscriptionsUseCase.execute();
    return result?.map(transformSubscriptionDTOToGraphQL);
  }

  @Query(() => [SubscriptionOutput])
  async listExpiredSubscriptions(): Promise<SubscriptionOutput[]> {
    const result = await this.listExpiredSubscriptionsUseCase.execute();
    return result?.map(transformSubscriptionDTOToGraphQL);
  }

  @Query(() => [SubscriptionOutput])
  async listExpiringSubscriptions(@Args('days') days: number): Promise<SubscriptionOutput[]> {
    const result = await this.listExpiringSubscriptionsUseCase.execute(days);
    return result?.map(transformSubscriptionDTOToGraphQL);
  }

  @Query(() => [SubscriptionOutput])
  async listSubscriptionsByPriceRange(
    @Args('minPrice') minPrice: number,
    @Args('maxPrice') maxPrice: number,
  ): Promise<SubscriptionOutput[]> {
    const result = await this.listSubscriptionsByPriceRangeUseCase.execute(minPrice, maxPrice);
    return result?.map(transformSubscriptionDTOToGraphQL);
  }

  @Query(() => [SubscriptionOutput])
  async listSubscriptionsByVendor(@Args('vendorId') vendorId: number): Promise<SubscriptionOutput[]> {
    const result = await this.listSubscriptionsByVendorUseCase.execute(vendorId);
    return result?.map(transformSubscriptionDTOToGraphQL);
  }

  @Query(() => SubscriptionOutput, { nullable: true })
  async fetchSubscriptionById(@Args('id') id: number): Promise<SubscriptionOutput | null> {
    const result = await this.fetchSubscriptionByIdUseCase.execute(id);
    return transformSubscriptionDTOToGraphQL(result);
  }

  @Query(() => SubscriptionOutput, { nullable: true })
  async fetchLatestSubscription(): Promise<SubscriptionOutput | null> {
    const result = await this.fetchLatestSubscriptionUseCase.execute();
    return transformSubscriptionDTOToGraphQL(result);
  }

  @Mutation(() => SubscriptionOutput, { nullable: true })
  async createSubscription(
    @Args('subscription') subscription: SubscriptionInput,
  ): Promise<SubscriptionOutput | null> {
    const dto = toSubscriptionDTO(subscription)
    const result = await this.createSubscriptionUseCase.execute(dto);
    return transformSubscriptionDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deleteSubscription(@Args('id') id: number): Promise<boolean> {
    return this.deleteSubscriptionUseCase.execute(id);
  }

  @Mutation(() => SubscriptionOutput, { nullable: true })
  async updateSubscription(
    @Args('id') id: number,
    @Args('updates') updates: SubscriptionInput,
  ): Promise<SubscriptionOutput | null> {
    const result = await this.updateSubscriptionUseCase.execute(id, updates);
    return transformSubscriptionDTOToGraphQL(result);
  }

  @Query(() => Number)
  async countSubscriptionsByVendor(@Args('vendorId') vendorId: number): Promise<number> {
    return this.countSubscriptionsByVendorUseCase.execute(vendorId);
  }
}

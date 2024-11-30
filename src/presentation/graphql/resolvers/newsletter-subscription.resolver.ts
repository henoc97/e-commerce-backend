import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CheckEmailSubscribed } from 'src/application/use-cases/newsletter-subscription.use-cases/check-email-subscribed.use-case';
import { CountTotalNewsletterSubscriptions } from 'src/application/use-cases/newsletter-subscription.use-cases/count-total-newsletter-subscriptions.use-case';
import { CreateNewsletterSubscription } from 'src/application/use-cases/newsletter-subscription.use-cases/create-newsletter-subscription.use-case';
import { DeleteNewsletterSubscription } from 'src/application/use-cases/newsletter-subscription.use-cases/delete-newsletter-subscription.use-case';
import { FetchNewsletterSubscriptionByEmail } from 'src/application/use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscription-by-email.use-case';
import { FetchNewsletterSubscriptionById } from 'src/application/use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscription-by-id.use-case';
import { FetchNewsletterSubscriptionsByDateRange } from 'src/application/use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscriptions-by-date-range.use-case';
import { ListNewsletterSubscriptions } from 'src/application/use-cases/newsletter-subscription.use-cases/list-newsletter-subscriptions.use-case';
import { UpdateNewsletterSubscription } from 'src/application/use-cases/newsletter-subscription.use-cases/update-newsletter-subscription.use-case';
import { transformNewsletterDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { NewsletterSubscriptionOutput } from 'src/presentation/output/newsletter-subscription.output';
import { NewsletterSubscriptionInput } from 'src/presentation/input/newsletter-subscription.input';

@Resolver(() => NewsletterSubscriptionOutput)
export class NewsletterSubscriptionResolver {
  constructor(
    private readonly checkEmailSubscribedUseCase: CheckEmailSubscribed,
    private readonly countTotalNewsletterSubscriptionsUseCase: CountTotalNewsletterSubscriptions,
    private readonly createNewsletterSubscriptionUseCase: CreateNewsletterSubscription,
    private readonly deleteNewsletterSubscriptionUseCase: DeleteNewsletterSubscription,
    private readonly fetchNewsletterSubscriptionByEmailUseCase: FetchNewsletterSubscriptionByEmail,
    private readonly fetchNewsletterSubscriptionByIdUseCase: FetchNewsletterSubscriptionById,
    private readonly fetchNewsletterSubscriptionsByDateRangeUseCase: FetchNewsletterSubscriptionsByDateRange,
    private readonly listNewsletterSubscriptionsUseCase: ListNewsletterSubscriptions,
    private readonly updateNewsletterSubscriptionUseCase: UpdateNewsletterSubscription,
  ) { }

  @Query(() => Boolean)
  async checkEmailSubscribed(
    @Args('email') email: string,
    @Args('shopId') shopId: number,
  ): Promise<boolean> {
    return this.checkEmailSubscribedUseCase.execute(email, shopId);
  }

  @Query(() => Number)
  async countTotalNewsletterSubscriptions(
    @Args('shopId') shopId: number,
  ): Promise<number> {
    return this.countTotalNewsletterSubscriptionsUseCase.execute(shopId);
  }

  @Query(() => NewsletterSubscriptionOutput, { nullable: true })
  async fetchNewsletterSubscriptionByEmail(
    @Args('email') email: string,
    @Args('shopId') shopId: number,
  ): Promise<NewsletterSubscriptionOutput | null> {
    const result = await this.fetchNewsletterSubscriptionByEmailUseCase.execute(
      email,
      shopId,
    );
    return transformNewsletterDTOToGraphQL(result);
  }

  @Query(() => NewsletterSubscriptionOutput, { nullable: true })
  async fetchNewsletterSubscriptionById(
    @Args('id') id: number,
  ): Promise<NewsletterSubscriptionOutput | null> {
    const result = await this.fetchNewsletterSubscriptionByIdUseCase.execute(id);
    return transformNewsletterDTOToGraphQL(result);
  }

  @Query(() => [NewsletterSubscriptionOutput])
  async fetchNewsletterSubscriptionsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
    @Args('shopId') shopId: number,
  ): Promise<NewsletterSubscriptionOutput[]> {
    const result = await this.fetchNewsletterSubscriptionsByDateRangeUseCase.execute(
      startDate,
      endDate,
      shopId,
    );
    return result?.map(transformNewsletterDTOToGraphQL);
  }

  @Query(() => [NewsletterSubscriptionOutput])
  async listNewsletterSubscriptions(
    @Args('shopId') shopId: number,
  ): Promise<NewsletterSubscriptionOutput[]> {
    const result = await this.listNewsletterSubscriptionsUseCase.execute(shopId);
    return result?.map(transformNewsletterDTOToGraphQL);
  }

  @Mutation(() => NewsletterSubscriptionOutput, { nullable: true })
  async createNewsletterSubscription(
    @Args('dto') dto: NewsletterSubscriptionInput,
  ): Promise<NewsletterSubscriptionOutput | null> {
    const result = await this.createNewsletterSubscriptionUseCase.execute(dto);
    return transformNewsletterDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deleteNewsletterSubscription(@Args('id') id: number): Promise<boolean> {
    return this.deleteNewsletterSubscriptionUseCase.execute(id);
  }

  @Mutation(() => NewsletterSubscriptionOutput, { nullable: true })
  async updateNewsletterSubscription(
    @Args('id') id: number,
    @Args('dto') dto: NewsletterSubscriptionInput,
  ): Promise<NewsletterSubscriptionOutput | null> {
    const result = await this.updateNewsletterSubscriptionUseCase.execute(id, dto);
    return transformNewsletterDTOToGraphQL(result);
  }
}

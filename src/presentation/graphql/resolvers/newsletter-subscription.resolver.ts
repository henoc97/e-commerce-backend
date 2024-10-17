import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NewsletterSubscriptionDTO } from 'src/presentation/dtos/newsletter-subscription.dto';
import { CheckEmailSubscribed } from 'src/application/use-cases/newsletter-subscription.use-cases/check-email-subscribed.use-case';
import { CountTotalNewsletterSubscriptions } from 'src/application/use-cases/newsletter-subscription.use-cases/count-total-newsletter-subscriptions.use-case';
import { CreateNewsletterSubscription } from 'src/application/use-cases/newsletter-subscription.use-cases/create-newsletter-subscription.use-case';
import { DeleteNewsletterSubscription } from 'src/application/use-cases/newsletter-subscription.use-cases/delete-newsletter-subscription.use-case';
import { FetchNewsletterSubscriptionByEmail } from 'src/application/use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscription-by-email.use-case';
import { FetchNewsletterSubscriptionById } from 'src/application/use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscription-by-id.use-case';
import { FetchNewsletterSubscriptionsByDateRange } from 'src/application/use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscriptions-by-date-range.use-case';
import { ListNewsletterSubscriptions } from 'src/application/use-cases/newsletter-subscription.use-cases/list-newsletter-subscriptions.use-case';
import { UpdateNewsletterSubscription } from 'src/application/use-cases/newsletter-subscription.use-cases/update-newsletter-subscription.use-case';

@Resolver(() => NewsletterSubscriptionDTO)
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
  ) {}

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

  @Query(() => NewsletterSubscriptionDTO, { nullable: true })
  async fetchNewsletterSubscriptionByEmail(
    @Args('email') email: string,
    @Args('shopId') shopId: number,
  ): Promise<NewsletterSubscriptionDTO | null> {
    return this.fetchNewsletterSubscriptionByEmailUseCase.execute(
      email,
      shopId,
    );
  }

  @Query(() => NewsletterSubscriptionDTO, { nullable: true })
  async fetchNewsletterSubscriptionById(
    @Args('id') id: number,
  ): Promise<NewsletterSubscriptionDTO | null> {
    return this.fetchNewsletterSubscriptionByIdUseCase.execute(id);
  }

  @Query(() => [NewsletterSubscriptionDTO])
  async fetchNewsletterSubscriptionsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
    @Args('shopId') shopId: number,
  ): Promise<NewsletterSubscriptionDTO[]> {
    return this.fetchNewsletterSubscriptionsByDateRangeUseCase.execute(
      startDate,
      endDate,
      shopId,
    );
  }

  @Query(() => [NewsletterSubscriptionDTO])
  async listNewsletterSubscriptions(
    @Args('shopId') shopId: number,
  ): Promise<NewsletterSubscriptionDTO[]> {
    return this.listNewsletterSubscriptionsUseCase.execute(shopId);
  }

  @Mutation(() => NewsletterSubscriptionDTO, { nullable: true })
  async createNewsletterSubscription(
    @Args('dto') dto: NewsletterSubscriptionDTO,
  ): Promise<NewsletterSubscriptionDTO | null> {
    return this.createNewsletterSubscriptionUseCase.execute(dto);
  }

  @Mutation(() => Boolean)
  async deleteNewsletterSubscription(@Args('id') id: number): Promise<boolean> {
    return this.deleteNewsletterSubscriptionUseCase.execute(id);
  }

  @Mutation(() => NewsletterSubscriptionDTO, { nullable: true })
  async updateNewsletterSubscription(
    @Args('id') id: number,
    @Args('dto') dto: Partial<NewsletterSubscriptionDTO>,
  ): Promise<NewsletterSubscriptionDTO | null> {
    return this.updateNewsletterSubscriptionUseCase.execute(id, dto);
  }
}

import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ApplyPromotionToProduct } from 'src/application/use-cases/promotion.use-cases/apply-promotion-to-product.use-case';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';
import { CombinePromotions } from 'src/application/use-cases/promotion.use-cases/combine-promotions.use-case';
import { CreatePromotion } from 'src/application/use-cases/promotion.use-cases/create-promotion.use-case';
import { DeletePromotion } from 'src/application/use-cases/promotion.use-cases/delete-promotion.use-case';
import { FetchActivePromotionsBetween } from 'src/application/use-cases/promotion.use-cases/fetch-active-promotions-between.use-case';
import { FetchActivePromotions } from 'src/application/use-cases/promotion.use-cases/fetch-active-promotions.use-case';
import { FetchBestPromotionForProduct } from 'src/application/use-cases/promotion.use-cases/fetch-best-promotion-for-product.use-case';
import { FetchPromotionById } from 'src/application/use-cases/promotion.use-cases/fetch-promotion-by-id.use-case';
import { FetchPromotionsByProduct } from 'src/application/use-cases/promotion.use-cases/fetch-promotions-by-product.use-case';
import { UpdatePromotion } from 'src/application/use-cases/promotion.use-cases/update-promotion.use-case';

@Resolver()
export class PromotionResolver {
  constructor(
    private readonly applyPromotionToProductUseCase: ApplyPromotionToProduct,
    private readonly combinePromotionsUseCase: CombinePromotions,
    private readonly createPromotionUseCase: CreatePromotion,
    private readonly deletePromotionUseCase: DeletePromotion,
    private readonly fetchActivePromotionsBetweenUseCase: FetchActivePromotionsBetween,
    private readonly fetchActivePromotionsUseCase: FetchActivePromotions,
    private readonly fetchBestPromotionForProductUseCase: FetchBestPromotionForProduct,
    private readonly fetchPromotionByIdUseCase: FetchPromotionById,
    private readonly fetchPromotionsByProductUseCase: FetchPromotionsByProduct,
    private readonly updatePromotionUseCase: UpdatePromotion,
  ) {}

  @Mutation(() => PromotionDTO)
  async applyPromotionToProduct(
    @Args('productId') productId: number,
    @Args('promotionId') promotionId: number,
  ): Promise<PromotionDTO> {
    return this.applyPromotionToProductUseCase.execute(productId, promotionId);
  }

  @Mutation(() => PromotionDTO, { nullable: true })
  async combinePromotions(
    @Args({ name: 'promotions', type: () => [PromotionDTO] })
    promotions: PromotionDTO[],
  ): Promise<PromotionDTO | null> {
    return this.combinePromotionsUseCase.execute(promotions);
  }

  @Mutation(() => PromotionDTO, { nullable: true })
  async createPromotion(
    @Args('promotionDTO') promotionDTO: PromotionDTO,
  ): Promise<PromotionDTO | null> {
    return this.createPromotionUseCase.execute(promotionDTO);
  }

  @Mutation(() => Boolean)
  async deletePromotion(
    @Args('promotionId') promotionId: number,
  ): Promise<boolean> {
    return this.deletePromotionUseCase.execute(promotionId);
  }

  @Query(() => [PromotionDTO])
  async fetchActivePromotionsBetween(
    @Args('start') start: Date,
    @Args('end') end: Date,
  ): Promise<PromotionDTO[]> {
    return this.fetchActivePromotionsBetweenUseCase.execute(start, end);
  }

  @Query(() => [PromotionDTO])
  async fetchActivePromotions(): Promise<PromotionDTO[]> {
    return this.fetchActivePromotionsUseCase.execute();
  }

  @Query(() => PromotionDTO, { nullable: true })
  async fetchBestPromotionForProduct(
    @Args('productId') productId: number,
  ): Promise<PromotionDTO | null> {
    return this.fetchBestPromotionForProductUseCase.execute(productId);
  }

  @Query(() => PromotionDTO, { nullable: true })
  async fetchPromotionById(
    @Args('id') id: number,
  ): Promise<PromotionDTO | null> {
    return this.fetchPromotionByIdUseCase.execute(id);
  }

  @Query(() => [PromotionDTO])
  async fetchPromotionsByProduct(
    @Args('productId') productId: number,
  ): Promise<PromotionDTO[]> {
    return this.fetchPromotionsByProductUseCase.execute(productId);
  }

  @Mutation(() => PromotionDTO, { nullable: true })
  async updatePromotion(
    @Args('promotionId') promotionId: number,
    @Args('promotionDTO') promotionDTO: PromotionDTO,
  ): Promise<PromotionDTO | null> {
    return this.updatePromotionUseCase.execute(promotionId, promotionDTO);
  }
}

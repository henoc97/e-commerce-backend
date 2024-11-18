import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
// import { ApplyPromotionToProduct } from 'src/application/use-cases/promotion.use-cases/apply-promotion-to-product.use-case';
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
import { Promotion } from 'src/generated/graphql';
import { transformPromotionDTOToGraphQL } from 'src/application/helper/utils/transformers';

@Resolver(() => PromotionDTO)
export class PromotionResolver {
  constructor(
    // private readonly applyPromotionToProductUseCase: ApplyPromotionToProduct,
    private readonly combinePromotionsUseCase: CombinePromotions,
    private readonly createPromotionUseCase: CreatePromotion,
    private readonly deletePromotionUseCase: DeletePromotion,
    private readonly fetchActivePromotionsBetweenUseCase: FetchActivePromotionsBetween,
    private readonly fetchActivePromotionsUseCase: FetchActivePromotions,
    private readonly fetchBestPromotionForProductUseCase: FetchBestPromotionForProduct,
    private readonly fetchPromotionByIdUseCase: FetchPromotionById,
    private readonly fetchPromotionsByProductUseCase: FetchPromotionsByProduct,
    private readonly updatePromotionUseCase: UpdatePromotion,
  ) { }

  // @Mutation(() => PromotionDTO)
  // async applyPromotionToProduct(
  //   @Args('productId') productId: number,
  //   @Args('promotionId') promotionId: number,
  // ): Promise<PromotionDTO> {
  //   return this.applyPromotionToProductUseCase.execute(productId, promotionId);
  // }

  @Mutation(() => PromotionDTO, { nullable: true })
  async combinePromotions(
    @Args({ name: 'promotions', type: () => [PromotionDTO] })
    promotions: PromotionDTO[],
  ): Promise<Promotion | null> {
    const result = await this.combinePromotionsUseCase.execute(promotions);
    return transformPromotionDTOToGraphQL(result)
  }

  @Mutation(() => PromotionDTO, { nullable: true })
  async createPromotion(
    @Args('promotionDTO') promotionDTO: PromotionDTO,
  ): Promise<Promotion | null> {
    const result = await this.createPromotionUseCase.execute(promotionDTO);
    return transformPromotionDTOToGraphQL(result)
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
  ): Promise<Promotion[]> {
    const result = await this.fetchActivePromotionsBetweenUseCase.execute(start, end);
    return result.map(transformPromotionDTOToGraphQL)
  }

  @Query(() => [PromotionDTO])
  async fetchActivePromotions(): Promise<Promotion[]> {
    const result = await this.fetchActivePromotionsUseCase.execute();
    return result.map(transformPromotionDTOToGraphQL)
  }

  @Query(() => PromotionDTO, { nullable: true })
  async fetchBestPromotionForProduct(
    @Args('productId') productId: number,
  ): Promise<Promotion | null> {
    const result = await this.fetchBestPromotionForProductUseCase.execute(productId);
    return transformPromotionDTOToGraphQL(result)
  }

  @Query(() => PromotionDTO, { nullable: true })
  async fetchPromotionById(
    @Args('id') id: number,
  ): Promise<Promotion | null> {
    const result = await this.fetchPromotionByIdUseCase.execute(id);
    return transformPromotionDTOToGraphQL(result)
  }

  @Query(() => [PromotionDTO])
  async fetchPromotionsByProduct(
    @Args('productId') productId: number,
  ): Promise<Promotion[]> {
    const result = await this.fetchPromotionsByProductUseCase.execute(productId);
    return result.map(transformPromotionDTOToGraphQL)
  }

  @Mutation(() => PromotionDTO, { nullable: true })
  async updatePromotion(
    @Args('promotionId') promotionId: number,
    @Args('promotionDTO') promotionDTO: PromotionDTO,
  ): Promise<Promotion | null> {
    const result = await this.updatePromotionUseCase.execute(promotionId, promotionDTO);
    return transformPromotionDTOToGraphQL(result)
  }
}

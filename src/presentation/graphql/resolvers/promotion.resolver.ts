import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
// import { ApplyPromotionToProduct } from '../../../application/use-cases/promotion.use-cases/apply-promotion-to-product.use-case';
import { PromotionDTO } from '../../../presentation/dtos/promotion.dto';
import { CombinePromotions } from '../../../application/use-cases/promotion.use-cases/combine-promotions.use-case';
import { CreatePromotion } from '../../../application/use-cases/promotion.use-cases/create-promotion.use-case';
import { DeletePromotion } from '../../../application/use-cases/promotion.use-cases/delete-promotion.use-case';
import { FetchActivePromotionsBetween } from '../../../application/use-cases/promotion.use-cases/fetch-active-promotions-between.use-case';
import { FetchActivePromotions } from '../../../application/use-cases/promotion.use-cases/fetch-active-promotions.use-case';
import { FetchBestPromotionForProduct } from '../../../application/use-cases/promotion.use-cases/fetch-best-promotion-for-product.use-case';
import { FetchPromotionById } from '../../../application/use-cases/promotion.use-cases/fetch-promotion-by-id.use-case';
import { FetchPromotionsByProduct } from '../../../application/use-cases/promotion.use-cases/fetch-promotions-by-product.use-case';
import { UpdatePromotion } from '../../../application/use-cases/promotion.use-cases/update-promotion.use-case';
import { transformPromotionDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { PromotionOutput } from '../../../presentation/output/promotion.output';
import { toPromotionDTO } from '../../../application/helper/to-dto/to.promotion.dto';
import { PromotionInput } from '../../../presentation/input/promotion.input';

@Resolver(() => PromotionOutput)
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

  // @Mutation(() => PromotionOutput)
  // async applyPromotionToProduct(
  //   @Args('productId') productId: number,
  //   @Args('promotionId') promotionId: number,
  // ): Promise<PromotionOutputDTO> {
  //   return this.applyPromotionToProductUseCase.execute(productId, promotionId);
  // }

  @Mutation(() => PromotionOutput, { nullable: true })
  async combinePromotions(
    @Args({ name: 'promotions', type: () => [PromotionInput] }) promotions: PromotionInput[],
  ): Promise<PromotionOutput | null> {
    const dto = promotions?.map(toPromotionDTO)
    const result = await this.combinePromotionsUseCase.execute(dto);
    return transformPromotionDTOToGraphQL(result)
  }

  @Mutation(() => PromotionOutput, { nullable: true })
  async createPromotion(
    @Args('promotion') promotion: PromotionInput,
  ): Promise<PromotionOutput | null> {
    const dto = toPromotionDTO(promotion)
    const result = await this.createPromotionUseCase.execute(dto);
    return transformPromotionDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deletePromotion(
    @Args('promotionId') promotionId: number,
  ): Promise<boolean> {
    return this.deletePromotionUseCase.execute(promotionId);
  }

  @Query(() => [PromotionOutput])
  async fetchActivePromotionsBetween(
    @Args('start') start: Date,
    @Args('end') end: Date,
  ): Promise<PromotionOutput[]> {
    const result = await this.fetchActivePromotionsBetweenUseCase.execute(start, end);
    return result?.map(transformPromotionDTOToGraphQL)
  }

  @Query(() => [PromotionOutput])
  async fetchActivePromotions(): Promise<PromotionOutput[]> {
    const result = await this.fetchActivePromotionsUseCase.execute();
    return result?.map(transformPromotionDTOToGraphQL)
  }

  @Query(() => PromotionOutput, { nullable: true })
  async fetchBestPromotionForProduct(
    @Args('productId') productId: number,
  ): Promise<PromotionOutput | null> {
    const result = await this.fetchBestPromotionForProductUseCase.execute(productId);
    return transformPromotionDTOToGraphQL(result)
  }

  @Query(() => PromotionOutput, { nullable: true })
  async fetchPromotionById(
    @Args('id') id: number,
  ): Promise<PromotionOutput | null> {
    const result = await this.fetchPromotionByIdUseCase.execute(id);
    return transformPromotionDTOToGraphQL(result)
  }

  @Query(() => [PromotionOutput])
  async fetchPromotionsByProduct(
    @Args('productId') productId: number,
  ): Promise<PromotionOutput[]> {
    const result = await this.fetchPromotionsByProductUseCase.execute(productId);
    return result?.map(transformPromotionDTOToGraphQL)
  }

  @Mutation(() => PromotionOutput, { nullable: true })
  async updatePromotion(
    @Args('promotionId') promotionId: number,
    @Args('promotion') promotion: PromotionInput,
  ): Promise<PromotionOutput | null> {
    const dto = toPromotionDTO(promotion)
    const result = await this.updatePromotionUseCase.execute(promotionId, dto);
    return transformPromotionDTOToGraphQL(result)
  }
}

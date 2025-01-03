import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductVariantDTO } from '../../../presentation/dtos/product-variant.dto';
import { CheckProductVariantExistence } from '../../../application/use-cases/product-variant.use-cases/check-product-variant-existence.use-case';
import { CreateProductVariant } from '../../../application/use-cases/product-variant.use-cases/create-product-variant.use-case';
import { DeleteProductVariant } from '../../../application/use-cases/product-variant.use-cases/delete-product-variant.use-case';
import { DeleteProductVariantsByProductId } from '../../../application/use-cases/product-variant.use-cases/delete-product-variants-by-product-id.use-case';
import { FetchMostPopularVariant } from '../../../application/use-cases/product-variant.use-cases/fetch-most-popular-variant.use-case';
import { FetchProductVariantById } from '../../../application/use-cases/product-variant.use-cases/fetch-product-variant-by-id.use-case';
import { FetchProductVariantsByName } from '../../../application/use-cases/product-variant.use-cases/fetch-product-variants-by-name.use-case';
import { FetchProductVariantsByProductId } from '../../../application/use-cases/product-variant.use-cases/fetch-product-variants-by-product-id.use-case';
import { UpdateProductVariantDetails } from '../../../application/use-cases/product-variant.use-cases/update-product-variant-details.use-case';
import { transformProductVariantDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { toProductVariantDTO } from '../../../application/helper/to-dto/to.product-variant.dto';
import { ProductVariantOutput } from '../../../presentation/output/product-variant.output';
import { ProductVariantInput } from '../../../presentation/input/product-variant.input';

@Resolver(() => ProductVariantOutput)
export class ProductVariantResolver {
  constructor(
    private readonly checkExistence: CheckProductVariantExistence,
    private readonly createVariant: CreateProductVariant,
    private readonly deleteVariant: DeleteProductVariant,
    private readonly deleteVariantsByProductId: DeleteProductVariantsByProductId,
    private readonly fetchMostPopular: FetchMostPopularVariant,
    private readonly fetchById: FetchProductVariantById,
    private readonly fetchByName: FetchProductVariantsByName,
    private readonly fetchByProductId: FetchProductVariantsByProductId,
    private readonly updateDetails: UpdateProductVariantDetails,
  ) { }

  @Query(() => Boolean)
  async checkProductVariantExistence(
    @Args('productId') productId: number,
    @Args('name') name: string,
    @Args('value') value: string,
  ): Promise<boolean> {
    return this.checkExistence.execute(productId, name, value);
  }

  @Mutation(() => ProductVariantOutput, { nullable: true })
  async createProductVariant(
    @Args('variant') variant: ProductVariantInput,
  ): Promise<ProductVariantOutput | null> {
    const dto = toProductVariantDTO(variant)
    const result = await this.createVariant.execute(dto);
    return transformProductVariantDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteProductVariant(@Args('id') id: number): Promise<boolean> {
    return this.deleteVariant.execute(id);
  }

  @Mutation(() => Boolean)
  async deleteProductVariantsByProductId(
    @Args('productId') productId: number,
  ): Promise<boolean> {
    return this.deleteVariantsByProductId.execute(productId);
  }

  @Query(() => ProductVariantOutput, { nullable: true })
  async fetchMostPopularVariant(
    @Args('productId') productId: number,
  ): Promise<ProductVariantOutput | null> {
    const result = await this.fetchMostPopular.execute(productId);
    return transformProductVariantDTOToGraphQL(result)
  }

  @Query(() => ProductVariantOutput, { nullable: true })
  async fetchProductVariantById(
    @Args('id') id: number,
  ): Promise<ProductVariantOutput | null> {
    const result = await this.fetchById.execute(id);
    return transformProductVariantDTOToGraphQL(result)
  }

  @Query(() => [ProductVariantOutput])
  async fetchProductVariantsByName(
    @Args('productId') productId: number,
    @Args('name') name: string,
  ): Promise<ProductVariantOutput[]> {
    const result = await this.fetchByName.execute(productId, name);
    return result?.map(transformProductVariantDTOToGraphQL);
  }

  @Query(() => [ProductVariantOutput])
  async fetchProductVariantsByProductId(
    @Args('productId') productId: number,
  ): Promise<ProductVariantOutput[]> {
    const result = await this.fetchByProductId.execute(productId);
    return result?.map(transformProductVariantDTOToGraphQL);
  }

  @Mutation(() => ProductVariantOutput, { nullable: true })
  async updateProductVariantDetails(
    @Args('id') id: number,
    @Args('updateData') updateData: ProductVariantInput,
  ): Promise<ProductVariantOutput | null> {
    const dto = toProductVariantDTO(updateData)
    const result = await this.updateDetails.execute(id, dto);
    return transformProductVariantDTOToGraphQL(result)
  }
}

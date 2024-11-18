import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductVariantDTO } from 'src/presentation/dtos/product-variant.dto';
import { CheckProductVariantExistence } from 'src/application/use-cases/product-variant.use-cases/check-product-variant-existence.use-case';
import { CreateProductVariant } from 'src/application/use-cases/product-variant.use-cases/create-product-variant.use-case';
import { DeleteProductVariant } from 'src/application/use-cases/product-variant.use-cases/delete-product-variant.use-case';
import { DeleteProductVariantsByProductId } from 'src/application/use-cases/product-variant.use-cases/delete-product-variants-by-product-id.use-case';
import { FetchMostPopularVariant } from 'src/application/use-cases/product-variant.use-cases/fetch-most-popular-variant.use-case';
import { FetchProductVariantById } from 'src/application/use-cases/product-variant.use-cases/fetch-product-variant-by-id.use-case';
import { FetchProductVariantsByName } from 'src/application/use-cases/product-variant.use-cases/fetch-product-variants-by-name.use-case';
import { FetchProductVariantsByProductId } from 'src/application/use-cases/product-variant.use-cases/fetch-product-variants-by-product-id.use-case';
import { UpdateProductVariantDetails } from 'src/application/use-cases/product-variant.use-cases/update-product-variant-details.use-case';
import { ProductVariant, ProductVariantInput } from 'src/generated/graphql';
import { transformProductVariantDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { toProductVariantDTO } from 'src/application/helper/to-dto/to.product-variant.dto';

@Resolver(() => ProductVariantDTO)
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

  @Mutation(() => ProductVariantDTO, { nullable: true })
  async createProductVariant(
    @Args('variant') variant: ProductVariantInput,
  ): Promise<ProductVariant | null> {
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

  @Query(() => ProductVariantDTO, { nullable: true })
  async fetchMostPopularVariant(
    @Args('productId') productId: number,
  ): Promise<ProductVariant | null> {
    const result = await this.fetchMostPopular.execute(productId);
    return transformProductVariantDTOToGraphQL(result)
  }

  @Query(() => ProductVariantDTO, { nullable: true })
  async fetchProductVariantById(
    @Args('id') id: number,
  ): Promise<ProductVariant | null> {
    const result = await this.fetchById.execute(id);
    return transformProductVariantDTOToGraphQL(result)
  }

  @Query(() => [ProductVariantDTO])
  async fetchProductVariantsByName(
    @Args('productId') productId: number,
    @Args('name') name: string,
  ): Promise<ProductVariant[]> {
    const result = await this.fetchByName.execute(productId, name);
    return result.map(transformProductVariantDTOToGraphQL);
  }

  @Query(() => [ProductVariantDTO])
  async fetchProductVariantsByProductId(
    @Args('productId') productId: number,
  ): Promise<ProductVariant[]> {
    const result = await this.fetchByProductId.execute(productId);
    return result.map(transformProductVariantDTOToGraphQL);
  }

  @Mutation(() => ProductVariantDTO, { nullable: true })
  async updateProductVariantDetails(
    @Args('id') id: number,
    @Args('updateData') updateData: ProductVariantInput,
  ): Promise<ProductVariant | null> {
    const dto = toProductVariantDTO(updateData)
    const result = await this.updateDetails.execute(id, dto);
    return transformProductVariantDTOToGraphQL(result)
  }
}

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
  ) {}

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
    @Args('variantDTO') variantDTO: ProductVariantDTO,
  ): Promise<ProductVariantDTO | null> {
    return this.createVariant.execute(variantDTO);
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
  ): Promise<ProductVariantDTO | null> {
    return this.fetchMostPopular.execute(productId);
  }

  @Query(() => ProductVariantDTO, { nullable: true })
  async fetchProductVariantById(
    @Args('id') id: number,
  ): Promise<ProductVariantDTO | null> {
    return this.fetchById.execute(id);
  }

  @Query(() => [ProductVariantDTO])
  async fetchProductVariantsByName(
    @Args('productId') productId: number,
    @Args('name') name: string,
  ): Promise<ProductVariantDTO[]> {
    return this.fetchByName.execute(productId, name);
  }

  @Query(() => [ProductVariantDTO])
  async fetchProductVariantsByProductId(
    @Args('productId') productId: number,
  ): Promise<ProductVariantDTO[]> {
    return this.fetchByProductId.execute(productId);
  }

  @Mutation(() => ProductVariantDTO, { nullable: true })
  async updateProductVariantDetails(
    @Args('id') id: number,
    @Args('updateData') updateData: Partial<ProductVariantDTO>,
  ): Promise<ProductVariantDTO | null> {
    return this.updateDetails.execute(id, updateData);
  }
}

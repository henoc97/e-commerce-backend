import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { transformProductImageDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { CheckProductImageExistence } from 'src/application/use-cases/product-image.use-cases/check-product-image-existence.use-case';
import { CountProductImagesByProductId } from 'src/application/use-cases/product-image.use-cases/count-product-images-by-product-id.use-case';
import { CreateProductImage } from 'src/application/use-cases/product-image.use-cases/create-product-image.use-case';
import { DeleteProductImage } from 'src/application/use-cases/product-image.use-cases/delete-product-image.use-case';
import { DeleteProductImagesByProductId } from 'src/application/use-cases/product-image.use-cases/delete-product-images-by-product-id.use-case';
import { FetchPrimaryProductImage } from 'src/application/use-cases/product-image.use-cases/fetch-primary-product-image.use-case';
import { FetchProductImageById } from 'src/application/use-cases/product-image.use-cases/fetch-product-image-by-id.use-case';
import { FetchProductImagesByProductId } from 'src/application/use-cases/product-image.use-cases/fetch-product-images-by-product-id.use-case';
import { UpdateProductImageUrl } from 'src/application/use-cases/product-image.use-cases/update-product-image-url.use-case';
import { UpdateProductImage } from 'src/application/use-cases/product-image.use-cases/update-product-image.use-case';
import { ProductImageDTO } from 'src/presentation/dtos/product-image.dto';
import { ProductImage } from 'src/generated/graphql';
import { toProductImageDTO } from 'src/application/helper/to-dto/to.product-image.dto';

@Resolver(() => ProductImageDTO)
export class ProductImageResolver {
  constructor(
    private readonly checkProductImageExistence: CheckProductImageExistence,
    private readonly countProductImagesByProductId: CountProductImagesByProductId,
    private readonly createProductImageUseCase: CreateProductImage,
    private readonly deleteProductImageUseCase: DeleteProductImage,
    private readonly deleteProductImagesByProductIdUseCase: DeleteProductImagesByProductId,
    private readonly fetchPrimaryProductImageUseCase: FetchPrimaryProductImage,
    private readonly fetchProductImageByIdUseCase: FetchProductImageById,
    private readonly fetchProductImagesByProductIdUseCase: FetchProductImagesByProductId,
    private readonly updateProductImageUrlUseCase: UpdateProductImageUrl,
    private readonly updateProductImageUseCase: UpdateProductImage,
  ) { }

  @Query(() => Boolean)
  async doesProductImageExist(
    @Args('productId') productId: number,
    @Args('url') url: string,
  ): Promise<boolean> {
    return this.checkProductImageExistence.execute(productId, url);
  }

  @Query(() => Number)
  async countProductImages(
    @Args('productId') productId: number,
  ): Promise<number> {
    return this.countProductImagesByProductId.execute(productId);
  }

  @Mutation(() => ProductImageDTO)
  async createProductImage(
    @Args('imageDTO') imageDTO: ProductImageDTO,
  ): Promise<ProductImage | null> {
    const result = await this.createProductImageUseCase.execute(imageDTO);
    return transformProductImageDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deleteProductImage(@Args('id') id: number): Promise<boolean> {
    return this.deleteProductImageUseCase.execute(id);
  }

  @Mutation(() => Boolean)
  async deleteProductImagesByProductId(
    @Args('productId') productId: number,
  ): Promise<boolean> {
    return this.deleteProductImagesByProductIdUseCase.execute(productId);
  }

  @Query(() => ProductImageDTO, { nullable: true })
  async fetchPrimaryProductImage(
    @Args('productId') productId: number,
  ): Promise<ProductImage | null> {
    const result = await this.fetchPrimaryProductImageUseCase.execute(productId);
    return transformProductImageDTOToGraphQL(result);
  }

  @Query(() => ProductImageDTO, { nullable: true })
  async fetchProductImageById(
    @Args('id') id: number,
  ): Promise<ProductImage | null> {
    const result = await this.fetchProductImageByIdUseCase.execute(id);
    return transformProductImageDTOToGraphQL(result);
  }

  @Query(() => [ProductImageDTO])
  async fetchProductImagesByProductId(
    @Args('productId') productId: number,
  ): Promise<ProductImage[]> {
    const result = await this.fetchProductImagesByProductIdUseCase.execute(productId);
    return result.map(transformProductImageDTOToGraphQL);
  }

  @Mutation(() => ProductImageDTO)
  async updateProductImageUrl(
    @Args('id') id: number,
    @Args('url') url: string,
  ): Promise<ProductImage> {
    const result = await this.updateProductImageUrlUseCase.execute(id, url);
    return transformProductImageDTOToGraphQL(result);
  }

  @Mutation(() => ProductImageDTO, { nullable: true })
  async updateProductImage(
    @Args('id') id: number,
    @Args('updates') updates: ProductImage,
  ): Promise<ProductImage | null> {
    const dto = toProductImageDTO(updates);
    const result = await this.updateProductImageUseCase.execute(id, dto);
    return transformProductImageDTOToGraphQL(result);
  }
}

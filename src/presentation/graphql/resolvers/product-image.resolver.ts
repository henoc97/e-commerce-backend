import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
  ): Promise<ProductImageDTO | null> {
    return this.createProductImageUseCase.execute(imageDTO);
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
  ): Promise<ProductImageDTO | null> {
    return this.fetchPrimaryProductImageUseCase.execute(productId);
  }

  @Query(() => ProductImageDTO, { nullable: true })
  async fetchProductImageById(
    @Args('id') id: number,
  ): Promise<ProductImageDTO | null> {
    return this.fetchProductImageByIdUseCase.execute(id);
  }

  @Query(() => [ProductImageDTO])
  async fetchProductImagesByProductId(
    @Args('productId') productId: number,
  ): Promise<ProductImageDTO[]> {
    return this.fetchProductImagesByProductIdUseCase.execute(productId);
  }

  @Mutation(() => ProductImageDTO)
  async updateProductImageUrl(
    @Args('id') id: number,
    @Args('url') url: string,
  ): Promise<ProductImageDTO> {
    return this.updateProductImageUrlUseCase.execute(id, url);
  }

  @Mutation(() => ProductImageDTO, { nullable: true })
  async updateProductImage(
    @Args('id') id: number,
    @Args('updates') updates: ProductImageDTO,
  ): Promise<ProductImageDTO | null> {
    return this.updateProductImageUseCase.execute(id, updates);
  }
}

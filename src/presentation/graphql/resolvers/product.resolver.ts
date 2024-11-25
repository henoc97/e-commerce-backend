import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AddCartItemToProduct } from 'src/application/use-cases/product.use-cases/add-cart-item-to-product.use-case';
import { AddImageToProduct } from 'src/application/use-cases/product.use-cases/add-image-to-product.use-case';
import { AddPromotionToProduct } from 'src/application/use-cases/product.use-cases/add-promotion-to-product.use-case';
import { AddReviewToProduct } from 'src/application/use-cases/product.use-cases/add-review-to-product.use-case';
import { AddVariantToProduct } from 'src/application/use-cases/product.use-cases/add-variant-to-product.use-case';
import { CreateProduct } from 'src/application/use-cases/product.use-cases/create-product.use-case';
import { DeleteProduct } from 'src/application/use-cases/product.use-cases/delete-product.use-case';
import { FetchFeaturedProducts } from 'src/application/use-cases/product.use-cases/fetch-featured-products.use-case';
import { FetchProductById } from 'src/application/use-cases/product.use-cases/fetch-product-by-id.use-case';
import { FindProductsByCategory } from 'src/application/use-cases/product.use-cases/find-products-by-category.use-case';
import { FindProductsByName } from 'src/application/use-cases/product.use-cases/find-products-by-name.use-case';
import { FindProductsByPriceRange } from 'src/application/use-cases/product.use-cases/find-products-by-price-range.use-case';
import { RemoveImageFromProduct } from 'src/application/use-cases/product.use-cases/remove-image-from-product.use-case';
import { RemovePromotionFromProduct } from 'src/application/use-cases/product.use-cases/remove-promotion-from-product.use-case';
import { RemoveVariantFromProduct } from 'src/application/use-cases/product.use-cases/remove-variant-from-product.use-case';
import { UpdateProductStock } from 'src/application/use-cases/product.use-cases/update-product-stock.use-case';
import { UpdateProduct } from 'src/application/use-cases/product.use-cases/update-product.use-case';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { transformProductDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';
import { ProductOutput } from 'src/presentation/output/product.output';
import { CartItemInput } from 'src/presentation/input/cart-item.input';
import { ProductInput } from 'src/presentation/input/product.input';
import { ProductImageOutput } from 'src/presentation/output/product-image.output';
import { PromotionOutput } from 'src/presentation/output/promotion.output';
import { ProductVariantOutput } from 'src/presentation/output/product-variant.output';
import { ReviewOutput } from 'src/presentation/output/review.output';
import { toPromotionDTO } from 'src/application/helper/to-dto/to.promotion.dto';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { toProductVariantDTO } from 'src/application/helper/to-dto/to.product-variant.dto';
import { ProductImageInput } from 'src/presentation/input/product-image.input';
import { toProductImageDTO } from 'src/application/helper/to-dto/to.product-image.dto';
import { PromotionInput } from 'src/presentation/input/promotion.input';
import { ReviewInput } from 'src/presentation/input/review.input';
import { ProductVariantInput } from 'src/presentation/input/product-variant.input';

@Resolver(() => ProductOutput)
export class ProductResolver {
  constructor(
    private readonly addCartItemToProductUseCase: AddCartItemToProduct,
    private readonly addImageToProductUseCase: AddImageToProduct,
    private readonly addPromotionToProductUseCase: AddPromotionToProduct,
    private readonly addReviewToProductUseCase: AddReviewToProduct,
    private readonly addVariantToProductUseCase: AddVariantToProduct,
    private readonly createProductUseCase: CreateProduct,
    private readonly deleteProductUseCase: DeleteProduct,
    private readonly fetchFeaturedProductsUseCase: FetchFeaturedProducts,
    private readonly fetchProductByIdUseCase: FetchProductById,
    // private readonly fetchProductsUseCase: FetchProducts,
    private readonly findProductsByCategoryUseCase: FindProductsByCategory,
    private readonly findProductsByNameUseCase: FindProductsByName,
    private readonly findProductsByPriceRangeUseCase: FindProductsByPriceRange,
    private readonly removeImageFromProductUseCase: RemoveImageFromProduct,
    private readonly removePromotionFromProductUseCase: RemovePromotionFromProduct,
    private readonly removeVariantFromProductUseCase: RemoveVariantFromProduct,
    private readonly updateProductStockUseCase: UpdateProductStock,
    private readonly updateProductUseCase: UpdateProduct,
  ) { }

  @Mutation(() => ProductOutput, { nullable: true })
  async addCartItemToProduct(
    @Args('productId') productId: number,
    @Args('cartItem') cartItemDTO: CartItemInput,
  ): Promise<ProductOutput | null> {
    const result = await this.addCartItemToProductUseCase.execute(productId, cartItemDTO);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async addImageToProduct(
    @Args('productId') productId: number,
    @Args('image') image: ProductImageInput,
  ): Promise<ProductOutput | null> {
    const dto = toProductImageDTO(image);
    const result = await this.addImageToProductUseCase.execute(productId, dto);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async addPromotionToProduct(
    @Args('productId') productId: number,
    @Args('promotion') promotion: PromotionInput,
  ): Promise<ProductOutput | null> {
    const dto = toPromotionDTO(promotion)
    const result = await this.addPromotionToProductUseCase.execute(productId, dto);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async addReviewToProduct(
    @Args('productId') productId: number,
    @Args('review') review: ReviewInput,
  ): Promise<ProductOutput | null> {
    const dto = toReviewDTO(review)
    const result = await this.addReviewToProductUseCase.execute(productId, dto);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async addVariantToProduct(
    @Args('productId') productId: number,
    @Args('variant') variant: ProductVariantInput,
  ): Promise<ProductOutput | null> {
    const dto = toProductVariantDTO(variant)
    const result = await this.addVariantToProductUseCase.execute(productId, dto);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async createProduct(
    @Args('product') product: ProductInput,
  ): Promise<ProductOutput | null> {
    const dto = toProductDTO(product);
    const result = await this.createProductUseCase.execute(dto);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('productId') productId: number): Promise<boolean> {
    return this.deleteProductUseCase.execute(productId);
  }

  @Query(() => [ProductOutput])
  async fetchFeaturedProducts(): Promise<ProductOutput[]> {
    const result = await this.fetchFeaturedProductsUseCase.execute();
    return result.map(transformProductDTOToGraphQL)
  }

  @Query(() => ProductOutput, { nullable: true })
  async fetchProductById(
    @Args('productId') productId: number,
  ): Promise<ProductOutput | null> {
    const result = await this.fetchProductByIdUseCase.execute(productId);
    return transformProductDTOToGraphQL(result)
  }

  // @Query(() => [ReviewOutput])
  // async fetchProductReviews(
  //   @Args('productId') productId: number,
  // ): Promise<ReviewDTO[]> {
  //   return this.fetchProductReviewsUseCase.execute(productId);
  // }

  // @Query(() => [ProductOutput])
  // async fetchProducts(): Promise<ProductOutput[]> {
  //   const result = awaiteturn this.fetchProductsUseCase.execute();
  // return result.map(transformProductDTOToGraphQL)
  // }

  @Query(() => [ProductOutput])
  async findProductsByCategory(
    @Args('categoryId') categoryId: number,
  ): Promise<ProductOutput[]> {
    const result = await this.findProductsByCategoryUseCase.execute(categoryId);
    return result.map(transformProductDTOToGraphQL)
  }

  @Query(() => [ProductOutput])
  async findProductsByName(@Args('name') name: string): Promise<ProductOutput[]> {
    const result = await this.findProductsByNameUseCase.execute(name);
    return result.map(transformProductDTOToGraphQL)
  }

  @Query(() => [ProductOutput])
  async findProductsByPriceRange(
    @Args('minPrice') minPrice: number,
    @Args('maxPrice') maxPrice: number,
  ): Promise<ProductOutput[]> {
    const result = await this.findProductsByPriceRangeUseCase.execute(minPrice, maxPrice);
    return result.map(transformProductDTOToGraphQL)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async removeImageFromProduct(
    @Args('productId') productId: number,
    @Args('imageId') imageId: number,
  ): Promise<ProductOutput | null> {
    const result = await this.removeImageFromProductUseCase.execute(productId, imageId);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async removePromotionFromProduct(
    @Args('productId') productId: number,
    @Args('promotionId') promotionId: number,
  ): Promise<ProductOutput | null> {
    const result = await this.removePromotionFromProductUseCase.execute(
      productId,
      promotionId,
    );
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async removeVariantFromProduct(
    @Args('productId') productId: number,
    @Args('variantId') variantId: number,
  ): Promise<ProductOutput | null> {
    const result = await this.removeVariantFromProductUseCase.execute(productId, variantId);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async updateProductStock(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
  ): Promise<ProductOutput | null> {
    const result = await this.updateProductStockUseCase.execute(productId, quantity);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductOutput, { nullable: true })
  async updateProduct(
    @Args('productId') productId: number,
    @Args('product') product: ProductInput,
  ): Promise<ProductOutput | null> {
    const dto = toProductDTO(product)
    const result = await this.updateProductUseCase.execute(productId, dto);
    return transformProductDTOToGraphQL(result)
  }
}

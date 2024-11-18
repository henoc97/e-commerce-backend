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
// import { FetchProducts } from 'src/application/use-cases/product.use-cases/fetch-products.use-case';
import { FindProductsByCategory } from 'src/application/use-cases/product.use-cases/find-products-by-category.use-case';
import { FindProductsByName } from 'src/application/use-cases/product.use-cases/find-products-by-name.use-case';
import { FindProductsByPriceRange } from 'src/application/use-cases/product.use-cases/find-products-by-price-range.use-case';
import { RemoveImageFromProduct } from 'src/application/use-cases/product.use-cases/remove-image-from-product.use-case';
import { RemovePromotionFromProduct } from 'src/application/use-cases/product.use-cases/remove-promotion-from-product.use-case';
import { RemoveVariantFromProduct } from 'src/application/use-cases/product.use-cases/remove-variant-from-product.use-case';
import { UpdateProductStock } from 'src/application/use-cases/product.use-cases/update-product-stock.use-case';
import { UpdateProduct } from 'src/application/use-cases/product.use-cases/update-product.use-case';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';
import { ProductImageDTO } from 'src/presentation/dtos/product-image.dto';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';
import { ProductVariantDTO } from 'src/presentation/dtos/product-variant.dto';
import { AddCartItemInput, Product, ProductInput } from 'src/generated/graphql';
import { transformProductDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';

@Resolver(() => ProductDTO)
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

  @Mutation(() => ProductDTO, { nullable: true })
  async addCartItemToProduct(
    @Args('productId') productId: number,
    @Args('cartItem') cartItemDTO: AddCartItemInput,
  ): Promise<Product | null> {
    const result = await this.addCartItemToProductUseCase.execute(productId, cartItemDTO);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async addImageToProduct(
    @Args('productId') productId: number,
    @Args('image') imageDTO: ProductImageDTO,
  ): Promise<Product | null> {
    const result = await this.addImageToProductUseCase.execute(productId, imageDTO);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async addPromotionToProduct(
    @Args('productId') productId: number,
    @Args('promotion') promotionDTO: PromotionDTO,
  ): Promise<Product | null> {
    const result = await this.addPromotionToProductUseCase.execute(productId, promotionDTO);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async addReviewToProduct(
    @Args('productId') productId: number,
    @Args('review') reviewDTO: ReviewDTO,
  ): Promise<Product | null> {
    const result = await this.addReviewToProductUseCase.execute(productId, reviewDTO);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async addVariantToProduct(
    @Args('productId') productId: number,
    @Args('variant') variantDTO: ProductVariantDTO,
  ): Promise<Product | null> {
    const result = await this.addVariantToProductUseCase.execute(productId, variantDTO);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async createProduct(
    @Args('product') productDTO: ProductDTO,
  ): Promise<Product | null> {
    const result = await this.createProductUseCase.execute(productDTO);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('productId') productId: number): Promise<boolean> {
    return this.deleteProductUseCase.execute(productId);
  }

  @Query(() => [ProductDTO])
  async fetchFeaturedProducts(): Promise<Product[]> {
    const result = await this.fetchFeaturedProductsUseCase.execute();
    return result.map(transformProductDTOToGraphQL)
  }

  @Query(() => ProductDTO, { nullable: true })
  async fetchProductById(
    @Args('productId') productId: number,
  ): Promise<Product | null> {
    const result = await this.fetchProductByIdUseCase.execute(productId);
    return transformProductDTOToGraphQL(result)
  }

  // @Query(() => [ReviewDTO])
  // async fetchProductReviews(
  //   @Args('productId') productId: number,
  // ): Promise<ReviewDTO[]> {
  //   return this.fetchProductReviewsUseCase.execute(productId);
  // }

  // @Query(() => [ProductDTO])
  // async fetchProducts(): Promise<Product[]> {
  //   const result = awaiteturn this.fetchProductsUseCase.execute();
  // return result.map(transformProductDTOToGraphQL)
  // }

  @Query(() => [ProductDTO])
  async findProductsByCategory(
    @Args('categoryId') categoryId: number,
  ): Promise<Product[]> {
    const result = await this.findProductsByCategoryUseCase.execute(categoryId);
    return result.map(transformProductDTOToGraphQL)
  }

  @Query(() => [ProductDTO])
  async findProductsByName(@Args('name') name: string): Promise<Product[]> {
    const result = await this.findProductsByNameUseCase.execute(name);
    return result.map(transformProductDTOToGraphQL)
  }

  @Query(() => [ProductDTO])
  async findProductsByPriceRange(
    @Args('minPrice') minPrice: number,
    @Args('maxPrice') maxPrice: number,
  ): Promise<Product[]> {
    const result = await this.findProductsByPriceRangeUseCase.execute(minPrice, maxPrice);
    return result.map(transformProductDTOToGraphQL)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async removeImageFromProduct(
    @Args('productId') productId: number,
    @Args('imageId') imageId: number,
  ): Promise<Product | null> {
    const result = await this.removeImageFromProductUseCase.execute(productId, imageId);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async removePromotionFromProduct(
    @Args('productId') productId: number,
    @Args('promotionId') promotionId: number,
  ): Promise<Product | null> {
    const result = await this.removePromotionFromProductUseCase.execute(
      productId,
      promotionId,
    );
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async removeVariantFromProduct(
    @Args('productId') productId: number,
    @Args('variantId') variantId: number,
  ): Promise<Product | null> {
    const result = await this.removeVariantFromProductUseCase.execute(productId, variantId);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async updateProductStock(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
  ): Promise<Product | null> {
    const result = await this.updateProductStockUseCase.execute(productId, quantity);
    return transformProductDTOToGraphQL(result)
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async updateProduct(
    @Args('productId') productId: number,
    @Args('product') product: ProductInput,
  ): Promise<Product | null> {
    const dto = toProductDTO(product)
    const result = await this.updateProductUseCase.execute(productId, dto);
    return transformProductDTOToGraphQL(result)
  }
}

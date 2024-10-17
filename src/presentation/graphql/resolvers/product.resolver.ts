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
import { FetchProductReviews } from 'src/application/use-cases/product.use-cases/fetch-product-reviews.use-case';
import { FetchProducts } from 'src/application/use-cases/product.use-cases/fetch-products.use-case';
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
    private readonly fetchProductReviewsUseCase: FetchProductReviews,
    private readonly fetchProductsUseCase: FetchProducts,
    private readonly findProductsByCategoryUseCase: FindProductsByCategory,
    private readonly findProductsByNameUseCase: FindProductsByName,
    private readonly findProductsByPriceRangeUseCase: FindProductsByPriceRange,
    private readonly removeImageFromProductUseCase: RemoveImageFromProduct,
    private readonly removePromotionFromProductUseCase: RemovePromotionFromProduct,
    private readonly removeVariantFromProductUseCase: RemoveVariantFromProduct,
    private readonly updateProductStockUseCase: UpdateProductStock,
    private readonly updateProductUseCase: UpdateProduct,
  ) {}

  @Mutation(() => ProductDTO, { nullable: true })
  async addCartItemToProduct(
    @Args('productId') productId: number,
    @Args('cartItem') cartItemDTO: CartItemDTO,
  ): Promise<ProductDTO | null> {
    return this.addCartItemToProductUseCase.execute(productId, cartItemDTO);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async addImageToProduct(
    @Args('productId') productId: number,
    @Args('image') imageDTO: ProductImageDTO,
  ): Promise<ProductDTO | null> {
    return this.addImageToProductUseCase.execute(productId, imageDTO);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async addPromotionToProduct(
    @Args('productId') productId: number,
    @Args('promotion') promotionDTO: PromotionDTO,
  ): Promise<ProductDTO | null> {
    return this.addPromotionToProductUseCase.execute(productId, promotionDTO);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async addReviewToProduct(
    @Args('productId') productId: number,
    @Args('review') reviewDTO: ReviewDTO,
  ): Promise<ProductDTO | null> {
    return this.addReviewToProductUseCase.execute(productId, reviewDTO);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async addVariantToProduct(
    @Args('productId') productId: number,
    @Args('variant') variantDTO: ProductVariantDTO,
  ): Promise<ProductDTO | null> {
    return this.addVariantToProductUseCase.execute(productId, variantDTO);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async createProduct(
    @Args('product') productDTO: ProductDTO,
  ): Promise<ProductDTO | null> {
    return this.createProductUseCase.execute(productDTO);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('productId') productId: number): Promise<boolean> {
    return this.deleteProductUseCase.execute(productId);
  }

  @Query(() => [ProductDTO])
  async fetchFeaturedProducts(): Promise<ProductDTO[]> {
    return this.fetchFeaturedProductsUseCase.execute();
  }

  @Query(() => ProductDTO, { nullable: true })
  async fetchProductById(
    @Args('productId') productId: number,
  ): Promise<ProductDTO | null> {
    return this.fetchProductByIdUseCase.execute(productId);
  }

  @Query(() => [ReviewDTO])
  async fetchProductReviews(
    @Args('productId') productId: number,
  ): Promise<ReviewDTO[]> {
    return this.fetchProductReviewsUseCase.execute(productId);
  }

  @Query(() => [ProductDTO])
  async fetchProducts(): Promise<ProductDTO[]> {
    return this.fetchProductsUseCase.execute();
  }

  @Query(() => [ProductDTO])
  async findProductsByCategory(
    @Args('categoryId') categoryId: number,
  ): Promise<ProductDTO[]> {
    return this.findProductsByCategoryUseCase.execute(categoryId);
  }

  @Query(() => [ProductDTO])
  async findProductsByName(@Args('name') name: string): Promise<ProductDTO[]> {
    return this.findProductsByNameUseCase.execute(name);
  }

  @Query(() => [ProductDTO])
  async findProductsByPriceRange(
    @Args('minPrice') minPrice: number,
    @Args('maxPrice') maxPrice: number,
  ): Promise<ProductDTO[]> {
    return this.findProductsByPriceRangeUseCase.execute(minPrice, maxPrice);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async removeImageFromProduct(
    @Args('productId') productId: number,
    @Args('imageId') imageId: number,
  ): Promise<ProductDTO | null> {
    return this.removeImageFromProductUseCase.execute(productId, imageId);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async removePromotionFromProduct(
    @Args('productId') productId: number,
    @Args('promotionId') promotionId: number,
  ): Promise<ProductDTO | null> {
    return this.removePromotionFromProductUseCase.execute(
      productId,
      promotionId,
    );
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async removeVariantFromProduct(
    @Args('productId') productId: number,
    @Args('variantId') variantId: number,
  ): Promise<ProductDTO | null> {
    return this.removeVariantFromProductUseCase.execute(productId, variantId);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async updateProductStock(
    @Args('productId') productId: number,
    @Args('quantity') quantity: number,
  ): Promise<ProductDTO | null> {
    return this.updateProductStockUseCase.execute(productId, quantity);
  }

  @Mutation(() => ProductDTO, { nullable: true })
  async updateProduct(
    @Args('productId') productId: number,
    @Args('product') productDTO: Partial<ProductDTO>,
  ): Promise<ProductDTO | null> {
    return this.updateProductUseCase.execute(productId, productDTO);
  }
}

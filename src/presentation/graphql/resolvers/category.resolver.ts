import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { transformCategoryDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { CheckCategoryExistence } from 'src/application/use-cases/category.use-cases/check-category-existence.use-case';
import { CreateCategory } from 'src/application/use-cases/category.use-cases/create-category.use-case';
import { DeleteCategory } from 'src/application/use-cases/category.use-cases/delete-category.use-case';
import { FetchCategoryById } from 'src/application/use-cases/category.use-cases/fetch-category-by-id.use-case';
import { FetchCategoryHierarchy } from 'src/application/use-cases/category.use-cases/fetch-category-hierarchy.use-case';
import { FetchChildren } from 'src/application/use-cases/category.use-cases/fetch-children.use-case';
import { FetchProducts } from 'src/application/use-cases/category.use-cases/fetch-products.use-case';
import { FetchTopLevelCategories } from 'src/application/use-cases/category.use-cases/fetch-top-level-categories.use-case';
import { SetParent } from 'src/application/use-cases/category.use-cases/set-parent.use-case';
import { UpdateCategory } from 'src/application/use-cases/category.use-cases/update-category.use-case';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { CategoryInput } from 'src/presentation/input/category.input';
import { CategoryOutput } from 'src/presentation/output/category.output';

@Resolver(() => CategoryOutput)
export class CategoryResolver {
  constructor(
    private readonly checkCategoryExistence: CheckCategoryExistence,
    private readonly createCategoryUseCase: CreateCategory,
    private readonly deleteCategoryUseCase: DeleteCategory,
    private readonly fetchCategoryById: FetchCategoryById,
    private readonly fetchCategoryHierarchy: FetchCategoryHierarchy,
    private readonly fetchChildren: FetchChildren,
    private readonly fetchProducts: FetchProducts,
    private readonly fetchTopLevelCategories: FetchTopLevelCategories,
    private readonly setParentUseCase: SetParent,
    private readonly updateCategoryUseCase: UpdateCategory,
  ) { }

  @Query(() => Boolean)
  async categoryExists(
    @Args('name') name: string,
    @Args('shopId') shopId: number,
  ): Promise<boolean> {
    return this.checkCategoryExistence.execute(name, shopId);
  }

  @Mutation(() => CategoryOutput)
  async createCategory(
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<CategoryOutput> {
    const result = await this.createCategoryUseCase.execute(categoryInput);
    return transformCategoryDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.deleteCategoryUseCase.execute(id);
  }

  @Query(() => CategoryOutput, { nullable: true })
  async categoryById(@Args('id') id: number): Promise<CategoryOutput | null> {
    const result = await this.fetchCategoryById.execute(id);
    return transformCategoryDTOToGraphQL(result)
  }

  @Query(() => [CategoryOutput])
  async categoryHierarchy(
    @Args('categoryId') categoryId: number,
  ): Promise<CategoryOutput[]> {
    const result = await this.fetchCategoryHierarchy.execute(categoryId);
    return result.map(transformCategoryDTOToGraphQL)
  }

  @Query(() => [CategoryOutput])
  async children(@Args('parentId') parentId: number): Promise<CategoryOutput[]> {
    const result = await this.fetchChildren.execute(parentId);
    return result.map(transformCategoryDTOToGraphQL)
  }

  // @Query(() => ['Product'])
  // async products(
  //   @Args('categoryId') categoryId: number,
  // ): Promise<ProductDTO[]> {
  //   return this.fetchProducts.execute(categoryId);
  // }

  @Query(() => [CategoryOutput])
  async topLevelCategories(): Promise<CategoryOutput[]> {
    const result = await this.fetchTopLevelCategories.execute();
    return result.map(transformCategoryDTOToGraphQL)
  }

  @Mutation(() => CategoryOutput)
  async setParent(
    @Args('id') id: number,
    @Args('newParentId') newParentId: number,
  ): Promise<CategoryOutput> {
    const result = await this.setParentUseCase.execute(id, newParentId);
    return transformCategoryDTOToGraphQL(result)
  }

  @Mutation(() => CategoryOutput)
  async updateCategory(
    @Args('id') id: number,
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<CategoryOutput> {
    const result = await this.updateCategoryUseCase.execute(id, categoryInput);
    return transformCategoryDTOToGraphQL(result)
  }
}

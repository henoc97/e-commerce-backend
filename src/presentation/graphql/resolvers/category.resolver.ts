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
import { Category } from 'src/generated/graphql';
import { CategoryDTO } from 'src/presentation/dtos/category.dto';
import { ProductDTO } from 'src/presentation/dtos/product.dto';

@Resolver(() => 'Category')
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

  @Mutation(() => 'Category')
  async createCategory(
    @Args('categoryDTO') categoryDTO: CategoryDTO,
  ): Promise<Category> {
    const result = await this.createCategoryUseCase.execute(categoryDTO);
    return transformCategoryDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.deleteCategoryUseCase.execute(id);
  }

  @Query(() => 'Category', { nullable: true })
  async categoryById(@Args('id') id: number): Promise<Category | null> {
    const result = await this.fetchCategoryById.execute(id);
    return transformCategoryDTOToGraphQL(result)
  }

  @Query(() => [CategoryDTO])
  async categoryHierarchy(
    @Args('categoryId') categoryId: number,
  ): Promise<Category[]> {
    const result = await this.fetchCategoryHierarchy.execute(categoryId);
    return result.map(transformCategoryDTOToGraphQL)
  }

  @Query(() => [CategoryDTO])
  async children(@Args('parentId') parentId: number): Promise<Category[]> {
    const result = await this.fetchChildren.execute(parentId);
    return result.map(transformCategoryDTOToGraphQL)
  }

  @Query(() => ['Product'])
  async products(
    @Args('categoryId') categoryId: number,
  ): Promise<ProductDTO[]> {
    return this.fetchProducts.execute(categoryId);
  }

  @Query(() => [CategoryDTO])
  async topLevelCategories(): Promise<Category[]> {
    const result = await this.fetchTopLevelCategories.execute();
    return result.map(transformCategoryDTOToGraphQL)
  }

  @Mutation(() => 'Category')
  async setParent(
    @Args('id') id: number,
    @Args('newParentId') newParentId: number,
  ): Promise<Category> {
    const result = await this.setParentUseCase.execute(id, newParentId);
    return transformCategoryDTOToGraphQL(result)
  }

  @Mutation(() => 'Category')
  async updateCategory(
    @Args('id') id: number,
    @Args('categoryDTO') categoryDTO: CategoryDTO,
  ): Promise<Category> {
    const result = await this.updateCategoryUseCase.execute(id, categoryDTO);
    return transformCategoryDTOToGraphQL(result)
  }
}

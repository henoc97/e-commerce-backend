import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
import { CategoryDTO } from 'src/presentation/dtos/category.dto';
import { ProductDTO } from 'src/presentation/dtos/product.dto';

@Resolver(() => CategoryDTO)
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
  ) {}

  @Query(() => Boolean)
  async categoryExists(
    @Args('name') name: string,
    @Args('shopId') shopId: number,
  ): Promise<boolean> {
    return this.checkCategoryExistence.execute(name, shopId);
  }

  @Mutation(() => CategoryDTO)
  async createCategory(
    @Args('categoryDTO') categoryDTO: CategoryDTO,
  ): Promise<CategoryDTO> {
    return this.createCategoryUseCase.execute(categoryDTO);
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: number): Promise<boolean> {
    return this.deleteCategoryUseCase.execute(id);
  }

  @Query(() => CategoryDTO, { nullable: true })
  async categoryById(@Args('id') id: number): Promise<CategoryDTO | null> {
    return this.fetchCategoryById.execute(id);
  }

  @Query(() => [CategoryDTO])
  async categoryHierarchy(
    @Args('categoryId') categoryId: number,
  ): Promise<CategoryDTO[]> {
    return this.fetchCategoryHierarchy.execute(categoryId);
  }

  @Query(() => [CategoryDTO])
  async children(@Args('parentId') parentId: number): Promise<CategoryDTO[]> {
    return this.fetchChildren.execute(parentId);
  }

  @Query(() => [ProductDTO])
  async products(
    @Args('categoryId') categoryId: number,
  ): Promise<ProductDTO[]> {
    return this.fetchProducts.execute(categoryId);
  }

  @Query(() => [CategoryDTO])
  async topLevelCategories(): Promise<CategoryDTO[]> {
    return this.fetchTopLevelCategories.execute();
  }

  @Mutation(() => CategoryDTO)
  async setParent(
    @Args('id') id: number,
    @Args('newParentId') newParentId: number,
  ): Promise<CategoryDTO> {
    return this.setParentUseCase.execute(id, newParentId);
  }

  @Mutation(() => CategoryDTO)
  async updateCategory(
    @Args('id') id: number,
    @Args('categoryDTO') categoryDTO: Partial<CategoryDTO>,
  ): Promise<CategoryDTO> {
    return this.updateCategoryUseCase.execute(id, categoryDTO);
  }
}

import { Module } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryRepository } from 'src/infrastructure/persistences/category.repository.impl';
import { ProductModule } from './product.module';
import { CreateCategory } from '../use-cases/category.use-cases/create-category.use-case';
import { DeleteCategory } from '../use-cases/category.use-cases/delete-category.use-case';
import { SetParent } from '../use-cases/category.use-cases/set-parent.use-case';
import { FetchCategoryById } from '../use-cases/category.use-cases/fetch-category-by-id.use-case';
import { FetchChildren } from '../use-cases/category.use-cases/fetch-children.use-case';
import { UpdateCategory } from '../use-cases/category.use-cases/update-category.use-case';
import { FetchProducts } from '../use-cases/category.use-cases/fetch-products.use-case';
import { FetchTopLevelCategories } from '../use-cases/category.use-cases/fetch-top-level-categories.use-case';
import { CheckCategoryExistence } from '../use-cases/category.use-cases/check-category-existence.use-case';
import { FetchCategoryHierarchy } from '../use-cases/category.use-cases/fetch-category-hierarchy.use-case';

const categoryUseCases = [
  CreateCategory,
  DeleteCategory,
  SetParent,
  FetchCategoryById,
  FetchChildren,
  UpdateCategory,
  FetchProducts,
  FetchTopLevelCategories,
  CheckCategoryExistence,
  FetchCategoryHierarchy,
];

@Module({
  imports: [ProductModule],
  providers: [
    CategoryService,

    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
    ...categoryUseCases,
  ],
  exports: [CategoryService, ...categoryUseCases],
})
export class CategoryModule { }

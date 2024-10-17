import { Module } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryRepository } from 'src/infrastructure/persistences/category.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    CategoryService,
    PrismaService,
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
  ],
  exports: [CategoryService],
})
export class CategoryModule {}

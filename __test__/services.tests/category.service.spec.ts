import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../src/application/services/category.service';
import { ICategoryRepository } from '../../src/domain/repositories/category.repository';
import { Category } from '../../src/domain/entities/category.entity';
import { CategoryDTO } from '../../src/presentation/dtos/category.dto';

const mockCategoryRepository = {
  createCategory: jest.fn(),
  getCategoryById: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn(),
  getChildren: jest.fn(),
  getProducts: jest.fn(),
  setCategoryParent: jest.fn(),
  categoryExists: jest.fn(),
  getTopLevelCategories: jest.fn(),
  getCategoryHierarchy: jest.fn(),
};

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: ICategoryRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: 'CategoryRepository',
          useValue: mockCategoryRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<ICategoryRepository>('CategoryRepository');
  });

  /* create category success and failure tests */
  it('should create category', async () => {
    /**
     * Tests the create category method.
     * Verifies that the returned category matches the expected one
     * and that the repository's createCategory method is called with the correct data.
     */

    const categoryDTO: CategoryDTO = {
      /* data */
    };

    const returnOject: Category = { id: 1 /* others data */ };

    mockCategoryRepository.createCategory.mockResolvedValue(returnOject);

    const result = await service.createCategory(categoryDTO);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.createCategory).toHaveBeenCalledWith(
      categoryDTO,
    );
  });

  it('should throw an error when create category method fails', async () => {
    const categoryDTO: CategoryDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockCategoryRepository.createCategory.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.createCategory(categoryDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get category by id success and failure tests */
  it('should get category by id', async () => {
    /**
     * Tests the get category by id method.
     * Verifies that the returned category matches the expected one
     * and that the repository's getCategoryById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Category | null = { id: 1 /* others data */ };

    mockCategoryRepository.getCategoryById.mockResolvedValue(returnOject);

    const result = await service.getCategoryById(id);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.getCategoryById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get category by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.getCategoryById.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getCategoryById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update category success and failure tests */
  it('should update category', async () => {
    /**
     * Tests the update category method.
     * Verifies that the returned category matches the expected one
     * and that the repository's updateCategory method is called with the correct data.
     */

    const id: number = 1;
    const categoryDTO: Partial<CategoryDTO> = {
      /* data */
    };

    const returnOject: Category = { id: 1 /* others data */ };

    mockCategoryRepository.updateCategory.mockResolvedValue(returnOject);

    const result = await service.updateCategory(id, categoryDTO);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.updateCategory).toHaveBeenCalledWith(
      id,
      categoryDTO,
    );
  });

  it('should throw an error when update category method fails', async () => {
    const id: number = 1;
    const categoryDTO: Partial<CategoryDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockCategoryRepository.updateCategory.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateCategory(id, categoryDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* delete category success and failure tests */
  it('should delete category', async () => {
    /**
     * Tests the delete category method.
     * Verifies that the returned category matches the expected one
     * and that the repository's deleteCategory method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockCategoryRepository.deleteCategory.mockResolvedValue(returnOject);

    const result = await service.deleteCategory(id);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.deleteCategory).toHaveBeenCalledWith(id);
  });

  it('should throw an error when delete category method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.deleteCategory.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.deleteCategory(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get children success and failure tests */
  it('should get children', async () => {
    /**
     * Tests the get children method.
     * Verifies that the returned category matches the expected one
     * and that the repository's getChildren method is called with the correct data.
     */

    const parentId: number = 1;

    const returnOject: Category[] = [{ id: 1 /* others data */ }];

    mockCategoryRepository.getChildren.mockResolvedValue(returnOject);

    const result = await service.getChildren(parentId);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.getChildren).toHaveBeenCalledWith(parentId);
  });

  it('should throw an error when get children method fails', async () => {
    const parentId: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.getChildren.mockResolvedValue(' Repository error');

    const result = await service.getChildren(parentId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get products success and failure tests */
  it('should get products', async () => {
    /**
     * Tests the get products method.
     * Verifies that the returned category matches the expected one
     * and that the repository's getProducts method is called with the correct data.
     */

    const categoryId: number = 1;

    const returnOject: Product[] = [{ id: 1 /* others data */ }];

    mockCategoryRepository.getProducts.mockResolvedValue(returnOject);

    const result = await service.getProducts(categoryId);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.getProducts).toHaveBeenCalledWith(categoryId);
  });

  it('should throw an error when get products method fails', async () => {
    const categoryId: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.getProducts.mockResolvedValue(' Repository error');

    const result = await service.getProducts(categoryId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* set category parent success and failure tests */
  it('should set category parent', async () => {
    /**
     * Tests the set category parent method.
     * Verifies that the returned category matches the expected one
     * and that the repository's setCategoryParent method is called with the correct data.
     */

    const id: number = 1;
    const newParentId: number = 1;

    const returnOject: Category = { id: 1 /* others data */ };

    mockCategoryRepository.setCategoryParent.mockResolvedValue(returnOject);

    const result = await service.setCategoryParent(id, newParentId);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.setCategoryParent).toHaveBeenCalledWith(
      id,
      newParentId,
    );
  });

  it('should throw an error when set category parent method fails', async () => {
    const id: number = 1;
    const newParentId: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.setCategoryParent.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.setCategoryParent(id, newParentId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* category exists success and failure tests */
  it('should category exists', async () => {
    /**
     * Tests the category exists method.
     * Verifies that the returned category matches the expected one
     * and that the repository's categoryExists method is called with the correct data.
     */

    const name: string = 'name';
    const shopId: number = 1;

    const returnOject: boolean = true;

    mockCategoryRepository.categoryExists.mockResolvedValue(returnOject);

    const result = await service.categoryExists(name, shopId);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.categoryExists).toHaveBeenCalledWith(
      name,
      shopId,
    );
  });

  it('should throw an error when category exists method fails', async () => {
    const name: string = 'name';
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.categoryExists.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.categoryExists(name, shopId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get top level categories success and failure tests */
  it('should get top level categories', async () => {
    /**
     * Tests the get top level categories method.
     * Verifies that the returned category matches the expected one
     * and that the repository's getTopLevelCategories method is called with the correct data.
     */

    const returnOject: Category[] = [{ id: 1 /* others data */ }];

    mockCategoryRepository.getTopLevelCategories.mockResolvedValue(returnOject);

    const result = await service.getTopLevelCategories();
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.getTopLevelCategories).toHaveBeenCalledWith();
  });

  it('should throw an error when get top level categories method fails', async () => {
    // Simulate a failure when calling the repository
    mockCategoryRepository.getTopLevelCategories.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getTopLevelCategories();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get category hierarchy success and failure tests */
  it('should get category hierarchy', async () => {
    /**
     * Tests the get category hierarchy method.
     * Verifies that the returned category matches the expected one
     * and that the repository's getCategoryHierarchy method is called with the correct data.
     */

    const categoryId: number = 1;

    const returnOject: Category[] = [{ id: 1 /* others data */ }];

    mockCategoryRepository.getCategoryHierarchy.mockResolvedValue(returnOject);

    const result = await service.getCategoryHierarchy(categoryId);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.getCategoryHierarchy).toHaveBeenCalledWith(
      categoryId,
    );
  });

  it('should throw an error when get category hierarchy method fails', async () => {
    const categoryId: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.getCategoryHierarchy.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getCategoryHierarchy(categoryId);
    expect(result).rejects.toThrow('Repository error');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../../src/application/services/category.service';
import { ICategoryRepository } from '../../src/domain/repositories/category.repository';
import { Category } from '../../src/domain/entities/category.entity';
import { CategoryDTO } from '../../src/presentation/dtos/category.dto';
import { ProductService } from '../../src/application/services/product.service';
import { Product } from '../../src/domain/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

const mockCategoryRepository = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getChildren: jest.fn(),
  getProducts: jest.fn(),
  setParent: jest.fn(),
  exists: jest.fn(),
  getTopLevelCategories: jest.fn(),
  getCategoryHierarchy: jest.fn(),
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

// Mock du ProductService
const mockProductService = {
  findProductsByCategory: jest.fn(),
};

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: ICategoryRepository;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: 'ICategoryRepository',
          useValue: mockCategoryRepository,
        },
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<ICategoryRepository>('ICategoryRepository');
    productService = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test pour createCategory
  it('should create category', async () => {
    const categoryDTO = {
      id: 1,
      name: 'Category 1',
      parentId: null,
      parent: null,
      children: [],
      products: [],
      shopId: 1,
      shop: null,
    };
    const returnObject: Category = {
      ...categoryDTO,
      parent: categoryDTO.parent ?? null, // Assurez-vous que parent est null si non défini
      shop: categoryDTO.shop ?? null, // Assurez-vous que shop est null si non défini
    };

    mockCategoryRepository.create.mockResolvedValue({
      ...returnObject,
      parent: null, // Assurez-vous que parent est null
      shop: null, // Assurez-vous que shop est null
    });

    const result = await service.createCategory(categoryDTO);
    expect(result).toEqual(returnObject);
    expect(mockCategoryRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(categoryDTO),
    );
  });

  // Test pour getCategoryById
  it('should get category by id', async () => {
    const id: number = 1;
    const returnObject: Category = {
      id: 1,
      name: 'Test Category',
      children: [],
      products: [],
    };

    mockCategoryRepository.getById.mockResolvedValue(returnObject);

    const result = await service.getCategoryById(id);
    expect(result).toEqual(returnObject);
    expect(mockCategoryRepository.getById).toHaveBeenCalledWith(id);
  });

  it('should throw NotFoundException when category not found', async () => {
    const id: number = 1;

    mockCategoryRepository.getById.mockResolvedValue(null);

    await expect(service.getCategoryById(id)).rejects.toThrow(
      NotFoundException,
    );
  });

  // Test pour updateCategory
  it('should update category', async () => {
    const id = 1;
    const categoryDTO = {
      id: 1,
      name: 'Updated Category',
      parentId: null,
      parent: null, // Assurez-vous que parent est null
      children: [],
      products: [],
      shopId: 1,
      shop: null, // Assurez-vous que shop est null
    };

    const returnObject = {
      ...categoryDTO,
      parent: categoryDTO.parent ?? null, // Assurez-vous que parent est null si non défini
      shop: categoryDTO.shop ?? null, // Assurez-vous que shop est null si non défini
    };

    mockCategoryRepository.update.mockResolvedValue({
      ...returnObject,
      parent: returnObject.parent ?? null, // Assurez-vous que parent est null
      shop: returnObject.shop ?? null, // Assurez-vous que shop est null
    });

    const result = await service.updateCategory(id, categoryDTO);
    expect(result).toEqual(returnObject);
    expect(mockCategoryRepository.update).toHaveBeenCalledWith(
      id,
      expect.objectContaining(categoryDTO),
    );
  });

  // Test pour deleteCategory
  it('should delete category', async () => {
    const id: number = 1;

    mockCategoryRepository.delete.mockResolvedValue(true);

    const result = await service.deleteCategory(id);
    expect(result).toBe(true);
    expect(mockCategoryRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw NotFoundException when deleting non-existent category', async () => {
    const id: number = 1;

    mockCategoryRepository.delete.mockResolvedValue(false);

    await expect(service.deleteCategory(id)).rejects.toThrow(NotFoundException);
  });

  // Test pour getChildren
  it('should get children', async () => {
    const parentId: number = 1;
    const returnObject: Category[] = [
      { id: 2, name: 'Child Category', children: [], products: [] },
    ];

    mockCategoryRepository.getChildren.mockResolvedValue(returnObject);

    const result = await service.getChildren(parentId);
    expect(result).toEqual(returnObject);
    expect(mockCategoryRepository.getChildren).toHaveBeenCalledWith(parentId);
  });

  // Test pour getProducts
  it('should get products', async () => {
    const categoryId: number = 1;
    const returnObject: Product[] = [];

    mockProductService.findProductsByCategory.mockResolvedValue(returnObject);

    const result = await service.getProducts(categoryId);
    expect(result).toEqual(returnObject);
    expect(mockProductService.findProductsByCategory).toHaveBeenCalledWith(
      categoryId,
    );
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

    const returnOject: Category = {
      id: 1,
      name: 'Man',
      parentId: 1,
      children: [],
      products: [],
    };

    mockCategoryRepository.setParent.mockResolvedValue(returnOject);

    const result = await service.setCategoryParent(id, newParentId);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.setParent).toHaveBeenCalledWith(
      id,
      newParentId,
    );
  });

  it('should throw an error when set category parent method fails', async () => {
    const id: number = 1;
    const newParentId: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.setParent.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.setCategoryParent(id, newParentId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
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

    mockCategoryRepository.exists.mockResolvedValue(returnOject);

    const result = await service.categoryExists(name, shopId);
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.exists).toHaveBeenCalledWith(name, shopId);
  });

  it('should throw an error when category exists method fails', async () => {
    const name: string = 'name';
    const shopId: number = 1;

    // Simulate a failure when calling the repository
    mockCategoryRepository.exists.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.categoryExists(name, shopId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get top level categories success and failure tests */
  it('should get top level categories', async () => {
    /**
     * Tests the get top level categories method.
     * Verifies that the returned category matches the expected one
     * and that the repository's getTopLevelCategories method is called with the correct data.
     */

    const returnOject: Category[] = [
      {
        id: 1,
        name: 'Man',
        parentId: 1,
        children: [],
        products: [],
      },
    ];

    mockCategoryRepository.getTopLevelCategories.mockResolvedValue(returnOject);

    const result = await service.getTopLevelCategories();
    expect(result).toEqual(returnOject);
    expect(mockCategoryRepository.getTopLevelCategories).toHaveBeenCalledWith();
  });

  it('should throw an error when get top level categories method fails', async () => {
    // Simulate a failure when calling the repository
    mockCategoryRepository.getTopLevelCategories.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getTopLevelCategories()).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });

  /* get category hierarchy success and failure tests */
  it('should get category hierarchy', async () => {
    /**
     * Tests the get category hierarchy method.
     * Verifies that the returned category matches the expected one
     * and that the repository's getCategoryHierarchy method is called with the correct data.
     */

    const categoryId: number = 1;

    const returnOject: Category[] = [
      {
        id: 1,
        name: 'Man',
        parentId: 1,
        children: [],
        products: [],
      },
    ];

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
    mockCategoryRepository.getCategoryHierarchy.mockRejectedValue(
      new Error('Repository error'),
    );

    await expect(service.getCategoryHierarchy(categoryId)).rejects.toThrow(
      'Repository error',
    );

    // Restore console.error
    consoleErrorMock.mockRestore();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SubsiteService } from '../../src/application/services/subsite.service';
import { ISubsiteRepository } from '../../src/domain/repositories/subsite.repository';
import { Subsite } from '../../src/domain/entities/subsite.entity';
import { SubsiteDTO } from '../../src/presentation/dtos/subsite.dto';

const mockSubsiteRepository = {
  createSubsite: jest.fn(),
  getSubsiteById: jest.fn(),
  updateSubsite: jest.fn(),
  removeSubsite: jest.fn(),
  getSubsitesByUser: jest.fn(),
  validateSubsite: jest.fn(),
  getSubsiteConfig: jest.fn(),
  updateSubsiteConfig: jest.fn(),
  getLatestSubsite: jest.fn(),
  getActiveSubsites: jest.fn(),
  countSubsitesByUser: jest.fn(),
};

describe('SubsiteService', () => {
  let service: SubsiteService;
  let subsiteRepository: ISubsiteRepository;

  beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubsiteService,
        {
          provide: 'SubsiteRepository',
          useValue: mockSubsiteRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<SubsiteService>(SubsiteService);
    subsiteRepository = module.get<ISubsiteRepository>('SubsiteRepository');
  });

  /* create subsite success and failure tests */
  it('should create subsite', async () => {
    /**
     * Tests the create subsite method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's createSubsite method is called with the correct data.
     */

    const SubsiteDTO: SubsiteDTO = {
      /* data */
    };

    const returnOject: Subsite = { id: 1 /* others data */ };

    mockSubsiteRepository.createSubsite.mockResolvedValue(returnOject);

    const result = await service.createSubsite(SubsiteDTO);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.createSubsite).toHaveBeenCalledWith(
      SubsiteDTO,
    );
  });

  it('should throw an error when create subsite method fails', async () => {
    const SubsiteDTO: SubsiteDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockSubsiteRepository.createSubsite.mockResolvedValue(' Repository error');

    const result = await service.createSubsite(SubsiteDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subsite by id success and failure tests */
  it('should get subsite by id', async () => {
    /**
     * Tests the get subsite by id method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's getSubsiteById method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: Subsite | null = { id: 1 /* others data */ };

    mockSubsiteRepository.getSubsiteById.mockResolvedValue(returnOject);

    const result = await service.getSubsiteById(id);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getSubsiteById).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get subsite by id method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockSubsiteRepository.getSubsiteById.mockResolvedValue(' Repository error');

    const result = await service.getSubsiteById(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update subsite success and failure tests */
  it('should update subsite', async () => {
    /**
     * Tests the update subsite method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's updateSubsite method is called with the correct data.
     */

    const id: number = 1;
    const updates: Partial<SubsiteDTO> = {
      /* data */
    };

    const returnOject: Subsite = { id: 1 /* others data */ };

    mockSubsiteRepository.updateSubsite.mockResolvedValue(returnOject);

    const result = await service.updateSubsite(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.updateSubsite).toHaveBeenCalledWith(
      id,
      updates,
    );
  });

  it('should throw an error when update subsite method fails', async () => {
    const id: number = 1;
    const updates: Partial<SubsiteDTO> = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockSubsiteRepository.updateSubsite.mockResolvedValue(' Repository error');

    const result = await service.updateSubsite(id, updates);
    expect(result).rejects.toThrow('Repository error');
  });

  /* remove subsite success and failure tests */
  it('should remove subsite', async () => {
    /**
     * Tests the remove subsite method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's removeSubsite method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: boolean = true;

    mockSubsiteRepository.removeSubsite.mockResolvedValue(returnOject);

    const result = await service.removeSubsite(id);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.removeSubsite).toHaveBeenCalledWith(id);
  });

  it('should throw an error when remove subsite method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockSubsiteRepository.removeSubsite.mockResolvedValue(' Repository error');

    const result = await service.removeSubsite(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subsites by user success and failure tests */
  it('should get subsites by user', async () => {
    /**
     * Tests the get subsites by user method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's getSubsitesByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: Subsite[] = [{ id: 1 /* others data */ }];

    mockSubsiteRepository.getSubsitesByUser.mockResolvedValue(returnOject);

    const result = await service.getSubsitesByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getSubsitesByUser).toHaveBeenCalledWith(
      userId,
    );
  });

  it('should throw an error when get subsites by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockSubsiteRepository.getSubsitesByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getSubsitesByUser(userId);
    expect(result).rejects.toThrow('Repository error');
  });

  /* validate subsite success and failure tests */
  it('should validate subsite', async () => {
    /**
     * Tests the validate subsite method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's validateSubsite method is called with the correct data.
     */

    const SubsiteDTO: SubsiteDTO = {
      /* data */
    };

    const returnOject: boolean = true;

    mockSubsiteRepository.validateSubsite.mockResolvedValue(returnOject);

    const result = await service.validateSubsite(SubsiteDTO);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.validateSubsite).toHaveBeenCalledWith(
      SubsiteDTO,
    );
  });

  it('should throw an error when validate subsite method fails', async () => {
    const SubsiteDTO: SubsiteDTO = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockSubsiteRepository.validateSubsite.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.validateSubsite(SubsiteDTO);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get subsite config success and failure tests */
  it('should get subsite config', async () => {
    /**
     * Tests the get subsite config method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's getSubsiteConfig method is called with the correct data.
     */

    const id: number = 1;

    const returnOject: any = { id: 1 /* others data */ };

    mockSubsiteRepository.getSubsiteConfig.mockResolvedValue(returnOject);

    const result = await service.getSubsiteConfig(id);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getSubsiteConfig).toHaveBeenCalledWith(id);
  });

  it('should throw an error when get subsite config method fails', async () => {
    const id: number = 1;

    // Simulate a failure when calling the repository
    mockSubsiteRepository.getSubsiteConfig.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getSubsiteConfig(id);
    expect(result).rejects.toThrow('Repository error');
  });

  /* update subsite config success and failure tests */
  it('should update subsite config', async () => {
    /**
     * Tests the update subsite config method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's updateSubsiteConfig method is called with the correct data.
     */

    const id: number = 1;
    const config: any = {
      /* data */
    };

    const returnOject: Subsite = { id: 1 /* others data */ };

    mockSubsiteRepository.updateSubsiteConfig.mockResolvedValue(returnOject);

    const result = await service.updateSubsiteConfig(id, config);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.updateSubsiteConfig).toHaveBeenCalledWith(
      id,
      config,
    );
  });

  it('should throw an error when update subsite config method fails', async () => {
    const id: number = 1;
    const config: any = {
      /* data */
    };

    // Simulate a failure when calling the repository
    mockSubsiteRepository.updateSubsiteConfig.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.updateSubsiteConfig(id, config);
    expect(result).rejects.toThrow('Repository error');
  });

  /* get latest subsite success and failure tests */
  it('should get latest subsite', async () => {
    /**
     * Tests the get latest subsite method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's getLatestSubsite method is called with the correct data.
     */

    const returnOject: Subsite = { id: 1 /* others data */ };

    mockSubsiteRepository.getLatestSubsite.mockResolvedValue(returnOject);

    const result = await service.getLatestSubsite();
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getLatestSubsite).toHaveBeenCalledWith();
  });

  it('should throw an error when get latest subsite method fails', async () => {
    // Simulate a failure when calling the repository
    mockSubsiteRepository.getLatestSubsite.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getLatestSubsite();
    expect(result).rejects.toThrow('Repository error');
  });

  /* get active subsites success and failure tests */
  it('should get active subsites', async () => {
    /**
     * Tests the get active subsites method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's getActiveSubsites method is called with the correct data.
     */

    const returnOject: Subsite[] = [{ id: 1 /* others data */ }];

    mockSubsiteRepository.getActiveSubsites.mockResolvedValue(returnOject);

    const result = await service.getActiveSubsites();
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getActiveSubsites).toHaveBeenCalledWith();
  });

  it('should throw an error when get active subsites method fails', async () => {
    // Simulate a failure when calling the repository
    mockSubsiteRepository.getActiveSubsites.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.getActiveSubsites();
    expect(result).rejects.toThrow('Repository error');
  });

  /* count subsites by user success and failure tests */
  it('should count subsites by user', async () => {
    /**
     * Tests the count subsites by user method.
     * Verifies that the returned subsite matches the expected one
     * and that the repository's countSubsitesByUser method is called with the correct data.
     */

    const userId: number = 1;

    const returnOject: number = 1;

    mockSubsiteRepository.countSubsitesByUser.mockResolvedValue(returnOject);

    const result = await service.countSubsitesByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.countSubsitesByUser).toHaveBeenCalledWith(
      userId,
    );
  });

  it('should throw an error when count subsites by user method fails', async () => {
    const userId: number = 1;

    // Simulate a failure when calling the repository
    mockSubsiteRepository.countSubsitesByUser.mockResolvedValue(
      ' Repository error',
    );

    const result = await service.countSubsitesByUser(userId);
    expect(result).rejects.toThrow('Repository error');
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SubsiteService } from '../../src/application/services/subsite.service';
import { ISubsiteRepository } from '../../src/domain/repositories/subsite.repository';
import { Subsite } from '../../src/domain/entities/subsite.entity';
import { SubsiteDTO } from '../../src/presentation/dtos/subsite.dto';


const mockSubsiteRepository = {
  create: jest.fn(),
getById: jest.fn(),
update: jest.fn(),
remove: jest.fn(),
getByUser: jest.fn(),
validate: jest.fn(),
getConfig: jest.fn(),
updateConfig: jest.fn(),
getLatest: jest.fn(),
getActive: jest.fn(),
countByUser: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('SubsiteService', () => {
    let service: SubsiteService;
    let subsiteRepository: ISubsiteRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubsiteService,
        {
          provide: 'ISubsiteRepository',
          useValue: mockSubsiteRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<SubsiteService>(SubsiteService);
    subsiteRepository = module.get<ISubsiteRepository>('ISubsiteRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create subsite success and failure tests */
it('should create subsite', async () => {
    /** 
     * Tests the create subsite method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's createSubsite method is called with the correct data.
     */
    
     const SubsiteDTO: SubsiteDTO = { /* data */ };

    const returnOject: Subsite = { id: 1, /* others data */ };
    
    mockSubsiteRepository.create.mockResolvedValue(returnOject);

    const result = await service.createSubsite(SubsiteDTO);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.create).toHaveBeenCalledWith(SubsiteDTO);
});

it('should throw an error when create subsite method fails', async () => {
    
     const SubsiteDTO: SubsiteDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createSubsite(SubsiteDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get subsite by id success and failure tests */
it('should get subsite by id', async () => {
    /** 
     * Tests the get subsite by id method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's getSubsiteById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: Subsite | null = { id: 1, /* others data */ };
    
    mockSubsiteRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getSubsiteById(id);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get subsite by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getSubsiteById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update subsite success and failure tests */
it('should update subsite', async () => {
    /** 
     * Tests the update subsite method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's updateSubsite method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<SubsiteDTO> = { /* data */ };

    const returnOject: Subsite = { id: 1, /* others data */ };
    
    mockSubsiteRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateSubsite(id,
    updates,);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.update).toHaveBeenCalledWith(id,
    updates,);
});

it('should throw an error when update subsite method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<SubsiteDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateSubsite(id,
    updates,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* remove subsite success and failure tests */
it('should remove subsite', async () => {
    /** 
     * Tests the remove subsite method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's removeSubsite method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockSubsiteRepository.remove.mockResolvedValue(returnOject);

    const result = await service.removeSubsite(id);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.remove).toHaveBeenCalledWith(id);
});

it('should throw an error when remove subsite method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.remove.mockRejectedValue(new Error('Repository error'));

    await expect(service.removeSubsite(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get subsites by user success and failure tests */
it('should get subsites by user', async () => {
    /** 
     * Tests the get subsites by user method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's getSubsitesByUser method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Subsite[] = [{ id: 1, /* others data */ }];
    
    mockSubsiteRepository.getByUser.mockResolvedValue(returnOject);

    const result = await service.getSubsitesByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getByUser).toHaveBeenCalledWith(userId);
});

it('should throw an error when get subsites by user method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.getByUser.mockRejectedValue(new Error('Repository error'));

    await expect(service.getSubsitesByUser(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* validate subsite success and failure tests */
it('should validate subsite', async () => {
    /** 
     * Tests the validate subsite method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's validateSubsite method is called with the correct data.
     */
    
     const SubsiteDTO: SubsiteDTO = { /* data */ };

    const returnOject: boolean = true
    
    mockSubsiteRepository.validate.mockResolvedValue(returnOject);

    const result = await service.validateSubsite(SubsiteDTO);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.validate).toHaveBeenCalledWith(SubsiteDTO);
});

it('should throw an error when validate subsite method fails', async () => {
    
     const SubsiteDTO: SubsiteDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.validate.mockRejectedValue(new Error('Repository error'));

    await expect(service.validateSubsite(SubsiteDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get subsite config success and failure tests */
it('should get subsite config', async () => {
    /** 
     * Tests the get subsite config method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's getSubsiteConfig method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: any = { id: 1, /* others data */ };
    
    mockSubsiteRepository.getConfig.mockResolvedValue(returnOject);

    const result = await service.getSubsiteConfig(id);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getConfig).toHaveBeenCalledWith(id);
});

it('should throw an error when get subsite config method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.getConfig.mockRejectedValue(new Error('Repository error'));

    await expect(service.getSubsiteConfig(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update subsite config success and failure tests */
it('should update subsite config', async () => {
    /** 
     * Tests the update subsite config method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's updateSubsiteConfig method is called with the correct data.
     */
    
     const id: number = 1;
     const config: any = { /* data */ };

    const returnOject: Subsite = { id: 1, /* others data */ };
    
    mockSubsiteRepository.updateConfig.mockResolvedValue(returnOject);

    const result = await service.updateSubsiteConfig(id, config);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.updateConfig).toHaveBeenCalledWith(id, config);
});

it('should throw an error when update subsite config method fails', async () => {
    
     const id: number = 1;
     const config: any = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.updateConfig.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateSubsiteConfig(id, config)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get latest subsite success and failure tests */
it('should get latest subsite', async () => {
    /** 
     * Tests the get latest subsite method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's getLatestSubsite method is called with the correct data.
     */
    

    const returnOject: Subsite = { id: 1, /* others data */ };
    
    mockSubsiteRepository.getLatest.mockResolvedValue(returnOject);

    const result = await service.getLatestSubsite();
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getLatest).toHaveBeenCalledWith();
});

it('should throw an error when get latest subsite method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.getLatest.mockRejectedValue(new Error('Repository error'));

    await expect(service.getLatestSubsite()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get active subsites success and failure tests */
it('should get active subsites', async () => {
    /** 
     * Tests the get active subsites method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's getActiveSubsites method is called with the correct data.
     */
    

    const returnOject: Subsite[] = [{ id: 1, /* others data */ }];
    
    mockSubsiteRepository.getActive.mockResolvedValue(returnOject);

    const result = await service.getActiveSubsites();
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.getActive).toHaveBeenCalledWith();
});

it('should throw an error when get active subsites method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.getActive.mockRejectedValue(new Error('Repository error'));

    await expect(service.getActiveSubsites()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* count subsites by user success and failure tests */
it('should count subsites by user', async () => {
    /** 
     * Tests the count subsites by user method.
     * Verifies that the returned subsite matches the expected one 
     * and that the repository's countSubsitesByUser method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: number = 1
    
    mockSubsiteRepository.countByUser.mockResolvedValue(returnOject);

    const result = await service.countSubsitesByUser(userId);
    expect(result).toEqual(returnOject);
    expect(mockSubsiteRepository.countByUser).toHaveBeenCalledWith(userId);
});

it('should throw an error when count subsites by user method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockSubsiteRepository.countByUser.mockRejectedValue(new Error('Repository error'));

    await expect(service.countSubsitesByUser(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

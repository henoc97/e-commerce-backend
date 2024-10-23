import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/application/services/user.service';
import { IUserRepository } from '../../src/domain/repositories/user.repository';
import { User } from '../../src/domain/entities/user.entity';
import { UserDTO } from '../../src/presentation/dtos/user.dto';


const mockUserRepository = {
  create: jest.fn(),
getById: jest.fn(),
update: jest.fn(),
delete: jest.fn(),
getByRole: jest.fn(),
addAddress: jest.fn(),
removeAddress: jest.fn(),
addOrder: jest.fn(),
removeOrder: jest.fn(),
addNotification: jest.fn(),
removeNotification: jest.fn(),
addSubsite: jest.fn(),
removeSubsite: jest.fn(),
logActivity: jest.fn(),
getActivityLog: jest.fn(),
createAuditLog: jest.fn(),
getAuditLogs: jest.fn(),
getByEmail: jest.fn(),
updateProfile: jest.fn(),
updatePassword: jest.fn(),
getOrders: jest.fn(),
getAddresses: jest.fn(),
getReviews: jest.fn(),
getCart: jest.fn(),
getTickets: jest.fn(),
getNotifications: jest.fn(),
getSubsites: jest.fn(),
getActiveCount: jest.fn(),
getCountByRole: jest.fn(),
getInactiveUsers: jest.fn()
};

// Mock console.error
const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();


describe('UserService', () => {
    let service: UserService;
    let userRepository: IUserRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'IUserRepository',
          useValue: mockUserRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<UserService>(UserService);
    userRepository = module.get<IUserRepository>('IUserRepository');
  });

afterEach(() => {
    jest.clearAllMocks();
  });


    /* create user success and failure tests */
it('should create user', async () => {
    /** 
     * Tests the create user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's createUser method is called with the correct data.
     */
    
     const userDTO: UserDTO = { /* data */ };

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.create.mockResolvedValue(returnOject);

    const result = await service.createUser(userDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.create).toHaveBeenCalledWith(userDTO);
});

it('should throw an error when create user method fails', async () => {
    
     const userDTO: UserDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createUser(userDTO)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user by id success and failure tests */
it('should get user by id', async () => {
    /** 
     * Tests the get user by id method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: User | null = { id: 1, /* others data */ };
    
    mockUserRepository.getById.mockResolvedValue(returnOject);

    const result = await service.getUserById(id);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getById).toHaveBeenCalledWith(id);
});

it('should throw an error when get user by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getById.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserById(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update user success and failure tests */
it('should update user', async () => {
    /** 
     * Tests the update user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's updateUser method is called with the correct data.
     */
    
     const id: number = 1;
     const updates: Partial<UserDTO> = { /* data */ };

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.update.mockResolvedValue(returnOject);

    const result = await service.updateUser(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.update).toHaveBeenCalledWith(id, updates);
});

it('should throw an error when update user method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<UserDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.update.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateUser(id, updates)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* delete user success and failure tests */
it('should delete user', async () => {
    /** 
     * Tests the delete user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's deleteUser method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: boolean = true
    
    mockUserRepository.delete.mockResolvedValue(returnOject);

    const result = await service.deleteUser(id);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
});

it('should throw an error when delete user method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.delete.mockRejectedValue(new Error('Repository error'));

    await expect(service.deleteUser(id)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get users by role success and failure tests */
it('should get users by role', async () => {
    /** 
     * Tests the get users by role method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUsersByRole method is called with the correct data.
     */
    
     const role: UserRole = { /* data */ };

    const returnOject: User[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getByRole.mockResolvedValue(returnOject);

    const result = await service.getUsersByRole(role);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getByRole).toHaveBeenCalledWith(role);
});

it('should throw an error when get users by role method fails', async () => {
    
     const role: UserRole = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getByRole.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUsersByRole(role)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* add address to user success and failure tests */
it('should add address to user', async () => {
    /** 
     * Tests the add address to user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's addAddressToUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const address: AddressDTO = { /* data */ };

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.addAddress.mockResolvedValue(returnOject);

    const result = await service.addAddressToUser(userId, address);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.addAddress).toHaveBeenCalledWith(userId, address);
});

it('should throw an error when add address to user method fails', async () => {
    
     const userId: number = 1;
     const address: AddressDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.addAddress.mockRejectedValue(new Error('Repository error'));

    await expect(service.addAddressToUser(userId, address)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* remove address from user success and failure tests */
it('should remove address from user', async () => {
    /** 
     * Tests the remove address from user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's removeAddressFromUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const addressId: number = 1;

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.removeAddress.mockResolvedValue(returnOject);

    const result = await service.removeAddressFromUser(userId,
    addressId,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.removeAddress).toHaveBeenCalledWith(userId,
    addressId,);
});

it('should throw an error when remove address from user method fails', async () => {
    
     const userId: number = 1;
     const addressId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.removeAddress.mockRejectedValue(new Error('Repository error'));

    await expect(service.removeAddressFromUser(userId,
    addressId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* add order to user success and failure tests */
it('should add order to user', async () => {
    /** 
     * Tests the add order to user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's addOrderToUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const order: OrderDTO = { /* data */ };

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.addOrder.mockResolvedValue(returnOject);

    const result = await service.addOrderToUser(userId, order);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.addOrder).toHaveBeenCalledWith(userId, order);
});

it('should throw an error when add order to user method fails', async () => {
    
     const userId: number = 1;
     const order: OrderDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.addOrder.mockRejectedValue(new Error('Repository error'));

    await expect(service.addOrderToUser(userId, order)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* remove order from user success and failure tests */
it('should remove order from user', async () => {
    /** 
     * Tests the remove order from user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's removeOrderFromUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const orderId: number = 1;

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.removeOrder.mockResolvedValue(returnOject);

    const result = await service.removeOrderFromUser(userId, orderId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.removeOrder).toHaveBeenCalledWith(userId, orderId);
});

it('should throw an error when remove order from user method fails', async () => {
    
     const userId: number = 1;
     const orderId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.removeOrder.mockRejectedValue(new Error('Repository error'));

    await expect(service.removeOrderFromUser(userId, orderId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* add notification to user success and failure tests */
it('should add notification to user', async () => {
    /** 
     * Tests the add notification to user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's addNotificationToUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const notification: NotificationDTO = { /* data */ };

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.addNotification.mockResolvedValue(returnOject);

    const result = await service.addNotificationToUser(userId,
    notification,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.addNotification).toHaveBeenCalledWith(userId,
    notification,);
});

it('should throw an error when add notification to user method fails', async () => {
    
     const userId: number = 1;
     const notification: NotificationDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.addNotification.mockRejectedValue(new Error('Repository error'));

    await expect(service.addNotificationToUser(userId,
    notification,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* remove notification from user success and failure tests */
it('should remove notification from user', async () => {
    /** 
     * Tests the remove notification from user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's removeNotificationFromUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const notificationId: number = 1;

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.removeNotification.mockResolvedValue(returnOject);

    const result = await service.removeNotificationFromUser(userId,
    notificationId,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.removeNotification).toHaveBeenCalledWith(userId,
    notificationId,);
});

it('should throw an error when remove notification from user method fails', async () => {
    
     const userId: number = 1;
     const notificationId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.removeNotification.mockRejectedValue(new Error('Repository error'));

    await expect(service.removeNotificationFromUser(userId,
    notificationId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* add subsite to user success and failure tests */
it('should add subsite to user', async () => {
    /** 
     * Tests the add subsite to user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's addSubsiteToUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const subsite: SubsiteDTO = { /* data */ };

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.addSubsite.mockResolvedValue(returnOject);

    const result = await service.addSubsiteToUser(userId, subsite);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.addSubsite).toHaveBeenCalledWith(userId, subsite);
});

it('should throw an error when add subsite to user method fails', async () => {
    
     const userId: number = 1;
     const subsite: SubsiteDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.addSubsite.mockRejectedValue(new Error('Repository error'));

    await expect(service.addSubsiteToUser(userId, subsite)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* remove subsite from user success and failure tests */
it('should remove subsite from user', async () => {
    /** 
     * Tests the remove subsite from user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's removeSubsiteFromUser method is called with the correct data.
     */
    
     const userId: number = 1;
     const subsiteId: number = 1;

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.removeSubsite.mockResolvedValue(returnOject);

    const result = await service.removeSubsiteFromUser(userId,
    subsiteId,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.removeSubsite).toHaveBeenCalledWith(userId,
    subsiteId,);
});

it('should throw an error when remove subsite from user method fails', async () => {
    
     const userId: number = 1;
     const subsiteId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.removeSubsite.mockRejectedValue(new Error('Repository error'));

    await expect(service.removeSubsiteFromUser(userId,
    subsiteId,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* log user activity success and failure tests */
it('should log user activity', async () => {
    /** 
     * Tests the log user activity method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's logUserActivity method is called with the correct data.
     */
    
     const userId: number = 1;
     const action: UserActivityAction = { /* data */ };

    const returnOject: void = { id: 1, /* others data */ };
    
    mockUserRepository.logActivity.mockResolvedValue(returnOject);

    const result = await service.logUserActivity(userId,
    action,
    productId?,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.logActivity).toHaveBeenCalledWith(userId,
    action,
    productId?,);
});

it('should throw an error when log user activity method fails', async () => {
    
     const userId: number = 1;
     const action: UserActivityAction = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.logActivity.mockRejectedValue(new Error('Repository error'));

    await expect(service.logUserActivity(userId,
    action,
    productId?,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user activity log success and failure tests */
it('should get user activity log', async () => {
    /** 
     * Tests the get user activity log method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserActivityLog method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: UserActivity[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getActivityLog.mockResolvedValue(returnOject);

    const result = await service.getUserActivityLog(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getActivityLog).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user activity log method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getActivityLog.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserActivityLog(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* create audit log success and failure tests */
it('should create audit log', async () => {
    /** 
     * Tests the create audit log method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's createAuditLog method is called with the correct data.
     */
    
     const userId: number = 1;
     const auditLog: AuditLogDTO = { /* data */ };

    const returnOject: void = { id: 1, /* others data */ };
    
    mockUserRepository.createAuditLog.mockResolvedValue(returnOject);

    const result = await service.createAuditLog(userId, auditLog);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.createAuditLog).toHaveBeenCalledWith(userId, auditLog);
});

it('should throw an error when create audit log method fails', async () => {
    
     const userId: number = 1;
     const auditLog: AuditLogDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.createAuditLog.mockRejectedValue(new Error('Repository error'));

    await expect(service.createAuditLog(userId, auditLog)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user audit logs success and failure tests */
it('should get user audit logs', async () => {
    /** 
     * Tests the get user audit logs method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserAuditLogs method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: AuditLog[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getAuditLogs.mockResolvedValue(returnOject);

    const result = await service.getUserAuditLogs(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getAuditLogs).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user audit logs method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getAuditLogs.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserAuditLogs(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user by email success and failure tests */
it('should get user by email', async () => {
    /** 
     * Tests the get user by email method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserByEmail method is called with the correct data.
     */
    
     const email: string = 'email';

    const returnOject: User | null = { id: 1, /* others data */ };
    
    mockUserRepository.getByEmail.mockResolvedValue(returnOject);

    const result = await service.getUserByEmail(email);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getByEmail).toHaveBeenCalledWith(email);
});

it('should throw an error when get user by email method fails', async () => {
    
     const email: string = 'email';
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getByEmail.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserByEmail(email)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update user profile success and failure tests */
it('should update user profile', async () => {
    /** 
     * Tests the update user profile method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's updateUserProfile method is called with the correct data.
     */
    
     const userId: number = 1;
     const profile: UserProfileDTO = { /* data */ };

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.updateProfile.mockResolvedValue(returnOject);

    const result = await service.updateUserProfile(userId,
    profile,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.updateProfile).toHaveBeenCalledWith(userId,
    profile,);
});

it('should throw an error when update user profile method fails', async () => {
    
     const userId: number = 1;
     const profile: UserProfileDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.updateProfile.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateUserProfile(userId,
    profile,)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* update user password success and failure tests */
it('should update user password', async () => {
    /** 
     * Tests the update user password method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's updateUserPassword method is called with the correct data.
     */
    
     const userId: number = 1;
     const newPassword: string = 'newPassword';

    const returnOject: User = { id: 1, /* others data */ };
    
    mockUserRepository.updatePassword.mockResolvedValue(returnOject);

    const result = await service.updateUserPassword(userId, newPassword);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.updatePassword).toHaveBeenCalledWith(userId, newPassword);
});

it('should throw an error when update user password method fails', async () => {
    
     const userId: number = 1;
     const newPassword: string = 'newPassword';
    
    // Simulate a failure when calling the repository 
    mockUserRepository.updatePassword.mockRejectedValue(new Error('Repository error'));

    await expect(service.updateUserPassword(userId, newPassword)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user orders success and failure tests */
it('should get user orders', async () => {
    /** 
     * Tests the get user orders method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserOrders method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Order[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getOrders.mockResolvedValue(returnOject);

    const result = await service.getUserOrders(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getOrders).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user orders method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getOrders.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserOrders(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get user addresses success and failure tests */
it('should get user addresses', async () => {
    /** 
     * Tests the get user addresses method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserAddresses method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Address[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getAddresses.mockResolvedValue(returnOject);

    const result = await service.getUserAddresses(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getAddresses).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user addresses method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getAddresses.mockRejectedValue(new Error('Repository error'));

    await expect(service.getUserAddresses(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get reviews success and failure tests */
it('should get reviews', async () => {
    /** 
     * Tests the get reviews method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getReviews method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Review[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getReviews.mockResolvedValue(returnOject);

    const result = await service.getReviews(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getReviews).toHaveBeenCalledWith(userId);
});

it('should throw an error when get reviews method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getReviews.mockRejectedValue(new Error('Repository error'));

    await expect(service.getReviews(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get cart success and failure tests */
it('should get cart', async () => {
    /** 
     * Tests the get cart method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getCart method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Cart | null = { id: 1, /* others data */ };
    
    mockUserRepository.getCart.mockResolvedValue(returnOject);

    const result = await service.getCart(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getCart).toHaveBeenCalledWith(userId);
});

it('should throw an error when get cart method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getCart.mockRejectedValue(new Error('Repository error'));

    await expect(service.getCart(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get tickets success and failure tests */
it('should get tickets', async () => {
    /** 
     * Tests the get tickets method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getTickets method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Ticket[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getTickets.mockResolvedValue(returnOject);

    const result = await service.getTickets(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getTickets).toHaveBeenCalledWith(userId);
});

it('should throw an error when get tickets method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getTickets.mockRejectedValue(new Error('Repository error'));

    await expect(service.getTickets(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get notifications success and failure tests */
it('should get notifications', async () => {
    /** 
     * Tests the get notifications method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getNotifications method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Notification[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getNotifications.mockResolvedValue(returnOject);

    const result = await service.getNotifications(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getNotifications).toHaveBeenCalledWith(userId);
});

it('should throw an error when get notifications method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getNotifications.mockRejectedValue(new Error('Repository error'));

    await expect(service.getNotifications(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get subsites success and failure tests */
it('should get subsites', async () => {
    /** 
     * Tests the get subsites method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getSubsites method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Subsite[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getSubsites.mockResolvedValue(returnOject);

    const result = await service.getSubsites(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getSubsites).toHaveBeenCalledWith(userId);
});

it('should throw an error when get subsites method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getSubsites.mockRejectedValue(new Error('Repository error'));

    await expect(service.getSubsites(userId)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get active count success and failure tests */
it('should get active count', async () => {
    /** 
     * Tests the get active count method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getActiveCount method is called with the correct data.
     */
    

    const returnOject: number = 1
    
    mockUserRepository.getActiveCount.mockResolvedValue(returnOject);

    const result = await service.getActiveCount();
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getActiveCount).toHaveBeenCalledWith();
});

it('should throw an error when get active count method fails', async () => {
    
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getActiveCount.mockRejectedValue(new Error('Repository error'));

    await expect(service.getActiveCount()).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get count by role success and failure tests */
it('should get count by role', async () => {
    /** 
     * Tests the get count by role method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getCountByRole method is called with the correct data.
     */
    
     const role: UserRole = { /* data */ };

    const returnOject: number = 1
    
    mockUserRepository.getCountByRole.mockResolvedValue(returnOject);

    const result = await service.getCountByRole(role);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getCountByRole).toHaveBeenCalledWith(role);
});

it('should throw an error when get count by role method fails', async () => {
    
     const role: UserRole = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getCountByRole.mockRejectedValue(new Error('Repository error'));

    await expect(service.getCountByRole(role)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

/* get inactive users success and failure tests */
it('should get inactive users', async () => {
    /** 
     * Tests the get inactive users method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getInactiveUsers method is called with the correct data.
     */
    
     const days: number = 1;

    const returnOject: User[] = [{ id: 1, /* others data */ }];
    
    mockUserRepository.getInactiveUsers.mockResolvedValue(returnOject);

    const result = await service.getInactiveUsers(days);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getInactiveUsers).toHaveBeenCalledWith(days);
});

it('should throw an error when get inactive users method fails', async () => {
    
     const days: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getInactiveUsers.mockRejectedValue(new Error('Repository error'));

    await expect(service.getInactiveUsers(days)).rejects.toThrow('Repository error');

    // Restore console.error
    consoleErrorMock.mockRestore();
});

})

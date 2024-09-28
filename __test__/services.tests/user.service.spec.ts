import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/application/services/user.service';
import { IUserRepository } from '../../src/domain/repositories/user.repository';
import { User } from '../../src/domain/entities/user.entity';
import { UserDTO } from '../../src/presentation/dtos/user.dto';


const mockUserRepository = {
  createUser: jest.fn(),
getUserById: jest.fn(),
updateUser: jest.fn(),
deleteUser: jest.fn(),
getUsersByRole: jest.fn(),
addAddressToUser: jest.fn(),
removeAddressFromUser: jest.fn(),
addOrderToUser: jest.fn(),
removeOrderFromUser: jest.fn(),
addNotificationToUser: jest.fn(),
removeNotificationFromUser: jest.fn(),
addSubsiteToUser: jest.fn(),
removeSubsiteFromUser: jest.fn(),
logUserActivity: jest.fn(),
getUserActivityLog: jest.fn(),
createAuditLog: jest.fn(),
getUserAuditLogs: jest.fn(),
getUserByEmail: jest.fn(),
updateUserProfile: jest.fn(),
updateUserPassword: jest.fn(),
getUserOrders: jest.fn(),
getUserAddresses: jest.fn(),
getReviews: jest.fn(),
getCart: jest.fn(),
getTickets: jest.fn(),
getNotifications: jest.fn(),
getSubsites: jest.fn(),
getActiveCount: jest.fn(),
getCountByRole: jest.fn(),
getInactiveUsers: jest.fn()
};

describe('UserService', () => {
    let service: UserService;
    let userRepository: IUserRepository;

    beforeEach(async () => {
    // Set up the testing module with the service and the mock repository
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository, // Use the mock
        },
      ],
    }).compile();

    // Retrieve instances of the service and repository
    service = module.get<UserService>(UserService);
    userRepository = module.get<IUserRepository>('UserRepository');
  });

    /* create user success and failure tests */
it('should create user', async () => {
    /** 
     * Tests the create user method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's createUser method is called with the correct data.
     */
    
     const userDTO: UserDTO = { /* data */ };

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.createUser.mockResolvedValue(returnOject);

    const result = await service.createUser(userDTO);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(userDTO);
});

it('should throw an error when create user method fails', async () => {
    
     const userDTO: UserDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.createUser.mockResolvedValue(" Repository error");

    const result = await service.createUser(userDTO);
    expect(result).rejects.toThrow('Repository error');
});

/* get user by id success and failure tests */
it('should get user by id', async () => {
    /** 
     * Tests the get user by id method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserById method is called with the correct data.
     */
    
     const id: number = 1;

    const returnOject: User | null = { id: 1, /* others data */ }
    
    mockUserRepository.getUserById.mockResolvedValue(returnOject);

    const result = await service.getUserById(id);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(id);
});

it('should throw an error when get user by id method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getUserById.mockResolvedValue(" Repository error");

    const result = await service.getUserById(id);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.updateUser.mockResolvedValue(returnOject);

    const result = await service.updateUser(id, updates);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(id, updates);
});

it('should throw an error when update user method fails', async () => {
    
     const id: number = 1;
     const updates: Partial<UserDTO> = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.updateUser.mockResolvedValue(" Repository error");

    const result = await service.updateUser(id, updates);
    expect(result).rejects.toThrow('Repository error');
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
    
    mockUserRepository.deleteUser.mockResolvedValue(returnOject);

    const result = await service.deleteUser(id);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(id);
});

it('should throw an error when delete user method fails', async () => {
    
     const id: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.deleteUser.mockResolvedValue(" Repository error");

    const result = await service.deleteUser(id);
    expect(result).rejects.toThrow('Repository error');
});

/* get users by role success and failure tests */
it('should get users by role', async () => {
    /** 
     * Tests the get users by role method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUsersByRole method is called with the correct data.
     */
    
     const role: UserRole = { /* data */ };

    const returnOject: User[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getUsersByRole.mockResolvedValue(returnOject);

    const result = await service.getUsersByRole(role);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getUsersByRole).toHaveBeenCalledWith(role);
});

it('should throw an error when get users by role method fails', async () => {
    
     const role: UserRole = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getUsersByRole.mockResolvedValue(" Repository error");

    const result = await service.getUsersByRole(role);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.addAddressToUser.mockResolvedValue(returnOject);

    const result = await service.addAddressToUser(userId, address);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.addAddressToUser).toHaveBeenCalledWith(userId, address);
});

it('should throw an error when add address to user method fails', async () => {
    
     const userId: number = 1;
     const address: AddressDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.addAddressToUser.mockResolvedValue(" Repository error");

    const result = await service.addAddressToUser(userId, address);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.removeAddressFromUser.mockResolvedValue(returnOject);

    const result = await service.removeAddressFromUser(userId,
    addressId,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.removeAddressFromUser).toHaveBeenCalledWith(userId,
    addressId,);
});

it('should throw an error when remove address from user method fails', async () => {
    
     const userId: number = 1;
     const addressId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.removeAddressFromUser.mockResolvedValue(" Repository error");

    const result = await service.removeAddressFromUser(userId,
    addressId,);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.addOrderToUser.mockResolvedValue(returnOject);

    const result = await service.addOrderToUser(userId, order);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.addOrderToUser).toHaveBeenCalledWith(userId, order);
});

it('should throw an error when add order to user method fails', async () => {
    
     const userId: number = 1;
     const order: OrderDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.addOrderToUser.mockResolvedValue(" Repository error");

    const result = await service.addOrderToUser(userId, order);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.removeOrderFromUser.mockResolvedValue(returnOject);

    const result = await service.removeOrderFromUser(userId, orderId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.removeOrderFromUser).toHaveBeenCalledWith(userId, orderId);
});

it('should throw an error when remove order from user method fails', async () => {
    
     const userId: number = 1;
     const orderId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.removeOrderFromUser.mockResolvedValue(" Repository error");

    const result = await service.removeOrderFromUser(userId, orderId);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.addNotificationToUser.mockResolvedValue(returnOject);

    const result = await service.addNotificationToUser(userId,
    notification,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.addNotificationToUser).toHaveBeenCalledWith(userId,
    notification,);
});

it('should throw an error when add notification to user method fails', async () => {
    
     const userId: number = 1;
     const notification: NotificationDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.addNotificationToUser.mockResolvedValue(" Repository error");

    const result = await service.addNotificationToUser(userId,
    notification,);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.removeNotificationFromUser.mockResolvedValue(returnOject);

    const result = await service.removeNotificationFromUser(userId,
    notificationId,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.removeNotificationFromUser).toHaveBeenCalledWith(userId,
    notificationId,);
});

it('should throw an error when remove notification from user method fails', async () => {
    
     const userId: number = 1;
     const notificationId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.removeNotificationFromUser.mockResolvedValue(" Repository error");

    const result = await service.removeNotificationFromUser(userId,
    notificationId,);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.addSubsiteToUser.mockResolvedValue(returnOject);

    const result = await service.addSubsiteToUser(userId, subsite);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.addSubsiteToUser).toHaveBeenCalledWith(userId, subsite);
});

it('should throw an error when add subsite to user method fails', async () => {
    
     const userId: number = 1;
     const subsite: SubsiteDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.addSubsiteToUser.mockResolvedValue(" Repository error");

    const result = await service.addSubsiteToUser(userId, subsite);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.removeSubsiteFromUser.mockResolvedValue(returnOject);

    const result = await service.removeSubsiteFromUser(userId,
    subsiteId,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.removeSubsiteFromUser).toHaveBeenCalledWith(userId,
    subsiteId,);
});

it('should throw an error when remove subsite from user method fails', async () => {
    
     const userId: number = 1;
     const subsiteId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.removeSubsiteFromUser.mockResolvedValue(" Repository error");

    const result = await service.removeSubsiteFromUser(userId,
    subsiteId,);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: void = { id: 1, /* others data */ }
    
    mockUserRepository.logUserActivity.mockResolvedValue(returnOject);

    const result = await service.logUserActivity(userId,
    action,
    productId?,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.logUserActivity).toHaveBeenCalledWith(userId,
    action,
    productId?,);
});

it('should throw an error when log user activity method fails', async () => {
    
     const userId: number = 1;
     const action: UserActivityAction = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.logUserActivity.mockResolvedValue(" Repository error");

    const result = await service.logUserActivity(userId,
    action,
    productId?,);
    expect(result).rejects.toThrow('Repository error');
});

/* get user activity log success and failure tests */
it('should get user activity log', async () => {
    /** 
     * Tests the get user activity log method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserActivityLog method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: UserActivity[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getUserActivityLog.mockResolvedValue(returnOject);

    const result = await service.getUserActivityLog(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getUserActivityLog).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user activity log method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getUserActivityLog.mockResolvedValue(" Repository error");

    const result = await service.getUserActivityLog(userId);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: void = { id: 1, /* others data */ }
    
    mockUserRepository.createAuditLog.mockResolvedValue(returnOject);

    const result = await service.createAuditLog(userId, auditLog);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.createAuditLog).toHaveBeenCalledWith(userId, auditLog);
});

it('should throw an error when create audit log method fails', async () => {
    
     const userId: number = 1;
     const auditLog: AuditLogDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.createAuditLog.mockResolvedValue(" Repository error");

    const result = await service.createAuditLog(userId, auditLog);
    expect(result).rejects.toThrow('Repository error');
});

/* get user audit logs success and failure tests */
it('should get user audit logs', async () => {
    /** 
     * Tests the get user audit logs method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserAuditLogs method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: AuditLog[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getUserAuditLogs.mockResolvedValue(returnOject);

    const result = await service.getUserAuditLogs(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getUserAuditLogs).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user audit logs method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getUserAuditLogs.mockResolvedValue(" Repository error");

    const result = await service.getUserAuditLogs(userId);
    expect(result).rejects.toThrow('Repository error');
});

/* get user by email success and failure tests */
it('should get user by email', async () => {
    /** 
     * Tests the get user by email method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserByEmail method is called with the correct data.
     */
    
     const email: string = 'email';

    const returnOject: User | null = { id: 1, /* others data */ }
    
    mockUserRepository.getUserByEmail.mockResolvedValue(returnOject);

    const result = await service.getUserByEmail(email);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
});

it('should throw an error when get user by email method fails', async () => {
    
     const email: string = 'email';
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getUserByEmail.mockResolvedValue(" Repository error");

    const result = await service.getUserByEmail(email);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.updateUserProfile.mockResolvedValue(returnOject);

    const result = await service.updateUserProfile(userId,
    profile,);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.updateUserProfile).toHaveBeenCalledWith(userId,
    profile,);
});

it('should throw an error when update user profile method fails', async () => {
    
     const userId: number = 1;
     const profile: UserProfileDTO = { /* data */ };
    
    // Simulate a failure when calling the repository 
    mockUserRepository.updateUserProfile.mockResolvedValue(" Repository error");

    const result = await service.updateUserProfile(userId,
    profile,);
    expect(result).rejects.toThrow('Repository error');
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

    const returnOject: User = { id: 1, /* others data */ }
    
    mockUserRepository.updateUserPassword.mockResolvedValue(returnOject);

    const result = await service.updateUserPassword(userId, newPassword);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.updateUserPassword).toHaveBeenCalledWith(userId, newPassword);
});

it('should throw an error when update user password method fails', async () => {
    
     const userId: number = 1;
     const newPassword: string = 'newPassword';
    
    // Simulate a failure when calling the repository 
    mockUserRepository.updateUserPassword.mockResolvedValue(" Repository error");

    const result = await service.updateUserPassword(userId, newPassword);
    expect(result).rejects.toThrow('Repository error');
});

/* get user orders success and failure tests */
it('should get user orders', async () => {
    /** 
     * Tests the get user orders method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserOrders method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Order[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getUserOrders.mockResolvedValue(returnOject);

    const result = await service.getUserOrders(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getUserOrders).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user orders method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getUserOrders.mockResolvedValue(" Repository error");

    const result = await service.getUserOrders(userId);
    expect(result).rejects.toThrow('Repository error');
});

/* get user addresses success and failure tests */
it('should get user addresses', async () => {
    /** 
     * Tests the get user addresses method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getUserAddresses method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Address[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getUserAddresses.mockResolvedValue(returnOject);

    const result = await service.getUserAddresses(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getUserAddresses).toHaveBeenCalledWith(userId);
});

it('should throw an error when get user addresses method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getUserAddresses.mockResolvedValue(" Repository error");

    const result = await service.getUserAddresses(userId);
    expect(result).rejects.toThrow('Repository error');
});

/* get reviews success and failure tests */
it('should get reviews', async () => {
    /** 
     * Tests the get reviews method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getReviews method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Review[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getReviews.mockResolvedValue(returnOject);

    const result = await service.getReviews(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getReviews).toHaveBeenCalledWith(userId);
});

it('should throw an error when get reviews method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getReviews.mockResolvedValue(" Repository error");

    const result = await service.getReviews(userId);
    expect(result).rejects.toThrow('Repository error');
});

/* get cart success and failure tests */
it('should get cart', async () => {
    /** 
     * Tests the get cart method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getCart method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Cart | null = { id: 1, /* others data */ }
    
    mockUserRepository.getCart.mockResolvedValue(returnOject);

    const result = await service.getCart(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getCart).toHaveBeenCalledWith(userId);
});

it('should throw an error when get cart method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getCart.mockResolvedValue(" Repository error");

    const result = await service.getCart(userId);
    expect(result).rejects.toThrow('Repository error');
});

/* get tickets success and failure tests */
it('should get tickets', async () => {
    /** 
     * Tests the get tickets method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getTickets method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Ticket[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getTickets.mockResolvedValue(returnOject);

    const result = await service.getTickets(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getTickets).toHaveBeenCalledWith(userId);
});

it('should throw an error when get tickets method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getTickets.mockResolvedValue(" Repository error");

    const result = await service.getTickets(userId);
    expect(result).rejects.toThrow('Repository error');
});

/* get notifications success and failure tests */
it('should get notifications', async () => {
    /** 
     * Tests the get notifications method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getNotifications method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Notification[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getNotifications.mockResolvedValue(returnOject);

    const result = await service.getNotifications(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getNotifications).toHaveBeenCalledWith(userId);
});

it('should throw an error when get notifications method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getNotifications.mockResolvedValue(" Repository error");

    const result = await service.getNotifications(userId);
    expect(result).rejects.toThrow('Repository error');
});

/* get subsites success and failure tests */
it('should get subsites', async () => {
    /** 
     * Tests the get subsites method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getSubsites method is called with the correct data.
     */
    
     const userId: number = 1;

    const returnOject: Subsite[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getSubsites.mockResolvedValue(returnOject);

    const result = await service.getSubsites(userId);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getSubsites).toHaveBeenCalledWith(userId);
});

it('should throw an error when get subsites method fails', async () => {
    
     const userId: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getSubsites.mockResolvedValue(" Repository error");

    const result = await service.getSubsites(userId);
    expect(result).rejects.toThrow('Repository error');
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
    mockUserRepository.getActiveCount.mockResolvedValue(" Repository error");

    const result = await service.getActiveCount();
    expect(result).rejects.toThrow('Repository error');
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
    mockUserRepository.getCountByRole.mockResolvedValue(" Repository error");

    const result = await service.getCountByRole(role);
    expect(result).rejects.toThrow('Repository error');
});

/* get inactive users success and failure tests */
it('should get inactive users', async () => {
    /** 
     * Tests the get inactive users method.
     * Verifies that the returned user matches the expected one 
     * and that the repository's getInactiveUsers method is called with the correct data.
     */
    
     const days: number = 1;

    const returnOject: User[] = [{ id: 1, /* others data */ }]
    
    mockUserRepository.getInactiveUsers.mockResolvedValue(returnOject);

    const result = await service.getInactiveUsers(days);
    expect(result).toEqual(returnOject);
    expect(mockUserRepository.getInactiveUsers).toHaveBeenCalledWith(days);
});

it('should throw an error when get inactive users method fails', async () => {
    
     const days: number = 1;
    
    // Simulate a failure when calling the repository 
    mockUserRepository.getInactiveUsers.mockResolvedValue(" Repository error");

    const result = await service.getInactiveUsers(days);
    expect(result).rejects.toThrow('Repository error');
});

})

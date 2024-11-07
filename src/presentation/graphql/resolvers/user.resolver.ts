import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AddAddressToUser } from 'src/application/use-cases/user.use-cases/add-address-to-user.use-case';
// import { AddNotificationToUser } from 'src/application/use-cases/user.use-cases/add-notification-to-user.use-case';
// import { AddOrderToUser } from 'src/application/use-cases/user.use-cases/add-order-to-user.use-case';
// import { AddSubsiteToUser } from 'src/application/use-cases/user.use-cases/add-subsite-to-user.use-case';
import { CreateUser } from 'src/application/use-cases/user.use-cases/create-user.use-case';
import { DeleteUser } from 'src/application/use-cases/user.use-cases/delete-user.use-case';
import { GetActiveCount } from 'src/application/use-cases/user.use-cases/get-active-count.use-case';
import { GetCountByRole } from 'src/application/use-cases/user.use-cases/get-count-by-role.use-case';
import { GetDetailedInfo } from 'src/application/use-cases/user.use-cases/get-detailed-info.use-case';
import { GetInactiveUsersUseCase } from 'src/application/use-cases/user.use-cases/get-inactive-users.use-case';
import { GetUserByEmailUseCase } from 'src/application/use-cases/user.use-cases/get-user-by-email.use-case';
import { GetUser } from 'src/application/use-cases/user.use-cases/get-user.use-case';
import { GetUsersByRoleUseCase } from 'src/application/use-cases/user.use-cases/get-users-by-role.use-case';
import { RemoveAddressFromUserUseCase } from 'src/application/use-cases/user.use-cases/remove-address-from-user.use-case';
// import { RemoveNotificationFromUserUseCase } from 'src/application/use-cases/user.use-cases/remove-notification-from-user.use-case';
// import { RemoveOrderFromUserUseCase } from 'src/application/use-cases/user.use-cases/remove-order-from-user.use-case';
// import { RemoveSubsiteFromUserUseCase } from 'src/application/use-cases/user.use-cases/remove-subsite-from-user.use-case';
import { UpdateUserPasswordUseCase } from 'src/application/use-cases/user.use-cases/update-user-password.use-case';
import { UpdateUser } from 'src/application/use-cases/user.use-cases/update-user.use-case';
import { AddressDTO } from 'src/presentation/dtos/address.dto';
import { NotificationDTO } from 'src/presentation/dtos/notification.dto';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { SubsiteDTO } from 'src/presentation/dtos/Subsite.dto';
import { UserDTO } from 'src/presentation/dtos/user.dto';
import { UserRole } from 'src/domain/enums/user-role.enum';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(
    private readonly addAddressToUser: AddAddressToUser,
    // private readonly addNotificationToUser: AddNotificationToUser,
    // private readonly addOrderToUser: AddOrderToUser,
    // private readonly addSubsiteToUser: AddSubsiteToUser,
    private readonly createUserUseCase: CreateUser,
    private readonly deleteUserUseCase: DeleteUser,
    private readonly getActiveCountUseCase: GetActiveCount,
    private readonly getCountByRoleUseCase: GetCountByRole,
    private readonly getDetailedInfoUseCase: GetDetailedInfo,
    private readonly getInactiveUsersUseCase: GetInactiveUsersUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUser: GetUser,
    private readonly getUsersByRoleUseCase: GetUsersByRoleUseCase,
    private readonly removeAddressFromUserUseCase: RemoveAddressFromUserUseCase,
    // private readonly removeNotificationFromUserUseCase: RemoveNotificationFromUserUseCase,
    // private readonly removeOrderFromUserUseCase: RemoveOrderFromUserUseCase,
    // private readonly removeSubsiteFromUserUseCase: RemoveSubsiteFromUserUseCase,
    private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
    private readonly updateUserUseCase: UpdateUser,
  ) {}

  @Mutation(() => UserDTO, { name: 'addAddressToUser' })
  async addAddress(
    @Args('userId') userId: number,
    @Args('address') address: AddressDTO,
  ): Promise<UserDTO | null> {
    return this.addAddressToUser.execute(userId, address);
  }

  // @Mutation(() => UserDTO, { name: 'addNotificationToUser' })
  // async addNotification(
  //   @Args('userId') userId: number,
  //   @Args('notification') notification: NotificationDTO,
  // ): Promise<UserDTO | null> {
  //   return this.addNotificationToUser.execute(userId, notification);
  // }

  // @Mutation(() => UserDTO, { name: 'addOrderToUser' })
  // async addOrder(
  //   @Args('userId') userId: number,
  //   @Args('order') order: OrderDTO,
  // ): Promise<UserDTO | null> {
  //   return this.addOrderToUser.execute(userId, order);
  // }

  // @Mutation(() => UserDTO, { name: 'addSubsiteToUser' })
  // async addSubsite(
  //   @Args('userId') userId: number,
  //   @Args('subsite') subsite: SubsiteDTO,
  // ): Promise<UserDTO | null> {
  //   return this.addSubsiteToUser.execute(userId, subsite);
  // }

  @Mutation(() => UserDTO, { name: 'createUser' })
  async createUser(@Args('user') user: UserDTO): Promise<UserDTO | null> {
    return this.createUserUseCase.execute(user);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async deleteUser(@Args('userId') userId: number): Promise<boolean> {
    return this.deleteUserUseCase.execute(userId);
  }

  @Query(() => Number, { name: 'getActiveCount' })
  async getActiveCount(): Promise<number> {
    return this.getActiveCountUseCase.execute();
  }

  @Query(() => Number, { name: 'getCountByRole' })
  async getCountByRole(@Args('role') role: UserRole): Promise<number> {
    return this.getCountByRoleUseCase.execute(role);
  }

  @Query(() => UserDTO, { name: 'getDetailedInfo' })
  async getDetailedInfo(
    @Args('userId') userId: number,
  ): Promise<UserDTO | null> {
    return this.getDetailedInfoUseCase.execute(userId);
  }

  @Query(() => [UserDTO], { name: 'getInactiveUsers' })
  async getInactiveUsers(@Args('days') days: number): Promise<UserDTO[]> {
    return this.getInactiveUsersUseCase.execute(days);
  }

  @Query(() => UserDTO, { name: 'getUserByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<UserDTO | null> {
    return this.getUserByEmailUseCase.execute(email);
  }

  @Query(() => UserDTO, { name: 'getUser' })
  async getUserById(@Args('userId') userId: number): Promise<UserDTO | null> {
    return this.getUser.execute(userId);
  }

  @Query(() => [UserDTO], { name: 'getUsersByRole' })
  async getUsersByRole(@Args('role') role: UserRole): Promise<UserDTO[]> {
    return this.getUsersByRoleUseCase.execute(role);
  }

  @Mutation(() => UserDTO, { name: 'removeAddressFromUser' })
  async removeAddress(
    @Args('userId') userId: number,
    @Args('addressId') addressId: number,
  ): Promise<UserDTO> {
    return this.removeAddressFromUserUseCase.execute(userId, addressId);
  }

  // @Mutation(() => UserDTO, { name: 'removeNotificationFromUser' })
  // async removeNotification(
  //   @Args('userId') userId: number,
  //   @Args('notificationId') notificationId: number,
  // ): Promise<UserDTO> {
  //   return this.removeNotificationFromUserUseCase.execute(
  //     userId,
  //     notificationId,
  //   );
  // }

  // @Mutation(() => UserDTO, { name: 'removeOrderFromUser' })
  // async removeOrder(
  //   @Args('userId') userId: number,
  //   @Args('orderId') orderId: number,
  // ): Promise<UserDTO> {
  //   return this.removeOrderFromUserUseCase.execute(userId, orderId);
  // }

  // @Mutation(() => UserDTO, { name: 'removeSubsiteFromUser' })
  // async removeSubsite(
  //   @Args('userId') userId: number,
  //   @Args('subsiteId') subsiteId: number,
  // ): Promise<UserDTO> {
  //   return this.removeSubsiteFromUserUseCase.execute(userId, subsiteId);
  // }

  @Mutation(() => UserDTO, { name: 'updateUserPassword' })
  async updateUserPassword(
    @Args('userId') userId: number,
    @Args('newPassword') newPassword: string,
  ): Promise<UserDTO> {
    return this.updateUserPasswordUseCase.execute(userId, newPassword);
  }

  @Mutation(() => UserDTO, { name: 'updateUser' })
  async updateUser(
    @Args('userId') userId: number,
    @Args('user') user: Partial<UserDTO>,
  ): Promise<UserDTO | null> {
    return this.updateUserUseCase.execute(userId, user);
  }
}

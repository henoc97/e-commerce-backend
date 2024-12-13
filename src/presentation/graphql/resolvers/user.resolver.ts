import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AddAddressToUser } from '../../../application/use-cases/user.use-cases/add-address-to-user.use-case';
// import { AddNotificationToUser } from '../../../application/use-cases/user.use-cases/add-notification-to-user.use-case';
// import { AddOrderToUser } from '../../../application/use-cases/user.use-cases/add-order-to-user.use-case';
// import { AddSubsiteToUser } from '../../../application/use-cases/user.use-cases/add-subsite-to-user.use-case';
import { CreateUser } from '../../../application/use-cases/user.use-cases/create-user.use-case';
import { DeleteUser } from '../../../application/use-cases/user.use-cases/delete-user.use-case';
import { GetActiveCount } from '../../../application/use-cases/user.use-cases/get-active-count.use-case';
import { GetCountByRole } from '../../../application/use-cases/user.use-cases/get-count-by-role.use-case';
import { GetDetailedInfo } from '../../../application/use-cases/user.use-cases/get-detailed-info.use-case';
import { GetInactiveUsersUseCase } from '../../../application/use-cases/user.use-cases/get-inactive-users.use-case';
import { GetUserByEmailUseCase } from '../../../application/use-cases/user.use-cases/get-user-by-email.use-case';
import { GetUser } from '../../../application/use-cases/user.use-cases/get-user.use-case';
import { GetUsersByRoleUseCase } from '../../../application/use-cases/user.use-cases/get-users-by-role.use-case';
import { RemoveAddressFromUserUseCase } from '../../../application/use-cases/user.use-cases/remove-address-from-user.use-case';
// import { RemoveNotificationFromUserUseCase } from '../../../application/use-cases/user.use-cases/remove-notification-from-user.use-case';
// import { RemoveOrderFromUserUseCase } from '../../../application/use-cases/user.use-cases/remove-order-from-user.use-case';
// import { RemoveSubsiteFromUserUseCase } from '../../../application/use-cases/user.use-cases/remove-subsite-from-user.use-case';
import { UpdateUserPasswordUseCase } from '../../../application/use-cases/user.use-cases/update-user-password.use-case';
import { UpdateUser } from '../../../application/use-cases/user.use-cases/update-user.use-case';
import { AddressDTO } from '../../../presentation/dtos/address.dto';
import { UserDTO } from '../../../presentation/dtos/user.dto';
import { UserRole } from '../../../domain/enums/user-role.enum';
import { transformUserDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { AddressInput } from '../../../presentation/input/address.input';
import { UserOutput } from '../../../presentation/output/user.output';
import { UserInput } from '../../../presentation/input/user.input';
import { toUserDTO } from '../../../application/helper/to-dto/to.user.dto';
import { AuthService } from '../../../infrastructure/external-services/auth/auth.service';
import { JwtAuthGuard } from '../../../infrastructure/external-services/auth/jwt-auth.guard';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../infrastructure/external-services/auth/roles.guard';
import { Roles } from '../../../infrastructure/external-services/auth/roles.decorator';

@Resolver(() => UserOutput)
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
    private readonly authService: AuthService
  ) { }

  @Mutation(() => UserOutput, { name: 'addAddressToUser' })
  async addAddress(
    @Args('userId') userId: number,
    @Args('AddressInput') address: AddressInput,
  ): Promise<UserOutput | null> {
    const result = await this.addAddressToUser.execute(userId, address);
    return transformUserDTOToGraphQL(result);
  }

  // @Mutation(() => UserOutput, { name: 'addNotificationToUser' })
  // async addNotification(
  //   @Args('userId') userId: number,
  //   @Args('notification') notification: NotificationDTO,
  // ): Promise<UserOutput | null> {
  //   const result = await this.addNotificationToUser.execute(userId, notification);
  // return transformUserDTOToGraphQL(result);
  // }

  // @Mutation(() => UserOutput, { name: 'addOrderToUser' })
  // async addOrder(
  //   @Args('userId') userId: number,
  //   @Args('order') order: OrderDTO,
  // ): Promise<UserOutput | null> {
  //   const result = await this.addOrderToUser.execute(userId, order);
  // return transformUserDTOToGraphQL(result);
  // }

  // @Mutation(() => UserOutput, { name: 'addSubsiteToUser' })
  // async addSubsite(
  //   @Args('userId') userId: number,
  //   @Args('subsite') subsite: SubsiteDTO,
  // ): Promise<UserOutput | null> {
  //   const result = await this.addSubsiteToUser.execute(userId, subsite);
  // return transformUserDTOToGraphQL(result);
  // }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  getProfile(@Context('user') user): string {
    return `Hello, ${user.email}. Your ID is ${user.sub}.`;
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  adminOnlyData(): string {
    return "This data is accessible only to admins.";
  }

  @Mutation(() => UserOutput, { name: 'createUser' })
  async createUser(@Args('user') user: UserInput): Promise<UserOutput | null> {
    const dto = toUserDTO(user);
    const result = await this.createUserUseCase.execute(dto);
    const res = transformUserDTOToGraphQL(result);
    const token = this.authService.generateToken(dto);
    res.token = token;
    console.log("User created: " + res);
    return res;
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

  @Query(() => UserOutput, { name: 'getDetailedInfo' })
  async getDetailedInfo(
    @Args('userId') userId: number,
  ): Promise<UserOutput | null> {
    const result = await this.getDetailedInfoUseCase.execute(userId);
    return transformUserDTOToGraphQL(result);
  }

  @Query(() => [UserOutput], { name: 'getInactiveUsers' })
  async getInactiveUsers(@Args('days') days: number): Promise<UserOutput[]> {
    const result = await this.getInactiveUsersUseCase.execute(days);
    return result?.map(transformUserDTOToGraphQL);
  }

  @Query(() => UserOutput, { name: 'getUserByEmail' })
  async getUserByEmail(@Args('email') email: string): Promise<UserOutput | null> {
    const result = await this.getUserByEmailUseCase.execute(email);
    return transformUserDTOToGraphQL(result);
  }

  @Query(() => UserOutput, { name: 'getUser' })
  async getUserById(@Args('userId') userId: number): Promise<UserOutput | null> {
    const result = await this.getUser.execute(userId);
    return transformUserDTOToGraphQL(result);
  }

  @Query(() => [UserOutput], { name: 'getUsersByRole' })
  async getUsersByRole(@Args('role') role: UserRole): Promise<UserOutput[]> {
    const result = await this.getUsersByRoleUseCase.execute(role);
    return result?.map(transformUserDTOToGraphQL);
  }

  @Mutation(() => UserOutput, { name: 'removeAddressFromUser' })
  async removeAddress(
    @Args('userId') userId: number,
    @Args('addressId') addressId: number,
  ): Promise<UserOutput> {
    const result = await this.removeAddressFromUserUseCase.execute(userId, addressId);
    return transformUserDTOToGraphQL(result);
  }

  // @Mutation(() => UserOutput, { name: 'removeNotificationFromUser' })
  // async removeNotification(
  //   @Args('userId') userId: number,
  //   @Args('notificationId') notificationId: number,
  // ): Promise<UserOutput> {
  //   const result = await this.removeNotificationFromUserUseCase.execute(
  // return transformUserDTOToGraphQL(result);
  //     userId,
  //     notificationId,
  //   );
  // }

  // @Mutation(() => UserOutput, { name: 'removeOrderFromUser' })
  // async removeOrder(
  //   @Args('userId') userId: number,
  //   @Args('orderId') orderId: number,
  // ): Promise<UserOutput> {
  //   const result = await this.removeOrderFromUserUseCase.execute(userId, orderId);
  // return transformUserDTOToGraphQL(result);
  // }

  // @Mutation(() => UserOutput, { name: 'removeSubsiteFromUser' })
  // async removeSubsite(
  //   @Args('userId') userId: number,
  //   @Args('subsiteId') subsiteId: number,
  // ): Promise<UserOutput> {
  //   const result = await this.removeSubsiteFromUserUseCase.execute(userId, subsiteId);
  // return transformUserDTOToGraphQL(result);
  // }

  @Mutation(() => UserOutput, { name: 'updateUserPassword' })
  async updateUserPassword(
    @Args('userId') userId: number,
    @Args('newPassword') newPassword: string,
  ): Promise<UserOutput> {
    const result = await this.updateUserPasswordUseCase.execute(userId, newPassword);
    return transformUserDTOToGraphQL(result);
  }

  @Mutation(() => UserOutput, { name: 'updateUser' })
  async updateUser(
    @Args('userId') userId: number,
    @Args('user') user: UserInput,
  ): Promise<UserOutput | null> {
    const result = await this.updateUserUseCase.execute(userId, user);
    return transformUserDTOToGraphQL(result);
  }
}

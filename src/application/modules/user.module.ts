import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRepository } from 'src/infrastructure/persistences/user.repository.impl';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUser } from '../use-cases/user.use-cases/create-user.use-case';
import { AddAddressToUser } from '../use-cases/user.use-cases/add-address-to-user.use-case';
import { GetUser } from '../use-cases/user.use-cases/get-user.use-case';
import { UpdateUser } from '../use-cases/user.use-cases/update-user.use-case';
import { DeleteUser } from '../use-cases/user.use-cases/delete-user.use-case';
import { GetUsersByRoleUseCase } from '../use-cases/user.use-cases/get-users-by-role.use-case';
import { GetActiveCount } from '../use-cases/user.use-cases/get-active-count.use-case';
import { GetInactiveUsersUseCase } from '../use-cases/user.use-cases/get-inactive-users.use-case';
import { GetUserByEmailUseCase } from '../use-cases/user.use-cases/get-user-by-email.use-case';
import { UpdateUserPasswordUseCase } from '../use-cases/user.use-cases/update-user-password.use-case';
import { AddressModule } from './address.module';
import { KafkaModule } from 'src/infrastructure/external-servicies/kafka/kafka.module';
import { RemoveAddressFromUserUseCase } from '../use-cases/user.use-cases/remove-address-from-user.use-case';
import { GetCountByRole } from '../use-cases/user.use-cases/get-count-by-role.use-case';
import { GetDetailedInfo } from '../use-cases/user.use-cases/get-detailed-info.use-case';

const userUseCases = [
  CreateUser,
  AddAddressToUser,
  GetUser,
  GetDetailedInfo,
  UpdateUser,
  DeleteUser,
  GetUsersByRoleUseCase,
  GetActiveCount,
  GetInactiveUsersUseCase,
  GetUserByEmailUseCase,
  UpdateUserPasswordUseCase,
  RemoveAddressFromUserUseCase,
  GetCountByRole,
];

@Module({
  imports: [KafkaModule, AddressModule],
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    ...userUseCases,
  ],
  exports: [UserService, ...userUseCases],
})
export class UserModule { }

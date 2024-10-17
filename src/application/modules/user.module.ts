import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserRepository } from 'src/infrastructure/persistences/user.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    UserService,
    PrismaService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}

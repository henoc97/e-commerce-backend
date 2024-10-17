import { Module } from '@nestjs/common';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfileRepository } from 'src/infrastructure/persistences/user-profile.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    UserProfileService,
    PrismaService,
    {
      provide: 'IUserProfileRepository',
      useClass: UserProfileRepository,
    },
  ],
  exports: [UserProfileService],
})
export class UserProfileModule {}


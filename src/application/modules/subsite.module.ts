import { Module } from '@nestjs/common';
import { SubsiteService } from '../services/subsite.service';
import { SubsiteRepository } from 'src/infrastructure/persistences/subsite.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    SubsiteService,
    PrismaService,
    {
      provide: 'ISubsiteRepository',
      useClass: SubsiteRepository,
    },
  ],
  exports: [SubsiteService],
})
export class SubsiteModule {}


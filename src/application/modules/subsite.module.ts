import { Module } from '@nestjs/common';
import { SubsiteService } from '../services/subsite.service';
import { SubsiteRepository } from '../../infrastructure/persistences/subsite.repository.impl';
import { ListSubsitesByUser } from '../use-cases/subsite.use-cases/list-subsites-by-user.use-case';
import { ListActiveSubsites } from '../use-cases/subsite.use-cases/list-active-subsites.use-case';
import { CreateSubsite } from '../use-cases/subsite.use-cases/create-subsite.use-case';
import { CountSubsitesByUser } from '../use-cases/subsite.use-cases/count-subsites-by-user.use-case';
import { RemoveSubsite } from '../use-cases/subsite.use-cases/remove-subsite.use-case';
import { UpdateSubsite } from '../use-cases/subsite.use-cases/update-subsite.use-case';
import { UpdateSubsiteConfig } from '../use-cases/subsite.use-cases/update-subsite-config.use-case';
import { FetchLatestSubsite } from '../use-cases/subsite.use-cases/fetch-latest-subsite.use-case';
import { FetchSubsiteById } from '../use-cases/subsite.use-cases/fetch-subsite-by-id.use-case';
import { FetchSubsiteConfig } from '../use-cases/subsite.use-cases/fetch-subsite-config.use-case';
import { ValidateSubsite } from '../use-cases/subsite.use-cases/validate-subsite.use-case';

const subsiteUseCases = [
  ListSubsitesByUser,
  ListActiveSubsites,
  CreateSubsite,
  CountSubsitesByUser,
  RemoveSubsite,
  UpdateSubsite,
  UpdateSubsiteConfig,
  FetchLatestSubsite,
  FetchSubsiteById,
  FetchSubsiteConfig,
  ValidateSubsite,
];

@Module({
  providers: [
    SubsiteService,

    {
      provide: 'ISubsiteRepository',
      useClass: SubsiteRepository,
    },
    ...subsiteUseCases,
  ],
  exports: [SubsiteService, ...subsiteUseCases],
})
export class SubsiteModule { }

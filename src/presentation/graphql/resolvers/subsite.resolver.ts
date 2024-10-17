import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CountSubsitesByUser } from 'src/application/use-cases/subsite.use-cases/count-subsites-by-user.use-case';
import { CreateSubsite } from 'src/application/use-cases/subsite.use-cases/create-subsite.use-case';
import { FetchLatestSubsite } from 'src/application/use-cases/subsite.use-cases/fetch-latest-subsite.use-case';
import { FetchSubsiteById } from 'src/application/use-cases/subsite.use-cases/fetch-subsite-by-id.use-case';
import { ListActiveSubsites } from 'src/application/use-cases/subsite.use-cases/list-active-subsites.use-case';
import { SubsiteDTO } from 'src/presentation/dtos/subsite.dto';
import { RemoveSubsite } from 'src/application/use-cases/subsite.use-cases/remove-subsite.use-case';
import { UpdateSubsite } from 'src/application/use-cases/subsite.use-cases/update-subsite.use-case';
import { ValidateSubsite } from 'src/application/use-cases/subsite.use-cases/validate-subsite.use-case';
import { FetchSubsiteConfig } from 'src/application/use-cases/subsite.use-cases/fetch-subsite-config.use-case';
import { ListSubsitesByUser } from 'src/application/use-cases/subsite.use-cases/list-subsites-by-user.use-case';
import { UpdateSubsiteConfig } from 'src/application/use-cases/subsite.use-cases/update-subsite-config.use-case';

@Resolver('Subsite')
export class SubsiteResolver {
  constructor(
    private readonly countSubsitesByUserUseCase: CountSubsitesByUser,
    private readonly createSubsiteUseCase: CreateSubsite,
    private readonly fetchLatestSubsiteUseCase: FetchLatestSubsite,
    private readonly fetchSubsiteByIdUseCase: FetchSubsiteById,
    private readonly listActiveSubsitesUseCase: ListActiveSubsites,
    private readonly removeSubsiteUseCase: RemoveSubsite,
    private readonly updateSubsiteUseCase: UpdateSubsite,
    private readonly validateSubsiteUseCase: ValidateSubsite,
    private readonly fetchSubsiteConfigUseCase: FetchSubsiteConfig,
    private readonly listSubsitesByUserUseCase: ListSubsitesByUser,
    private readonly updateSubsiteConfigUseCase: UpdateSubsiteConfig,
  ) {}

  @Query(() => Number)
  async countSubsitesByUser(@Args('userId') userId: number): Promise<number> {
    return this.countSubsitesByUserUseCase.execute(userId);
  }

  @Mutation(() => SubsiteDTO)
  async createSubsite(
    @Args('subsiteDTO') subsiteDTO: SubsiteDTO,
  ): Promise<SubsiteDTO | null> {
    return this.createSubsiteUseCase.execute(subsiteDTO);
  }

  @Query(() => SubsiteDTO)
  async fetchLatestSubsite(): Promise<SubsiteDTO | null> {
    return this.fetchLatestSubsiteUseCase.execute();
  }

  @Query(() => SubsiteDTO)
  async fetchSubsiteById(@Args('id') id: number): Promise<SubsiteDTO | null> {
    return this.fetchSubsiteByIdUseCase.execute(id);
  }

  @Query(() => [SubsiteDTO])
  async listActiveSubsites(): Promise<SubsiteDTO[]> {
    return this.listActiveSubsitesUseCase.execute();
  }

  @Mutation(() => Boolean)
  async removeSubsite(@Args('id') id: number): Promise<boolean> {
    return this.removeSubsiteUseCase.execute(id);
  }

  @Mutation(() => SubsiteDTO)
  async updateSubsite(
    @Args('id') id: number,
    @Args('updates') updates: Partial<SubsiteDTO>,
  ): Promise<SubsiteDTO> {
    return this.updateSubsiteUseCase.execute(id, updates);
  }

  @Mutation(() => Boolean)
  async validateSubsite(
    @Args('subsiteDTO') subsiteDTO: SubsiteDTO,
  ): Promise<boolean> {
    return this.validateSubsiteUseCase.execute(subsiteDTO);
  }

  @Query(() => JSON)
  async fetchSubsiteConfig(@Args('id') id: number): Promise<any> {
    return this.fetchSubsiteConfigUseCase.execute(id);
  }

  @Query(() => [SubsiteDTO])
  async listSubsitesByUser(@Args('userId') userId: number): Promise<SubsiteDTO[]> {
    return this.listSubsitesByUserUseCase.execute(userId);
  }

  @Mutation(() => JSON)
  async updateSubsiteConfig(
    @Args('id') id: number,
    @Args('config') config: any,
  ): Promise<any> {
    return this.updateSubsiteConfigUseCase.execute(id, config);
  }

}

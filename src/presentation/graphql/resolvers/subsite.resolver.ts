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
import { transformSubsiteDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { SubsiteOutput } from 'src/presentation/output/subsite.output';
import { SubsiteInput } from 'src/presentation/input/subsite.input';
import { toSubsiteDTO } from 'src/application/helper/to-dto/to.sub-site.dto';

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
  ) { }

  @Query(() => Number)
  async countSubsitesByUser(@Args('userId') userId: number): Promise<number> {
    return this.countSubsitesByUserUseCase.execute(userId);
  }

  @Mutation(() => SubsiteOutput)
  async createSubsite(
    @Args('subsiteDTO') subsite: SubsiteInput,
  ): Promise<SubsiteOutput | null> {
    const dto = toSubsiteDTO(subsite)
    const result = await this.createSubsiteUseCase.execute(dto);
    return transformSubsiteDTOToGraphQL(result)
  }

  @Query(() => SubsiteOutput)
  async fetchLatestSubsite(): Promise<SubsiteOutput | null> {
    const result = await this.fetchLatestSubsiteUseCase.execute();
    return transformSubsiteDTOToGraphQL(result)
  }

  @Query(() => SubsiteOutput)
  async fetchSubsiteById(@Args('id') id: number): Promise<SubsiteOutput | null> {
    const result = await this.fetchSubsiteByIdUseCase.execute(id);
    return transformSubsiteDTOToGraphQL(result)
  }

  @Query(() => [SubsiteOutput])
  async listActiveSubsites(): Promise<SubsiteOutput[]> {
    const result = await this.listActiveSubsitesUseCase.execute();
    return result.map(transformSubsiteDTOToGraphQL)
  }

  @Mutation(() => Boolean)
  async removeSubsite(@Args('id') id: number): Promise<boolean> {
    return this.removeSubsiteUseCase.execute(id);
  }

  @Mutation(() => SubsiteOutput)
  async updateSubsite(
    @Args('id') id: number,
    @Args('updates') updates: SubsiteInput,
  ): Promise<SubsiteOutput> {
    const result = await this.updateSubsiteUseCase.execute(id, updates);
    return transformSubsiteDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async validateSubsite(
    @Args('subsiteDTO') subsite: SubsiteInput,
  ): Promise<boolean> {
    const dto = toSubsiteDTO(subsite)
    return this.validateSubsiteUseCase.execute(dto);
  }

  @Query(() => String)
  async fetchSubsiteConfig(@Args('id') id: number): Promise<any> {
    return this.fetchSubsiteConfigUseCase.execute(id);
  }

  @Query(() => [SubsiteOutput])
  async listSubsitesByUser(
    @Args('userId') userId: number,
  ): Promise<SubsiteOutput[]> {
    const result = await this.listSubsitesByUserUseCase.execute(userId);
    return result.map(transformSubsiteDTOToGraphQL)
  }

  @Mutation(() => String)
  async updateSubsiteConfig(
    @Args('id') id: number,
    @Args('config') config: string,
  ): Promise<any> {
    return this.updateSubsiteConfigUseCase.execute(id, config);
  }
}

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { toUserActivityDTO } from 'src/application/helper/to-dto/to.user-activity.dto';
import { transformUserActivityDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { CountActivitiesByUser } from 'src/application/use-cases/user-activity.use-cases/count-activities-by-user.use-case';
import { DeleteActivity } from 'src/application/use-cases/user-activity.use-cases/delete-activity.use-case';
import { FetchActivityById } from 'src/application/use-cases/user-activity.use-cases/fetch-activity-by-id.use-case';
import { GetRecentActivitiesByUser } from 'src/application/use-cases/user-activity.use-cases/get-recent-activities-by-user.use-case';
import { ListActivitiesByDateRange } from 'src/application/use-cases/user-activity.use-cases/list-activities-by-date-range.use-case';
import { ListActivitiesByProduct } from 'src/application/use-cases/user-activity.use-cases/list-activities-by-product.use-case';
import { ListActivitiesByUser } from 'src/application/use-cases/user-activity.use-cases/list-activities-by-user.use-case';
import { RecordActivity } from 'src/application/use-cases/user-activity.use-cases/record-activity.use-case';
import { UpdateActivity } from 'src/application/use-cases/user-activity.use-cases/update-activity.use-case';
import { ValidateActivity } from 'src/application/use-cases/user-activity.use-cases/validate-activity.use-case';
import { UserActivityDTO } from 'src/presentation/dtos/user-activity.dto';
import { UserActivityInput } from 'src/presentation/input/user-activity.input';
import { UserActivityOutput } from 'src/presentation/output/user-activity.output';

@Resolver()
export class UserActivityResolver {
  constructor(
    private readonly countActivitiesByUser: CountActivitiesByUser,
    private readonly deleteActivityUseCase: DeleteActivity,
    private readonly fetchActivityById: FetchActivityById,
    private readonly getRecentActivitiesByUser: GetRecentActivitiesByUser,
    private readonly listActivitiesByDateRangeUseCase: ListActivitiesByDateRange,
    private readonly listActivitiesByProductUseCase: ListActivitiesByProduct,
    private readonly listActivitiesByUserUseCase: ListActivitiesByUser,
    private readonly recordActivityUseCase: RecordActivity,
    private readonly updateActivityUseCase: UpdateActivity,
    private readonly validateActivityUseCase: ValidateActivity,
  ) { }

  @Query(() => Number)
  async countActivities(@Args('userId') userId: number): Promise<number> {
    return this.countActivitiesByUser.execute(userId);
  }

  @Mutation(() => Boolean)
  async deleteActivity(@Args('id') id: number): Promise<boolean> {
    return this.deleteActivityUseCase.execute(id);
  }

  @Query(() => UserActivityOutput, { nullable: true })
  async fetchActivity(@Args('id') id: number): Promise<UserActivityOutput | null> {
    const result = await this.fetchActivityById.execute(id);
    return transformUserActivityDTOToGraphQL(result);
  }

  @Query(() => [UserActivityOutput])
  async getRecentActivities(
    @Args('userId') userId: number,
    @Args('limit') limit: number,
  ): Promise<UserActivityOutput[]> {
    const result = await this.getRecentActivitiesByUser.execute(userId, limit);
    return result.map(transformUserActivityDTOToGraphQL);
  }

  @Query(() => [UserActivityOutput])
  async listActivitiesByDateRange(
    @Args('start') start: Date,
    @Args('end') end: Date,
  ): Promise<UserActivityOutput[]> {
    const result = await this.listActivitiesByDateRangeUseCase.execute(start, end);
    return result.map(transformUserActivityDTOToGraphQL);
  }

  @Query(() => [UserActivityOutput])
  async listActivitiesByProduct(
    @Args('productId') productId: number,
  ): Promise<UserActivityOutput[]> {
    const result = await this.listActivitiesByProductUseCase.execute(productId);
    return result.map(transformUserActivityDTOToGraphQL);
  }

  @Query(() => [UserActivityOutput])
  async listActivitiesByUser(
    @Args('userId') userId: number,
  ): Promise<UserActivityOutput[]> {
    const result = await this.listActivitiesByUserUseCase.execute(userId);
    return result.map(transformUserActivityDTOToGraphQL);
  }

  @Mutation(() => UserActivityOutput)
  async recordActivity(
    @Args('activity') activity: UserActivityInput,
  ): Promise<UserActivityOutput> {
    const dto = toUserActivityDTO(activity)
    const result = await this.recordActivityUseCase.execute(dto);
    return transformUserActivityDTOToGraphQL(result);
  }

  @Mutation(() => UserActivityOutput, { nullable: true })
  async updateActivity(
    @Args('id') id: number,
    @Args('updates') updates: UserActivityInput,
  ): Promise<UserActivityOutput | null> {
    const result = await this.updateActivityUseCase.execute(id, updates);
    return transformUserActivityDTOToGraphQL(result);
  }

  @Query(() => Boolean)
  async validateActivity(
    @Args('activityDTO') activity: UserActivityInput,
  ): Promise<boolean> {
    const dto = toUserActivityDTO(activity)
    return this.validateActivityUseCase.execute(dto);
  }
}

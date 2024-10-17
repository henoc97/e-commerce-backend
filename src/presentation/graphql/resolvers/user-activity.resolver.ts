import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
  ) {}

  @Query(() => Number)
  async countActivities(@Args('userId') userId: number): Promise<number> {
    return this.countActivitiesByUser.execute(userId);
  }

  @Mutation(() => Boolean)
  async deleteActivity(@Args('id') id: number): Promise<boolean> {
    return this.deleteActivityUseCase.execute(id);
  }

  @Query(() => UserActivityDTO, { nullable: true })
  async fetchActivity(@Args('id') id: number): Promise<UserActivityDTO | null> {
    return this.fetchActivityById.execute(id);
  }

  @Query(() => [UserActivityDTO])
  async getRecentActivities(
    @Args('userId') userId: number,
    @Args('limit') limit: number,
  ): Promise<UserActivityDTO[]> {
    return this.getRecentActivitiesByUser.execute(userId, limit);
  }

  @Query(() => [UserActivityDTO])
  async listActivitiesByDateRange(
    @Args('start') start: Date,
    @Args('end') end: Date,
  ): Promise<UserActivityDTO[]> {
    return this.listActivitiesByDateRangeUseCase.execute(start, end);
  }

  @Query(() => [UserActivityDTO])
  async listActivitiesByProduct(
    @Args('productId') productId: number,
  ): Promise<UserActivityDTO[]> {
    return this.listActivitiesByProductUseCase.execute(productId);
  }

  @Query(() => [UserActivityDTO])
  async listActivitiesByUser(
    @Args('userId') userId: number,
  ): Promise<UserActivityDTO[]> {
    return this.listActivitiesByUserUseCase.execute(userId);
  }

  @Mutation(() => UserActivityDTO)
  async recordActivity(
    @Args('activityDTO') activityDTO: UserActivityDTO,
  ): Promise<UserActivityDTO> {
    return this.recordActivityUseCase.execute(activityDTO);
  }

  @Mutation(() => UserActivityDTO, { nullable: true })
  async updateActivity(
    @Args('id') id: number,
    @Args('updates') updates: Partial<UserActivityDTO>,
  ): Promise<UserActivityDTO | null> {
    return this.updateActivityUseCase.execute(id, updates);
  }

  @Query(() => Boolean)
  async validateActivity(
    @Args('activityDTO') activityDTO: UserActivityDTO,
  ): Promise<boolean> {
    return this.validateActivityUseCase.execute(activityDTO);
  }
}

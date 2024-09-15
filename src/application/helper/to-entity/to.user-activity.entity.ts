import { UserActivity } from 'src/domain/entities/user-activity.entity';
import { UserActivityDTO } from 'src/presentation/dtos/user-activity.dto';
import { fromUserDTO } from './to.user.entity';

/**
 * Converts a UserActivityDTO to a UserActivity entity.
 * @param userActivityDTO - The UserActivityDTO to convert.
 * @returns The corresponding UserActivity entity.
 */
export function fromUserActivityDTO(
  userActivityDTO: UserActivityDTO | Partial<UserActivityDTO>,
): UserActivity {
  return new UserActivity(
    userActivityDTO.id,
    userActivityDTO.userId,
    userActivityDTO.user ? fromUserDTO(userActivityDTO.user) : undefined,
    userActivityDTO.action,
    userActivityDTO.productId,
    new Date(userActivityDTO.timestamp),
  );
}

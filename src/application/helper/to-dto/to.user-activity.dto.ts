import { UserActivityDTO } from 'src/presentation/dtos/user-activity.dto';
import { toUserDTO } from './to.user.dto';
import { UserActivity } from 'src/domain/entities/user-activity.entity';

/**
 * Converts a UserActivity entity to UserActivityDTO.
 * @param userActivity - The UserActivity entity to convert.
 * @returns The corresponding UserActivityDTO.
 */
export function toUserActivityDTO(userActivity: UserActivity): UserActivityDTO {
  return new UserActivityDTO(
    userActivity.id,
    userActivity.userId,
    userActivity.user ? toUserDTO(userActivity.user) : undefined,
    userActivity.action,
    userActivity.productId,
    userActivity.timestamp,
  );
}

import { UserActivity } from 'src/domain/entities/user-activity.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts a UserActivityPrisma to a UserActivity entity.
 * @param userActivityPrisma - The UserActivityPrisma to convert.
 * @returns The corresponding UserActivity entity.
 */
export function fromUserActivityPrisma(userActivityPrisma: any): UserActivity {
  return new UserActivity(
    userActivityPrisma.id,
    userActivityPrisma.userId,
    userActivityPrisma.user
      ? fromUserPrisma(userActivityPrisma.user)
      : undefined,
    userActivityPrisma.action,
    userActivityPrisma.productId,
    new Date(userActivityPrisma.timestamp),
  );
}

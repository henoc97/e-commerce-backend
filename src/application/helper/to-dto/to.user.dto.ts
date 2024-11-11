import { User } from 'src/domain/entities/user.entity';
import { UserDTO } from 'src/presentation/dtos/user.dto';
import { toNotificationDTO } from './to.notification.dto';
import { toSubsiteDTO } from './to.sub-site.dto';
import { toTicketDTO } from './to.ticket.dto';
import { toAuditLogDTO } from './to.audit-log.dto';
import { toCartDTO } from './to.cart.dto';
import { toUserActivityDTO } from './to.user-activity.dto';
import { toReviewDTO } from './to.review.dto';

/**
 * Converts a user entity to a userDTO.
 * @param user - The user entity to convert.
 * @returns The userDTO corresponding to the entity.
 */
export function toUserDTO(user: any): UserDTO {
  return new UserDTO(
    user.id,
    user.email,
    user.password,
    user.role,
    user.profile,
    user.addresses,
    user.orders,
    user.createdAt,
    user.updatedAt,
    user.vendor,
    user.carts.map((cart) => toCartDTO(cart)),
    user.name,
    user.reviews.map((review) => toReviewDTO(review)),
    user.notifications.map((notification) => toNotificationDTO(notification)),
    user.tickets.map((ticket) => toTicketDTO(ticket)),
    user.subsites.map((subsite) => toSubsiteDTO(subsite)),
    user.userActivities.map((userActivity) => toUserActivityDTO(userActivity)),
    user.auditLogs.map((auditLog) => toAuditLogDTO(auditLog)),
  );
}

import { User } from '../../../domain/entities/user.entity';
import { UserDTO } from '../../../presentation/dtos/user.dto';
import { toNotificationDTO } from './to.notification.dto';
import { toSubsiteDTO } from './to.sub-site.dto';
import { toTicketDTO } from './to.ticket.dto';
import { toAuditLogDTO } from './to.audit-log.dto';
import { toCartDTO } from './to.cart.dto';
import { toUserActivityDTO } from './to.user-activity.dto';
import { toReviewDTO } from './to.review.dto';
import { Cart } from '../../../domain/entities/cart.entity';
import { Review, Ticket } from '@prisma/client';
import { Notification } from '../../../domain/entities/notification.entity';
import { AuditLog } from '../../../domain/entities/audit-log.entity';

/**
 * Converts a user entity to a userDTO.
 * @param user - The user entity to convert.
 * @returns The userDTO corresponding to the entity.
 */
export function toUserDTO(user: any): UserDTO {
  console.log('UserInput:', user);
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
    user.carts?.map((cart: Cart) => toCartDTO(cart)),
    user.name,
    user.isEmailVerified,
    user.authProvider,
    user.googleId,
    user.lastLogin,
    user.reviews?.map((review: Review) => toReviewDTO(review)),
    user.notifications?.map((notification: Notification) => toNotificationDTO(notification)),
    user.tickets?.map((ticket: Ticket) => toTicketDTO(ticket)),
    user.subsites?.map((subsite: Ticket) => toSubsiteDTO(subsite)),
    user.userActivities?.map((userActivity: UserActivation) => toUserActivityDTO(userActivity)),
    user.auditLogs?.map((auditLog: AuditLog) => toAuditLogDTO(auditLog))
  );
}
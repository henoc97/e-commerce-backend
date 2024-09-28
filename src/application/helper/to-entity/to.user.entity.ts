import { User } from 'src/domain/entities/user.entity';
import { UserDTO } from 'src/presentation/dtos/user.dto';
import { fromAuditLogDTO } from './to.audit-log.entity';
import { fromOrderDTO } from './to.order.entity';
import { fromUserActivityDTO } from './to.user-activity.entity';
import { fromUserProfileDTO } from './to.user-profile.entity';
import { fromVendorDTO } from './to.vendor.entity';
import { fromReviewDTO } from './to.review.entity';
import { fromAddressDTO } from './to.address.entity';
import { fromCartDTO } from './to.cart.entity';
import { fromSubsiteDTO } from './to.sub-site.entity';
import { fromTicketDTO } from './to.ticket.entity';
import { fromNotificationDTO } from './to.notification.entity';

/**
 * Converts a userDTO to a user entity.
 * @param userDTO - The userDTO to convert.
 * @returns The user entity.
 */
export function fromUserDTO(userDTO: UserDTO | Partial<UserDTO>): User {
  return new User(
    userDTO.id,
    userDTO.email,
    userDTO.password,
    userDTO.role,
    userDTO.profile ? fromUserProfileDTO(userDTO.profile) : undefined,
    userDTO.addresses.map((address) => fromAddressDTO(address)),
    userDTO.orders.map((order) => fromOrderDTO(order)),
    userDTO.createdAt,
    userDTO.updatedAt,
    userDTO.vendor ? fromVendorDTO(userDTO.vendor) : undefined,
    userDTO.carts.map((c) => fromCartDTO(c)),
    userDTO.name,
    userDTO.reviews.map((review) => fromReviewDTO(review)),
    userDTO.notifications.map((notification) =>
      fromNotificationDTO(notification),
    ),
    userDTO.tickets.map((ticket) => fromTicketDTO(ticket)),
    userDTO.subsites.map((subsite) => fromSubsiteDTO(subsite)),
    userDTO.userActivities.map((userActivity) =>
      fromUserActivityDTO(userActivity),
    ),
    userDTO.auditLogs.map((auditLog) => fromAuditLogDTO(auditLog)),
  );
}

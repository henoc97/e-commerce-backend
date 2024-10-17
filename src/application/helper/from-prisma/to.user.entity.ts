import { User } from 'src/domain/entities/user.entity';
import { fromAddressPrisma } from './to.address.entity';
import { fromAuditLogPrisma } from './to.audit-log.entity';
import { fromCartPrisma } from './to.cart.entity';
import { fromNotificationPrisma } from './to.notification.entity';
import { fromOrderPrisma } from './to.order.entity';
import { fromReviewPrisma } from './to.review.entity';
import { fromSubsitePrisma } from './to.sub-site.entity';
import { fromTicketPrisma } from './to.ticket.entity';
import { fromUserActivityPrisma } from './to.user-activity.entity';
import { fromUserProfilePrisma } from './to.user-profile.entity';
import { fromVendorPrisma } from './to.vendor.entity';

/**
 * Converts a userPrisma to a user entity.
 * @param userPrisma - The userPrisma to convert.
 * @returns The user entity.
 */
export function fromUserPrisma(userPrisma: any): User {
  return new User(
    userPrisma.id,
    userPrisma.email,
    userPrisma.password,
    userPrisma.role,
    userPrisma.profile ? fromUserProfilePrisma(userPrisma.profile) : undefined,
    userPrisma.addresses.map((address: any) => fromAddressPrisma(address)),
    userPrisma.orders.map((order: any) => fromOrderPrisma(order)),
    userPrisma.createdAt,
    userPrisma.updatedAt,
    userPrisma.vendor ? fromVendorPrisma(userPrisma.vendor) : undefined,
    userPrisma.carts.map((c: any) => fromCartPrisma(c)),
    userPrisma.name,
    userPrisma.reviews.map((review: any) => fromReviewPrisma(review)),
    userPrisma.notifications.map((notification: any) =>
      fromNotificationPrisma(notification),
    ),
    userPrisma.tickets.map((ticket: any) => fromTicketPrisma(ticket)),
    userPrisma.subsites.map((subsite: any) => fromSubsitePrisma(subsite)),
    userPrisma.userActivities.map((userActivity: any) =>
      fromUserActivityPrisma(userActivity),
    ),
    userPrisma.auditLogs.map((auditLog: any) => fromAuditLogPrisma(auditLog)),
  );
}

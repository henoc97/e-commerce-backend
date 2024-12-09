import { User } from '../../../domain/entities/user.entity';
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
    userPrisma.addresses?.map(fromAddressPrisma),
    userPrisma.orders?.map(fromOrderPrisma),
    userPrisma.createdAt,
    userPrisma.updatedAt,
    userPrisma.vendor ? fromVendorPrisma(userPrisma.vendor) : undefined,
    userPrisma.carts?.map(fromCartPrisma),
    userPrisma.name,
    userPrisma.reviews?.map(fromReviewPrisma),
    userPrisma.notifications?.map(fromNotificationPrisma,
    ),
    userPrisma.tickets?.map(fromTicketPrisma),
    userPrisma.subsites?.map(fromSubsitePrisma),
    userPrisma.userActivities?.map(fromUserActivityPrisma,
    ),
    userPrisma.auditLogs?.map(fromAuditLogPrisma),
  );
}

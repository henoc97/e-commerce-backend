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
export function fromUserPrisma(prismaUser: any): User {
  if (!prismaUser) return null;

  return {
    id: prismaUser.id,
    email: prismaUser.email,
    password: prismaUser.password,
    name: prismaUser.name,
    role: prismaUser.role,
    isEmailVerified: prismaUser.isEmailVerified,
    authProvider: prismaUser.authProvider,
    googleId: prismaUser.googleId,
    lastLogin: prismaUser.lastLogin,
    profile: prismaUser.profile,
    addresses: prismaUser.addresses || [],
    orders: prismaUser.orders || [],
    vendor: prismaUser.vendor || null,
    carts: prismaUser.cart || [],
    createdAt: prismaUser.createdAt,
    updatedAt: prismaUser.updatedAt
  };
}

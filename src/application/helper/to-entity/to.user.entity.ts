import { UserDTO } from "../../../presentation/dtos/user.dto";
import { fromAddressDTO } from "./to.address.entity";
import { fromAuditLogDTO } from "./to.audit-log.entity";
import { fromCartDTO } from "./to.cart.entity";
import { fromNotificationDTO } from "./to.notification.entity";
import { fromOrderDTO } from "./to.order.entity";
import { fromReviewDTO } from "./to.review.entity";
import { fromSubsiteDTO } from "./to.sub-site.entity";
import { fromTicketDTO } from "./to.ticket.entity";
import { fromUserActivityDTO } from "./to.user-activity.entity";
import { fromUserProfileDTO } from "./to.user-profile.entity";
import { fromVendorDTO } from "./to.vendor.entity";
import { User } from "../../../domain/entities/user.entity";

export function fromUserDTO(userDTO: UserDTO | Partial<UserDTO>): User {
  return new User(
    userDTO.id,
    userDTO.email,
    userDTO.password,
    userDTO.role,
    userDTO.profile ? fromUserProfileDTO(userDTO.profile) : undefined,
    userDTO.addresses?.map(fromAddressDTO),
    userDTO.orders?.map(fromOrderDTO),
    userDTO.createdAt,
    userDTO.updatedAt,
    userDTO.vendor ? fromVendorDTO(userDTO.vendor) : undefined,
    userDTO.carts?.map(fromCartDTO),
    userDTO.isEmailVerified || false,
    userDTO.name,
    userDTO.reviews?.map(fromReviewDTO),
    userDTO.notifications?.map(fromNotificationDTO),
    userDTO.tickets?.map(fromTicketDTO),
    userDTO.subsites?.map(fromSubsiteDTO),
    userDTO.userActivities?.map(fromUserActivityDTO),
    userDTO.auditLogs?.map(fromAuditLogDTO)
  )
}
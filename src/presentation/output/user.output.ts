import { Field, ObjectType } from "@nestjs/graphql";
import { AddressOutput } from "./address.output";
import { UserRole } from "../../domain/enums/user-role.enum";
import { UserProfileOutput } from "./user-profile.output";
import { OrderOutput } from "./order.output";
import { CartOutput } from "./cart.output";
import { NotificationOutput } from "./notification.output";
import { TicketOutput } from "./ticket.output";
import { SubsiteOutput } from "./subsite.output";
import { AuditLogOutput } from "./audit-log.output";
import { ReviewOutput } from "./review.output";
import { UserActivityOutput } from "./user-activity.output";
import { VendorOutput } from "./vendor.output";
import { Type } from "class-transformer"
/**
 * Data Transfer Object for User.
 * Used for validating and transforming user data in API requests and responses.
 */
@ObjectType()
export class UserOutput {
  /**
   * Unique identifier for the user.
   */
  @Field()
  id: number;

  /**
   * Email address of the user.
   */
  @Field()
  email: string;

  /**
   * Password for the user account.
   * Should be handled securely and hashed in practice.
   */
  @Field()
  password: string;

  /**
   * Optional name of the user.
   */
  @Field()
  name?: string;

  /**
   * Role of the user (e.g., CLIENT, ADMIN).
   */
  @Field()
  role: UserRole;

  /**
   * Profile associated with the user.
   */
  @Field(() => UserProfileOutput, { nullable: true })
  @Type(() => UserProfileOutput)
  profile: UserProfileOutput;

  /**
   * List of addresses associated with the user.
   */
  @Field(() => [AddressOutput], { nullable: true })
  @Type(() => AddressOutput)
  addresses: AddressOutput[];

  /**
   * List of orders placed by the user.
   */
  @Field(() => [OrderOutput], { nullable: true })
  @Type(() => OrderOutput)
  orders: OrderOutput[];

  /**
   * Date when the user was created.
   */
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  /**
   * Date when the user was last updated.
   */
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  /**
   * Vendor information if the user is a vendor.
   */
  @Field(() => VendorOutput, { nullable: true })
  @Type(() => VendorOutput)
  vendor: VendorOutput;

  /**
   * List of carts associated with the user.
   */
  @Field(() => [CartOutput], { nullable: true })
  @Type(() => CartOutput)
  carts: CartOutput[];

  /**
   * Optional list of reviews written by the user.
   */
  @Field(() => [ReviewOutput], { nullable: true })
  @Type(() => ReviewOutput)
  reviews?: ReviewOutput[];

  /**
   * Optional list of notifications for the user.
   */
  @Field(() => [NotificationOutput], { nullable: true })
  @Type(() => NotificationOutput)
  notifications?: NotificationOutput[];

  /**
   * Optional list of support tickets raised by the user.
   */
  @Field(() => [TicketOutput], { nullable: true })
  @Type(() => TicketOutput)
  tickets?: TicketOutput[];

  /**
   * Optional list of sub-sites associated with the user.
   */
  @Field(() => [SubsiteOutput], { nullable: true })
  @Type(() => SubsiteOutput)
  subsites?: SubsiteOutput[];

  /**
   * Optional list of user activities.
   */
  @Field(() => [UserActivityOutput], { nullable: true })
  @Type(() => UserActivityOutput)
  userActivities?: UserActivityOutput[];

  /**
   * Optional list of audit logs for the user.
   */
  @Field(() => [AuditLogOutput], { nullable: true })
  @Type(() => AuditLogOutput)
  auditLogs?: AuditLogOutput[];

  /**
   * Creates a new UserOutput instance.
   * @param id - Unique identifier for the user.
   * @param email - Email address of the user.
   * @param password - Password for the user account.
   * @param role - Role of the user.
   * @param profile - Profile associated with the user.
   * @param addresses - List of addresses associated with the user.
   * @param orders - List of orders placed by the user.
   * @param createdAt - Date when the user was created.
   * @param updatedAt - Date when the user was last updated.
   * @param vendor - Vendor information if the user is a vendor.
   * @param carts - List of carts associated with the user.
   * @param name - Optional name of the user.
   * @param reviews - Optional list of reviews written by the user.
   * @param notifications - Optional list of notifications for the user.
   * @param tickets - Optional list of support tickets raised by the user.
   * @param subsites - Optional list of sub-sites associated with the user.
   * @param userActivities - Optional list of user activities.
   * @param auditLogs - Optional list of audit logs for the user.
   */
  constructor(
    id?: number,
    email?: string,
    password?: string,
    role?: UserRole,
    profile?: UserProfileOutput,
    addresses?: AddressOutput[],
    orders?: OrderOutput[],
    createdAt?: Date,
    updatedAt?: Date,
    vendor?: VendorOutput,
    carts?: CartOutput[],
    name?: string,
    reviews?: ReviewOutput[],
    notifications?: NotificationOutput[],
    tickets?: TicketOutput[],
    subsites?: SubsiteOutput[],
    userActivities?: UserActivityOutput[],
    auditLogs?: AuditLogOutput[],
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
    this.profile = profile;
    this.addresses = addresses;
    this.orders = orders;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.vendor = vendor;
    this.carts = carts;
    this.reviews = reviews;
    this.notifications = notifications;
    this.tickets = tickets;
    this.subsites = subsites;
    this.userActivities = userActivities;
    this.auditLogs = auditLogs;
  }
}

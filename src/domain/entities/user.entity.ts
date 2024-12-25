import { UserProfile } from './user-profile.entity';
import { Address } from './address.entity';
import { UserRole } from '../enums/user-role.enum';
import { Order } from './order.entity';
import { Vendor } from './vendor.entity';
import { Review } from './review.entity';
import { Cart } from './cart.entity';
import { Ticket } from './ticket.entity';
import { UserActivity } from './user-activity.entity';
import { Subsite } from './subsite.entity';
import { AuditLog } from './audit-log.entity';
import { Notification } from './notification.entity';

/**
 * Represents a user in the system.
 * The User entity contains personal and related information about a user, including their profile, addresses, orders, and more.
 */
export class User {
  /** Unique identifier for the user */
  id: number;

  /** Email address of the user */
  email: string;

  /** Password for the user account */
  password?: string;

  /** Optional name of the user */
  name: string;

  /** Indicates if the user's email is verified */
  isEmailVerified: boolean;

  /** Authentication provider (e.g., LOCAL, GOOGLE) */
  authProvider: string;

  /** Google ID if the user is authenticated via Google */
  googleId?: string;

  /** Date when the user was last logged in */
  lastLogin?: Date;

  /** Date when the user was created */
  createdAt: Date;

  /** Date when the user was last updated */
  updatedAt: Date;

  /** Role of the user (e.g., CLIENT, ADMIN) */
  role: UserRole;

  /** Profile associated with the user */
  profile: UserProfile;

  /** List of addresses associated with the user */
  addresses: Address[];

  /** List of orders placed by the user */
  orders: Order[];

  /** Vendor information if the user is a vendor */
  vendor: Vendor;

  /** List of carts associated with the user */
  carts: Cart[];

  /** Optional list of reviews written by the user */
  reviews?: Review[];

  /** Optional list of notifications for the user */
  notifications?: Notification[];

  /** Optional list of support tickets raised by the user */
  tickets?: Ticket[];

  /** Optional list of sub-sites associated with the user */
  subsites?: Subsite[];

  /** Optional list of user activities */
  userActivities?: UserActivity[];

  /** Optional list of audit logs for the user */
  auditLogs?: AuditLog[];

  /**
   * Constructor for the User entity.
   * @param id - Unique identifier for the user
   * @param email - Email address of the user
   * @param password - Password for the user account
   * @param role - Role of the user
   * @param profile - Profile associated with the user
   * @param addresses - List of addresses associated with the user
   * @param orders - List of orders placed by the user
   * @param createdAt - Date when the user was created
   * @param updatedAt - Date when the user was last updated
   * @param vendor - Vendor information if the user is a vendor
   * @param carts - List of carts associated with the user
   * @param name - Optional name of the user
   * @param reviews - Optional list of reviews written by the user
   * @param notifications - Optional list of notifications for the user
   * @param tickets - Optional list of support tickets raised by the user
   * @param subsites - Optional list of sub-sites associated with the user
   * @param userActivities - Optional list of user activities
   * @param auditLogs - Optional list of audit logs for the user
   * @param isEmailVerified - Indicates if the user's email is verified
   */
  constructor(
    id: number,
    email: string,
    password: string,
    role: UserRole,
    profile: UserProfile,
    addresses: Address[],
    orders: Order[],
    createdAt: Date,
    updatedAt: Date,
    vendor: Vendor,
    carts: Cart[],
    isEmailVerified: boolean,
    name?: string,
    reviews?: Review[],
    notifications?: Notification[],
    tickets?: Ticket[],
    subsites?: Subsite[],
    userActivities?: UserActivity[],
    auditLogs?: AuditLog[],
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
    this.isEmailVerified = isEmailVerified;
  }
}

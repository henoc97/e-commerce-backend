import { IsInt, IsString, IsOptional, IsEmail, IsEnum, IsArray, IsDate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserProfileDTO } from './user-profile.dto';
import { AddressDTO } from './address.dto';
import { OrderDTO } from './order.dto';
import { ReviewDTO } from './review.dto';
import { CartDTO } from './cart.dto';
import { TicketDTO } from './ticket.dto';
import { SubSiteDTO } from './subsite.dto';
import { UserActivityDTO } from './user-activity.dto';
import { AuditLogDTO } from './audit-log.dto';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { NotificationDTO } from './notification.dto';
import { VendorDTO } from './vendor.dto';

/**
 * Data Transfer Object for User.
 * Used for validating and transforming user data in API requests and responses.
 */
export class UserDTO {
  /**
   * Unique identifier for the user.
   */
  @IsInt()
  id: number;

  /**
   * Email address of the user.
   */
  @IsEmail()
  email: string;

  /**
   * Password for the user account.
   * Should be handled securely and hashed in practice.
   */
  @IsString()
  password: string;

  /**
   * Optional name of the user.
   */
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * Role of the user (e.g., CLIENT, ADMIN).
   */
  @IsEnum(UserRole)
  role: UserRole;

  /**
   * Profile associated with the user.
   */
  @ValidateNested()
  @Type(() => UserProfileDTO)
  profile: UserProfileDTO;

  /**
   * List of addresses associated with the user.
   */
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  addresses: AddressDTO[];

  /**
   * List of orders placed by the user.
   */
  @ValidateNested({ each: true })
  @Type(() => OrderDTO)
  orders: OrderDTO[];

  /**
   * Date when the user was created.
   */
  @IsDate()
  createdAt: Date;

  /**
   * Date when the user was last updated.
   */
  @IsDate()
  updatedAt: Date;

  /**
   * Vendor information if the user is a vendor.
   */
  @ValidateNested()
  @Type(() => VendorDTO)
  vendor: VendorDTO;

  /**
   * List of carts associated with the user.
   */
  @ValidateNested({ each: true })
  @Type(() => CartDTO)
  cart: CartDTO[];

  /**
   * Optional list of reviews written by the user.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReviewDTO)
  reviews?: ReviewDTO[];

  /**
   * Optional list of notifications for the user.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NotificationDTO) // Ensure NotificationDTO is properly defined
  notification?: NotificationDTO[];

  /**
   * Optional list of support tickets raised by the user.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TicketDTO)
  ticket?: TicketDTO[];

  /**
   * Optional list of sub-sites associated with the user.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SubSiteDTO)
  SubSite?: SubSiteDTO[];

  /**
   * Optional list of user activities.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserActivityDTO)
  userActivity?: UserActivityDTO[];

  /**
   * Optional list of audit logs for the user.
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AuditLogDTO)
  auditLog?: AuditLogDTO[];

  /**
   * Creates a new UserDTO instance.
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
   * @param cart - List of carts associated with the user.
   * @param name - Optional name of the user.
   * @param reviews - Optional list of reviews written by the user.
   * @param notification - Optional list of notifications for the user.
   * @param ticket - Optional list of support tickets raised by the user.
   * @param SubSite - Optional list of sub-sites associated with the user.
   * @param userActivity - Optional list of user activities.
   * @param auditLog - Optional list of audit logs for the user.
   */
  constructor(
    id: number,
    email: string,
    password: string,
    role: UserRole,
    profile: UserProfileDTO,
    addresses: AddressDTO[],
    orders: OrderDTO[],
    createdAt: Date,
    updatedAt: Date,
    vendor: VendorDTO,
    cart: CartDTO[],
    name?: string,
    reviews?: ReviewDTO[],
    notification?: NotificationDTO[],
    ticket?: TicketDTO[],
    SubSite?: SubSiteDTO[],
    userActivity?: UserActivityDTO[],
    auditLog?: AuditLogDTO[]
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
    this.cart = cart;
    this.reviews = reviews;
    this.notification = notification;
    this.ticket = ticket;
    this.SubSite = SubSite;
    this.userActivity = userActivity;
    this.auditLog = auditLog;
  }
}

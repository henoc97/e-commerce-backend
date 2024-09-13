import { UserProfile } from './user-profile.entity';
import { Address } from './address.entity';
import { UserRole } from '../enums/user-role.enum';
import { Order } from './order.entity';
import { Vendor } from './vendor.entity';
import { Review } from './review.entity';
import { Cart } from './cart.entity';
import { Ticket } from './ticket.entity';
import { UserActivity } from './user-activity.entity';
import { SubSite } from './subsite.entity';
import { AuditLog } from './audit-log.entity';

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
    password: string;

    /** Optional name of the user */
    name?: string;

    /** Role of the user (e.g., CLIENT, ADMIN) */
    role: UserRole;

    /** Profile associated with the user */
    profile: UserProfile;

    /** List of addresses associated with the user */
    addresses: Address[];

    /** List of orders placed by the user */
    orders: Order[];

    /** Date when the user was created */
    createdAt: Date;

    /** Date when the user was last updated */
    updatedAt: Date;

    /** Vendor information if the user is a vendor */
    vendor: Vendor;

    /** List of carts associated with the user */
    cart: Cart[];

    /** Optional list of reviews written by the user */
    reviews?: Review[];

    /** Optional list of notifications for the user */
    notification?: Notification[];

    /** Optional list of support tickets raised by the user */
    ticket?: Ticket[];

    /** Optional list of sub-sites associated with the user */
    SubSite?: SubSite[];

    /** Optional list of user activities */
    userActivity?: UserActivity[];

    /** Optional list of audit logs for the user */
    auditLog?: AuditLog[];

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
     * @param cart - List of carts associated with the user
     * @param name - Optional name of the user
     * @param reviews - Optional list of reviews written by the user
     * @param notification - Optional list of notifications for the user
     * @param ticket - Optional list of support tickets raised by the user
     * @param SubSite - Optional list of sub-sites associated with the user
     * @param userActivity - Optional list of user activities
     * @param auditLog - Optional list of audit logs for the user
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
        cart: Cart[],
        name?: string,
        reviews?: Review[],
        notification?: Notification[],
        ticket?: Ticket[],
        SubSite?: SubSite[],
        userActivity?: UserActivity[],
        auditLog?: AuditLog[]
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

import { User } from './user.entity';

/**
 * Represents a subsite within the main site.
 * Contains details about the subsite, including its title, associated user, configuration, and creation date.
 */
export class SubSite {
  /**
   * Unique identifier for the subsite.
   * This ID is used to uniquely identify each subsite in the system.
   */
  id: number;

  /**
   * Title of the subsite.
   * This property stores the name or title of the subsite.
   */
  title: string;

  /**
   * Unique identifier for the user who owns or manages the subsite.
   * This ID references the `User` entity associated with the subsite.
   */
  userId: number;

  /**
   * The user associated with this subsite.
   * Provides details about the user who manages or owns the subsite.
   */
  user: User;

  /**
   * JSON configuration for the subsite.
   * This property stores various settings and parameters for customizing the subsite.
   */
  config: any; // JSON configuration

  /**
   * The date and time when the subsite was created.
   * Automatically set to the current date and time when the subsite is created.
   */
  createdAt: Date;

  /**
   * Constructs a new SubSite instance.
   * @param id - Unique identifier for the subsite.
   * @param title - Title of the subsite.
   * @param userId - Unique identifier for the user associated with the subsite.
   * @param user - The user managing or owning the subsite.
   * @param config - JSON configuration for the subsite.
   * @param createdAt - (Optional) Date and time of subsite creation, defaults to the current date and time.
   */
  constructor(
    id: number,
    title: string,
    userId: number,
    user: User,
    config: any,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.user = user;
    this.config = config;
    this.createdAt = createdAt;
  }
}

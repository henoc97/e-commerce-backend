import { User } from './user.entity';

/**
 * Represents a Subsite within the main site.
 * Contains details about the Subsite, including its title, associated user, configuration, and creation date.
 */
export class Subsite {
  /**
   * Unique identifier for the Subsite.
   * This ID is used to uniquely identify each Subsite in the system.
   */
  id: number;

  /**
   * Title of the Subsite.
   * This property stores the name or title of the Subsite.
   */
  title: string;

  /**
   * Unique identifier for the user who owns or manages the Subsite.
   * This ID references the `User` entity associated with the Subsite.
   */
  userId: number;

  /**
   * The user associated with this Subsite.
   * Provides details about the user who manages or owns the Subsite.
   */
  user: User;

  /**
   * JSON configuration for the Subsite.
   * This property stores various settings and parameters for customizing the Subsite.
   */
  config: any; // JSON configuration

  /**
   * The date and time when the Subsite was created.
   * Automatically set to the current date and time when the Subsite is created.
   */
  createdAt: Date;

  /**
   * Constructs a new Subsite instance.
   * @param id - Unique identifier for the Subsite.
   * @param title - Title of the Subsite.
   * @param userId - Unique identifier for the user associated with the Subsite.
   * @param user - The user managing or owning the Subsite.
   * @param config - JSON configuration for the Subsite.
   * @param createdAt - (Optional) Date and time of Subsite creation, defaults to the current date and time.
   */
  constructor(
    id: number,
    title: string,
    userId: number,
    user: User,
    config: any,
    createdAt: Date = new Date(),
  ) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.user = user;
    this.config = config;
    this.createdAt = createdAt;
  }
}

import {
  IsInt,
  IsString,
  IsObject,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDTO } from './user.dto';

/**
 * Data Transfer Object for SubSite.
 * Used for validating and transforming subsite data in API requests and responses.
 */
export class SubSiteDTO {
  /**
   * Unique identifier for the subsite.
   * Represents the unique ID of the subsite.
   */
  @IsInt()
  id: number;

  /**
   * Title of the subsite.
   * Represents the name or title of the subsite.
   */
  @IsString()
  title: string;

  /**
   * Unique identifier for the user who owns or manages the subsite.
   * Refers to the `UserDTO` associated with the subsite.
   */
  @IsInt()
  userId: number;

  /**
   * The user associated with this subsite.
   * Provides details about the user managing or owning the subsite.
   */
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  /**
   * JSON configuration for the subsite.
   * Stores various settings and parameters for customizing the subsite.
   */
  @IsObject()
  config: any;

  /**
   * The date and time when the subsite was created.
   * Represents the creation timestamp of the subsite.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * Creates a new SubSiteDTO instance.
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
    user: UserDTO,
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

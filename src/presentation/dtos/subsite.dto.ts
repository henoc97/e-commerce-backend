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
 * Data Transfer Object for Subsite.
 * Used for validating and transforming Subsite data in API requests and responses.
 */
export class SubsiteDTO {
  /**
   * Unique identifier for the Subsite.
   * Represents the unique ID of the Subsite.
   */
  @IsInt()
  id: number;

  /**
   * Title of the Subsite.
   * Represents the name or title of the Subsite.
   */
  @IsString()
  title: string;

  /**
   * Unique identifier for the user who owns or manages the Subsite.
   * Refers to the `UserDTO` associated with the Subsite.
   */
  @IsInt()
  userId: number;

  /**
   * The user associated with this Subsite.
   * Provides details about the user managing or owning the Subsite.
   */
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  /**
   * JSON configuration for the Subsite.
   * Stores various settings and parameters for customizing the Subsite.
   */
  @IsObject()
  config: any;

  /**
   * The date and time when the Subsite was created.
   * Represents the creation timestamp of the Subsite.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * Creates a new SubsiteDTO instance.
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

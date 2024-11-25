import { Field, ObjectType } from "@nestjs/graphql";
import { UserOutput } from "./user.output";
import { Type } from "class-transformer"
/**
 * Data Transfer Object for Subsite.
 * Used for validating and transforming Subsite data in API requests and responses.
 */
@ObjectType()
export class SubsiteOutput {
  /**
   * Unique identifier for the Subsite.
   * Represents the unique ID of the Subsite.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Title of the Subsite.
   * Represents the name or title of the Subsite.
   */
  @Field()
  title: string;

  /**
   * Unique identifier for the user who owns or manages the Subsite.
   * Refers to the `UserOutput` associated with the Subsite.
   */
  @Field()
  userId: number;

  /**
   * The user associated with this Subsite.
   * Provides details about the user managing or owning the Subsite.
   */
  @Field(() => UserOutput, { nullable: true })
  @Type(() => UserOutput)
  user: UserOutput;

  /**
   * JSON configuration for the Subsite.
   * Stores various settings and parameters for customizing the Subsite.
   */
  @Field({ nullable: true })
  config: string;

  /**
   * The date and time when the Subsite was created.
   * Represents the creation timestamp of the Subsite.
   */
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  /**
   * Creates a new SubsiteOutput instance.
   * @param id - Unique identifier for the Subsite.
   * @param title - Title of the Subsite.
   * @param userId - Unique identifier for the user associated with the Subsite.
   * @param user - The user managing or owning the Subsite.
   * @param config - JSON configuration for the Subsite.
   * @param createdAt - (Optional) Date and time of Subsite creation, defaults to the current date and time.
   */
  constructor(
    id?: number,
    title?: string,
    userId?: number,
    user?: UserOutput,
    config?: string,
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

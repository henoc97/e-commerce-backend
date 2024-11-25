import { Field, InputType } from "@nestjs/graphql";


/**
 * Input Type for Subsite.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class SubsiteInput {
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
   * Refers to the `UserDTO` associated with the Subsite.
   */
  @Field()
  userId: number;

  /**
   * JSON configuration for the Subsite.
   * Stores various settings and parameters for customizing the Subsite.
   */
  @Field({ nullable: true })
  config: string;
}

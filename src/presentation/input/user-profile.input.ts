import { Field } from "@nestjs/graphql";


/**
 * Data Transfer Object for UserProfile.
 * Used for validating and transforming user profile data in API requests and responses.
 */
export class UserProfileDTO {
  /**
   * Unique identifier for the user profile.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Identifier of the user to whom this profile belongs.
   */
  @Field()
  userId: number;
  /**
   * Phone number of the user.
   * Should follow the international phone number format.
   */
  @Field()
  phone?: string;

  /**
   * Date of birth of the user.
   */
  @Field({ nullable: true })
  birthday?: Date;

  /**
   * Gender of the user.
   */
  @Field({ nullable: true })
  gender?: string;
}

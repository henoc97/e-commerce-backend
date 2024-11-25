import { Field, ObjectType } from "@nestjs/graphql";
import { UserOutput } from "./user.output";
import { Type } from "class-transformer";


/**
 * Data Transfer Object for UserProfile.
 * Used for validating and transforming user profile data in API requests and responses.
 */
@ObjectType()
export class UserProfileOutput {
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
   * User object representing the relationship between the profile and the user.
   */
  @Field(() => UserOutput, { nullable: true })
  @Type(() => UserOutput)
  user: UserOutput;

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

  /**
   * Creates a new UserProfileOutput instance.
   * @param id - Unique identifier for the user profile.
   * @param userId - Identifier of the user to whom this profile belongs.
   * @param user - User object representing the relationship between the profile and the user.
   * @param phone - (Optional) Phone number of the user.
   * @param birthday - (Optional) Date of birth of the user.
   * @param gender - (Optional) Gender of the user.
   */
  constructor(
    id?: number,
    userId?: number,
    user?: UserOutput,
    phone?: string,
    birthday?: Date,
    gender?: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.phone = phone;
    this.birthday = birthday;
    this.gender = gender;
  }
}

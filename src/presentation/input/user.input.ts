import { Field, InputType } from "@nestjs/graphql";
import { UserRole } from "src/domain/enums/user-role.enum";

/**
 * Input Type for User.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class UserInput {
  /**
   * Unique identifier for the user.
   */
  @Field({ nullable: true })
  id: number;

  /**
   * Email address of the user.
   */
  @Field()
  email: string;

  /**
   * Password for the user account.
   * Should be handled securely and hashed in practice.
   */
  @Field()
  password: string;

  /**
   * Optional name of the user.
   */
  @Field({ nullable: true })
  name?: string;

  /**
   * Role of the user (e.g., CLIENT, ADMIN).
   */
  @Field()
  role: UserRole;
}

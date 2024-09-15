import { Injectable } from '@nestjs/common';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserService } from 'src/application/services/user.service';
import { SubsiteDTO } from 'src/presentation/dtos/Subsite.dto';
import { UserDTO } from 'src/presentation/dtos/user.dto';

/**
 * Use case class for adding a Subsite to a user.
 * This class encapsulates the business logic for adding Subsites to users.
 * It interacts with the Subsite service to perform operations on Subsite repository.
 */
@Injectable()
export class AddSubsiteToUser {
  constructor(private readonly userService: UserService) {}

  /**
   * Execute the add-Subsite-to-user use case.
   * @param userId - The ID of the user to whom the Subsite will be added.
   * @param subsiteDTO - The subsiteDTO containing the Subsite data to be added.
   * @returns A promise that resolves to the UserDTO whom added Subsite.
   */
  async execute(
    userId: number,
    subsiteDTO: SubsiteDTO,
  ): Promise<UserDTO | null> {
    const user = await this.userService.addSubsiteToUser(userId, subsiteDTO);

    if (!user) return null;

    const result = toUserDTO(user);
    return result;
  }
}

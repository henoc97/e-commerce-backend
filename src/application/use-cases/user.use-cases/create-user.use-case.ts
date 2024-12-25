import { Injectable } from '@nestjs/common';
import { UserService } from '../../../application/services/user.service';
import { toUserDTO } from '../../../application/helper/to-dto/to.user.dto';
import { UserDTO } from '../../../presentation/dtos/user.dto';
import * as bcrypt from 'bcrypt';

/**
 * Use case class for creating a new user.
 * This class encapsulates the business logic for user creation.
 * It interacts with the User service to perform operations on user repository.
 */
@Injectable()
export class CreateUser {
  constructor(private readonly userService: UserService) { }

  /**
   * Execute the create-user use case.
   * @param userDTO - The UserDTO containing the user data to be created.
   * @returns A promise that resolves to the created UserDTO.
   */
  async execute(userDTO: UserDTO): Promise<UserDTO | null> {
    console.log('UserDTO received in UseCase:', userDTO);
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    const user = await this.userService.createUser({ ...userDTO, password: hashedPassword });

    if (!user) return null;

    const result = toUserDTO(user);
    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { UserDTO } from 'src/presentation/dtos/user.dto';
import { UserService } from 'src/application/services/user.service';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';

/**
 * Use case class for adding an order to a user.
 * This class encapsulates the business logic for adding orders to users.
 * It interacts with the Order service to perform operations on order repository.
 */
@Injectable()
export class AddOrderToUser {
  constructor(private readonly userService: UserService) {}

  /**
   * Execute the add-order-to-user use case.
   * @param userId - The ID of the user to whom the order will be added.
   * @param orderDTO - The OrderDTO containing the order data to be added.
   * @returns A promise that resolves to the UserDTO whom added order.
   */
  async execute(userId: number, orderDTO: OrderDTO): Promise<UserDTO | null> {
    const user = await this.userService.addOrderToUser(userId, orderDTO);

    if (!user) return null;

    const result = toUserDTO(user);
    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';
import { ShopService } from '../../../application/services/shop.service';
import { OrderDTO } from '../../../presentation/dtos/order.dto';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';

/**
 * Use case class for adding an order to a shop.
 * This class encapsulates the business logic for adding an order.
 */
@Injectable()
export class AddOrderToShop {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the add-order-to-shop use case.
   * @param shopId - The ID of the shop.
   * @param orderDTO - The OrderDTO containing the order data to be added.
   * @returns A promise that resolves to the updated Shop DTO.
   */
  async execute(shopId: number, orderDTO: OrderDTO): Promise<ShopDTO | null> {
    const updatedShop = await this.shopService.addOrderToShop(shopId, orderDTO);

    if (!updatedShop) return null;

    return toShopDTO(updatedShop);
  }
}

// import { Injectable } from '@nestjs/common';
// import { VendorService } from '../../../application/services/vendor.service';
// import { ShopDTO } from '../../../presentation/dtos/shop.dto';
// import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';

// /**
//  * Use case class for retrieving the shop associated with a vendor.
//  * This class encapsulates the business logic for fetching the shop information.
//  * It interacts with the Vendor service to perform operations on the vendor repository.
//  */
// @Injectable()
// export class GetVendorShop {
//   constructor(private readonly vendorService: VendorService) {}

//   /**
//    * Execute the get-vendor-shop use case.
//    * @param vendorId - The ID of the vendor whose shop information is to be retrieved.
//    * @returns A promise that resolves to the ShopDTO of the associated shop, or null if not found.
//    */
//   async execute(vendorId: number): Promise<ShopDTO | null> {
//     const shop = await this.vendorService.getVendorShop(vendorId);

//     if (!shop) return null;

//     const result = toShopDTO(shop);
//     return result;
//   }
// }

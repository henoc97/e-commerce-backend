// import { Injectable } from '@nestjs/common';
// import { VendorService } from '../../../application/services/vendor.service';
// import { VendorDTO } from '../../../presentation/dtos/vendor.dto';
// import { toVendorDTO } from '../../../application/helper/to-dto/to.vendor.dto';

// /**
//  * Use case class for retrieving the most recently updated vendor.
//  * This class encapsulates the business logic for retrieving the most recently updated vendor.
//  * It interacts with the Vendor service to perform operations on vendor repository.
//  */
// @Injectable()
// export class GetLatestVendor {
//   constructor(private readonly vendorService: VendorService) {}

//   /**
//    * Execute the get-latest-vendor use case.
//    * @returns A promise that resolves to the most recently updated VendorDTO if found, otherwise null.
//    */
//   async execute(): Promise<VendorDTO | null> {
//     const vendor = await this.vendorService.getLatestVendor();

//     if (!vendor) return null;

//     const result = toVendorDTO(vendor);
//     return result;
//   }
// }

import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AddProductToVendor } from '../../../application/use-cases/vendor.use-cases/add-product-to-vendor.use-case';
import { CreateVendor } from '../../../application/use-cases/vendor.use-cases/create-vendor.use-case';
import { DeleteVendor } from '../../../application/use-cases/vendor.use-cases/delete-vendor.use-case';
import { FindVendorById } from '../../../application/use-cases/vendor.use-cases/find-vendor-by-id.use-case';
import { FindVendorsByStoreName } from '../../../application/use-cases/vendor.use-cases/find-vendors-by-store-name.use-case';
import { FindVendorsBySubscription } from '../../../application/use-cases/vendor.use-cases/find-vendors-by-subscription.use-case';
import { FindVendorsByUser } from '../../../application/use-cases/vendor.use-cases/find-vendors-by-user.use-case';
// import { GetLatestVendor } from '../../../application/use-cases/vendor.use-cases/get-latest-vendor.use-case';
// import { GetVendorProducts } from '../../../application/use-cases/vendor.use-cases/get-vendor-products.use-case';
// import { GetVendorShop } from '../../../application/use-cases/vendor.use-cases/get-vendor-shop.use-case';
// import { GetVendorSubscription } from '../../../application/use-cases/vendor.use-cases/get-vendor-subscription.use-case';
import { RemoveProductFromVendor } from '../../../application/use-cases/vendor.use-cases/remove-product-from-vendor.use-case';
import { SetVendorShop } from '../../../application/use-cases/vendor.use-cases/set-vendor-shop.use-case';
import { SetVendorSubscription } from '../../../application/use-cases/vendor.use-cases/set-vendor-subscription.use-case';
import { UpdateVendor } from '../../../application/use-cases/vendor.use-cases/update-vendor.use-case';
import { VendorList } from '../../../application/use-cases/vendor.use-cases/vendor-list.use-case';
import { VendorDTO } from '../../../presentation/dtos/vendor.dto';
import { ProductDTO } from '../../../presentation/dtos/product.dto';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';
import { SubscriptionDTO } from '../../../presentation/dtos/subscription.dto';
import { transformVendorDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { VendorOutput } from '../../../presentation/output/vendor.output';
import { ProductInput } from '../../../presentation/input/product.input';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';
import { VendorInput } from '../../../presentation/input/vendor.input';
import { toVendorDTO } from '../../../application/helper/to-dto/to.vendor.dto';
import { ShopInput } from '../../../presentation/input/shop.input';
import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';
import { SubscriptionInput } from '../../../presentation/input/subscription.input';
import { toSubscriptionDTO } from '../../../application/helper/to-dto/to.subscription.dto';

@Resolver(() => VendorOutput)
export class VendorResolver {
  constructor(
    private readonly addProductToVendorUseCase: AddProductToVendor,
    private readonly createVendorUseCase: CreateVendor,
    private readonly deleteVendorUseCase: DeleteVendor,
    private readonly findVendorByIdUseCase: FindVendorById,
    private readonly findVendorsByStoreNameUseCase: FindVendorsByStoreName,
    private readonly findVendorsBySubscriptionUseCase: FindVendorsBySubscription,
    private readonly findVendorsByUserUseCase: FindVendorsByUser,
    // private readonly getLatestVendorUseCase: GetLatestVendor,
    // private readonly getVendorProductsUseCase: GetVendorProducts,
    // private readonly getVendorShopUseCase: GetVendorShop,
    // private readonly getVendorSubscriptionUseCase: GetVendorSubscription,
    private readonly removeProductFromVendorUseCase: RemoveProductFromVendor,
    private readonly setVendorShopUseCase: SetVendorShop,
    private readonly setVendorSubscriptionUseCase: SetVendorSubscription,
    private readonly updateVendorUseCase: UpdateVendor,
    private readonly vendorListUseCase: VendorList,
  ) { }

  /**
   * Adds a product to a vendor.
   * @param vendorId - The ID of the vendor.
   * @param productDTO - The product data transfer object.
   * @returns The updated vendor data transfer object or null.
   */
  @Mutation(() => VendorOutput, { nullable: true })
  async addProductToVendor(
    @Args('vendorId') vendorId: number,
    @Args('productDTO') product: ProductInput,
  ): Promise<VendorOutput | null> {
    const dto = toProductDTO(product);
    const result = await this.addProductToVendorUseCase.execute(vendorId, dto);
    return transformVendorDTOToGraphQL(result)
  }

  /**
   * Creates a new vendor.
   * @param vendorDTO - The vendor data transfer object.
   * @returns The created vendor data transfer object or null.
   */
  @Mutation(() => VendorOutput, { nullable: true })
  async createVendor(
    @Args('vendor') vendor: VendorInput,
  ): Promise<VendorOutput | null> {
    if (!vendor.storeName) {
      throw new Error("Le champ 'storeName' est requis.");
    }
    if (!vendor.userId) {
      throw new Error("Le champ 'userId' est requis.");
    }
    const dto = toVendorDTO(vendor);
    console.log("Données du vendeur à créer (resolver):", dto);
    const result = await this.createVendorUseCase.execute(dto);
    return transformVendorDTOToGraphQL(result)
  }

  /**
   * Deletes a vendor.
   * @param vendorId - The ID of the vendor.
   * @returns True if the vendor was deleted, otherwise false.
   */
  @Mutation(() => Boolean)
  async deleteVendor(@Args('vendorId') vendorId: number): Promise<boolean> {
    return this.deleteVendorUseCase.execute(vendorId);
  }

  /**
   * Finds a vendor by ID.
   * @param vendorId - The ID of the vendor.
   * @returns The vendor data transfer object or null.
   */
  @Query(() => VendorOutput, { nullable: true })
  async findVendorById(
    @Args('vendorId') vendorId: number,
  ): Promise<VendorOutput | null> {
    const result = await this.findVendorByIdUseCase.execute(vendorId);
    return transformVendorDTOToGraphQL(result)
  }

  /**
   * Finds vendors by store name.
   * @param storeName - The name of the store.
   * @returns A list of vendor data transfer objects.
   */
  @Query(() => [VendorOutput])
  async findVendorsByStoreName(
    @Args('storeName') storeName: string,
  ): Promise<VendorOutput[]> {
    const result = await this.findVendorsByStoreNameUseCase.execute(storeName);
    return result?.map(transformVendorDTOToGraphQL)
  }

  /**
   * Finds vendors by subscription ID.
   * @param subscriptionId - The ID of the subscription.
   * @returns A list of vendor data transfer objects.
   */
  @Query(() => [VendorOutput])
  async findVendorsBySubscription(
    @Args('subscriptionId') subscriptionId: number,
  ): Promise<VendorOutput[]> {
    const result = await this.findVendorsBySubscriptionUseCase.execute(subscriptionId);
    return result?.map(transformVendorDTOToGraphQL)
  }

  /**
   * Finds vendors by user ID.
   * @param userId - The ID of the user.
   * @returns A list of vendor data transfer objects.
   */
  @Query(() => [VendorOutput])
  async findVendorsByUser(
    @Args('userId') userId: number,
  ): Promise<VendorOutput[]> {
    const result = await this.findVendorsByUserUseCase.execute(userId);
    return result?.map(transformVendorDTOToGraphQL)
  }

  // /**
  //  * Gets the latest vendor.
  //  * @returns The latest vendor data transfer object or null.
  //  */
  // @Query(() => VendorOutput, { nullable: true })
  // async getLatestVendor(): Promise<VendorOutput | null> {
  // const result = await   return this.getLatestVendorUseCase.execute();
  // return transformVendorDTOToGraphQL(result)
  // }

  // /**
  //  * Gets products of a vendor.
  //  * @param vendorId - The ID of the vendor.
  //  * @returns A list of product data transfer objects.
  //  */
  // @Query(() => [ProductOutput])
  // async getVendorProducts(
  //   @Args('vendorId') vendorId: number,
  // ): Promise<ProductDTO[]> {
  //   return this.getVendorProductsUseCase.execute(vendorId);
  // }

  // /**
  //  * Gets the shop of a vendor.
  //  * @param vendorId - The ID of the vendor.
  //  * @returns The shop data transfer object or null.
  //  */
  // @Query(() => ShopInput, { nullable: true })
  // async getVendorShop(
  //   @Args('vendorId') vendorId: number,
  // ): Promise<ShopDTO | null> {
  //   return this.getVendorShopUseCase.execute(vendorId);
  // }

  // /**
  //  * Gets the subscription of a vendor.
  //  * @param vendorId - The ID of the vendor.
  //  * @returns The subscription data transfer object or null.
  //  */
  // @Query(() => SubscriptionInput, { nullable: true })
  // async getVendorSubscription(
  //   @Args('vendorId') vendorId: number,
  // ): Promise<SubscriptionDTO | null> {
  //   return this.getVendorSubscriptionUseCase.execute(vendorId);
  // }

  /**
   * Removes a product from a vendor.
   * @param vendorId - The ID of the vendor.
   * @param productId - The ID of the product.
   * @returns The updated vendor data transfer object or null.
   */
  @Mutation(() => VendorOutput, { nullable: true })
  async removeProductFromVendor(
    @Args('vendorId') vendorId: number,
    @Args('productId') productId: number,
  ): Promise<VendorOutput | null> {
    const result = await this.removeProductFromVendorUseCase.execute(vendorId, productId);
    return transformVendorDTOToGraphQL(result)
  }

  /**
   * Sets the shop for a vendor.
   * @param vendorId - The ID of the vendor.
   * @param shopDTO - The shop data transfer object.
   * @returns The updated vendor data transfer object or null.
   */
  @Mutation(() => VendorOutput, { nullable: true })
  async setVendorShop(
    @Args('vendorId') vendorId: number,
    @Args('shopDTO') shop: ShopInput,
  ): Promise<VendorOutput | null> {
    const dto = toShopDTO(shop)
    const result = await this.setVendorShopUseCase.execute(vendorId, dto);
    return transformVendorDTOToGraphQL(result)
  }

  /**
   * Sets the subscription for a vendor.
   * @param vendorId - The ID of the vendor.
   * @param subscriptionDTO - The subscription data transfer object.
   * @returns The updated vendor data transfer object or null.
   */
  @Mutation(() => VendorOutput, { nullable: true })
  async setVendorSubscription(
    @Args('vendorId') vendorId: number,
    @Args('subscriptionDTO') subscription: SubscriptionInput,
  ): Promise<VendorOutput | null> {
    const dto = toSubscriptionDTO(subscription)
    const result = await this.setVendorSubscriptionUseCase.execute(vendorId, dto);
    return transformVendorDTOToGraphQL(result)
  }

  /**
   * Updates a vendor.
   * @param vendorId - The ID of the vendor.
   * @param vendorDTO - The partial vendor data transfer object.
   * @returns The updated vendor data transfer object or null.
   */
  @Mutation(() => VendorOutput, { nullable: true })
  async updateVendor(
    @Args('vendorId') vendorId: number,
    @Args('vendorDTO') vendorDTO: VendorInput,
  ): Promise<VendorOutput | null> {
    const result = await this.updateVendorUseCase.execute(vendorId, vendorDTO);
    return transformVendorDTOToGraphQL(result)
  }

  /**
   * Retrieves a list of all vendors.
   * @returns A list of vendor data transfer objects.
   */
  @Query(() => [VendorOutput])
  async vendorList(): Promise<VendorOutput[]> {
    const result = await this.vendorListUseCase.execute();
    return result?.map(transformVendorDTOToGraphQL)
  }
}

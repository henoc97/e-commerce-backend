export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Custom scalar type for handling JSON data. */
  JSON: { input: any; output: any; }
};

/** Input type for adding an item to a cart. */
export type AddCartItemInput = {
  cartId: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

/** Represents an Address associated with a User. */
export type Address = {
  __typename?: 'Address';
  /** City where the address is located. */
  city: Scalars['String']['output'];
  /** Country where the address is located. */
  country: Scalars['String']['output'];
  /** Unique identifier for the address. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Postal code for the address. */
  postalCode: Scalars['String']['output'];
  /** State or region where the address is located. */
  state: Scalars['String']['output'];
  /** Street address. */
  street: Scalars['String']['output'];
  /** The User object associated with this address. */
  user?: Maybe<User>;
  /** Foreign key referring to the User who owns this address. */
  userId?: Maybe<Scalars['ID']['output']>;
};

/** Input type for creating or updating an address. */
export type AddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

/**
 * Represents an audit log entry.
 * Captures user actions and entity changes for tracking purposes.
 */
export type AuditLog = {
  __typename?: 'AuditLog';
  /** Type of action performed by the user (e.g., CREATE, UPDATE, DELETE). */
  action?: Maybe<AuditLogAction>;
  /** Details of the changes made (before-and-after values, etc.). */
  changes?: Maybe<Scalars['JSON']['output']>;
  /** The date and time when the action was performed. */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** The entity affected by the action (e.g., 'User', 'Order'). */
  entity: Scalars['String']['output'];
  /** The unique identifier of the entity affected by the action. */
  entityId?: Maybe<Scalars['ID']['output']>;
  /** Unique identifier for the audit log entry. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The user who performed the action. */
  user?: Maybe<User>;
};

/** Enumeration of possible actions recorded in the audit log. */
export enum AuditLogAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

/**
 * Represents a shopping cart for a user.
 * The cart holds items that the user intends to purchase.
 */
export type Cart = {
  __typename?: 'Cart';
  /** Estimated shipping cost for the items in the cart. */
  estimatedShippingCost: Scalars['Float']['output'];
  id?: Maybe<Scalars['ID']['output']>;
  items: Array<Maybe<CartItem>>;
  /**
   * Timestamp when the cart was last saved.
   * Useful for implementing auto-save functionality.
   */
  lastSaved: Scalars['String']['output'];
  totalPrice: Scalars['Float']['output'];
  totalQuantity: Scalars['Int']['output'];
  user?: Maybe<User>;
};

/** Input type for creating or updating a Cart. */
export type CartInput = {
  deviceId?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

/**
 * Represents an item in a shopping cart.
 * Each CartItem links a specific product with a quantity to a cart.
 */
export type CartItem = {
  __typename?: 'CartItem';
  /** The cart to which this item belongs. */
  cart?: Maybe<Cart>;
  /** Unique identifier for the CartItem. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The product associated with this CartItem. */
  product?: Maybe<Product>;
  /** Quantity of the product in the cart. */
  quantity?: Maybe<Scalars['Int']['output']>;
};

/**
 * Represents a category for organizing products.
 * Categories can have parent and child categories.
 */
export type Category = {
  __typename?: 'Category';
  /** Child categories of this category. */
  children: Array<Maybe<Category>>;
  /** Unique identifier for the Category. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Name of the Category. */
  name: Scalars['String']['output'];
  /** The parent category of this category, if any. */
  parent?: Maybe<Category>;
  /** ID of the parent Category. */
  parentId?: Maybe<Scalars['ID']['output']>;
  /** Products associated with this Category. */
  products: Array<Maybe<Product>>;
  /** The Shop this category belongs to, if any. */
  shop?: Maybe<Shop>;
  /** ID of the Shop this category belongs to. */
  shopId?: Maybe<Scalars['ID']['output']>;
};

/** Input type for creating and updating Categories. */
export type CategoryInput = {
  /** Name of the Category. */
  name: Scalars['String']['input'];
  /** ID of the parent Category, if any. */
  parentId?: InputMaybe<Scalars['Int']['input']>;
  /** ID of the Shop this category belongs to, if any. */
  shopId?: InputMaybe<Scalars['Int']['input']>;
};

/** Input type for creating a new CartItem. */
export type CreateCartItemInput = {
  cartId: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

/** Input type for creating a new order. */
export type CreateOrderInput = {
  items?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  shopId: Scalars['ID']['input'];
  status: OrderStatus;
  totalAmount: Scalars['Float']['input'];
  userId: Scalars['ID']['input'];
};

/** Enum for currencies. */
export enum Currency {
  Eur = 'EUR',
  Usd = 'USD'
}

/** Enum representing different types of discounts. */
export enum DiscountType {
  FixedAmount = 'FIXED_AMOUNT',
  Percentage = 'PERCENTAGE'
}

/**
 * Represents a marketplace in the system.
 * A marketplace consists of multiple shops and may have a description.
 */
export type Marketplace = {
  __typename?: 'Marketplace';
  /** Description of the marketplace. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the marketplace. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Name of the marketplace. */
  name: Scalars['String']['output'];
  /** List of shops within the marketplace. */
  shops: Array<Maybe<Shop>>;
};

/** Input type for creating and updating Marketplaces. */
export type MarketplaceInput = {
  /** Description of the Marketplace. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Name of the Marketplace. */
  name: Scalars['String']['input'];
};

/** Mutations related to Vendors. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Adds an address to a user's profile. */
  addAddressToUser: User;
  /** Adds an item to the cart. */
  addItemToCart: Cart;
  /** Adds an order to a user's profile. */
  addOrderToUser: User;
  addPaymentToOrder?: Maybe<Order>;
  /** Adds a product to a vendor's inventory. */
  addProductToVendor: Vendor;
  addRefundToOrder?: Maybe<Order>;
  /**
   * Adds a product to the user's waitlist if it is out of stock.
   * The user will be notified when the product is back in stock.
   */
  addToWaitlist: Scalars['Boolean']['output'];
  /** Applies promotions or discounts to products in the cart if applicable. */
  applyDiscount: Cart;
  /**
   * Auto-saves the current state of the cart.
   * Automatically called when the cart is updated or after a session ends.
   */
  autoSaveCart: Cart;
  /** Finalizes the cart and creates an order. */
  checkout: Scalars['Boolean']['output'];
  /** Clears all items in the cart. */
  clearCart: Cart;
  /** Create a new address. */
  createAddress: Address;
  /** Create a new audit log entry. */
  createAuditLog: AuditLog;
  /** Creates a new cart for a user. */
  createCart: Cart;
  /** Create a new CartItem by linking a product to a cart with a specified quantity. */
  createCartItem: CartItem;
  /** Creates a new Category. */
  createCategory: Category;
  /** Creates a new Marketplace. */
  createMarketplace: Marketplace;
  /** Creates a new NewsletterSubscription. */
  createNewsletterSubscription: NewsletterSubscription;
  /** Creates a new Notification. */
  createNotification: Notification;
  createOrder?: Maybe<Order>;
  /** Creates a new OrderItem. */
  createOrderItem: OrderItem;
  /** Creates a new payment. */
  createPayment: Payment;
  /** Creates a new product. */
  createProduct: Product;
  /** Creates a new ProductImage. */
  createProductImage: ProductImage;
  /** Creates a new ProductVariant. */
  createProductVariant: ProductVariant;
  /** Creates a new promotion. */
  createPromotion: Promotion;
  /** Creates a new refund. */
  createRefund: Refund;
  /** Creates a new review. */
  createReview: Review;
  /** Creates a new shop. */
  createShop: Shop;
  /** Creates a new subscription. */
  createSubscription: Subscription;
  /** Creates a new ticket. */
  createTicket: Ticket;
  /** Creates a new user. */
  createUser: User;
  /** Creates a new user activity record. */
  createUserActivity: UserActivity;
  /** Creates a new user profile. */
  createUserProfile: UserProfile;
  /** Creates a new vendor. */
  createVendor: Vendor;
  /** Creates a new subsite. */
  createsubsite: Subsite;
  /** Delete an address by its unique identifier. */
  deleteAddress: Scalars['Boolean']['output'];
  /** Delete an audit log entry by its ID. */
  deleteAuditLog: Scalars['Boolean']['output'];
  /** Remove a CartItem from the cart by its ID. */
  deleteCartItem: Scalars['Boolean']['output'];
  /** Deletes a Category by its ID. */
  deleteCategory: Scalars['Boolean']['output'];
  /** Deletes a Marketplace by its ID. */
  deleteMarketplace: Scalars['Boolean']['output'];
  /** Deletes a NewsletterSubscription by its ID. */
  deleteNewsletterSubscription: Scalars['Boolean']['output'];
  /** Deletes a Notification by its ID. */
  deleteNotification: Scalars['Boolean']['output'];
  deleteOrder?: Maybe<Scalars['Boolean']['output']>;
  /** Deletes an OrderItem by its ID. */
  deleteOrderItem: Scalars['Boolean']['output'];
  /** Deletes a payment by its ID. */
  deletePayment: Scalars['Boolean']['output'];
  /** Deletes a product by its ID. */
  deleteProduct: Scalars['Boolean']['output'];
  /** Deletes a ProductImage by its ID. */
  deleteProductImage: Scalars['Boolean']['output'];
  /** Deletes a ProductVariant by its ID. */
  deleteProductVariant: Scalars['Boolean']['output'];
  /** Deletes a promotion by its ID. */
  deletePromotion: Scalars['Boolean']['output'];
  /** Deletes a refund by its ID. */
  deleteRefund: Scalars['Boolean']['output'];
  /** Deletes a review by its ID. */
  deleteReview: Scalars['Boolean']['output'];
  /** Deletes a shop by its ID. */
  deleteShop: Scalars['Boolean']['output'];
  /** Deletes a subscription by its ID. */
  deleteSubscription: Scalars['Boolean']['output'];
  /** Deletes a ticket by its ID. */
  deleteTicket: Scalars['Boolean']['output'];
  /** Deletes a user by their ID. */
  deleteUser: Scalars['Boolean']['output'];
  /** Deletes a user activity record by its ID. */
  deleteUserActivity: Scalars['Boolean']['output'];
  /** Deletes a user profile by its ID. */
  deleteUserProfile: Scalars['Boolean']['output'];
  /** Deletes a vendor by their ID. */
  deleteVendor: Scalars['Boolean']['output'];
  /** Deletes a subsite by its ID. */
  deletesubsite: Scalars['Boolean']['output'];
  /** Removes an address from a user's profile. */
  removeAddressFromUser: User;
  /** Removes an item from the cart. */
  removeItemFromCart: Cart;
  /** Removes an order from a user's profile. */
  removeOrderFromUser: User;
  /** Removes a product from a vendor's inventory. */
  removeProductFromVendor: Vendor;
  /** Restores a previously auto-saved cart for the user. */
  restoreSavedCart: Cart;
  /** Update an existing address. */
  updateAddress?: Maybe<Address>;
  /** Update the quantity of an existing CartItem. */
  updateCartItemQuantity: CartItem;
  /** Updates an existing Category. */
  updateCategory: Category;
  /** Updates an existing Marketplace. */
  updateMarketplace: Marketplace;
  /** Updates an existing NewsletterSubscription by its ID. */
  updateNewsletterSubscription: NewsletterSubscription;
  /** Updates an existing Notification by its ID. */
  updateNotification: Notification;
  updateOrder?: Maybe<Order>;
  /** Updates an existing OrderItem by its ID. */
  updateOrderItem: OrderItem;
  updateOrderStatus?: Maybe<Order>;
  /** Updates an existing payment. */
  updatePayment?: Maybe<Payment>;
  /** Updates an existing product by its ID. */
  updateProduct: Product;
  /** Updates an existing ProductImage by its ID. */
  updateProductImage: ProductImage;
  /** Updates an existing ProductVariant by its ID. */
  updateProductVariant: ProductVariant;
  /** Updates an existing promotion by its ID. */
  updatePromotion: Promotion;
  /** Updates an existing refund by its ID. */
  updateRefund: Refund;
  /** Updates an existing review by its ID. */
  updateReview: Review;
  /** Updates an existing shop by its ID. */
  updateShop: Shop;
  /** Updates an existing subscription by its ID. */
  updateSubscription: Subscription;
  /** Updates an existing ticket by its ID. */
  updateTicket: Ticket;
  /** Updates the status of an existing ticket. */
  updateTicketStatus: Ticket;
  /** Updates an existing user. */
  updateUser: User;
  /** Updates an existing user activity record by its ID. */
  updateUserActivity: UserActivity;
  /** Updates the action of an existing user activity record. */
  updateUserActivityAction: UserActivity;
  /** Updates the email of an existing user. */
  updateUserEmail: User;
  /** Updates the password of an existing user. */
  updateUserPassword: User;
  /** Updates an existing user profile by its ID. */
  updateUserProfile: UserProfile;
  /** Updates the birthday of an existing user profile. */
  updateUserProfileBirthday: UserProfile;
  /** Updates the gender of an existing user profile. */
  updateUserProfileGender: UserProfile;
  /** Updates the phone number of an existing user profile. */
  updateUserProfilePhone: UserProfile;
  /** Updates the role of an existing user. */
  updateUserRole: User;
  /** Updates an existing vendor. */
  updateVendor: Vendor;
  /** Updates the shop associated with a vendor. */
  updateVendorShop: Vendor;
  /** Updates the subscription of a vendor. */
  updateVendorSubscription: Vendor;
  /** Updates an existing subsite by its ID. */
  updatesubsite: Subsite;
  /** Updates the configuration of an existing subsite. */
  updatesubsiteConfig: Subsite;
};


/** Mutations related to Vendors. */
export type MutationAddAddressToUserArgs = {
  addressId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationAddItemToCartArgs = {
  input: AddCartItemInput;
};


/** Mutations related to Vendors. */
export type MutationAddOrderToUserArgs = {
  id: Scalars['ID']['input'];
  orderId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationAddPaymentToOrderArgs = {
  orderId: Scalars['ID']['input'];
  paymentId: Scalars['String']['input'];
};


/** Mutations related to Vendors. */
export type MutationAddProductToVendorArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationAddRefundToOrderArgs = {
  orderId: Scalars['ID']['input'];
  refundId: Scalars['String']['input'];
};


/** Mutations related to Vendors. */
export type MutationAddToWaitlistArgs = {
  productId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationApplyDiscountArgs = {
  cartId: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationAutoSaveCartArgs = {
  cartId: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationCheckoutArgs = {
  cartId: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationClearCartArgs = {
  cartId: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateAddressArgs = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateAuditLogArgs = {
  input: AuditLogInput;
};


/** Mutations related to Vendors. */
export type MutationCreateCartArgs = {
  input: CartInput;
};


/** Mutations related to Vendors. */
export type MutationCreateCartItemArgs = {
  input: CreateCartItemInput;
};


/** Mutations related to Vendors. */
export type MutationCreateCategoryArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  shopId?: InputMaybe<Scalars['Int']['input']>;
};


/** Mutations related to Vendors. */
export type MutationCreateMarketplaceArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateNewsletterSubscriptionArgs = {
  email: Scalars['String']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateNotificationArgs = {
  content: Scalars['String']['input'];
  type: NotificationType;
  userId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


/** Mutations related to Vendors. */
export type MutationCreateOrderItemArgs = {
  input: OrderItemInput;
};


/** Mutations related to Vendors. */
export type MutationCreatePaymentArgs = {
  paymentDTO: PaymentInput;
};


/** Mutations related to Vendors. */
export type MutationCreateProductArgs = {
  input: ProductInput;
};


/** Mutations related to Vendors. */
export type MutationCreateProductImageArgs = {
  input: ProductImageInput;
};


/** Mutations related to Vendors. */
export type MutationCreateProductVariantArgs = {
  name: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreatePromotionArgs = {
  input: PromotionInput;
};


/** Mutations related to Vendors. */
export type MutationCreateRefundArgs = {
  input: RefundInput;
};


/** Mutations related to Vendors. */
export type MutationCreateReviewArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  userId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateShopArgs = {
  input: ShopInput;
};


/** Mutations related to Vendors. */
export type MutationCreateSubscriptionArgs = {
  input: SubscriptionInput;
};


/** Mutations related to Vendors. */
export type MutationCreateTicketArgs = {
  description: Scalars['String']['input'];
  status: TicketStatus;
  subject: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateUserArgs = {
  addresses: Array<Scalars['ID']['input']>;
  auditLog?: InputMaybe<Array<Scalars['ID']['input']>>;
  cart: Array<Scalars['ID']['input']>;
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notification?: InputMaybe<Array<Scalars['ID']['input']>>;
  orders: Array<Scalars['ID']['input']>;
  password: Scalars['String']['input'];
  profileId: Scalars['ID']['input'];
  reviews?: InputMaybe<Array<Scalars['ID']['input']>>;
  role: UserRole;
  subsite?: InputMaybe<Array<Scalars['ID']['input']>>;
  ticket?: InputMaybe<Array<Scalars['ID']['input']>>;
  userActivity?: InputMaybe<Array<Scalars['ID']['input']>>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};


/** Mutations related to Vendors. */
export type MutationCreateUserActivityArgs = {
  action: UserActivityAction;
  productId?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateUserProfileArgs = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreateVendorArgs = {
  products?: InputMaybe<Array<Scalars['ID']['input']>>;
  shopId?: InputMaybe<Scalars['ID']['input']>;
  storeName: Scalars['String']['input'];
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
  userId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationCreatesubsiteArgs = {
  config: Scalars['JSON']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteAddressArgs = {
  id: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteAuditLogArgs = {
  id: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteCartItemArgs = {
  id: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteMarketplaceArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteNewsletterSubscriptionArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteNotificationArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteOrderArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteOrderItemArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeletePaymentArgs = {
  id: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteProductImageArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteProductVariantArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeletePromotionArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteRefundArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteShopArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteSubscriptionArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteTicketArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteUserActivityArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteUserProfileArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeleteVendorArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationDeletesubsiteArgs = {
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationRemoveAddressFromUserArgs = {
  addressId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationRemoveItemFromCartArgs = {
  cartId: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationRemoveOrderFromUserArgs = {
  id: Scalars['ID']['input'];
  orderId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationRemoveProductFromVendorArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationRestoreSavedCartArgs = {
  userId: Scalars['Int']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateAddressArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateCartItemQuantityArgs = {
  input: UpdateCartItemQuantityInput;
};


/** Mutations related to Vendors. */
export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  shopId?: InputMaybe<Scalars['Int']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateMarketplaceArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateNewsletterSubscriptionArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateNotificationArgs = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  type?: InputMaybe<NotificationType>;
};


/** Mutations related to Vendors. */
export type MutationUpdateOrderArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOrderInput;
};


/** Mutations related to Vendors. */
export type MutationUpdateOrderItemArgs = {
  id: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateOrderStatusArgs = {
  orderId: Scalars['ID']['input'];
  status: OrderStatus;
};


/** Mutations related to Vendors. */
export type MutationUpdatePaymentArgs = {
  id: Scalars['Int']['input'];
  updates: PaymentInput;
};


/** Mutations related to Vendors. */
export type MutationUpdateProductArgs = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  shopId?: InputMaybe<Scalars['ID']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  variants?: InputMaybe<Array<Scalars['ID']['input']>>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateProductImageArgs = {
  id: Scalars['ID']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateProductVariantArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdatePromotionArgs = {
  discountType?: InputMaybe<DiscountType>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateRefundArgs = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RefundStatus>;
};


/** Mutations related to Vendors. */
export type MutationUpdateReviewArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateShopArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  marketplaceId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateSubscriptionArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateTicketArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  status?: InputMaybe<TicketStatus>;
  subject?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateTicketStatusArgs = {
  id: Scalars['ID']['input'];
  status: TicketStatus;
};


/** Mutations related to Vendors. */
export type MutationUpdateUserArgs = {
  addresses?: InputMaybe<Array<Scalars['ID']['input']>>;
  auditLog?: InputMaybe<Array<Scalars['ID']['input']>>;
  cart?: InputMaybe<Array<Scalars['ID']['input']>>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notification?: InputMaybe<Array<Scalars['ID']['input']>>;
  orders?: InputMaybe<Array<Scalars['ID']['input']>>;
  password?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['ID']['input']>;
  reviews?: InputMaybe<Array<Scalars['ID']['input']>>;
  role?: InputMaybe<UserRole>;
  subsite?: InputMaybe<Array<Scalars['ID']['input']>>;
  ticket?: InputMaybe<Array<Scalars['ID']['input']>>;
  userActivity?: InputMaybe<Array<Scalars['ID']['input']>>;
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateUserActivityArgs = {
  action?: InputMaybe<UserActivityAction>;
  id: Scalars['ID']['input'];
  productId?: InputMaybe<Scalars['Int']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateUserActivityActionArgs = {
  action: UserActivityAction;
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateUserEmailArgs = {
  email: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateUserPasswordArgs = {
  id: Scalars['ID']['input'];
  password: Scalars['String']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateUserProfileArgs = {
  birthday?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateUserProfileBirthdayArgs = {
  birthday: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateUserProfileGenderArgs = {
  gender: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateUserProfilePhoneArgs = {
  id: Scalars['ID']['input'];
  phone: Scalars['String']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateUserRoleArgs = {
  id: Scalars['ID']['input'];
  role: UserRole;
};


/** Mutations related to Vendors. */
export type MutationUpdateVendorArgs = {
  id: Scalars['ID']['input'];
  products?: InputMaybe<Array<Scalars['ID']['input']>>;
  shopId?: InputMaybe<Scalars['ID']['input']>;
  storeName?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdateVendorShopArgs = {
  id: Scalars['ID']['input'];
  shopId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdateVendorSubscriptionArgs = {
  id: Scalars['ID']['input'];
  subscriptionId: Scalars['ID']['input'];
};


/** Mutations related to Vendors. */
export type MutationUpdatesubsiteArgs = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations related to Vendors. */
export type MutationUpdatesubsiteConfigArgs = {
  config: Scalars['JSON']['input'];
  id: Scalars['ID']['input'];
};

/**
 * Represents a subscription to a newsletter.
 * Stores details about the subscriber's email and the subscription date.
 */
export type NewsletterSubscription = {
  __typename?: 'NewsletterSubscription';
  /** Email address of the subscriber. */
  email: Scalars['String']['output'];
  /** Unique identifier for the subscription. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The date and time when the subscription was created. */
  subscribedAt?: Maybe<Scalars['String']['output']>;
};

/** Input type for creating and updating Newsletter Subscriptions. */
export type NewsletterSubscriptionInput = {
  /** Email address of the subscriber. */
  email: Scalars['String']['input'];
};

/**
 * Represents a notification for a user.
 * Stores details about the notification type, content, and when it was sent.
 */
export type Notification = {
  __typename?: 'Notification';
  /** The content of the notification. */
  content: Scalars['String']['output'];
  /** Unique identifier for the notification. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The date and time when the notification was sent. */
  sentAt?: Maybe<Scalars['String']['output']>;
  /** The type of the notification (e.g., INFO, WARNING, etc). */
  type: NotificationType;
  /** The user associated with the notification. */
  user?: Maybe<User>;
  /** Unique identifier for the user who will receive the notification. */
  userId?: Maybe<Scalars['ID']['output']>;
};

/** Input type for creating and updating Notifications. */
export type NotificationInput = {
  /** The content of the notification. */
  content: Scalars['String']['input'];
  /** The type of the notification. */
  type: NotificationType;
  /** Unique identifier for the user receiving the notification. */
  userId: Scalars['ID']['input'];
};

/** Represents the different types of notifications available. */
export enum NotificationType {
  Info = 'INFO',
  OrderUpdate = 'ORDER_UPDATE',
  Promotion = 'PROMOTION',
  Warning = 'WARNING'
}

/** Represents an order placed by a user. */
export type Order = {
  __typename?: 'Order';
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  items?: Maybe<Array<Maybe<OrderItem>>>;
  paymentId?: Maybe<Scalars['String']['output']>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  refunds?: Maybe<Array<Maybe<Refund>>>;
  shopId?: Maybe<Scalars['ID']['output']>;
  status: OrderStatus;
  totalAmount: Scalars['Float']['output'];
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

/**
 * Represents an item in an order.
 * Contains information about the product, quantity, and price of the item in the order.
 */
export type OrderItem = {
  __typename?: 'OrderItem';
  /** Unique identifier for the OrderItem. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The Order to which this item belongs. */
  order?: Maybe<Order>;
  /** Unique identifier for the Order to which this item belongs. */
  orderId?: Maybe<Scalars['ID']['output']>;
  /** Price of the Product at the time of the order. */
  price: Scalars['Float']['output'];
  /** The Product that is included in this order item. */
  product?: Maybe<Product>;
  /** Unique identifier for the Product that is included in this order item. */
  productId?: Maybe<Scalars['ID']['output']>;
  /** Quantity of the Product included in this order item. */
  quantity: Scalars['Int']['output'];
};

/** Input type for an order item. */
export type OrderItemInput = {
  /** Unique identifier for the Order to which this item belongs. */
  orderId: Scalars['ID']['input'];
  /** Price of the Product at the time of the order. */
  price: Scalars['Float']['input'];
  /** Unique identifier for the Product that is included in this order item. */
  productId: Scalars['ID']['input'];
  /** Quantity of the Product included in this order item. */
  quantity: Scalars['Int']['input'];
};

/** Represents the status of an order. */
export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Shipped = 'SHIPPED'
}

/** Represents a payment in the system. */
export type Payment = {
  __typename?: 'Payment';
  /** The amount of money that was paid. */
  amount: Scalars['Float']['output'];
  /** The date and time when the payment was created. */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** The currency of the payment. */
  currency: Currency;
  /** Unique identifier for the Payment. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The method used for the payment (e.g., Stripe, PayPal, Bank Transfer). */
  method: Scalars['String']['output'];
  /** Unique identifier for the Order associated with this payment. */
  orderId?: Maybe<Scalars['ID']['output']>;
  /** The status of the payment (e.g., SUCCESS, FAILED, PENDING). */
  status: PaymentStatus;
};

/** Input type for creating or updating a payment. */
export type PaymentInput = {
  amount: Scalars['Float']['input'];
  currency: Currency;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  method: Scalars['String']['input'];
  orderId: Scalars['Int']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  status: PaymentStatus;
};

/** Enum for payment statuses. */
export enum PaymentStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

/** Represents a product entity in the system. */
export type Product = {
  __typename?: 'Product';
  /** List of cart items associated with the product. */
  cartItems: Array<Maybe<CartItem>>;
  /** Category to which the product belongs. */
  category: Category;
  /** ID of the category to which the product belongs. */
  categoryId: Scalars['ID']['output'];
  /** Date and time when the product was created. */
  createdAt: Scalars['String']['output'];
  /** Description of the product. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the product. */
  id: Scalars['ID']['output'];
  /** List of images associated with the product. */
  images: Array<Maybe<ProductImage>>;
  /** Name of the product. */
  name: Scalars['String']['output'];
  /** List of order items associated with the product. */
  orderItems: Array<Maybe<OrderItem>>;
  /** Price of the product. */
  price: Scalars['Float']['output'];
  /** List of promotions associated with the product. */
  promotions: Array<Maybe<Promotion>>;
  /** List of reviews for the product. */
  reviews: Array<Maybe<Review>>;
  /** Shop where the product is listed. */
  shop?: Maybe<Shop>;
  /** ID of the shop where the product is listed. */
  shopId?: Maybe<Scalars['ID']['output']>;
  /** Stock quantity of the product. */
  stock: Scalars['Int']['output'];
  /** Date and time when the product was last updated. */
  updatedAt: Scalars['String']['output'];
  /** List of variants for the product. */
  variants: Array<Maybe<ProductVariant>>;
  /** Vendor associated with the product. */
  vendor?: Maybe<Vendor>;
  /** ID of the vendor associated with the product. */
  vendorId?: Maybe<Scalars['ID']['output']>;
};

/** Represents an image associated with a product. */
export type ProductImage = {
  __typename?: 'ProductImage';
  /** Unique identifier for the product image. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The Product entity associated with this image. */
  product?: Maybe<Product>;
  /** Unique identifier for the Product to which this image belongs. */
  productId?: Maybe<Scalars['ID']['output']>;
  /** URL where the image is located. */
  url: Scalars['String']['output'];
};

/** Input type for creating and updating ProductImages. */
export type ProductImageInput = {
  /** Unique identifier for the Product to which this image belongs. */
  productId: Scalars['ID']['input'];
  /** URL where the image is located. */
  url: Scalars['String']['input'];
};

/** Input type for creating and updating Products. */
export type ProductInput = {
  /** ID of the category to which the product belongs. */
  categoryId: Scalars['ID']['input'];
  /** Description of the product. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** List of image IDs associated with the product. */
  images?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Name of the product. */
  name: Scalars['String']['input'];
  /** Price of the product. */
  price: Scalars['Float']['input'];
  /** ID of the shop where the product is listed. */
  shopId: Scalars['ID']['input'];
  /** Stock quantity of the product. */
  stock: Scalars['Int']['input'];
  /** List of variant IDs for the product. */
  variants?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** ID of the vendor associated with the product. */
  vendorId?: InputMaybe<Scalars['ID']['input']>;
};

/** Represents a variant of a product, such as different sizes or colors. */
export type ProductVariant = {
  __typename?: 'ProductVariant';
  /** Unique identifier for the ProductVariant. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Name of the variant, such as 'Size' or 'Color'. */
  name: Scalars['String']['output'];
  /** The Product this variant belongs to. */
  product?: Maybe<Product>;
  /** Unique identifier for the Product this variant belongs to. */
  productId?: Maybe<Scalars['ID']['output']>;
  /** Value of the variant, such as 'Large' or 'Red'. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Input type for creating and updating ProductVariants. */
export type ProductVariantInput = {
  /** Name of the variant. */
  name: Scalars['String']['input'];
  /** Unique identifier for the Product this variant belongs to. */
  productId: Scalars['ID']['input'];
  /** Value of the variant. */
  value: Scalars['String']['input'];
};

/** Represents a promotional offer for a product. */
export type Promotion = {
  __typename?: 'Promotion';
  /** The date and time when the promotion was created. */
  createdAt: Scalars['String']['output'];
  /** Type of discount applied (e.g., FLAT_AMOUNT, PERCENTAGE). */
  discountType: DiscountType;
  /** The amount or percentage of the discount applied. */
  discountValue: Scalars['Float']['output'];
  /** The date when the promotion ends. */
  endDate: Scalars['String']['output'];
  /** Unique identifier for the promotion. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Name of the promotion (e.g., "Summer Sale", "Black Friday Discount"). */
  name: Scalars['String']['output'];
  /** The product associated with the promotion. */
  product?: Maybe<Product>;
  /** Unique identifier for the product that the promotion applies to. */
  productId?: Maybe<Scalars['ID']['output']>;
  /** The date when the promotion starts. */
  startDate: Scalars['String']['output'];
  /** The date and time when the promotion was last updated. */
  updatedAt: Scalars['String']['output'];
};

/** Input type for creating and updating Promotions. */
export type PromotionInput = {
  /** The type of discount. */
  discountType: DiscountType;
  /** The amount or percentage of the discount. */
  discountValue: Scalars['Float']['input'];
  /** The end date of the promotion. */
  endDate: Scalars['String']['input'];
  /** Name of the promotion. */
  name: Scalars['String']['input'];
  /** Unique identifier for the product that the promotion applies to. */
  productId: Scalars['ID']['input'];
  /** The start date of the promotion. */
  startDate: Scalars['String']['input'];
};

/** Queries related to Vendors. */
export type Query = {
  __typename?: 'Query';
  /** Retrieves active promotions for a specific product. */
  activePromotionsByProduct: Array<Promotion>;
  /** Retrieves activities performed within a specified date range. */
  activitiesByDateRange: Array<UserActivity>;
  /** Retrieves all activities related to a specific product. */
  activitiesByProduct: Array<UserActivity>;
  /** Retrieves all activities performed by a specific user. */
  activitiesByUser: Array<UserActivity>;
  /** Get an address by its unique identifier. */
  address?: Maybe<Address>;
  /** List all addresses. */
  addresses: Array<Address>;
  /** List addresses filtered by city. */
  addressesByCity: Array<Address>;
  /** List addresses for a specific user. */
  addressesByUser: Array<Address>;
  /** Get an audit log entry by its unique identifier. */
  auditLog?: Maybe<AuditLog>;
  /** Get a list of all audit log entries. */
  auditLogs: Array<AuditLog>;
  /** Get audit logs filtered by action type (CREATE, UPDATE, DELETE). */
  auditLogsByAction: Array<AuditLog>;
  /** Get audit logs filtered by entity type (e.g., 'User', 'Order'). */
  auditLogsByEntity: Array<AuditLog>;
  /** Get a list of audit logs filtered by a specific user. */
  auditLogsByUser: Array<AuditLog>;
  /** Retrieves a cart by its ID. */
  cart?: Maybe<Cart>;
  /** Retrieves the cart that belongs to a specific user. */
  cartByUser?: Maybe<Cart>;
  /** Get a CartItem by its unique identifier. */
  cartItem?: Maybe<CartItem>;
  /** Get all CartItems in a specific cart. */
  cartItemsByCart: Array<CartItem>;
  /**
   * Get all CartItems for a specific product.
   * Useful for checking how many times a product has been added to various carts.
   */
  cartItemsByProduct: Array<CartItem>;
  /** Retrieves a list of all categories. */
  categories: Array<Category>;
  /** Retrieves a single category by its ID. */
  category?: Maybe<Category>;
  /**
   * Checks the availability of the products in the cart.
   * Notifies the user if any products are out of stock before checkout.
   */
  checkCartStock: Array<Product>;
  /** Fetches the most recent payment by order ID. */
  fetchMostRecentPaymentByOrderId?: Maybe<Payment>;
  /** Fetches a payment by its ID. */
  fetchPaymentById?: Maybe<Payment>;
  /** Fetches payments within a specified date range. */
  fetchPaymentsByDateRange: Array<Payment>;
  /** Fetches payments by payment method. */
  fetchPaymentsByMethod: Array<Payment>;
  /** Fetches payments by order ID. */
  fetchPaymentsByOrderId: Array<Payment>;
  /** Fetches payments by status. */
  fetchPaymentsByStatus: Array<Payment>;
  /** Fetches payments grouped by method. */
  fetchPaymentsGroupedByMethod: Array<Payment>;
  /** Fetches the total amount of payments within a specified date range. */
  fetchTotalAmountByDateRange: Scalars['Float']['output'];
  getOrderById?: Maybe<Order>;
  getOrderByTrackingNumber?: Maybe<Order>;
  getOrdersByDateRange?: Maybe<Array<Maybe<Order>>>;
  getOrdersByShopId?: Maybe<Array<Maybe<Order>>>;
  getOrdersByStatus?: Maybe<Array<Maybe<Order>>>;
  getOrdersByUserId?: Maybe<Array<Maybe<Order>>>;
  /**
   * Retrieves the auto-saved cart for a user.
   * Useful when a user reconnects after being disconnected.
   */
  getSavedCart?: Maybe<Cart>;
  /** Retrieves a single marketplace by its ID. */
  marketplace?: Maybe<Marketplace>;
  /** Retrieves a list of all marketplaces. */
  marketplaces: Array<Marketplace>;
  /** Retrieves a single newsletter subscription by its ID. */
  newsletterSubscription?: Maybe<NewsletterSubscription>;
  /** Retrieves a list of all newsletter subscriptions. */
  newsletterSubscriptions: Array<NewsletterSubscription>;
  /** Retrieves newsletter subscriptions by email address. */
  newsletterSubscriptionsByEmail: Array<NewsletterSubscription>;
  /** Retrieves a single notification by its ID. */
  notification?: Maybe<Notification>;
  /** Retrieves a list of all notifications. */
  notifications: Array<Notification>;
  /** Retrieves notifications for a specific user by user ID. */
  notificationsByUser: Array<Notification>;
  /** Retrieves a single OrderItem by its ID. */
  orderItem?: Maybe<OrderItem>;
  /** Retrieves a list of all OrderItems. */
  orderItems: Array<OrderItem>;
  /** Retrieves OrderItems for a specific Order by order ID. */
  orderItemsByOrder: Array<OrderItem>;
  /** Get a paginated list of addresses. */
  paginatedAddresses: Array<Address>;
  /** Retrieves a list of users with pagination. */
  paginatedUsers: Array<User>;
  /** Retrieves vendors with pagination. */
  paginatedVendors: Array<Vendor>;
  /** Retrieves a single product by its ID. */
  product?: Maybe<Product>;
  /** Retrieves a single ProductImage by its ID. */
  productImage?: Maybe<ProductImage>;
  /** Retrieves a list of all ProductImages. */
  productImages: Array<ProductImage>;
  /** Retrieves images for a specific Product by product ID. */
  productImagesByProduct: Array<ProductImage>;
  /** Retrieves a single ProductVariant by its ID. */
  productVariant?: Maybe<ProductVariant>;
  /** Retrieves a list of all ProductVariants. */
  productVariants: Array<ProductVariant>;
  /** Retrieves variants for a specific Product by product ID. */
  productVariantsByProduct: Array<ProductVariant>;
  /** Retrieves a list of all products. */
  products: Array<Product>;
  /** Retrieves products by category ID. */
  productsByCategory: Array<Product>;
  /** Retrieves products with a price range. */
  productsByPriceRange: Array<Product>;
  /** Retrieves products in a shop by shop ID. */
  productsByShop: Array<Product>;
  /** Retrieves products by vendor ID. */
  productsByVendor: Array<Product>;
  /** Retrieves a single promotion by its ID. */
  promotion?: Maybe<Promotion>;
  /** Retrieves a list of all promotions. */
  promotions: Array<Promotion>;
  /** Retrieves promotions for a specific product by its ID. */
  promotionsByProduct: Array<Promotion>;
  /**
   * Retrieves recommended products based on the current cart.
   * Useful for cross-selling.
   */
  recommendedProducts: Array<Product>;
  /** Retrieves a single refund by its ID. */
  refund?: Maybe<Refund>;
  /** Retrieves a list of all refunds. */
  refunds: Array<Refund>;
  /** Retrieves refunds for a specific order by its ID. */
  refundsByOrder: Array<Refund>;
  /** Retrieves a single review by its ID. */
  review?: Maybe<Review>;
  /** Retrieves a list of all reviews. */
  reviews: Array<Review>;
  /** Retrieves reviews for a specific product by its ID. */
  reviewsByProduct: Array<Review>;
  /** Retrieves reviews written by a specific user by their ID. */
  reviewsByUser: Array<Review>;
  /** Searches for products by name. */
  searchProducts: Array<Product>;
  /** Retrieves a single shop by its ID. */
  shop?: Maybe<Shop>;
  /** Retrieves a list of all shops. */
  shops: Array<Shop>;
  /** Retrieves shops listed on a specific marketplace by its ID. */
  shopsByMarketplace: Array<Shop>;
  /** Retrieves shops by a specific vendor's ID. */
  shopsByVendor: Array<Shop>;
  /** Retrieves a single subscription by its ID. */
  subscription?: Maybe<Subscription>;
  /** Retrieves a list of all subscriptions. */
  subscriptions: Array<Subscription>;
  /** Retrieves subscriptions based on a specific vendor's ID. */
  subscriptionsByVendor: Array<Subscription>;
  /** Retrieves a single subsite by its ID. */
  subsite?: Maybe<DiscountType>;
  /** Retrieves a list of all subsites. */
  subsites: Array<DiscountType>;
  /** Retrieves all subsites associated with a specific user. */
  subsitesByUser: Array<DiscountType>;
  /** Retrieves a single ticket by its ID. */
  ticket?: Maybe<Ticket>;
  /** Retrieves a list of all tickets. */
  tickets: Array<Ticket>;
  /** Retrieves all tickets with a specific status. */
  ticketsByStatus: Array<Ticket>;
  /** Retrieves all tickets created by a specific user. */
  ticketsByUser: Array<Ticket>;
  /** Get the total number of addresses. */
  totalAddresses: Scalars['Int']['output'];
  /** Retrieves a single user by their ID. */
  user?: Maybe<User>;
  /** Retrieves a list of all user activities. */
  userActivities: Array<UserActivity>;
  /** Retrieves a single user activity by its ID. */
  userActivity?: Maybe<UserActivity>;
  /** Retrieves a single user profile by its ID. */
  userProfile?: Maybe<UserProfile>;
  /** Retrieves the profile of a specific user by their user ID. */
  userProfileByUser?: Maybe<UserProfile>;
  /** Retrieves a list of all user profiles. */
  userProfiles: Array<UserProfile>;
  /** Retrieves a list of all users. */
  users: Array<User>;
  /** Retrieves users with a specific profile field. */
  usersByProfileField: Array<User>;
  /** Retrieves a list of users by their role. */
  usersByRole: Array<User>;
  /** Retrieves a single vendor by their ID. */
  vendor?: Maybe<Vendor>;
  /** Retrieves a list of all vendors. */
  vendors: Array<Vendor>;
  /** Retrieves a list of vendors by their store name. */
  vendorsByStoreName: Array<Vendor>;
};


/** Queries related to Vendors. */
export type QueryActivePromotionsByProductArgs = {
  productId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryActivitiesByDateRangeArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryActivitiesByProductArgs = {
  productId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryActivitiesByUserArgs = {
  userId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryAddressArgs = {
  id: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryAddressesByCityArgs = {
  city: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryAddressesByUserArgs = {
  userId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryAuditLogArgs = {
  id: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryAuditLogsByActionArgs = {
  action: AuditLogAction;
};


/** Queries related to Vendors. */
export type QueryAuditLogsByEntityArgs = {
  entity: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryAuditLogsByUserArgs = {
  userId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryCartArgs = {
  id: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryCartByUserArgs = {
  userId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryCartItemArgs = {
  id: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryCartItemsByCartArgs = {
  cartId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryCartItemsByProductArgs = {
  productId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryCheckCartStockArgs = {
  cartId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryFetchMostRecentPaymentByOrderIdArgs = {
  orderId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryFetchPaymentByIdArgs = {
  id: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryFetchPaymentsByDateRangeArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryFetchPaymentsByMethodArgs = {
  method: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryFetchPaymentsByOrderIdArgs = {
  orderId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryFetchPaymentsByStatusArgs = {
  status: PaymentStatus;
};


/** Queries related to Vendors. */
export type QueryFetchTotalAmountByDateRangeArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryGetOrderByIdArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryGetOrderByTrackingNumberArgs = {
  trackingNumber: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryGetOrdersByDateRangeArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryGetOrdersByShopIdArgs = {
  shopId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryGetOrdersByStatusArgs = {
  status: OrderStatus;
};


/** Queries related to Vendors. */
export type QueryGetOrdersByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryGetSavedCartArgs = {
  userId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryMarketplaceArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryNewsletterSubscriptionArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryNewsletterSubscriptionsByEmailArgs = {
  email: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryNotificationsByUserArgs = {
  userId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryOrderItemArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryOrderItemsByOrderArgs = {
  orderId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryPaginatedAddressesArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryPaginatedUsersArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryPaginatedVendorsArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryProductImageArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryProductImagesByProductArgs = {
  productId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryProductVariantArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryProductVariantsByProductArgs = {
  productId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryProductsByCategoryArgs = {
  categoryId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryProductsByPriceRangeArgs = {
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
};


/** Queries related to Vendors. */
export type QueryProductsByShopArgs = {
  shopId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryProductsByVendorArgs = {
  vendorId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryPromotionArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryPromotionsByProductArgs = {
  productId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryRecommendedProductsArgs = {
  cartId: Scalars['Int']['input'];
};


/** Queries related to Vendors. */
export type QueryRefundArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryRefundsByOrderArgs = {
  orderId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryReviewArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryReviewsByProductArgs = {
  productId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryReviewsByUserArgs = {
  userId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QuerySearchProductsArgs = {
  name: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryShopArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryShopsByMarketplaceArgs = {
  marketplaceId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryShopsByVendorArgs = {
  vendorId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QuerySubscriptionArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QuerySubscriptionsByVendorArgs = {
  vendorId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QuerySubsiteArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QuerySubsitesByUserArgs = {
  userId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryTicketArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryTicketsByStatusArgs = {
  status: TicketStatus;
};


/** Queries related to Vendors. */
export type QueryTicketsByUserArgs = {
  userId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryUserActivityArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryUserProfileArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryUserProfileByUserArgs = {
  userId: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryUsersByProfileFieldArgs = {
  field: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


/** Queries related to Vendors. */
export type QueryUsersByRoleArgs = {
  role: UserRole;
};


/** Queries related to Vendors. */
export type QueryVendorArgs = {
  id: Scalars['ID']['input'];
};


/** Queries related to Vendors. */
export type QueryVendorsByStoreNameArgs = {
  storeName: Scalars['String']['input'];
};

/** Represents a refund associated with an order. */
export type Refund = {
  __typename?: 'Refund';
  /**
   * Amount of money to be refunded.
   * Represents the total amount to be returned to the customer.
   */
  amount: Scalars['Float']['output'];
  /**
   * The date and time when the refund was created.
   * Automatically set to the current date and time when the refund is created.
   */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the refund. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The order associated with this refund. */
  order?: Maybe<Order>;
  /** Unique identifier for the associated order. */
  orderId?: Maybe<Scalars['ID']['output']>;
  /**
   * Reason for the refund.
   * Provides the justification or cause for the refund request.
   */
  reason?: Maybe<Scalars['String']['output']>;
  /**
   * Current status of the refund.
   * Indicates whether the refund is pending, completed, or rejected.
   */
  status: RefundStatus;
};

/** Input type for creating and updating Refunds. */
export type RefundInput = {
  /** Amount of money to be refunded. */
  amount: Scalars['Float']['input'];
  /** Unique identifier for the associated order. */
  orderId: Scalars['ID']['input'];
  /** Reason for the refund. */
  reason: Scalars['String']['input'];
  /** Current status of the refund. */
  status: RefundStatus;
};

/** Enum representing different refund statuses. */
export enum RefundStatus {
  Completed = 'COMPLETED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** Represents a review for a product. */
export type Review = {
  __typename?: 'Review';
  /** Optional comment provided by the user. */
  comment?: Maybe<Scalars['String']['output']>;
  /**
   * The date and time when the review was created.
   * Automatically set to the current date and time when a Review is created.
   */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the Review. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The Product that this review is associated with. */
  product?: Maybe<Product>;
  /** Unique identifier for the Product associated with this review. */
  productId?: Maybe<Scalars['ID']['output']>;
  /** The rating given in the review, usually on a scale from 1 to 5. */
  rating: Scalars['Int']['output'];
  /** The User who wrote the review. */
  user?: Maybe<User>;
  /** Unique identifier for the User who wrote the review. */
  userId?: Maybe<Scalars['ID']['output']>;
};

/** Input type for creating and updating Reviews. */
export type ReviewInput = {
  /** Optional comment provided by the user. */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier for the Product. */
  productId: Scalars['ID']['input'];
  /** The rating given in the review. */
  rating: Scalars['Int']['input'];
  /** Unique identifier for the User. */
  userId: Scalars['ID']['input'];
};

/** Represents a shop entity in the system. */
export type Shop = {
  __typename?: 'Shop';
  /** List of categories associated with the shop. */
  categories: Array<Maybe<Category>>;
  /** The date and time when the shop was created. */
  createdAt: Scalars['String']['output'];
  /** Optional description of the shop. */
  description?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the Shop. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Optional marketplace where the shop is listed. */
  marketplace?: Maybe<Marketplace>;
  /** Optional ID of the marketplace where the shop is listed. */
  marketplaceId?: Maybe<Scalars['ID']['output']>;
  /** The name of the shop. */
  name: Scalars['String']['output'];
  /** List of orders associated with the shop. */
  orders: Array<Maybe<Order>>;
  /** List of products available in the shop. */
  products: Array<Maybe<Product>>;
  /** The date and time when the shop was last updated. */
  updatedAt: Scalars['String']['output'];
  /** The URL of the shop's website. */
  url: Scalars['String']['output'];
  /** The vendor associated with the shop. */
  vendor?: Maybe<Vendor>;
  /** Unique identifier for the vendor associated with the shop. */
  vendorId?: Maybe<Scalars['ID']['output']>;
};

/** Input type for creating and updating Shops. */
export type ShopInput = {
  /** Optional description of the shop. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Optional ID of the marketplace where the shop is listed. */
  marketplaceId?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the shop. */
  name: Scalars['String']['input'];
  /** The URL of the shop's website. */
  url: Scalars['String']['input'];
  /** Unique identifier for the vendor associated with the shop. */
  vendorId: Scalars['ID']['input'];
};

/** Represents a subscription plan available to vendors. */
export type Subscription = {
  __typename?: 'Subscription';
  /** The date and time when the subscription was created. */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Optional description of the subscription plan. */
  description?: Maybe<Scalars['String']['output']>;
  /** Duration of the subscription in days. */
  duration: Scalars['Int']['output'];
  /** Unique identifier for the subscription. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Name of the subscription plan (e.g., "Basic Plan", "Premium Plan"). */
  name: Scalars['String']['output'];
  /** Price of the subscription plan. */
  price: Scalars['Float']['output'];
  /** The date and time when the subscription was last updated. */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** List of vendors associated with this subscription. */
  vendors: Array<Maybe<Vendor>>;
};

/** Input type for creating and updating Subscriptions. */
export type SubscriptionInput = {
  /** Optional description of the subscription plan. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Duration of the subscription in days. */
  duration: Scalars['Int']['input'];
  /** Name of the subscription plan. */
  name: Scalars['String']['input'];
  /** Price of the subscription plan. */
  price: Scalars['Float']['input'];
};

/** Represents a subsite within the main site. */
export type Subsite = {
  __typename?: 'Subsite';
  /** JSON configuration for the subsite. */
  config?: Maybe<Scalars['JSON']['output']>;
  /** The date and time when the subsite was created. */
  createdAt: Scalars['String']['output'];
  /** Unique identifier for the subsite. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Title of the subsite. */
  title: Scalars['String']['output'];
  /** The user associated with this subsite. */
  user?: Maybe<User>;
  /** Unique identifier for the user who owns or manages the subsite. */
  userId?: Maybe<Scalars['ID']['output']>;
};

/** Represents a support ticket created by a user. */
export type Ticket = {
  __typename?: 'Ticket';
  /** The date and time when the ticket was created. */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Detailed description of the issue or request. */
  description: Scalars['String']['output'];
  /** Unique identifier for the ticket. */
  id?: Maybe<Scalars['ID']['output']>;
  /** The current status of the ticket (e.g., OPEN, IN_PROGRESS, CLOSED). */
  status: TicketStatus;
  /** The subject of the ticket. */
  subject: Scalars['String']['output'];
  /** The date and time when the ticket was last updated. */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** The user associated with the ticket. */
  user?: Maybe<User>;
  /** Unique identifier for the user who created the ticket. */
  userId?: Maybe<Scalars['ID']['output']>;
};

/** Enum for ticket statuses. */
export enum TicketStatus {
  Closed = 'CLOSED',
  High = 'HIGH',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

/** Input type for updating the quantity of a CartItem. */
export type UpdateCartItemQuantityInput = {
  id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

/** Input type for updating an order. */
export type UpdateOrderInput = {
  items?: InputMaybe<Array<InputMaybe<OrderItemInput>>>;
  status?: InputMaybe<OrderStatus>;
  totalAmount?: InputMaybe<Scalars['Float']['input']>;
};

/** Represents a user in the system. */
export type User = {
  __typename?: 'User';
  /** List of addresses associated with the user. */
  addresses: Array<Maybe<Address>>;
  /** Optional list of audit logs for the user. */
  auditLogs?: Maybe<Array<Maybe<AuditLog>>>;
  /** List of carts associated with the user. */
  carts: Array<Maybe<Cart>>;
  /** Date when the user was created. */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** Email address of the user. */
  email: Scalars['String']['output'];
  /** Unique identifier for the user. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Optional name of the user. */
  name?: Maybe<Scalars['String']['output']>;
  /** Optional list of notifications for the user. */
  notifications?: Maybe<Array<Maybe<Notification>>>;
  /** List of orders placed by the user. */
  orders: Array<Maybe<Order>>;
  /** Password for the user account (typically not exposed). */
  password: Scalars['String']['output'];
  /** Profile associated with the user. */
  profile?: Maybe<UserProfile>;
  /** Optional list of reviews written by the user. */
  reviews?: Maybe<Array<Maybe<Review>>>;
  /** Role of the user (e.g., CLIENT, ADMIN). */
  role: UserRole;
  /** Optional list of sub-sites associated with the user. */
  subsites?: Maybe<Array<Maybe<Subsite>>>;
  /** Optional list of support tickets raised by the user. */
  tickets?: Maybe<Array<Maybe<Ticket>>>;
  /** Date when the user was last updated. */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Optional list of user activities. */
  userActivities?: Maybe<Array<Maybe<UserActivity>>>;
  /** Vendor information if the user is a vendor. */
  vendor?: Maybe<Vendor>;
};

/** Represents a record of user activity within the system. */
export type UserActivity = {
  __typename?: 'UserActivity';
  /** Type of action performed by the user. */
  action: UserActivityAction;
  /** Unique identifier for the user activity record. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Optional product ID related to the activity. */
  productId?: Maybe<Scalars['ID']['output']>;
  /** The date and time when the activity was performed. */
  timestamp: Scalars['String']['output'];
  /** The user who performed the activity. */
  user?: Maybe<User>;
  /** Unique identifier for the user who performed the activity. */
  userId?: Maybe<Scalars['ID']['output']>;
};

/** Enum for user activity actions. */
export enum UserActivityAction {
  AddToCart = 'ADD_TO_CART',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Other = 'OTHER',
  Purchase = 'PURCHASE',
  RemoveFromCart = 'REMOVE_FROM_CART',
  Search = 'SEARCH',
  ViewProduct = 'VIEW_PRODUCT'
}

/** Represents a user's profile, containing personal details. */
export type UserProfile = {
  __typename?: 'UserProfile';
  /** Date of birth of the user (optional). */
  birthday?: Maybe<Scalars['String']['output']>;
  /** Gender of the user (optional). */
  gender?: Maybe<Scalars['String']['output']>;
  /** Unique identifier for the user profile. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Phone number of the user (optional). */
  phone?: Maybe<Scalars['String']['output']>;
  /** User object representing the relationship between the profile and the user. */
  user?: Maybe<User>;
  /** Identifier of the user to whom this profile belongs. */
  userId?: Maybe<Scalars['ID']['output']>;
};

/** Enum for user roles. */
export enum UserRole {
  Admin = 'ADMIN',
  Client = 'CLIENT',
  Vendor = 'VENDOR'
}

/** Represents a vendor entity in the system. */
export type Vendor = {
  __typename?: 'Vendor';
  /** Unique identifier for the vendor. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Optional array of products associated with the vendor. */
  products?: Maybe<Array<Maybe<Product>>>;
  /** Optional shop associated with the vendor. */
  shop?: Maybe<Shop>;
  /** Name of the vendor's store. */
  storeName: Scalars['String']['output'];
  /** Optional subscription associated with the vendor. */
  subscription?: Maybe<Subscription>;
  /** Optional ID of the subscription. */
  subscriptionId?: Maybe<Scalars['ID']['output']>;
  /** User associated with the vendor. */
  user?: Maybe<User>;
  /** ID of the user associated with the vendor. */
  userId?: Maybe<Scalars['ID']['output']>;
};

/** Input type for creating a new audit log entry. */
export type AuditLogInput = {
  action: AuditLogAction;
  changes?: InputMaybe<Scalars['JSON']['input']>;
  entity: Scalars['String']['input'];
  entityId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

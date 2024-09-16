import { Carrier } from './carrier.entity';
import { Order } from './order.entity';

/**
 * Represents a Shipment associated with an order.
 */
export class Shipment {
  /**
   * Unique identifier for the shipment.
   */
  id: number;

  /**
   * Foreign key referring to the order associated with this shipment.
   */
  orderId?: number;

  /**
   * The Order object associated with this shipment.
   */
  order?: Order;

  /**
   * Foreign key referring to the carrier handling this shipment.
   */
  carrierId: number;

  /**
   * The Carrier object handling this shipment.
   */
  carrier: Carrier;

  /**
   * Tracking number for this shipment.
   */
  trackingNumber: string;

  /**
   * Current status of the shipment.
   */
  status: string;

  /**
   * Date when the shipment was dispatched.
   */
  shippedAt?: Date;

  /**
   * Date when the shipment was delivered.
   */
  deliveredAt?: Date;

  /**
   * Date when the status was last updated.
   */
  statusUpdatedAt?: Date;

  /**
   * Timestamp when the shipment was created.
   */
  createdAt: Date;

  /**
   * Timestamp when the shipment was last updated.
   */
  updatedAt: Date;

  /**
   * Constructs a Shipment instance.
   *
   * @param id - Unique identifier for the shipment.
   * @param carrierId - Foreign key referring to the Carrier.
   * @param trackingNumber - Tracking number for the shipment.
   * @param status - Current status of the shipment.
   * @param createdAt - Timestamp when the shipment was created.
   * @param updatedAt - Timestamp when the shipment was last updated.
   * @param orderId - Foreign key referring to the Order.
   * @param shippedAt - Date when the shipment was dispatched.
   * @param deliveredAt - Date when the shipment was delivered.
   * @param statusUpdatedAt - Date when the status was last updated.
   * @param order - The Order object associated with this shipment.
   * @param carrier - The Carrier object handling this shipment.
   */
  constructor(
    id: number,
    carrierId: number,
    trackingNumber: string,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    orderId?: number,
    shippedAt?: Date,
    deliveredAt?: Date,
    statusUpdatedAt?: Date,
    order?: Order,
    carrier?: Carrier,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.carrierId = carrierId;
    this.trackingNumber = trackingNumber;
    this.status = status;
    this.shippedAt = shippedAt;
    this.deliveredAt = deliveredAt;
    this.statusUpdatedAt = statusUpdatedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.order = order;
    this.carrier = carrier;
  }
}

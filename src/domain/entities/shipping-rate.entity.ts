import { Carrier } from './carrier.entity';
import { Zone } from './zone.entity';

/**
 * Represents a Shipping Rate for a specific carrier and zone.
 */
export class ShippingRate {
  /**
   * Unique identifier for the shipping rate.
   */
  id: number;

  /**
   * Foreign key referring to the carrier associated with this shipping rate.
   */
  carrierId: number;

  /**
   * The Carrier object associated with this shipping rate.
   */
  carrier: Carrier;

  /**
   * Foreign key referring to the zone where this rate applies.
   */
  zoneId: number;

  /**
   * The Zone object associated with this shipping rate.
   */
  zone: Zone;

  /**
   * Minimum weight for this shipping rate, in kilograms.
   */
  weightMin: number;

  /**
   * Maximum weight for this shipping rate, in kilograms.
   */
  weightMax: number;

  /**
   * Cost for shipping within the weight range.
   */
  cost: number;

  /**
   * Currency used for the shipping rate (e.g., EUR, XOF).
   */
  currency: string;

  /**
   * Timestamp when the shipping rate was created.
   */
  createdAt: Date;

  /**
   * Timestamp when the shipping rate was last updated.
   */
  updatedAt: Date;

  /**
   * Constructs a ShippingRate instance.
   *
   * @param id - Unique identifier for the shipping rate.
   * @param carrierId - Foreign key referring to the Carrier.
   * @param zoneId - Foreign key referring to the Zone.
   * @param weightMin - Minimum weight for the shipping rate.
   * @param weightMax - Maximum weight for the shipping rate.
   * @param cost - Cost for shipping within the weight range.
   * @param currency - Currency used for the shipping rate.
   * @param createdAt - Timestamp when the shipping rate was created.
   * @param updatedAt - Timestamp when the shipping rate was last updated.
   * @param carrier - The Carrier object associated with this shipping rate.
   * @param zone - The Zone object associated with this shipping rate.
   */
  constructor(
    id: number,
    carrierId: number,
    zoneId: number,
    weightMin: number,
    weightMax: number,
    cost: number,
    currency: string,
    createdAt: Date,
    updatedAt: Date,
    carrier?: Carrier,
    zone?: Zone,
  ) {
    this.id = id;
    this.carrierId = carrierId;
    this.zoneId = zoneId;
    this.weightMin = weightMin;
    this.weightMax = weightMax;
    this.cost = cost;
    this.currency = currency;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.carrier = carrier;
    this.zone = zone;
  }
}

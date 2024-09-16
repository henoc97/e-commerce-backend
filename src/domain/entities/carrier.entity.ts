import { Shipment } from './shippement.entity';
import { ShippingRate } from './shipping-rate.entity';
import { Zone } from './zone.entity';

/**
 * Represents a Carrier responsible for shipping logistics.
 */
export class Carrier {
  /**
   * Unique identifier for the carrier.
   */
  id: number;

  /**
   * The name of the carrier.
   */
  name: string;

  /**
   * The country where the carrier operates.
   */
  country: string;

  /**
   * Specific region or city where the carrier operates (if applicable).
   */
  region?: string;

  /**
   * List of shipping rates associated with this carrier.
   */
  shippingRates: ShippingRate[];

  /**
   * List of shipments handled by this carrier.
   */
  shipments: Shipment[];

  /**
   * URL of the carrier's external API, if available.
   */
  externalAPI?: string;

  /**
   * List of zones that this carrier supports.
   */
  supportedZones: Zone[];

  /**
   * Additional capabilities or notes about the carrier (e.g., 'Refrigerated', 'Express').
   */
  capabilities?: string;

  /**
   * Constructs a Carrier instance.
   *
   * @param id - Unique identifier for the carrier.
   * @param name - The name of the carrier.
   * @param country - The country where the carrier operates.
   * @param region - Specific region or city where the carrier operates.
   * @param externalAPI - URL of the carrier's external API.
   * @param capabilities - Additional capabilities or notes about the carrier.
   * @param shippingRates - List of shipping rates associated with this carrier.
   * @param shipments - List of shipments handled by this carrier.
   * @param supportedZones - List of zones that this carrier supports.
   */
  constructor(
    id: number,
    name: string,
    country: string,
    region?: string,
    externalAPI?: string,
    capabilities?: string,
    shippingRates: ShippingRate[] = [],
    shipments: Shipment[] = [],
    supportedZones: Zone[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.region = region;
    this.externalAPI = externalAPI;
    this.capabilities = capabilities;
    this.shippingRates = shippingRates;
    this.shipments = shipments;
    this.supportedZones = supportedZones;
  }
}

import { Carrier } from './carrier.entity';
import { ShippingRate } from './shipping-rate.entity';

/**
 * Represents a Zone where shipping rates apply.
 */
export class Zone {
  /**
   * Unique identifier for the zone.
   */
  id: number;

  /**
   * The country of the zone.
   */
  country: string;

  /**
   * Specific region or city within the country (optional).
   */
  region?: string;

  /**
   * List of carriers serving this zone.
   */
  carriers: Carrier[];

  /**
   * List of shipping rates applicable in this zone.
   */
  shippingRates: ShippingRate[];

  /**
   * Constructs a Zone instance.
   *
   * @param id - Unique identifier for the zone.
   * @param country - The country of the zone.
   * @param region - Specific region or city within the country.
   * @param carriers - List of carriers serving this zone.
   * @param shippingRates - List of shipping rates applicable in this zone.
   */
  constructor(
    id: number,
    country: string,
    region?: string,
    carriers: Carrier[] = [],
    shippingRates: ShippingRate[] = [],
  ) {
    this.id = id;
    this.country = country;
    this.region = region;
    this.carriers = carriers;
    this.shippingRates = shippingRates;
  }
}

/**
 * Store policy values kept in each region's `metadata`. The storefront renders
 * the shipping/returns pages and structured data from these keys, and merchants
 * can change them in Settings → Regions → Metadata.
 */
export type RegionStorePolicies = {
  return_window_days: number;
  free_returns: boolean;
  shipping_rate: number;
  handling_days_min: number;
  handling_days_max: number;
  transit_days_min: number;
  transit_days_max: number;
};

export const DEFAULT_REGION_STORE_POLICIES: RegionStorePolicies = {
  return_window_days: 30,
  free_returns: false,
  shipping_rate: 10,
  handling_days_min: 0,
  handling_days_max: 1,
  transit_days_min: 2,
  transit_days_max: 3,
};

/**
 * IDBERRY Beauty store policies (rendered on the storefront shipping/returns pages).
 * 7-day replacement warranty per the client's current policy.
 * PLACEHOLDER shipping_rate / transit days — confirm with the client.
 */
export const IDBERRY_REGION_STORE_POLICIES: RegionStorePolicies = {
  return_window_days: 7,
  free_returns: false,
  shipping_rate: 3500,
  handling_days_min: 1,
  handling_days_max: 2,
  transit_days_min: 1,
  transit_days_max: 5,
};

export interface Customer {
  tax_registration_number?: string;
  business_name?: string;
  contact_name?: string;
  email?: string;
  website?: string;
  phone_number?: string;
  mobile_number?: string;
  observations?: string;
  internal_observations?: string;
  not_final_customer?: boolean;
  cashed_vat?: boolean;
  tax_country_region?: string;
  country_iso_alpha_2?: string;
  saft_import_id?: number;
  is_tax_exempt?: boolean;
  data?: any;
}

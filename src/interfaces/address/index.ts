export interface IAddress {
  city: string;
  country: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  neighborhood?: string;
  number?: string;
  postalCode?: string;
  state: string;
  street: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ISearchResult {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
}

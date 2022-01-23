export interface Place {
	description: string;
	matched_substrings: any;
	place_id: string;
	reference: string;
	structured_formatting: any;
	terms: any;
	types: any;
}

export interface GeoLocation {
	address_components: any;
	formatted_address: any;
	geometry: any;
	place_id: string;
	types: any;
}

export interface AddressInfo {
	address: string;
	postcode: string;
	lng: number;
	lat: number;
}

// geo_url: (query, apiKey) =>
// 		`https://maps.googleapis.com/maps/api/geocode/json?${query}&key=${apiKey}`,
// 	place_search: (text, key, token) =>
// 		`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${key}&sessiontoken=${token}&components=country:au`,

import { GOOGLE_MAP_KEY } from "@env";

import { Config } from "../Texter";
import { GeoLocation, Place } from "./AutoPlaces/interface";

type GoogleAPIStatus = "OK" | "ZERO_RESULTS" | "INVALID_REQUEST" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "UNKNOWN_ERROR";

type PlacesAPIResponse = {
	predictions: Place[];
	status: GoogleAPIStatus;
};

type GeoCodeAPIResponse = {
	results: GeoLocation[];
	status: GoogleAPIStatus;
};

export const getPlaces = async (text, token): Promise<PlacesAPIResponse> => {
	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAP_KEY}&sessiontoken=${token}&components=country:ind`,
		);
		return response.json();
	} catch (err) {
		throw new Error("Error while fetching places.");
	}
};

export const geoCode = async (query): Promise<GeoCodeAPIResponse> => {
	try {
		const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${query}&key=${GOOGLE_MAP_KEY}`);
		return response.json();
	} catch (err) {
		throw new Error("Error while geocoding");
	}
};

export const IsJsonString = (str) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const getNameConfig = (fullName: string): Record<string, Config> => {
	if (fullName) {
		const words = fullName.split(" ");
		const lastName = words.length > 1 ? words.pop() : "";

		return {
			[lastName as string]: {
				variant: "light",
			},
		};
	}

	return {};
};

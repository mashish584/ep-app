import { SignInForm, UpdateProfileForm } from "./form.interface";
import { EventCategories } from "./utils/preconfig";

export type Dimensions = {
	width: number | string;
	height: number | string;
};

export type AuthInlineError = Record<keyof SignInForm, string>;
export type ProfileInlineError = Record<keyof UpdateProfileForm, string>;

export type EventCategory = typeof EventCategories[number];

export type Pagination = {
	pagination: {
		skip?: number;
		take?: number;
	};
};

export type Filter<T> = {
	query: T;
} & Pagination;

export type DateFormats = "dddd" | "dddd DD MMM" | "HH:mm A";

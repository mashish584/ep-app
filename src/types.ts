import { SignInForm } from "./form.interface";
import { EventCategories } from "./utils/preconfig";

export type Dimensions = {
	width: number | string;
	height: number | string;
};

export type AuthInlineError = Record<keyof SignInForm, string>;

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

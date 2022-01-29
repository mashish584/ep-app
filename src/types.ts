import { SignInForm, UpdateProfileForm } from "./form.interface";
import { RootStackScreens } from "./navigation/types";
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

export type SettingsItem = {
	icon: any;
	title: string;
	description: string;
	navigation?: keyof RootStackScreens;
	isLogout?: boolean;
};

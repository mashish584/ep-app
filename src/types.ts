import { AddEventForm, SignInForm, SignUpForm, UpdateProfileForm } from "./form.interface";
import { RootStackScreens } from "./navigation/types";
import { EventCategories } from "./utils/preconfig";

export type Dimensions = {
	width: number | string;
	height: number | string;
};

export type AuthInlineError = Record<keyof SignInForm, string>;
export type SignupInlineError = Record<keyof SignUpForm, string>;
export type ProfileInlineError = Record<keyof UpdateProfileForm, string>;
export type AddEventInlineError = Record<keyof AddEventForm, string>;

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

export type DateFormats = "dddd" | "dddd DD MMM" | "HH:mm A" | "DD MMM, YYYY" | "YYYY-MM-DD" | "HH:mm" | "YYYY-MM-DD HH:mm";

export type SettingsItem = {
	icon: any;
	title: string;
	description: string;
	navigation?: keyof RootStackScreens;
	isLogout?: boolean;
};

export type FileType = {
	data: string;
	fileName: string;
	fileSize: number;
	height: number;
	name: string;
	path: string;
	type: string;
	uri: string;
	width: number;
	link?: string;
	id?: string;
};

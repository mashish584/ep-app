import { FileType } from "./types";

export interface SignInForm {
	email: string;
	password: string;
}

export interface SignUpForm extends SignInForm {
	username: string;
}

export interface UpdateProfileForm {
	username: string;
	fullname: string;
	email: string;
	password?: string;
	bio?: string;
	location?: string;
}

export interface AddEventForm {
	title: string;
	description: string;
	location: string;
	categories: string[];
	price: number;
	eventDate: string;
	eventTime: string;
	uploadFiles: FileType[];
}

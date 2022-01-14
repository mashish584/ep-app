import { SignInForm } from "./form.interface";

export type Dimensions = {
	width: number | string;
	height: number | string;
};

export type AuthInlineError = Record<keyof SignInForm, string>;

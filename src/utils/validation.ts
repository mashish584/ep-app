import * as yup from "yup";

import { SignInForm, SignUpForm, UpdateProfileForm } from "../form.interface";

export const validateAuthForm = (values: SignInForm) => {
	const schema: yup.SchemaOf<SignInForm> = yup.object().shape({
		email: yup.string().trim().required("Email address is required.").email("Email address is not valid.").label("email"),
		password: yup.string().trim().required("Password is required.").label("password"),
	});

	return schema.validate(values, { abortEarly: false });
};

export const validateSignupForm = (values: SignInForm) => {
	const schema: yup.SchemaOf<SignUpForm> = yup.object().shape({
		email: yup.string().trim().required("Email address is required.").email("Email address is not valid.").label("email"),
		username: yup.string().trim().required("Username is required."),
		password: yup.string().trim().required("Password is required.").label("password"),
	});

	return schema.validate(values, { abortEarly: false });
};

export const validateProfileForm = (values: UpdateProfileForm, validatePassword = false) => {
	const extraValidations = {};

	if (validatePassword) {
		extraValidations["password"] = yup.string().trim().required("Password is required.");
	}

	const schema: yup.SchemaOf<Omit<UpdateProfileForm, "bio" | "password">> = yup.object().shape({
		email: yup.string().trim().required("Email address is required.").email("Email address is not valid.").label("email"),
		fullname: yup.string().trim().required("Full Name is required.").max(100, "Fullname should be less or equal to 100 chars."),
		username: yup.string().trim().required("Username is required."),
		location: yup.string().trim().required("Address is required."),
		...extraValidations,
	});

	return schema.validate(values, { abortEarly: false });
};

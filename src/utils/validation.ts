import * as yup from "yup";

import { SignInForm } from "../form.interface";

export const validateAuthForm = (values: SignInForm) => {
	const schema: yup.SchemaOf<SignInForm> = yup.object().shape({
		email: yup.string().required("Email address is required.").email("Email address is not valid.").label("email"),
		password: yup.string().required("Password is required.").label("password"),
	});

	return schema.validate(values, { abortEarly: false });
};

import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";

import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import TextInput from "../components/Form/TextInput";

import { SIGNUP_MUTATION } from "../config/mutations";
import { displayToast } from "../context/UIContext";
import { SignUpForm } from "../form.interface";
import { validateSignupForm } from "../utils/validation";
import { Box, Text } from "../utils/theme";

import { UserSignupResponse, UserSignupVariables } from "../config/request.types";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import { SignupInlineError } from "../types";

const initalValues = {
	username: "",
	email: "",
	password: "",
};

const SignUp: React.FC<StackNavigationProps<RootStackScreens, "AuthScreen">> = ({ navigation }) => {
	const intialFormValues: SignUpForm = useRef({ ...initalValues }).current;
	const [errors, setErrors] = useState<SignupInlineError | null>(null);

	const [onSignUp, { loading }] = useMutation<UserSignupResponse, UserSignupVariables>(SIGNUP_MUTATION, {
		onCompleted: (data) => {
			if (displayToast) {
				displayToast("success", data.createUser.message);
				navigation.goBack();
			}
		},
		onError: (error) => {},
	});

	const onSubmit = async (values: SignUpForm) => {
		try {
			setErrors(null);
			await validateSignupForm(values);
			onSignUp({ variables: { ...values } });
		} catch (errors: any) {
			if (errors?.inner) {
				const err = {} as SignupInlineError;
				errors.inner.forEach(({ path, message }) => {
					err[path] = message;
				});

				if (Object.keys(err).length) {
					setErrors(err);
				}
			}
		}
	};

	return (
		<AuthLayout greeting="WELCOME" title="Fill out your details">
			<Formik initialValues={intialFormValues} onSubmit={onSubmit}>
				{({ handleChange, handleSubmit }) => {
					return (
						<>
							<Box marginVertical="l">
								<TextInput type="input" label="Username" onChangeText={handleChange("username")} errorMessage={errors?.username} />
								<TextInput type="input" label="Email" onChangeText={handleChange("email")} errorMessage={errors?.email} />
								<TextInput type="password" label="Password" onChangeText={handleChange("password")} errorMessage={errors?.password} />
								<TouchableOpacity>
									<Text variant="light" marginTop="s" style={{ alignSelf: "flex-end" }}>
										Forgot password?
									</Text>
								</TouchableOpacity>
							</Box>
							<Button
								variant="primary"
								label="Sign Up"
								disabled={loading}
								loading={loading}
								containerStyle={{ width: "100%", minHeight: 50 }}
								onPress={handleSubmit}
							/>
						</>
					);
				}}
			</Formik>
		</AuthLayout>
	);
};

export default SignUp;

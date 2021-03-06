import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";

import Button from "../components/Button";
import TextInput from "../components/Form/TextInput";

import { validateAuthForm } from "../utils/validation";
import { Box, Text } from "../utils/theme";

import { AuthInlineError } from "../types";
import { SignInForm } from "../form.interface";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";

import { SIGNIN_MUTATION } from "../config/mutations";
import { UserLoginResponse, UserLoginVariables } from "../config/request.types";
import { useAuth } from "../utils/store";
import AuthLayout from "../components/AuthLayout";
import Texter from "../components/Texter";

const initalValues = {
	email: "",
	password: "",
};

const Auth: React.FC<StackNavigationProps<RootStackScreens, "AuthScreen">> = ({ navigation }) => {
	const intialFormValues: SignInForm = useRef({ ...initalValues }).current;
	const [errors, setErrors] = useState<AuthInlineError | null>(null);
	const { setToken, setUser } = useAuth((store) => store);

	const [onSignIn, { loading }] = useMutation<UserLoginResponse, UserLoginVariables>(SIGNIN_MUTATION, {
		onCompleted: (data) => {
			const token = data?.userLogin?.token;
			const userInfo = data?.userLogin?.user;
			if (token) {
				setToken(token);
				setUser(userInfo);
				navigation.navigate("BottomStack");
			}
		},
		onError: (error) => {
			console.log({ error });
		},
	});

	const onSubmit = async (values: SignInForm) => {
		try {
			await validateAuthForm(values);
			onSignIn({ variables: { id: values.email, password: values.password } });
		} catch (errors: any) {
			if (errors?.inner) {
				const err = {} as AuthInlineError;
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
		<AuthLayout greeting="WELCOME" title="Sign in to continue!">
			<Formik initialValues={intialFormValues} onSubmit={onSubmit}>
				{({ handleChange, handleSubmit }) => {
					return (
						<>
							<Box marginVertical="l">
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
								label="Sign In"
								disabled={loading}
								loading={loading}
								containerStyle={{ width: "100%", minHeight: 50 }}
								onPress={handleSubmit}
							/>
						</>
					);
				}}
			</Formik>
			<Box marginTop="l" alignItems="center">
				<Texter
					config={{
						Signup: {
							color: "primary",
							onPress: () => navigation.navigate("SignupScreen"),
						},
					}}>
					Don't have an account? Signup
				</Texter>
			</Box>
		</AuthLayout>
	);
};

export default Auth;

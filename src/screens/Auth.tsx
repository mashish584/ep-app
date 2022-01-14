import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";

import Button from "../components/Button";
import TextInput from "../components/Form/TextInput";
import Theme from "../components/Theme";
import Curve from "../components/SVG/Curve";

import { validateAuthForm } from "../utils/validation";
import { Box, Text, theme } from "../utils/theme";

import { AuthInlineError } from "../types";
import { SignInForm } from "../form.interface";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";

import { SIGNIN_MUTATION } from "../config/mutations";
import { UserLoginResponse, UserLoginVariables } from "../config/types";
import { useAuth } from "../utils/store";

const initalValues = {
	email: "",
	password: "",
};

const Auth: React.FC<StackNavigationProps<RootStackScreens, "AuthScreen">> = ({ navigation }) => {
	const intialFormValues: SignInForm = useRef({ ...initalValues }).current;
	const [errors, setErrors] = useState<AuthInlineError | null>(null);
	const { setToken } = useAuth((store) => store);

	const [onSignIn, { loading }] = useMutation<UserLoginResponse, UserLoginVariables>(SIGNIN_MUTATION, {
		onCompleted: (data) => {
			const token = data?.userLogin?.token;
			if (token) {
				setToken(token);
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
		<Theme viewContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
			<Box position="absolute" bottom={0}>
				<Curve />
			</Box>
			<Box paddingHorizontal="l" flex={0.5} width={"100%"}>
				<Box>
					<Text variant="title">WELCOME</Text>
					<Text variant="bold" fontSize={theme.fontSize.normal} color="darkGray" marginTop="xs">
						Sign in to continue!
					</Text>
				</Box>
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
									containerStyle={{ width: "100%", minHeight: 50 }}
									onPress={handleSubmit}
								/>
							</>
						);
					}}
				</Formik>
			</Box>
		</Theme>
	);
};

export default Auth;

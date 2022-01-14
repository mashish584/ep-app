import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Formik } from "formik";

import Button from "../components/Button";
import TextInput from "../components/Form/TextInput";
import Theme from "../components/Theme";

import { validateAuthForm } from "../utils/validation";
import { Box, Text, theme } from "../utils/theme";

import { AuthInlineError } from "../types";
import { SignInForm } from "../form.interface";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import Curve from "../components/SVG/Curve";

const initalValues = {
	email: "",
	password: "",
};

const Auth: React.FC<StackNavigationProps<RootStackScreens, "AuthScreen">> = () => {
	const [errors, setErrors] = useState<AuthInlineError | null>(null);
	const intialFormValues: SignInForm = useRef({ ...initalValues }).current;

	const onSubmit = async (values: SignInForm) => {
		try {
			await validateAuthForm(values);
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
										<Text variant="metaText14" marginTop="s" style={{ alignSelf: "flex-end" }}>
											Forgot password?
										</Text>
									</TouchableOpacity>
								</Box>
								<Button variant="primary" label="Sign In" containerStyle={{ width: "100%" }} onPress={handleSubmit} />
							</>
						);
					}}
				</Formik>
			</Box>
			<Box position="absolute" bottom={0}>
				<Curve />
			</Box>
		</Theme>
	);
};

export default Auth;

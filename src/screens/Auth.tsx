import React from "react";

import Button from "../components/Button";
import TextInput from "../components/Form/TextInput";
import Theme from "../components/Theme";

import { Box, Text, theme } from "../utils/theme";

const Auth = () => {
	return (
		<Theme viewContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
			<Box paddingHorizontal="l" flex={0.5} width={"100%"}>
				<Box>
					<Text variant="title">WELCOME</Text>
					<Text variant="bold" fontSize={theme.fontSize.normal} color="darkGray" marginTop="xs">
						Sign in to continue!
					</Text>
				</Box>
				<Box marginVertical="l">
					<TextInput type="input" label="Email" />
					<TextInput type="password" label="Password" />
					<Text variant="bold" marginTop="s" style={{ alignSelf: "flex-end" }}>
						Forgot password?
					</Text>
				</Box>
				<Button variant="primary" label="Sign In" containerStyle={{ width: "100%" }} onPress={() => {}} />
			</Box>
		</Theme>
	);
};

export default Auth;

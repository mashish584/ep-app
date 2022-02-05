import React from "react";

import theme, { Box, Text } from "../utils/theme";

import Curve from "./SVG/Curve";
import Theme from "./Theme";

interface AuthLayout {
	greeting: string;
	title: string;
}

const AuthLayout: React.FC<AuthLayout> = ({ greeting, title, children }) => {
	return (
		<Theme viewContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
			<Box position="absolute" bottom={0}>
				<Curve />
			</Box>
			<Box paddingHorizontal="l" flex={0.5} width={"100%"}>
				<Box>
					<Text variant="title">{greeting}</Text>
					<Text variant="bold" fontSize={theme.fontSize.normal} color="darkGray" marginTop="xs">
						{title}
					</Text>
				</Box>
				{children}
			</Box>
		</Theme>
	);
};

export default AuthLayout;

import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "@shopify/restyle";

import Layer from "../components/Layer";
import Theme from "../components/Theme";
import DownArrow from "../components/SVG/DownArrow";
import Button from "../components/Button";

import { Text, Box, pallette, Theme as ThemeType } from "../utils/theme";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";

const onboardingImage = require("../assets/images/onboarding.jpg");

const Onboarding: React.FC<StackNavigationProps<RootStackScreens, "Onboarding">> = ({ navigation }) => {
	const theme = useTheme<ThemeType>();

	return (
		<Theme isImageContainer={true} source={onboardingImage} imageContainerStyle={styles.container}>
			<Layer alpha={0.8} />
			<Box flex={0.2} padding="l" alignItems="center" justifyContent="flex-end">
				<Text variant="title" style={styles.title} fontSize={theme.fontSize.md}>
					Lorem ipsum doler sit amet
				</Text>
				<Text variant="light" style={styles.title} paddingHorizontal="l" marginTop="m">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.
				</Text>
			</Box>
			<Box alignItems="center" padding="m">
				<Button
					variant="transparent"
					onPress={() => {
						navigation.navigate("BottomStack");
					}}
					label=""
					containerStyle={styles.button}>
					<Box>
						<DownArrow style={{ width: 10, height: 10 }} />
					</Box>
				</Button>
			</Box>
		</Theme>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "flex-end",
	},
	title: {
		color: pallette.hex.secondary,
		textAlign: "center",
	},
	button: {
		width: 50,
		height: 50,
		borderRadius: 0,
	},
});

export default Onboarding;

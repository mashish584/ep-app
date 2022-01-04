import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

import Layer from "../components/Layer";
import { Text, Box, pallette } from "../utils/theme";

const onboardingImage = require("../assets/images/onboarding.jpg");

const Onboarding = () => {
	return (
		<ImageBackground source={onboardingImage} style={[styles.flex]}>
			<Layer alpha={0.8} />
			<Box flex={0.2} borderWidth={1} borderColor={"seondary"} padding="sh">
				<Text variant="title" style={styles.title}>
					Lorem ipsum doler sit amet
				</Text>
				<Text variant="metaText12" style={styles.title}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.
				</Text>
			</Box>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	flex: {
		flex: 1,
		justifyContent: "flex-end",
	},
	title: {
		color: pallette.hex.secondary,
	},
});

export default Onboarding;

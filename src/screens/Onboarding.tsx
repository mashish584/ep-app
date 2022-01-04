import React from "react";
import { StyleSheet } from "react-native";

import Layer from "../components/Layer";
import Theme from "../components/Theme";
import { Text, Box, pallette } from "../utils/theme";

const onboardingImage = require("../assets/images/onboarding.jpg");

const Onboarding = () => {
	return (
		<Theme isImageContainer={true} source={onboardingImage} imageContainerStyle={styles.container}>
			<Layer alpha={0.8} />
			<Box flex={0.2} padding="sh">
				<Text variant="title" style={styles.title}>
					Lorem ipsum doler sit amet
				</Text>
				<Text variant="metaText12" style={styles.title}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis.
				</Text>
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
	},
});

export default Onboarding;

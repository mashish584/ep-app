import React, { useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { useTheme } from "@shopify/restyle";

import Layer from "../components/Layer";
import Theme from "../components/Theme";
import DownArrow from "../components/SVG/DownArrow";
import Button from "../components/Button";

import { Text, Box, pallette, Theme as ThemeType } from "../utils/theme";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";

const onboardingImage = require("../assets/images/onboarding.jpg");

const Onboarding: React.FC<StackNavigationProps<RootStackScreens, "Onboarding">> = ({ navigation }) => {
	const animateValue = useRef(new Animated.Value(0)).current;
	const buttonAnimation = useRef(new Animated.Value(0)).current;
	const theme = useTheme<ThemeType>();

	const onAnimate = () => {
		Animated.sequence([
			Animated.timing(buttonAnimation, {
				toValue: 300,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(animateValue, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: false,
			}),
		]).start(() => {
			navigation.replace("AuthScreen");
		});
	};

	const opacity = animateValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	const scale = animateValue.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0, 25, 50],
	});

	const rotate = animateValue.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ["0deg", "-90deg", "180deg"],
	});

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
						onAnimate();
					}}
					label=""
					containerStyle={styles.button}>
					<Box>
						<Animated.View
							style={{
								transform: [
									{
										translateY: buttonAnimation,
									},
								],
							}}>
							<DownArrow style={{ width: 10, height: 10 }} />
						</Animated.View>
					</Box>
				</Button>
			</Box>
			<Animated.View
				style={{
					...styles.animatedLayer,
					backgroundColor: theme.colors.secondary,
					opacity,
					transform: [
						{
							perspective: 300,
						},
						{
							rotate,
						},
						{
							scale,
						},
					],
				}}
			/>
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
	animatedLayer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		position: "absolute",
		alignSelf: "center",
	},
});

export default Onboarding;

import React, { useState } from "react";
import { Animated, StatusBar, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Circle = ({ onPress, animatedValue }) => {
	const inputRange = [0, 0.001, 0.5, 0.54, 1];
	const containerBg = animatedValue.interpolate({
		inputRange,
		outputRange: ["white", "white", "white", "turquoise", "turquoise"],
	});

	const circleBg = animatedValue.interpolate({
		inputRange,
		outputRange: ["turquoise", "turquoise", "white", "white", "white"],
	});

	return (
		<Animated.View style={[StyleSheet.absoluteFillObject, styles.container, { backgroundColor: containerBg }]}>
			<Animated.View
				style={[
					styles.circle,
					{ backgroundColor: circleBg },
					{
						transform: [
							{
								perspective: 400,
							},
							{
								rotateY: animatedValue.interpolate({
									inputRange: [0, 0.5, 1],
									outputRange: ["0deg", "-90deg", "-180deg"],
								}),
							},
							{
								scale: animatedValue.interpolate({
									inputRange: [0, 0.5, 1],
									outputRange: [1, 8, 1],
								}),
							},
							{
								translateX: animatedValue.interpolate({
									inputRange: [0, 0.5, 1],
									outputRange: [0, 50, 0],
								}),
							},
						],
					},
				]}>
				<TouchableOpacity onPress={onPress}>
					<View style={[styles.button]}>
						<FontAwesomeIcon icon={faArrowRight} />
					</View>
				</TouchableOpacity>
			</Animated.View>
		</Animated.View>
	);
};

const CurveSlide = () => {
	const animateValue = React.useRef(new Animated.Value(0)).current;
	const [index, setIndex] = useState(0);

	const animate = (toValue) => {
		return Animated.timing(animateValue, {
			toValue,
			duration: 3000,
			useNativeDriver: false,
		});
	};

	const onPress = () => {
		setIndex(index === 1 ? 0 : 1);
		animate(index === 1 ? 0 : 1).start();
	};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Circle onPress={onPress} animatedValue={animateValue} />
		</View>
	);
};

export default CurveSlide;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		paddingTop: 100,
		padding: 8,
		paddingBottom: 50,
	},
	paragraph: {
		margin: 12,
		fontSize: 24,
		// fontWeight: 'bold',
		textAlign: "center",
		fontFamily: "Menlo",
		color: "white",
	},
	button: {
		height: 100,
		width: 100,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	circle: {
		backgroundColor: "turquoise",
		width: 100,
		height: 100,
		borderRadius: 50,
	},
});

import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, TouchableOpacity } from "react-native";

import theme, { pallette, Text } from "../../utils/theme";

import { ModalProps } from ".";

interface InfoModal extends ModalProps {}

const width = Dimensions.get("screen").width - theme.spacing.l * 2;

const InfoModal: React.FC<InfoModal> = ({ children, visible, onDismiss }) => {
	const animation = useRef(new Animated.Value(0)).current;

	const startAnimation = (value = 1) => {
		Animated.timing(animation, {
			toValue: value,
			duration: value === 1 ? 500 : 100,
			useNativeDriver: true,
			easing: Easing.bounce,
		}).start(() => {
			if (value === 0) {
				onDismiss();
			}
		});
	};

	const opacity = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	const scale = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	useEffect(() => {
		if (visible) {
			startAnimation();
		}
	}, [visible]);

	return (
		<Animated.View
			style={[
				StyleSheet.absoluteFillObject,
				{ backgroundColor: pallette.rgb.secondary(0.7), justifyContent: "center", alignItems: "center", opacity, zIndex: visible ? 1 : -1 },
			]}>
			<TouchableOpacity
				onPress={() => startAnimation(0)}
				style={{ alignSelf: "flex-end", marginRight: theme.spacing.l, marginBottom: theme.spacing.xxs, padding: theme.spacing.xs }}>
				<Text color="secondary" variant="bold" textDecorationLine="underline">
					close
				</Text>
			</TouchableOpacity>
			<Animated.View
				style={{
					width: width,
					minHeight: Dimensions.get("screen").height * 0.5,
					backgroundColor: theme.colors.secondary,
					transform: [{ scale }],
					borderRadius: theme.borderRadii.s,
				}}>
				{children}
			</Animated.View>
		</Animated.View>
	);
};

export default InfoModal;

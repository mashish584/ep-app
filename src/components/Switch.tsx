import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import theme, { pallette } from "../utils/theme";

interface SwitchProps {
	onChange: () => void;
	isSwitchOn: boolean;
	disabled?: boolean;
}

const Switch = ({ onChange, isSwitchOn, disabled, ...props }: SwitchProps) => {
	const [translateX]: any[] = useState(new Animated.Value(0));
	const [animation] = useState(new Animated.Value(0));
	const [isMount, setIsMount] = useState(false);

	const onSwitchToggle = (value) => {
		Animated.timing(animation, {
			toValue: value === 3 ? 0 : 1,
			duration: isMount ? 100 : 0,
			useNativeDriver: false,
		}).start();

		Animated.timing(translateX, {
			toValue: value,
			duration: isMount ? 300 : 0,
			useNativeDriver: false,
		}).start();
	};

	const background = animation.interpolate({
		inputRange: [0, 1],
		outputRange: ["rgba(0,0,0,0)", pallette.rgb.primary(1)],
	});

	const thumbColor = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [pallette.rgb.gray(1), pallette.rgb.secondary(1)],
	});

	const borderWidth = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0],
	});

	useEffect(() => {
		const value = isSwitchOn ? 20 : 3;
		onSwitchToggle(value);
		setIsMount(true);
	}, []);

	useEffect(() => {
		if (isSwitchOn) {
			onSwitchToggle(20);
		} else {
			onSwitchToggle(3);
		}
	}, [isSwitchOn]);

	return (
		<TouchableOpacity
			disabled={disabled}
			activeOpacity={1}
			onPress={() => {
				const value = isSwitchOn ? 3 : 20;
				onSwitchToggle(value);
				onChange();
			}}>
			<Animated.View style={[styles.switchContainer, { backgroundColor: background }, { borderWidth }]}>
				<Animated.View style={[styles.switch, { transform: [{ translateX }] }, { backgroundColor: thumbColor }]} />
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	switchContainer: {
		width: 43,
		height: 24,
		borderColor: theme.colors.gray,
		justifyContent: "center",
		borderRadius: 15,
		paddingHorizontal: 1,
		padding: 5,
	},
	switch: {
		width: 16,
		height: 16,
		backgroundColor: theme.colors.gray,
		borderRadius: 50,
	},
});

export default Switch;

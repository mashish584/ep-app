import React from "react";
import { ActivityIndicator, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

import theme, { Text } from "../utils/theme";

interface ButtonProps {
	variant: "default" | "primary" | "transparent";
	label?: string;
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
	loading?: boolean;
	onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, label, onPress, ...props }) => {
	const backgroundColor = variant === "primary" ? theme.colors.primary : variant === "transparent" ? "transparent" : theme.colors.gray;
	const color = theme.colors.secondary;

	const children = props.children || (
		<Text variant="button" style={[{ color }, props.textStyle]}>
			{label}
		</Text>
	);

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={props.disabled}
			style={[styles.container, props.containerStyle, { backgroundColor }]}
			activeOpacity={0.3}>
			{props.loading ? <ActivityIndicator color={theme.colors.secondary} size={"small"} /> : children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 5,
		minHeight: 60,
		width: 245,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
});

export default Button;

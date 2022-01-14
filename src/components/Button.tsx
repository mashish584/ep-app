import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "@shopify/restyle";

import { Theme, Text } from "../utils/theme";

interface ButtonProps {
	variant: "default" | "primary" | "transparent";
	label?: string;
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
	disabled?: boolean;
	onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, label, onPress, ...props }) => {
	const theme = useTheme<Theme>();
	const backgroundColor = variant === "primary" ? theme.colors.primary : variant === "transparent" ? "transparent" : theme.colors.gray;
	const color = theme.colors.secondary;

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={props.disabled}
			style={[styles.container, props.containerStyle, { backgroundColor }]}
			activeOpacity={0.3}>
			{props.children || (
				<Text variant="button" style={[{ color }, props.textStyle]}>
					{label}
				</Text>
			)}
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

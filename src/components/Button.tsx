import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "@shopify/restyle";

import { Theme, Text } from "../utils/theme";

interface ButtonProps {
	variant: "default" | "primary" | "transparent";
	label?: string;
	containerStyle?: ViewStyle;
	onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, label, onPress, ...props }) => {
	const theme = useTheme<Theme>();
	const backgroundColor = variant === "primary" ? theme.colors.primary : variant === "transparent" ? "transparent" : theme.colors.gray;
	const color = theme.colors.secondary;

	return (
		<TouchableOpacity onPress={onPress} style={[styles.container, props.containerStyle, { backgroundColor }]} activeOpacity={0.8}>
			{props.children || (
				<Text variant="button" style={[{ color }]}>
					{label}
				</Text>
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 25,
		height: 50,
		width: 245,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
});

export default Button;

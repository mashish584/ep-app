import React, { useState } from "react";
import { TextInput as RNTextInput, TextInputProps, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import theme, { Box, fonts, pallette, Text } from "../../utils/theme";

interface TextInput extends TextInputProps {
	type: "input" | "password" | "textarea" | "number";
	errorMessage?: string;
	label?: string;
}

const TextInput = ({ errorMessage, type, style, ...props }: TextInput) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Box marginTop="s">
			{props.label ? (
				<Text variant="light" fontSize={theme.fontSize.sm}>
					{props.label}
				</Text>
			) : null}
			<Box
				marginVertical="xs"
				minHeight={45}
				borderWidth={1}
				borderRadius="s"
				flexDirection="row"
				width={"100%"}
				paddingHorizontal="s"
				justifyContent="space-between"
				alignItems="center"
				position="relative"
				style={styles.textInputContainer}>
				<RNTextInput
					autoCapitalize="none"
					multiline={type === "textarea"}
					secureTextEntry={type === "password" && !showPassword ? true : false}
					style={[styles.textInput, style, { width: type === "password" ? "92%" : "100%" }, type === "textarea" && styles.textArea]}
					{...props}
				/>
				{type === "password" && (
					<TouchableOpacity activeOpacity={1} onPress={() => setShowPassword(!showPassword)}>
						<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} color={theme.colors.darkGray} />
					</TouchableOpacity>
				)}
			</Box>
			{errorMessage ? (
				<Text variant="metaText12" color="primary">
					{errorMessage}
				</Text>
			) : null}
		</Box>
	);
};

export const styles = StyleSheet.create({
	textInputContainer: {
		backgroundColor: pallette.rgb.gray(0.1),
		borderColor: pallette.rgb.gray(0.7),
	},
	textInput: {
		fontFamily: fonts.primary_bold,
		fontSize: theme.fontSize.sm,
		color: theme.colors.darkGray,
		height: "100%",
	},
	textArea: {
		minHeight: 100,
		maxHeight: 100,
		marginVertical: 10,
	},
});

export const inputContainerStyle: ViewStyle = {
	marginVertical: theme.spacing.xs,
	minHeight: 45,
	borderWidth: 1,
	borderRadius: theme.spacing.s,
	flexDirection: "row",
	width: "100%",
	paddingHorizontal: theme.spacing.s,
	alignItems: "center",
	position: "relative",
	...styles.textInputContainer,
};

export const inputStyle: ViewStyle = {
	...styles.textInput,
	width: "100%",
};

export const labelStyle: TextStyle = {
	...theme.textVariants.light,
	fontSize: theme.fontSize.sm,
};

export default TextInput;

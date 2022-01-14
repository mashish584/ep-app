import React, { useState } from "react";
import { TextInput as RNTextInput, TextInputProps, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import theme, { Box, fonts, pallette, Text } from "../../utils/theme";

interface TextInput extends TextInputProps {
	type: "input" | "password";
	errorMessage?: string;
	label?: string;
}

const TextInput = ({ errorMessage, type, ...props }: TextInput) => {
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
					secureTextEntry={type === "password" && !showPassword ? true : false}
					style={[styles.textInput, { width: type === "password" ? "92%" : "100%" }]}
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

const styles = StyleSheet.create({
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
});

export default TextInput;

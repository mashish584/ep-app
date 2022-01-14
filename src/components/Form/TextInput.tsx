import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme, { Box, fonts, Text } from "../../utils/theme";

interface TextInput extends TextInputProps {
	type: "input" | "password";
	errorMessage?: string;
	label?: string;
}

const TextInput = ({ errorMessage, type, ...props }: TextInput) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Box marginTop="s">
			{props.label ? <Text variant="metaText16">{props.label}</Text> : null}
			<Box
				marginVertical="xs"
				height={50}
				borderWidth={1}
				borderRadius="s"
				borderColor="darkGray"
				flexDirection="row"
				width={"100%"}
				paddingHorizontal="s"
				justifyContent="space-between"
				alignItems="center"
				position="relative">
				<RNTextInput
					secureTextEntry={type === "password" && !showPassword ? true : false}
					style={{ fontFamily: fonts.primary_regular, fontSize: theme.fontSize.regular, width: type === "password" ? "92%" : "100%", height: "100%" }}
					{...props}
				/>
				{type === "password" && (
					<TouchableOpacity activeOpacity={1} onPress={() => setShowPassword(!showPassword)}>
						<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
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

export default TextInput;

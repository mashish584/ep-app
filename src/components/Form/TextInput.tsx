import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import theme, { Box, Text } from "../../utils/theme";

interface TextInput extends TextInputProps {
	type: "input" | "password";
	errorNessage?: string;
}

const TextInput = ({ errorNessage, type, ...props }: TextInput) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Box>
			<Text variant="metaText16">Email</Text>
			<Box
				marginVertical="xs"
				height={50}
				borderWidth={1}
				borderColor="darkGray"
				flexDirection="row"
				width={"100%"}
				paddingHorizontal="xs"
				justifyContent="space-between"
				alignItems="center"
				position="relative">
				<RNTextInput
					secureTextEntry={type === "password" && !showPassword ? true : false}
					style={{ fontSize: theme.fontSize.normal, width: type === "password" ? "92%" : "100%", height: "100%" }}
					{...props}
				/>
				{type === "password" && (
					<TouchableOpacity activeOpacity={1} onPress={() => setShowPassword(!showPassword)} style={{ borderWidth: 1 }}>
						<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
					</TouchableOpacity>
				)}
			</Box>
			{errorNessage ? (
				<Text variant="metaText12" color="primary">
					{errorNessage}
				</Text>
			) : null}
		</Box>
	);
};

export default TextInput;

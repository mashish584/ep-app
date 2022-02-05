import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";

import theme, { Box, Text } from "../../utils/theme";
import { styles } from "./TextInput";

interface DateInput {
	type: "date" | "time";
	label: string;
	value: string;
	errorMessage?: string;
	onChange: (timestamp: string) => void;
}

const DateInput: React.FC<DateInput> = (props) => {
	return (
		<Box marginTop="s">
			{props.label ? (
				<Text variant="light" fontSize={theme.fontSize.sm}>
					{props.label}
				</Text>
			) : null}
			<Box
				marginVertical="xs"
				borderWidth={1}
				minHeight={45}
				width="100%"
				borderRadius="s"
				flexDirection="row"
				alignItems="center"
				paddingHorizontal="s"
				style={styles.textInputContainer}>
				<FontAwesomeIcon icon={props.type === "date" ? faCalendarAlt : faClock} color={theme.colors.darkGray} />
				<Text variant="bold" ml="s" fontSize={theme.fontSize.sm} color="darkGray">
					{props.value}
				</Text>
			</Box>
			{props.errorMessage ? (
				<Text variant="metaText12" color="primary">
					{props.errorMessage}
				</Text>
			) : null}
		</Box>
	);
};

export default DateInput;

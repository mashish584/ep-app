import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import theme, { Box, Text } from "../../utils/theme";
import { styles } from "./TextInput";

interface DateInput {
	type: "date" | "time";
	label: string;
	value: string;
	errorMessage?: string;
	onChange: (timestamp: Date) => void;
}

const DateInput: React.FC<DateInput> = (props) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	return (
		<>
			<TouchableOpacity activeOpacity={0.9} onPress={() => setDatePickerVisibility(true)}>
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
			</TouchableOpacity>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode={props.type}
				minimumDate={new Date()}
				onConfirm={(timestamp) => {
					setDatePickerVisibility(false);
					props.onChange(timestamp);
				}}
				onCancel={() => setDatePickerVisibility(false)}
			/>
		</>
	);
};

export default DateInput;

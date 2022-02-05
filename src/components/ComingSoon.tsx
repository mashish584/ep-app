import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { Box, Text, theme } from "../utils/theme";

const ComingSoon = () => {
	return (
		<Box flex={1} alignItems="center" justifyContent="center">
			<FontAwesomeIcon icon={faClock} size={55} color={theme.colors.gray} />
			<Text marginTop="l" fontSize={theme.fontSize.normal} color="gray">
				Coming Soon...
			</Text>
		</Box>
	);
};

export default ComingSoon;

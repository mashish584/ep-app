import React from "react";
import { ViewStyle } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { Box, pallette, Text } from "../utils/theme";

interface TextIcon {
	icon: IconDefinition;
	text: string;
	style?: ViewStyle;
}

const TextIcon = ({ icon, text, ...props }: TextIcon) => {
	return (
		<Box flexDirection="row" alignItems="center" marginRight="m" style={props.style}>
			<FontAwesomeIcon icon={icon} color={pallette.rgb.black(0.54)} size={18} />
			<Text numberOfLines={2} marginLeft="xs" variant="metaText14" color="black">
				{text}
			</Text>
		</Box>
	);
};

export default TextIcon;

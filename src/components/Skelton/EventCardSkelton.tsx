import React from "react";
import { Dimensions } from "react-native";
import theme, { Box, pallette } from "../../utils/theme";

interface EventCardSkelton {
	isFullWidth: boolean;
}

const EventCardSkelton = ({ isFullWidth }: EventCardSkelton) => {
	const width = isFullWidth ? Dimensions.get("screen").width - theme.spacing.l * 2 : 240;
	const height = isFullWidth ? 250 : 150;

	return (
		<Box
			width={width}
			height={height}
			borderRadius="m"
			mt={"l"}
			mb={isFullWidth ? "l" : "none"}
			ml={isFullWidth ? "l" : "l"}
			style={{ backgroundColor: pallette.rgb.gray(0.4) }}
		/>
	);
};

export default EventCardSkelton;

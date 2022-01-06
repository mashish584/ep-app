import React from "react";
import { TouchableOpacity, Image } from "react-native";

import HostInfo from "../HostInfo";
import Texter, { Config } from "../Texter";

import { dimensions } from "../../types";
import { generateBoxShadowStyle } from "../../utils";
import { Box, Text, theme } from "../../utils/theme";

interface EventCard extends dimensions {
	variant?: "full" | "small";
	onPress: () => void;
}

const sample = require("../../assets/images/sample-1.jpg");

const EventDateConfig: Record<string, Config> = {
	Wednesday: {
		color: "primary",
		onPress: () => null,
		variant: "bold",
	},
};

const EventCard: React.FC<EventCard> = ({ width, height, ...props }) => {
	return (
		<TouchableOpacity onPress={props.onPress}>
			<Box
				width={width}
				height={height}
				backgroundColor="secondary"
				borderRadius="m"
				style={{
					...generateBoxShadowStyle(-2, 4, "#171717", 0.2, 3, 4, "#171717"),
				}}>
				<Image
					source={sample}
					style={{ width: "100%", flex: 0.6, borderTopLeftRadius: theme.borderRadii.m, borderTopRightRadius: theme.borderRadii.m }}
					resizeMode="cover"
				/>
				<Box flex={0.5} style={{ marginTop: 7 }} paddingHorizontal="sp10">
					<Texter color="darkGray" variant="bold" config={EventDateConfig}>
						Wednesday 10 Dec
					</Texter>
					<Text variant="bold" fontSize={theme.fontSize.md} marginTop="sp3">
						Reunion Party
					</Text>
					<Box marginTop="sp10">
						<HostInfo width={20} height={20} username="John" />
					</Box>
					{/* <Button containerStyle={{ width: 60, minHeight: 19, borderRadius: 0 }} variant="primary" label="Join-now $99" /> */}
				</Box>
			</Box>
		</TouchableOpacity>
	);
};

export default EventCard;

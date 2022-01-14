import React from "react";
import { TouchableOpacity, Image, ViewStyle } from "react-native";

import Button from "../Button";
import HostInfo from "../HostInfo";
import Texter, { Config } from "../Texter";

import { Dimensions } from "../../types";
import { generateBoxShadowStyle } from "../../utils";
import { Box, pallette, Text, theme } from "../../utils/theme";

interface EventCard extends Dimensions {
	variant?: "full" | "small";
	onPress: () => void;
	containerStyle?: ViewStyle;
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
	const hostImageSize = props.variant === "full" ? 25 : 20;

	return (
		<TouchableOpacity onPress={props.onPress} activeOpacity={1}>
			<Box
				width={width}
				height={height}
				backgroundColor="secondary"
				borderRadius="m"
				marginRight="m"
				style={[
					{
						...generateBoxShadowStyle(0, 3, pallette.rgb.black(0.1), 1, 10, 4, pallette.rgb.black(0.1)),
					},
					props.containerStyle,
				]}>
				<Image
					source={sample}
					style={{ width: "100%", flex: 0.6, borderTopLeftRadius: theme.borderRadii.m, borderTopRightRadius: theme.borderRadii.m }}
					resizeMode="cover"
				/>
				<Box flex={0.5} margin="m">
					<Texter color="darkGray" variant="bold" config={EventDateConfig} style={{ fontSize: theme.fontSize.xs }}>
						Wednesday 10 Dec
					</Texter>
					<Text variant="bold" fontSize={theme.fontSize.md} marginTop="xxs">
						Reunion Party
					</Text>
					{props.variant === "full" && (
						<Text
							numberOfLines={2}
							variant="description"
							fontSize={theme.fontSize.sm}
							marginVertical="xxs"
							style={{ color: pallette.rgb.black(0.83), width: "95%" }}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad illo eius iusto. Dolorum eius in nisi voluptatibus doloremque corporis
							fugiat, reprehenderit quod aperiam soluta alias facilis? Rem explicabo eaque adipisci?
						</Text>
					)}
					<Box marginTop="s" flexDirection="row" justifyContent="space-between" alignItems="center">
						<HostInfo width={hostImageSize} height={hostImageSize} username="John" showRole={true} />
						<Button variant="primary" onPress={() => alert("Join")} containerStyle={{ width: 90, minHeight: 25, borderRadius: theme.borderRadii.s }}>
							<Text fontSize={theme.fontSize.xs} color="secondary" variant="bold">
								Join - $99
							</Text>
						</Button>
					</Box>
				</Box>
			</Box>
		</TouchableOpacity>
	);
};

export default EventCard;

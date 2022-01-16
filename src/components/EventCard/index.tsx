import React from "react";
import { TouchableOpacity, Image, ViewStyle } from "react-native";
import dayjs from "dayjs";

import Button from "../Button";
import HostInfo from "../HostInfo";
import Texter, { Config } from "../Texter";

import { Dimensions } from "../../types";
import { generateBoxShadowStyle } from "../../utils";
import { Box, pallette, Text, theme } from "../../utils/theme";
import { EventInfo } from "../../config/schema.types";

type Event = {
	thumbnail: string;
} & Pick<EventInfo, "id" | "title" | "price" | "eventTimestamp" | "description" | "owner">;

interface EventCard extends Dimensions {
	eventInfo: Event;
	variant?: "full" | "small";
	onPress: () => void;
	onJoin: () => void;
	containerStyle?: ViewStyle;
}

const sample = require("../../assets/images/sample-1.jpg");

const EventDateConfig = (key: string, onPress?: () => void): Record<string, Config> => {
	return {
		[key]: {
			color: "primary",
			variant: "bold",
		},
	};
};

const EventCard: React.FC<EventCard> = ({ width, height, eventInfo, ...props }) => {
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
					<Texter
						color="darkGray"
						variant="bold"
						config={EventDateConfig(dayjs(eventInfo?.eventTimestamp).format("dddd"))}
						style={{ fontSize: theme.fontSize.xs }}>
						{dayjs(eventInfo?.eventTimestamp).format("dddd DD MMM")}
					</Texter>
					<Text variant="bold" numberOfLines={1} fontSize={theme.fontSize.md} marginTop="xxs">
						{eventInfo?.title}
					</Text>
					{props.variant === "full" && (
						<Text
							numberOfLines={2}
							variant="description"
							fontSize={theme.fontSize.sm}
							marginVertical="xxs"
							style={{ color: pallette.rgb.black(0.83), width: "95%" }}>
							{eventInfo?.description}
						</Text>
					)}
					<Box marginTop="s" flexDirection="row" justifyContent="space-between" alignItems="center">
						<HostInfo width={hostImageSize} height={hostImageSize} username={eventInfo.owner.username} showRole={true} />
						<Button variant="primary" onPress={props.onJoin} containerStyle={{ width: 90, minHeight: 25, borderRadius: theme.borderRadii.s }}>
							<Text fontSize={theme.fontSize.xs} color="secondary" variant="bold">
								Join - ${eventInfo?.price}
							</Text>
						</Button>
					</Box>
				</Box>
			</Box>
		</TouchableOpacity>
	);
};

export default EventCard;

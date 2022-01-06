import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { dimensions } from "../types";

import theme, { Box } from "../utils/theme";
import Texter from "./Texter";

interface HostInfo extends dimensions {
	onPress?: () => void;
	username: string;
}

const HostInfo = ({ width, height, ...props }: HostInfo) => {
	return (
		<TouchableOpacity>
			<Box flexDirection="row" width={125} alignItems={"center"}>
				<Image
					source={{ uri: "https://unsplash.it/50/50" }}
					style={{ width, height, marginRight: theme.spacing.sp5 }}
					borderRadius={(width as number) / 2}
				/>
				<Texter
					variant="bold"
					style={{ fontSize: theme.fontSize.sm }}
					config={{
						Host: {
							variant: "metaText11",
							color: "darkGray",
							onPress: () => null,
						},
					}}>{`${props.username || ""} Host`}</Texter>
			</Box>
		</TouchableOpacity>
	);
};

export default HostInfo;

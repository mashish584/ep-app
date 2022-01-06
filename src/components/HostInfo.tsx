import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { dimensions } from "../types";

import { Box } from "../utils/theme";
import Texter from "./Texter";

interface HostInfo extends dimensions {
	onPress?: () => void;
	username: string;
}

const HostInfo = ({ width, height, ...props }: HostInfo) => {
	return (
		<TouchableOpacity>
			<Box flexDirection="row">
				<Image source={{ uri: "https://unsplash.it/50/50" }} style={{ width, height }} borderRadius={(width as number) / 2} />
				<Texter config={{}}>{`${props.username || ""} Host`}</Texter>
			</Box>
		</TouchableOpacity>
	);
};

export default HostInfo;

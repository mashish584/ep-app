import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { dimensions } from "../types";

import theme, { Box, FontSize, TextVariants } from "../utils/theme";
import Texter from "./Texter";

interface HostInfo extends dimensions {
	onPress?: () => void;
	username: string;
	showRole?: boolean;
	fontSize?: FontSize;
	textVariant?: TextVariants;
}

const HostInfo: React.FC<HostInfo> = ({ width, height, ...props }) => {
	const fontSize = theme.fontSize[props.fontSize || "xs"];

	return (
		<TouchableOpacity onPress={props.onPress}>
			<Box flexDirection="row" width={100} alignItems={"center"}>
				<Image
					source={{ uri: "https://unsplash.it/50/50" }}
					style={{ width, height, marginRight: theme.spacing.xs }}
					borderRadius={(width as number) / 2}
				/>

				{props.children || (
					<Texter
						variant={props.textVariant || "bold"}
						style={{ fontSize }}
						config={{
							Host: {
								variant: "metaText11",
								color: "darkGray",
								onPress: () => null,
							},
						}}>
						{`${props.username} ${props.showRole ? "Host" : ""}`}
					</Texter>
				)}
			</Box>
		</TouchableOpacity>
	);
};

export default HostInfo;

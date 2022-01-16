import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Dimensions } from "../types";

import theme, { Box, FontSize, TextVariants } from "../utils/theme";
import Texter from "./Texter";

interface HostInfo extends Dimensions {
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
					source={{ uri: `https://ui-avatars.com/api/?name=${props.username}&background=${theme.colors.primary}&color=${theme.colors.secondary}` }}
					style={{ width, height, marginRight: theme.spacing.xs }}
					borderRadius={(width as number) / 2}
				/>

				{props.children || (
					<Texter
						variant={props.textVariant || "bold"}
						style={{ fontSize, textTransform: "capitalize" }}
						config={{
							Host: {
								variant: "metaText11",
								color: "darkGray",
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

import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { generateBoxShadowStyle } from "../utils";
import theme, { Box, pallette, Text } from "../utils/theme";

interface Avatar {
	name: string;
	profile: string;
	onPress: () => void;
}

const Avatar = ({ name, profile, onPress }: Avatar) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0}>
			<Box
				width={45}
				height={57}
				style={{
					...generateBoxShadowStyle(0, 3, pallette.rgb.black(0.2), 1, 15, 4, pallette.rgb.black(0.1)),
				}}>
				<Image
					source={{ uri: profile }}
					style={{ width: "100%", aspectRatio: 1, borderRadius: 50, borderWidth: 2, borderColor: pallette.hex.secondary }}
				/>
				<Box
					width={40}
					height={15}
					backgroundColor="secondary"
					borderRadius="m"
					alignItems="center"
					alignSelf="center"
					style={{ marginTop: -10 }}
					justifyContent="center">
					<Text variant="bold" fontSize={theme.fontSize.xxs}>
						{name}
					</Text>
				</Box>
			</Box>
		</TouchableOpacity>
	);
};

export default Avatar;

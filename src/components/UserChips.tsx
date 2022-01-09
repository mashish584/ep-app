import React from "react";
import { ImageSourcePropType, Image, TouchableOpacity, StyleSheet } from "react-native";
import theme, { Box, pallette, Text } from "../utils/theme";

type User = {
	image: ImageSourcePropType;
};

interface UserChips {
	users: User[];
	imageSize: number;
	totalUsers: number;
	onPress?: () => void;
}

const UserChips = ({ users, totalUsers, ...props }: UserChips) => {
	const borderRadius = props.imageSize / 2;
	const borderColor = pallette.rgb.gray(0.62);

	return (
		<Box flexDirection="row">
			{users.map(({ image }, index) => (
				<Box key={index} width={props.imageSize} height={props.imageSize} borderWidth={1} style={{ marginLeft: -15, borderColor, borderRadius }}>
					<Image source={image} style={{ width: "100%", height: "100%" }} borderRadius={borderRadius} />
				</Box>
			))}
			<TouchableOpacity
				onPress={props.onPress}
				activeOpacity={1}
				style={[styles.actionButton, { borderColor, borderRadius, width: props.imageSize, height: props.imageSize }]}>
				<Text fontSize={theme.fontSize.sm} variant="bold">
					+{totalUsers - users.length}
				</Text>
			</TouchableOpacity>
		</Box>
	);
};

const styles = StyleSheet.create({
	actionButton: {
		marginLeft: -10,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		backgroundColor: pallette.hex.secondary,
	},
});

export default UserChips;

import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { generateBoxShadowStyle } from "../../utils";
import theme, { Box, pallette, Text } from "../../utils/theme";

interface UserCard {}

const UserCard: React.FC<UserCard> = () => {
	return (
		<TouchableOpacity>
			<Box
				minHeight={85}
				flexDirection="row"
				paddingHorizontal="l"
				alignItems="center"
				backgroundColor="secondary"
				borderRadius="m"
				mb="m"
				style={{ width: "100%", ...generateBoxShadowStyle(0, 0, pallette.rgb.black(0.1), 1, 14, 4, pallette.rgb.black(0.1)) }}>
				<Box width={55} height={55}>
					<Image
						source={{ uri: "https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964_1280.jpg" }}
						borderRadius={27.5}
						style={{ width: "100%", height: "100%" }}
					/>
				</Box>
				<Box ml="m">
					<Text variant="bold" fontSize={theme.fontSize.normal}>
						John Doe
					</Text>
					<Text variant="metaText14" color="gray">
						doe@mailinator.com
					</Text>
				</Box>
			</Box>
		</TouchableOpacity>
	);
};

export default UserCard;

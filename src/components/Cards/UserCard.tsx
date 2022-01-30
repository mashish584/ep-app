import React from "react";
import { Image, TouchableOpacity } from "react-native";

import theme, { Box, Text } from "../../utils/theme";
import { cardStyle } from "./styles";

interface UserCard {}

const UserCard: React.FC<UserCard> = () => {
	return (
		<TouchableOpacity>
			<Box style={cardStyle}>
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
					<Text variant="metaText14" color="gray" mt="xxs">
						doe@mailinator.com
					</Text>
				</Box>
			</Box>
		</TouchableOpacity>
	);
};

export default UserCard;

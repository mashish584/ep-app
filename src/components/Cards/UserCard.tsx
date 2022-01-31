import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { defaultAvatar } from "../../utils/preconfig";

import theme, { Box, Text } from "../../utils/theme";
import { cardStyle } from "./styles";

interface UserCard {
	profile?: string;
	email?: string;
	name?: string;
}

const UserCard: React.FC<UserCard> = ({ profile, email, name }) => {
	return (
		<TouchableOpacity>
			<Box style={cardStyle}>
				<Box width={55} height={55}>
					<Image source={{ uri: profile || defaultAvatar }} borderRadius={27.5} style={{ width: "100%", height: "100%" }} />
				</Box>
				<Box ml="m">
					<Text variant="bold" fontSize={theme.fontSize.normal}>
						{name}
					</Text>
					<Text variant="metaText14" color="gray" mt="xxs">
						{email}
					</Text>
				</Box>
			</Box>
		</TouchableOpacity>
	);
};

export default UserCard;

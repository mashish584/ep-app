import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { formatTimeStamp } from "../../utils";
import { defaultAvatar } from "../../utils/preconfig";
import theme, { Box, Text } from "../../utils/theme";
import { cardStyle } from "./styles";

interface TransactionCard {
	profile: string;
	title: string;
	date: string;
	amount: number;
}

const TransactionCard: React.FC<TransactionCard> = ({ profile, title, date, amount }) => {
	return (
		<TouchableOpacity>
			<Box style={cardStyle} justifyContent="space-between">
				<Box flexDirection="row" alignItems="center">
					<Box width={55} height={55}>
						<Image source={{ uri: profile || defaultAvatar }} borderRadius={27.5} style={{ width: "100%", height: "100%" }} />
					</Box>
					<Box ml="m" width={140}>
						<Text variant="bold" fontSize={theme.fontSize.regular} numberOfLines={2}>
							{title}
						</Text>
						<Text variant="metaText14" color="gray" mt="xxs">
							{formatTimeStamp(date, "DD MMM, YYYY")}
						</Text>
					</Box>
				</Box>
				<Text variant="bold" fontSize={theme.fontSize.normal}>
					${amount || 0}
				</Text>
			</Box>
		</TouchableOpacity>
	);
};

export default TransactionCard;

import React from "react";
import { TouchableOpacity, Image } from "react-native";
import theme, { Box, Spacing, Text } from "../utils/theme";

interface Category {
	onPress: () => void;
	mr?: Spacing;
	ml?: Spacing;
}

const Category = ({ onPress, mr, ml }: Category) => {
	return (
		<TouchableOpacity>
			<Box
				minWidth={120}
				flexDirection="row"
				borderWidth={0.5}
				borderColor={"gray"}
				minHeight={25}
				borderRadius="s"
				marginRight={mr}
				marginLeft={ml}
				padding="sp5"
				alignItems="center">
				<Image source={{ uri: "https://unsplash.it/100/100" }} style={{ width: 20, height: 20, borderRadius: 50 }} />
				<Text variant="bold" fontSize={theme.fontSize.xxs} marginLeft="sp5">
					Tailgating Parties
				</Text>
			</Box>
		</TouchableOpacity>
	);
};

export default Category;

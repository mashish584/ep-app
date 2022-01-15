import React from "react";
import { TouchableOpacity, Image } from "react-native";

import { EventCategory } from "../types";
import theme, { Box, Spacing, Text } from "../utils/theme";

interface Category {
	name: EventCategory;
	onPress: (category: EventCategory) => void;
	mr?: Spacing;
	ml?: Spacing;
}

const Category = ({ name, onPress, ...props }: Category) => {
	return (
		<TouchableOpacity onPress={() => onPress(name)}>
			<Box
				minWidth={90}
				flexDirection="row"
				borderWidth={0.5}
				borderColor={"gray"}
				minHeight={25}
				borderRadius="s"
				marginRight={props.mr}
				marginLeft={props.ml}
				padding="xs"
				alignItems="center">
				<Image source={{ uri: "https://unsplash.it/100/100" }} style={{ width: 20, height: 20, borderRadius: 50 }} />
				<Text variant="bold" fontSize={theme.fontSize.xxs} marginLeft="xs">
					{name}
				</Text>
			</Box>
		</TouchableOpacity>
	);
};

export default Category;

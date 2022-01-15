import React from "react";
import { TouchableOpacity, Image } from "react-native";

import { EventCategory } from "../types";
import theme, { Box, Spacing, Text } from "../utils/theme";

interface Category {
	selected: boolean;
	name: EventCategory;
	onPress: (category: EventCategory) => void;
	mr?: Spacing;
	ml?: Spacing;
}

const Category = ({ name, onPress, ...props }: Category) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={() => onPress(name)}>
			<Box
				minWidth={90}
				flexDirection="row"
				borderWidth={props.selected ? 0 : 0.5}
				borderColor={"gray"}
				backgroundColor={props.selected ? "primary" : "secondary"}
				minHeight={25}
				borderRadius="s"
				marginRight={props.mr}
				marginLeft={props.ml}
				padding="xs"
				alignItems="center">
				<Image source={{ uri: "https://unsplash.it/100/100" }} style={{ width: 20, height: 20, borderRadius: 50 }} />
				<Text variant="bold" fontSize={theme.fontSize.xxs} marginLeft="xs" color={props.selected ? "secondary" : "black"}>
					{name}
				</Text>
			</Box>
		</TouchableOpacity>
	);
};

export default Category;

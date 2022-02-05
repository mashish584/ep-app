import React from "react";
import { ScrollView } from "react-native";

import Category from "../Category";
import { CategoriesSkelton, EventCardSkelton } from "../Skelton";

import { EventCategory } from "../../types";
import { EventCategories } from "../../utils/preconfig";
import theme, { Text } from "../../utils/theme";

interface EventListHeader {
	category: EventCategory;
	categoryEventCount: number | null;
	isLoading: boolean;
	onCategoryChange: (category: EventCategory) => void;
}

const EventListHeader: React.FC<EventListHeader> = ({ isLoading, categoryEventCount, ...props }) => {
	return (
		<>
			<Text variant="title" marginLeft="l" mb="l" fontSize={theme.fontSize.normal}>
				Explore By Categories
			</Text>
			{EventCategories.length > 0 && (
				<ScrollView horizontal={true} style={{ paddingBottom: theme.spacing.xl }} showsHorizontalScrollIndicator={false}>
					{EventCategories.map((category, index) =>
						!isLoading ? (
							<Category
								key={index}
								name={category}
								selected={props.category === category}
								mr={"m"}
								ml={index === 0 ? "l" : "none"}
								onPress={props.onCategoryChange}
							/>
						) : (
							<CategoriesSkelton key={`${category}_${index}`} ml={index === 0 ? "l" : "none"} />
						),
					)}
				</ScrollView>
			)}

			{isLoading && categoryEventCount === 0 && (
				<ScrollView showsVerticalScrollIndicator={false}>
					{new Array(5).fill(1).map((_, index) => {
						return <EventCardSkelton isFullWidth={true} key={`full_card_${index}`} />;
					})}
				</ScrollView>
			)}
			{categoryEventCount === 0 && !isLoading && (
				<Text variant="metaText16" textAlign="center" marginTop="l">
					No Events
				</Text>
			)}
		</>
	);
};

export default EventListHeader;

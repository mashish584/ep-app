import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";

import EventCard from "../components/EventCard";
import theme, { Box, Text } from "../utils/theme";

interface UpcomingEventsList {
	categoryEventCount: number;
}

const UpcomingEventsList = ({ categoryEventCount }: UpcomingEventsList) => {
	return (
		<Box paddingVertical="sp20">
			<Text variant="title" marginLeft="sp20" fontSize={theme.fontSize.normal}>
				Upcoming Events
			</Text>
			<FlatList
				data={new Array(100).fill(1)}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.FlatList}
				renderItem={({ item, index }) => {
					return (
						<EventCard
							width={220}
							height={170}
							containerStyle={{ marginLeft: index === 0 ? theme.spacing.sp20 : 0 }}
							onPress={() => {}}
							key={index}
						/>
					);
				}}
			/>
			<Text variant="title" marginLeft="sp20" marginTop="sp20" fontSize={theme.fontSize.normal}>
				Explore By Categories
			</Text>
			{categoryEventCount === 0 && (
				<Text variant="metaText16" textAlign="center" marginTop="sp20">
					No Events
				</Text>
			)}
		</Box>
	);
};

const EventsList = () => {
	const [events] = useState(new Array(10).fill(1));

	return (
		<FlatList
			data={events}
			contentContainerStyle={styles.FlatList}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={<UpcomingEventsList categoryEventCount={events.length} />}
			renderItem={({ item, index }) => {
				return (
					<EventCard
						width={Dimensions.get("screen").width - theme.spacing.sp20 * 2}
						containerStyle={{ alignSelf: "center", marginBottom: theme.spacing.sp10 }}
						height={164}
						onPress={() => {}}
						key={index}
					/>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	FlatList: {
		flexGrow: 1,
		paddingVertical: theme.spacing.sp20,
	},
});

export default EventsList;

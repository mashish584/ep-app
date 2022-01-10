import React, { useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import Category from "../components/Category";

import EventCard from "../components/EventCard";
import theme, { Box, Text } from "../utils/theme";

interface UpcomingEventsList {
	categoryEventCount: number;
	categories: any[];
}

const UpcomingEventsList = ({ categoryEventCount, categories }: UpcomingEventsList) => {
	return (
		<Box paddingVertical="l">
			<Text variant="title" marginLeft="l" fontSize={theme.fontSize.normal}>
				Upcoming Events
			</Text>
			<FlatList
				data={new Array(100).fill(1)}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.FlatList}
				renderItem={({ item, index }) => {
					return (
						<EventCard width={220} height={170} containerStyle={{ marginLeft: index === 0 ? theme.spacing.l : 0 }} onPress={() => {}} key={index} />
					);
				}}
			/>
			<Text variant="title" marginLeft="l" marginTop="l" fontSize={theme.fontSize.normal}>
				Explore By Categories
			</Text>
			{categories.length > 0 && (
				<ScrollView horizontal={true} style={{ marginTop: theme.spacing.l, marginBottom: theme.spacing.m }} showsHorizontalScrollIndicator={false}>
					{categories.map((category, index) => (
						<Category key={index} mr={"m"} ml={index === 0 ? "l" : "none"} onPress={() => {}} />
					))}
				</ScrollView>
			)}
			{categoryEventCount === 0 && (
				<Text variant="metaText16" textAlign="center" marginTop="l">
					No Events
				</Text>
			)}
		</Box>
	);
};

const EventsList = () => {
	const [events] = useState(new Array(10).fill(1));
	const [categories] = useState(new Array(50).fill(1));

	return (
		<FlatList
			data={events}
			contentContainerStyle={styles.FlatList}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={<UpcomingEventsList categoryEventCount={events.length} categories={categories} />}
			renderItem={({ item, index }) => {
				return (
					<EventCard
						variant="full"
						width={Dimensions.get("screen").width - theme.spacing.l * 2}
						containerStyle={{ marginBottom: theme.spacing.l, marginLeft: theme.spacing.l }}
						height={250}
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
		paddingVertical: theme.spacing.l,
	},
});

export default EventsList;

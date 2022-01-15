import { useQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import Category from "../components/Category";

import EventCard from "../components/EventCard";
import { FETCH_EVENTS } from "../config/query";
import { EventQuery, FetchEventRequestVariables, FetchEventResponse } from "../config/request.types";
import { EventInfo } from "../config/schema.types";
import theme, { Box, Text } from "../utils/theme";

interface UpcomingEventsList {
	categoryEventCount: number;
	categories: any[];
	events: EventInfo[];
	isLoading: boolean;
}

const UpcomingEventsList = ({ categoryEventCount, categories, ...props }: UpcomingEventsList) => {
	return (
		<Box paddingVertical="l">
			<Text variant="title" marginLeft="l" fontSize={theme.fontSize.normal}>
				Upcoming Events
			</Text>
			<FlatList
				data={props.events}
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

	const upcomingEventFilter: EventQuery = useRef({
		upcoming: true,
	}).current;

	const { data: upcomingEvents, loading: isUpcomingEventsLoading } = useQuery<FetchEventResponse, FetchEventRequestVariables>(FETCH_EVENTS, {
		variables: { query: JSON.stringify(upcomingEventFilter), skip: 0, take: 10 },
	});

	console.log({ upcomingEvents });

	return (
		<FlatList
			data={events}
			contentContainerStyle={styles.FlatList}
			showsVerticalScrollIndicator={false}
			ListHeaderComponent={
				<UpcomingEventsList
					categoryEventCount={events.length}
					categories={categories}
					isLoading={isUpcomingEventsLoading}
					events={upcomingEvents?.events.events || []}
				/>
			}
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

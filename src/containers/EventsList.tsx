import { useQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";

import Category from "../components/Category";
import EventCard from "../components/EventCard";

import { FETCH_EVENTS, FETCH_UPCOMING_EVENTS } from "../config/query";
import { EventInfo } from "../config/schema.types";
import { EventQuery, FetchEventRequestVariables, FetchEventResponse } from "../config/request.types";
import { EventCategory, Filter } from "../types";

import { EventCategories } from "../utils/preconfig";
import theme, { Box, Text } from "../utils/theme";

interface UpcomingEventsList {
	category: EventCategory;
	categoryEventCount: number | null;
	events: EventInfo[];
	isLoading: boolean;
	onCategoryChange: (category: EventCategory) => void;
}

const UpcomingEventsList = ({ categoryEventCount, ...props }: UpcomingEventsList) => {
	const { data } = useQuery<FetchEventResponse, FetchEventRequestVariables>(FETCH_UPCOMING_EVENTS, {
		variables: { query: JSON.stringify({ upcoming: true }) },
		fetchPolicy: "no-cache",
	});

	return (
		<Box paddingVertical="l">
			<Text variant="title" marginLeft="l" fontSize={theme.fontSize.normal}>
				Upcoming Events
			</Text>
			<FlatList
				data={data?.events.events || []}
				keyExtractor={(item) => item.id}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.FlatList}
				renderItem={({ item, index }) => {
					return (
						<EventCard
							key={index}
							eventInfo={{ ...item, thumbnail: item.medias[0].link }}
							width={220}
							height={170}
							containerStyle={{ marginLeft: index === 0 ? theme.spacing.l : 0 }}
							onPress={() => {}}
						/>
					);
				}}
			/>
			<Text variant="title" marginLeft="l" marginTop="l" fontSize={theme.fontSize.normal}>
				Explore By Categories
			</Text>
			{EventCategories.length > 0 && (
				<ScrollView horizontal={true} style={{ marginTop: theme.spacing.l, marginBottom: theme.spacing.m }} showsHorizontalScrollIndicator={false}>
					{EventCategories.map((category, index) => (
						<Category
							key={index}
							name={category}
							selected={props.category === category}
							mr={"m"}
							ml={index === 0 ? "l" : "none"}
							onPress={props.onCategoryChange}
						/>
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
	const [category, setCategory] = useState<EventCategory>("House");

	const categoriedEventFilter = useRef<Filter<EventQuery>>({
		query: {
			category,
		},
		pagination: {
			skip: 0,
			take: 5,
		},
	});

	const { data, fetchMore } = useQuery<FetchEventResponse, FetchEventRequestVariables>(FETCH_EVENTS, {
		variables: { query: JSON.stringify(categoriedEventFilter.current.query), ...categoriedEventFilter.current.pagination },
	});

	const fetchMoreEvents = () => {
		//return if fetched all events
		if (data?.events.count === data?.events.events.length) return;

		let { pagination } = categoriedEventFilter.current;
		let skip = pagination.skip || 0;
		skip += 5;
		pagination.skip = skip;

		fetchMore<FetchEventResponse, FetchEventRequestVariables>({
			variables: {
				query: JSON.stringify(categoriedEventFilter.current.query),
				...categoriedEventFilter.current.pagination,
				skip,
			},
		});
	};

	return (
		<FlatList
			data={data?.events.events}
			keyExtractor={(item, index) => item.id}
			contentContainerStyle={styles.FlatList}
			showsVerticalScrollIndicator={false}
			onEndReached={fetchMoreEvents}
			onEndReachedThreshold={0.5}
			ListHeaderComponent={
				<UpcomingEventsList
					category={category}
					categoryEventCount={data?.events.count || 0}
					isLoading={false}
					events={[]}
					onCategoryChange={(category) => setCategory(category)}
				/>
			}
			renderItem={({ item, index }) => {
				return (
					<EventCard
						variant="full"
						eventInfo={{ ...item, thumbnail: item.medias[0].link }}
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

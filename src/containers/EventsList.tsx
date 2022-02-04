import React, { useContext, useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

import Category from "../components/Category";
import { EventCard } from "../components/Cards/";
import { EventCardSkelton, CategoriesSkelton } from "../components/Skelton";

import { FETCH_EVENTS, FETCH_UPCOMING_EVENTS } from "../config/query";
import { EventInfo } from "../config/schema.types";
import { EventQuery, FetchEventRequestVariables, FetchEventResponse } from "../config/request.types";
import { EventCategory, Filter } from "../types";

import { EventCategories } from "../utils/preconfig";
import theme, { Box, Text } from "../utils/theme";
import { ScreenNavigationProp } from "../navigation/types";
import { UIContext, UIContextInterface } from "../context/UIContext";
import EmptyList from "../components/EmptyList";

interface UpcomingEventsList {
	category: EventCategory;
	categoryEventCount: number | null;
	events: EventInfo[];
	isLoading: boolean;
	onCategoryChange: (category: EventCategory) => void;
	onEventJoin: (eventId: string) => void;
}

const UpcomingEventsList: React.FC<UpcomingEventsList> = ({ categoryEventCount, ...props }) => {
	const navigation = useNavigation<ScreenNavigationProp>();

	const { data, loading } = useQuery<FetchEventResponse, FetchEventRequestVariables>(FETCH_UPCOMING_EVENTS, {
		variables: { query: JSON.stringify({ upcoming: true }) },
		fetchPolicy: "no-cache",
	});

	return (
		<Box paddingVertical="l">
			<Text variant="title" marginLeft="l" fontSize={theme.fontSize.normal}>
				Upcoming Events
			</Text>
			{loading && !Boolean(data?.events.events.length) && (
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					{new Array(5).fill(1).map((_, index) => {
						return <EventCardSkelton isFullWidth={false} key={`half_card_${index}`} />;
					})}
				</ScrollView>
			)}
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
							width={240}
							height={170}
							containerStyle={{ marginLeft: index === 0 ? theme.spacing.l : 0 }}
							onJoin={() => props.onEventJoin(item.id)}
							onPress={() => {
								navigation.push("EventDetail", {
									slug: item.title,
								});
							}}
						/>
					);
				}}
				ListEmptyComponent={!loading ? <EmptyList message="No upcoming events." /> : null}
			/>
			<Text variant="title" marginLeft="l" marginTop="l" fontSize={theme.fontSize.normal}>
				Explore By Categories
			</Text>
			{EventCategories.length > 0 && (
				<ScrollView horizontal={true} style={{ marginTop: theme.spacing.l, marginBottom: theme.spacing.m }} showsHorizontalScrollIndicator={false}>
					{EventCategories.map((category, index) =>
						!props.isLoading ? (
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

			{props.isLoading && categoryEventCount === 0 && (
				<ScrollView showsVerticalScrollIndicator={false}>
					{new Array(5).fill(1).map((_, index) => {
						return <EventCardSkelton isFullWidth={true} key={`full_card_${index}`} />;
					})}
				</ScrollView>
			)}
			{categoryEventCount === 0 && !props.isLoading && (
				<Text variant="metaText16" textAlign="center" marginTop="l">
					No Events
				</Text>
			)}
		</Box>
	);
};

const EventsList = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const { onEventJoin } = useContext<UIContextInterface>(UIContext);

	const [category, setCategory] = useState<EventCategory>("House");

	const categoriedEventFilter = useRef<Filter<EventQuery>>({
		query: {
			category,
		},
		pagination: {
			skip: 0,
			take: 10,
		},
	});

	const { data, fetchMore, refetch, loading } = useQuery<FetchEventResponse, FetchEventRequestVariables>(FETCH_EVENTS, {
		variables: { query: JSON.stringify(categoriedEventFilter.current.query), ...categoriedEventFilter.current.pagination },
	});

	const fetchMoreEvents = () => {
		//return if fetched all events
		if (data?.events.count === data?.events.events.length) return;

		let { pagination } = categoriedEventFilter.current;
		let skip = pagination.skip || 0;
		skip += 10;
		pagination.skip = skip;

		fetchMore<FetchEventResponse, FetchEventRequestVariables>({
			variables: {
				query: JSON.stringify(categoriedEventFilter.current.query),
				...categoriedEventFilter.current.pagination,
				skip,
			},
		});
	};

	const onCategoryUpdate = (category) => {
		categoriedEventFilter.current.query.category = category;
		categoriedEventFilter.current.pagination.skip = 0;
		categoriedEventFilter.current.pagination.take = 10;
		refetch({ query: JSON.stringify(categoriedEventFilter.current.query), ...categoriedEventFilter.current.pagination });
		setCategory(category);
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
					isLoading={loading}
					events={[]}
					onCategoryChange={onCategoryUpdate}
					onEventJoin={onEventJoin}
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
						onJoin={() => onEventJoin(item.id)}
						onPress={() => {
							navigation.push("EventDetail", {
								slug: item.title,
							});
						}}
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

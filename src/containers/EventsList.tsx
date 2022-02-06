import React, { useContext, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

import { EventCard } from "../components/Cards/";
import { EventListHeader } from "../components/Header";

import { FETCH_EVENTS } from "../config/query";
import { EventCategory, Filter } from "../types";
import { EventQuery, FetchEventRequestVariables, FetchEventResponse } from "../config/request.types";

import theme from "../utils/theme";
import { useAuth } from "../utils/store";
import { ScreenNavigationProp } from "../navigation/types";
import { UIContext, UIContextInterface } from "../context/UIContext";

import UpcomingEventsList from "./UpcomingEventList";

const EventsList = () => {
	const userId = useAuth((store) => store.user.id);

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
		<>
			{!userId && (
				<EventListHeader category={category} categoryEventCount={data?.events.count || 0} isLoading={loading} onCategoryChange={onCategoryUpdate} />
			)}
			<FlatList
				data={data?.events.events}
				keyExtractor={(item, index) => item.id}
				contentContainerStyle={styles.FlatList}
				showsVerticalScrollIndicator={false}
				onEndReached={fetchMoreEvents}
				onEndReachedThreshold={0.5}
				ListHeaderComponent={
					userId ? (
						<>
							<UpcomingEventsList onEventJoin={onEventJoin} />
							<EventListHeader
								category={category}
								categoryEventCount={data?.events.count || 0}
								isLoading={loading}
								onCategoryChange={onCategoryUpdate}
							/>
						</>
					) : null
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
		</>
	);
};

const styles = StyleSheet.create({
	FlatList: {
		flexGrow: 1,
		paddingVertical: theme.spacing.l,
	},
});

export default EventsList;

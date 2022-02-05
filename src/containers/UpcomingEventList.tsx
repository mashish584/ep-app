import React, { useRef } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

import { EventCard } from "../components/Cards/";
import EmptyList from "../components/EmptyList";
import { EventCardSkelton } from "../components/Skelton";

import { FETCH_UPCOMING_EVENTS } from "../config/query";
import { FetchEventRequestVariables, FetchUserBookedEventsResponse } from "../config/request.types";

import theme, { Box, Text } from "../utils/theme";
import { useAuth } from "../utils/store";
import { ScreenNavigationProp } from "../navigation/types";

interface UpcomingEventsList {
	onEventJoin: (eventId: string) => void;
}

const UpcomingEventsList: React.FC<UpcomingEventsList> = (props) => {
	const userId = useAuth((store) => store.user.id);

	const navigation = useNavigation<ScreenNavigationProp>();

	const pagination = useRef({
		skip: 0,
		take: 10,
	});

	const { data, loading, fetchMore } = useQuery<FetchUserBookedEventsResponse, FetchEventRequestVariables>(FETCH_UPCOMING_EVENTS, {
		variables: { query: JSON.stringify({ user: userId }), skip: 0, take: 10 },
		skip: !userId,
	});

	const fetchMoreEvents = () => {
		//return if fetched all events
		if (data?.userBookedEvents.count === data?.userBookedEvents.events.length) return;

		let { skip } = pagination.current;
		skip += 10;
		pagination.current.skip = skip;

		fetchMore<FetchUserBookedEventsResponse, FetchEventRequestVariables>({
			variables: {
				query: JSON.stringify({ user: userId }),
				...pagination.current,
			},
		});
	};

	return (
		<Box paddingVertical="l">
			{userId && (
				<>
					<Text variant="title" marginLeft="l" fontSize={theme.fontSize.normal}>
						Upcoming Events
					</Text>
					{loading && !Boolean(data?.userBookedEvents.events.length) && (
						<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
							{new Array(5).fill(1).map((_, index) => {
								return <EventCardSkelton isFullWidth={false} key={`half_card_${index}`} />;
							})}
						</ScrollView>
					)}

					<FlatList
						data={data?.userBookedEvents.events || []}
						keyExtractor={(item) => item.id}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.FlatList}
						onEndReached={fetchMoreEvents}
						onEndReachedThreshold={0.5}
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
						ListEmptyComponent={loading ? <EmptyList message="No upcoming events.¸¸¸" /> : null}
					/>
				</>
			)}
		</Box>
	);
};
const styles = StyleSheet.create({
	FlatList: {
		flexGrow: 1,
		paddingVertical: theme.spacing.l,
	},
});

export default UpcomingEventsList;

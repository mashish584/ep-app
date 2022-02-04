import { useQuery } from "@apollo/client";
import React, { useRef } from "react";
import { Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { EventCard } from "../components/Cards";
import EmptyList from "../components/EmptyList";
import Header from "../components/Header";
import Theme from "../components/Theme";

import { FETCH_USER_EVENTS } from "../config/query";
import { FetchEventRequestVariables, FetchUserEventsResponse } from "../config/request.types";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import { useAuth } from "../utils/store";
import theme from "../utils/theme";

const MyEventsList: React.FC<StackNavigationProps<RootStackScreens, "MyEventsList">> = ({ navigation }) => {
	const userId = useAuth((store) => store.user.id);

	const pagination = useRef({
		skip: 0,
		take: 10,
	});

	const { data, fetchMore } = useQuery<FetchUserEventsResponse, FetchEventRequestVariables>(FETCH_USER_EVENTS, {
		variables: { query: JSON.stringify({ user: userId }), ...pagination.current },
	});

	const fetchMoreEvents = () => {
		if (data?.userEvents?.count === data?.userEvents.events.length) return;

		let { skip } = pagination.current;
		skip += 10;
		pagination.current.skip = skip;

		fetchMore<FetchUserEventsResponse, FetchEventRequestVariables>({
			variables: { query: JSON.stringify({ user: userId }), ...pagination.current },
		});
	};

	return (
		<Theme avoidTopNotch={true}>
			<Header headerTitle="My Events" position="relative" onBack={() => navigation.goBack()} />
			<FlatList
				data={data?.userEvents?.events}
				keyExtractor={(item, index) => `${item.id}_${index}`}
				contentContainerStyle={{ padding: theme.spacing.l, flexGrow: 1 }}
				renderItem={({ item, index }) => {
					return (
						<EventCard
							variant="full"
							eventInfo={{ ...item, thumbnail: item.medias[0].link }}
							width={Dimensions.get("screen").width - theme.spacing.l * 2}
							containerStyle={{ marginBottom: theme.spacing.l }}
							height={250}
							onJoin={() => {}}
							onPress={() => {
								navigation.push("EventDetail", {
									slug: item.title,
								});
							}}
							key={index}
						/>
					);
				}}
				ListEmptyComponent={<EmptyList message="No events created." />}
				showsVerticalScrollIndicator={false}
				onEndReached={fetchMoreEvents}
				onEndReachedThreshold={0.5}
			/>
		</Theme>
	);
};

export default MyEventsList;

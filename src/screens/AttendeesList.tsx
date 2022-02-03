import { useQuery } from "@apollo/client";
import React, { useRef } from "react";
import { FlatList } from "react-native";

import UserCard from "../components/Cards/UserCard";
import Header from "../components/Header";
import Theme from "../components/Theme";
import { FETCH_ATTENDEES } from "../config/query";
import { FetchAttendeesRequestVariables, FetchAttendeesResponse } from "../config/request.types";

import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import theme from "../utils/theme";

const AttendeesList: React.FC<StackNavigationProps<RootStackScreens, "AttendeesList">> = ({ navigation, route }) => {
	const eventId = route.params?.event;

	const pagination = useRef({
		skip: 0,
		take: 5,
	});

	const { data, fetchMore } = useQuery<FetchAttendeesResponse, FetchAttendeesRequestVariables>(FETCH_ATTENDEES, {
		variables: { query: JSON.stringify({ event: eventId }), ...pagination.current },
	});

	const fetchMoreAttendees = () => {
		//return if fetched all attendees
		if (data?.fetchAttendees.count === data?.fetchAttendees.users.length) return;

		let { skip } = pagination.current;
		skip += 5;
		pagination.current.skip = skip;

		fetchMore<FetchAttendeesResponse, FetchAttendeesRequestVariables>({
			variables: { query: JSON.stringify({ event: eventId }), ...pagination.current },
		});
	};

	return (
		<Theme avoidTopNotch={true}>
			<Header headerTitle="Attendees" position="relative" onBack={() => navigation.goBack()} />
			<FlatList
				data={data?.fetchAttendees.users}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ paddingHorizontal: theme.spacing.l, paddingVertical: theme.spacing.l }}
				renderItem={({ item, index }) => <UserCard key={item.id} name={item.fullname || item.username} email={item.email} profile={item.profile} />}
				showsVerticalScrollIndicator={false}
				onEndReached={fetchMoreAttendees}
				onEndReachedThreshold={0.5}
			/>
		</Theme>
	);
};

export default AttendeesList;

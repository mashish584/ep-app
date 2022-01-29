import React from "react";
import { ScrollView } from "react-native";

import UserCard from "../components/Cards/UserCard";
import Header from "../components/Header";
import Theme from "../components/Theme";

import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import theme from "../utils/theme";

const UsersList: React.FC<StackNavigationProps<RootStackScreens, "UsersList">> = ({ navigation }) => {
	return (
		<Theme avoidTopNotch={true}>
			<Header headerTitle="Attendees" position="relative" onBack={() => navigation.goBack()} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: theme.spacing.l, paddingVertical: theme.spacing.l }}>
				{new Array(14).fill(5).map((_, index) => {
					return <UserCard key={index} />;
				})}
			</ScrollView>
		</Theme>
	);
};

export default UsersList;

import React from "react";

import Avatar from "../components/Avatar";
import Theme from "../components/Theme";
import EventsList from "../containers/EventsList";

import { BottomStackScreens, StackNavigationProps } from "../navigation/types";

import { defaultAvatar } from "../utils/preconfig";
import { useAuth } from "../utils/store";
import { Box } from "../utils/theme";

const UserAvatar = ({ onPress }) => {
	const { fullname, username, profile } = useAuth((store) => store.user);

	if (!username) return null;

	return (
		<Box justifyContent="flex-end" paddingHorizontal="l" alignItems="flex-end">
			<Avatar name={fullname || username} profile={profile || defaultAvatar} onPress={onPress} />
		</Box>
	);
};

const Home: React.FC<StackNavigationProps<BottomStackScreens, "Home">> = ({ navigation }) => {
	return (
		<Theme avoidHomBar={true}>
			<UserAvatar onPress={() => navigation.navigate("Settings")} />
			<EventsList />
		</Theme>
	);
};

export default Home;

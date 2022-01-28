import React from "react";

import Avatar from "../components/Avatar";
import Theme from "../components/Theme";
import EventsList from "../containers/EventsList";

import { BottomStackScreens, StackNavigationProps } from "../navigation/types";
import { useAuth } from "../utils/store";

import { Box } from "../utils/theme";

const Home: React.FC<StackNavigationProps<BottomStackScreens, "Home">> = ({ navigation }) => {
	const userInfo = useAuth((store) => store.user);

	return (
		<Theme avoidHomBar={true}>
			<Box justifyContent="flex-end" paddingHorizontal="l" alignItems="flex-end">
				<Avatar name={userInfo?.fullname || userInfo?.username} profile={userInfo?.profile} onPress={() => navigation.navigate("Settings")} />
			</Box>
			<EventsList />
		</Theme>
	);
};

export default Home;

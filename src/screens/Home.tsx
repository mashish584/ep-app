import React from "react";
import Avatar from "../components/Avatar";

import Theme from "../components/Theme";
import EventsList from "../containers/EventsList";

import { Box } from "../utils/theme";

const Home = () => {
	return (
		<Theme avoidHomBar={true}>
			<Box justifyContent="flex-end" paddingHorizontal="l" alignItems="flex-end">
				<Avatar name="JD" profile="https://unsplash.it/100/100" onPress={() => {}} />
			</Box>
			<EventsList />
		</Theme>
	);
};

export default Home;

import React from "react";
import { ScrollView } from "react-native";

import EventCard from "../components/EventCard";
import Theme from "../components/Theme";

import { Text } from "../utils/theme";

const Home = () => {
	return (
		<Theme>
			<Text variant="title">Upcoming Events</Text>
			<ScrollView horizontal={true} style={{ flex: 1, marginTop: 50 }}>
				{new Array(10).fill(1).map((val, idx) => {
					return <EventCard width={220} height={164} onPress={() => {}} key={idx} />;
				})}
			</ScrollView>
		</Theme>
	);
};

export default Home;

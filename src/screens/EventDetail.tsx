import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import { ImageBackground, Dimensions, ScrollView } from "react-native";

import Theme from "../components/Theme";
import { Box, Text } from "../utils/theme";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const EventDetail = () => {
	return (
		<Theme avoidTopNotch={true}>
			<ImageBackground
				source={require("../assets/images/sample-1.jpg")}
				style={{ width: "100%", height: SCREEN_HEIGHT * 0.7, position: "absolute", top: 0, borderWidth: 1 }}
			/>
			<ScrollView contentContainerStyle={{ flex: 1, position: "relative", paddingTop: SCREEN_HEIGHT * 0.5 }}>
				<Box
					flex={1}
					borderTopLeftRadius="l"
					borderTopRightRadius="l"
					backgroundColor="secondary"
					paddingTop="xl"
					paddingHorizontal="l"
					style={{ marginTop: -50 }}>
					<Text variant="title">Reunion Party</Text>
					<Box marginTop="xs" flexDirection="row">
						<Box flexDirection="row">
							<FontAwesomeIcon icon={faCalendar} />
							<Text marginLeft="xs" variant="metaText12">
								10 January 2022
							</Text>
						</Box>
					</Box>
				</Box>
			</ScrollView>
		</Theme>
	);
};

export default EventDetail;

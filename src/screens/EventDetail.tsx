import React from "react";
import { ImageBackground, Dimensions, ScrollView } from "react-native";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

import Theme from "../components/Theme";
import TextIcon from "../components/TextIcon";
import UserChips from "../components/UserChips";

import theme, { Box, fonts, Text } from "../utils/theme";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const EventDetail = () => {
	return (
		<Theme avoidTopNotch={true}>
			<ImageBackground
				source={require("../assets/images/sample-1.jpg")}
				style={{ width: "100%", height: SCREEN_HEIGHT * 0.7, position: "absolute", top: 0, borderWidth: 1 }}
			/>
			<ScrollView contentContainerStyle={{ flexGrow: 1, position: "relative", paddingTop: SCREEN_HEIGHT * 0.5 }} showsVerticalScrollIndicator={false}>
				<Box
					flex={1}
					borderTopLeftRadius="l"
					borderTopRightRadius="l"
					backgroundColor="secondary"
					paddingTop="xl"
					paddingHorizontal="l"
					style={{ marginTop: -50 }}>
					<Text variant="title">Reunion Party</Text>
					<Box marginVertical="s" flexDirection="row">
						<TextIcon icon={faCalendar} text="10 January 2022" />
						<TextIcon icon={faClock} text="07:30 PM" />
					</Box>
					<TextIcon icon={faMapMarker} text="2972 Westheimer Rd. Santa Ana, Illinois 85486" />
					<Box flexDirection="row" justifyContent="space-between" minHeight={30} marginTop="s" alignItems="center">
						<Text variant="bold" color="primary">
							5 Joined
						</Text>
						<UserChips
							users={new Array(3).fill(1).map((i, _) => ({
								image: { uri: "https://unsplash.it/100/100" },
							}))}
							totalUsers={100}
							imageSize={30}
							onPress={() => {}}
						/>
					</Box>
					<Box>
						<Text variant="bold" fontSize={theme.fontSize.regular} marginTop="l">
							Description
						</Text>
						<Text marginTop="s" fontSize={theme.fontSize.md} color="black" style={{ fontFamily: fonts.primary_regular, lineHeight: 18 }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna,
							porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla.
						</Text>
					</Box>
				</Box>
			</ScrollView>
		</Theme>
	);
};

export default EventDetail;

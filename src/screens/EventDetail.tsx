import React from "react";
import { ImageBackground, Dimensions, ScrollView, StyleSheet } from "react-native";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

import Theme from "../components/Theme";
import TextIcon from "../components/TextIcon";
import UserChips from "../components/UserChips";

import theme, { Box, fonts, Text } from "../utils/theme";
import HostInfo from "../components/HostInfo";
import Button from "../components/Button";
import Header from "../components/Header";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const EventDetail = () => {
	return (
		<Theme avoidTopNotch={true}>
			<ImageBackground source={require("../assets/images/sample-1.jpg")} style={styles.background} />
			<Header />
			<ScrollView contentContainerStyle={styles.containerStyle} showsVerticalScrollIndicator={false}>
				<Box
					flex={1}
					borderTopLeftRadius="l"
					borderTopRightRadius="l"
					backgroundColor="secondary"
					paddingTop="xl"
					paddingHorizontal="l"
					style={{ marginTop: -50 }}>
					<Text variant="title" marginBottom="s">
						Reunion Party
					</Text>
					<Box marginVertical="s" flexDirection="row">
						<TextIcon icon={faCalendar} text="10 January 2022" />
						<TextIcon icon={faClock} text="07:30 PM" />
					</Box>
					<TextIcon icon={faMapMarker} text="2972 Westheimer Rd. Santa Ana, Illinois 85486" />
					<Box flexDirection="row" justifyContent="space-between" minHeight={30} marginTop="xl" alignItems="center">
						<Text variant="bold" color="primary">
							5 Joined
						</Text>
						<UserChips
							users={new Array(3).fill(1).map((i, _) => ({
								image: { uri: "https://unsplash.it/100/100" },
							}))}
							totalUsers={5}
							imageSize={30}
							onPress={() => {}}
						/>
					</Box>
					<Box marginTop="l">
						<Text variant="bold" fontSize={theme.fontSize.regular}>
							Description
						</Text>
						<Text marginTop="s" fontSize={theme.fontSize.md} color="black" style={{ fontFamily: fonts.primary_regular, lineHeight: 18 }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna,
							porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla.
						</Text>
					</Box>
					<Box marginTop="l">
						<Text variant="bold" fontSize={theme.fontSize.regular} marginBottom="s">
							Host
						</Text>
						<HostInfo username="John Doe" width={30} height={30}>
							<Text variant="metaText14" color="black">
								John Doe
							</Text>
						</HostInfo>
					</Box>
					<Button variant="primary" label="Join now - $99" containerStyle={{ width: "100%", marginVertical: theme.spacing.xl }} onPress={() => {}} />
				</Box>
			</ScrollView>
		</Theme>
	);
};

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: SCREEN_HEIGHT * 0.7,
		position: "absolute",
		top: 0,
		borderWidth: 1,
	},
	containerStyle: {
		flexGrow: 1,
		position: "relative",
		paddingTop: SCREEN_HEIGHT * 0.5,
	},
});

export default EventDetail;

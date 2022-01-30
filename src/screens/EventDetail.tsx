import React, { useContext } from "react";
import { ImageBackground, Dimensions, ScrollView, StyleSheet } from "react-native";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";

import Theme from "../components/Theme";
import TextIcon from "../components/TextIcon";
import UserChips from "../components/UserChips";
import HostInfo from "../components/HostInfo";
import Button from "../components/Button";
import Header from "../components/Header";

import theme, { Box, fonts, Text } from "../utils/theme";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import { FETCH_EVENT_DETAIL } from "../config/query";
import { FetchEventDetailResponse, FetchEventDetailRequestVariables } from "../config/request.types";
import { formatTimeStamp } from "../utils";
import { UIContext } from "../context/UIContext";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

const EventDetail: React.FC<StackNavigationProps<RootStackScreens, "EventDetail">> = ({ route, navigation }) => {
	const { onEventJoin } = useContext(UIContext);
	const slug = route.params?.slug;

	const { data, loading } = useQuery<FetchEventDetailResponse, FetchEventDetailRequestVariables>(FETCH_EVENT_DETAIL, {
		variables: { slug },
		onError: (err) => {
			console.log({ err });
		},
	});

	const eventDetail = data?.eventDetail;
	const thumbnail = eventDetail?.medias[0]?.link;

	if (loading) return null;

	return (
		<Theme avoidTopNotch={true}>
			<ImageBackground source={{ uri: thumbnail }} style={styles.background} />
			<Header onBack={navigation.goBack} />
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
						{eventDetail?.title}
					</Text>
					<Box marginVertical="s" flexDirection="row">
						<TextIcon icon={faCalendar} text={formatTimeStamp(eventDetail?.eventTimestamp, "dddd DD MMM")} />
						<TextIcon icon={faClock} text={formatTimeStamp(eventDetail?.eventTimestamp, "HH:mm A")} />
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
							onPress={() => {
								navigation.navigate("UsersList", {
									event: 1,
								});
							}}
						/>
					</Box>
					<Box marginTop="l">
						<Text variant="bold" fontSize={theme.fontSize.regular}>
							Description
						</Text>
						<Text marginTop="s" fontSize={theme.fontSize.md} color="black" style={{ fontFamily: fonts.primary_regular, lineHeight: 18 }}>
							{eventDetail?.description}
						</Text>
					</Box>
					<Box marginTop="l">
						<Text variant="bold" fontSize={theme.fontSize.regular} marginBottom="s">
							Host
						</Text>
						<HostInfo username="John Doe" width={30} height={30}>
							<Text variant="metaText14" color="black" textTransform="capitalize">
								{eventDetail?.owner.username}
							</Text>
						</HostInfo>
					</Box>
					<Button
						variant="primary"
						label={`Join now - $${eventDetail?.price}`}
						containerStyle={{ width: "100%", marginVertical: theme.spacing.xl }}
						onPress={onEventJoin}
					/>
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
		backgroundColor: theme.colors.gray,
	},
	containerStyle: {
		flexGrow: 1,
		position: "relative",
		paddingTop: SCREEN_HEIGHT * 0.5,
	},
});

export default EventDetail;

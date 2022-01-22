import React from "react";
import { Dimensions, Image, ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faCamera } from "@fortawesome/free-solid-svg-icons";

import Button from "../components/Button";
import Texter from "../components/Texter";
import Theme from "../components/Theme";

import { SetttingsMenu } from "../utils/preconfig";
import theme, { Box, pallette, Text } from "../utils/theme";
import { generateBoxShadowStyle } from "../utils";
import { BottomStackScreens, RootStackScreens, StackNavigationProps } from "../navigation/types";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const Profile: React.FC<StackNavigationProps<BottomStackScreens & RootStackScreens, "Settings">> = ({ navigation }) => {
	return (
		<Theme avoidTopNotch={true} avoidHomBar={true}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.layer} />
				<Box alignItems="center">
					<Box width={150} height={150} mb="l" backgroundColor="placeholder" style={{ ...styles.imageShadow, borderRadius: 75 }}>
						<Image source={{ uri: "https://unsplash.it/300/300" }} style={{ width: "100%", height: "100%", borderRadius: 75 }} resizeMode="cover" />
						<TouchableOpacity style={styles.camera}>
							<FontAwesomeIcon icon={faCamera} size={12} color={theme.colors.secondary} />
						</TouchableOpacity>
					</Box>
					<Texter
						variant="bold"
						style={{ fontSize: 29, color: pallette.rgb.black(0.86) }}
						config={{
							DOE: {
								variant: "light",
							},
						}}>
						JOHN DOE
					</Texter>
					<Text variant="bold" marginVertical="xs" fontSize={theme.fontSize.sm} style={{ color: pallette.rgb.black(0.76) }}>
						john@example.com
					</Text>
					<Text
						variant="light"
						marginVertical="s"
						paddingHorizontal="xl"
						fontSize={theme.fontSize.xs}
						style={{ color: pallette.rgb.black(0.6), textAlign: "center" }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae laudantium voluptatem commodi placeat. Repellendus, cum odio voluptas
						voluptatem commodi unde?
					</Text>
					<Button
						variant="primary"
						label="Edit Profile"
						containerStyle={{ width: 120, minHeight: 32, borderRadius: 50 }}
						textStyle={{ fontSize: theme.fontSize.md }}
						onPress={() => navigation.navigate("ProfileUpdate")}
					/>
				</Box>
				<Box marginHorizontal="l" margin="xl">
					{SetttingsMenu.map((menu, index) => {
						const Icon = menu.icon;
						return (
							<TouchableOpacity key={index} activeOpacity={0.8}>
								<Box
									flexDirection="row"
									paddingHorizontal="m"
									minHeight={105}
									alignItems="center"
									justifyContent="space-between"
									mb="l"
									borderColor="gray"
									backgroundColor="secondary"
									borderRadius="m"
									style={styles.cardShadow}>
									<Box flexDirection="row">
										<Icon fill="primary" fillOpacity={0.84} />
										<Box ml="l">
											<Text variant="bold" fontSize={theme.fontSize.normal}>
												{menu.title}
											</Text>
											{menu.description ? <Text variant="metaText12">{menu.description}</Text> : null}
										</Box>
									</Box>
									<TouchableOpacity>
										<FontAwesomeIcon icon={faAngleRight} size={25} color={theme.colors.gray} />
									</TouchableOpacity>
								</Box>
							</TouchableOpacity>
						);
					})}
				</Box>
			</ScrollView>
		</Theme>
	);
};

const styles = StyleSheet.create({
	layer: {
		height: SCREEN_WIDTH,
		backgroundColor: pallette.rgb.primary(0.88),
		borderRadius: SCREEN_WIDTH / 2,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		transform: [{ scaleX: 2.5 }, { translateY: -SCREEN_WIDTH * 0.4 }],
		marginBottom: -SCREEN_WIDTH * 0.6,
	},
	camera: {
		position: "absolute",
		bottom: 7,
		right: 15,
		backgroundColor: theme.colors.primary,
		width: 24,
		height: 24,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	cardShadow: { ...generateBoxShadowStyle(0, 1, pallette.rgb.black(0.05), 1, 13, 4, pallette.rgb.black(0.1)) },
	imageShadow: { ...generateBoxShadowStyle(0, 8, pallette.rgb.black(0.5), 0.5, 6, 4, pallette.rgb.black(0.1)) },
});

export default Profile;

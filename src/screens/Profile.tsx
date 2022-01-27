import React, { useMemo, useState } from "react";
import { Dimensions, Image, ScrollView, TouchableOpacity, View, StyleSheet, ImageSourcePropType } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";

import Button from "../components/Button";
import Texter, { Config } from "../components/Texter";
import Theme from "../components/Theme";
import Logout from "../components/Modals/Logout";

import { SetttingsMenu } from "../utils/preconfig";
import theme, { Box, pallette, Text } from "../utils/theme";
import { generateRNFile, openGallery } from "../utils/media";
import { generateBoxShadowStyle } from "../utils";
import { BottomStackScreens, RootStackScreens, StackNavigationProps } from "../navigation/types";
import { ProfileUpdateResponse, ProfileUploadVariables } from "../config/request.types";
import { PROFILE_UPLOAD_MUTATION } from "../config/mutations";
import { useAuth } from "../utils/store";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const getNameConfig = (fullName: string): Record<string, Config> => {
	if (fullName) {
		const words = fullName.split(" ");
		const lastName = words.length > 1 ? words.pop() : "";

		return {
			[lastName as string]: {
				variant: "light",
			},
		};
	}

	return {};
};

const Profile: React.FC<StackNavigationProps<BottomStackScreens & RootStackScreens, "Settings">> = ({ navigation }) => {
	const [userInfo, updateUserInfo, removeToken] = useAuth((store) => [store.user, store.setUser, store.removeToken]);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [selectedProfileImage, setSelectedProfileImage] = useState<ImageSourcePropType | null>(null);

	const [onProfileUpload] = useMutation<ProfileUpdateResponse, ProfileUploadVariables>(PROFILE_UPLOAD_MUTATION, {
		onCompleted: (data) => {
			if (data.updateProfile) {
				updateUserInfo({ ...userInfo, ...data.updateProfile });
			}
		},
		onError: (error) => {
			console.log({ error });
		},
	});

	const onGalleryOpen = async () => {
		const response = await openGallery({ cropping: true });
		if (response?.length) {
			setSelectedProfileImage(response[0]);
			const file = generateRNFile(response[0].uri, response[0]?.name);
			onProfileUpload({ variables: { profile: file } });
		}
	};

	const getConfig = useMemo(() => getNameConfig(userInfo.fullname), [userInfo.fullname]);

	return (
		<Theme avoidTopNotch={true} avoidHomBar={true}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.layer} />
				<Box alignItems="center">
					<Box width={150} height={150} mb="l" backgroundColor="placeholder" style={{ ...styles.imageShadow, borderRadius: 75 }}>
						<Image
							source={
								selectedProfileImage
									? selectedProfileImage
									: { uri: userInfo?.profile || "https://avatars.dicebear.com/v2/identicon/8b2a644a959335af9df45bb9710df09e.png" }
							}
							style={{ width: "100%", height: "100%", borderRadius: 75 }}
							resizeMode="cover"
						/>
						<TouchableOpacity onPress={onGalleryOpen} style={styles.camera}>
							<FontAwesomeIcon icon={faCamera} size={12} color={theme.colors.secondary} />
						</TouchableOpacity>
					</Box>
					{userInfo?.fullname && (
						<Texter variant="bold" style={{ fontSize: 29, color: pallette.rgb.black(0.86) }} config={getConfig}>
							{userInfo?.fullname}
						</Texter>
					)}
					<Text variant="bold" marginVertical="xs" fontSize={theme.fontSize.sm} style={{ color: pallette.rgb.black(0.76) }}>
						{userInfo?.email}
					</Text>
					{userInfo?.bio && (
						<Text
							variant="light"
							marginVertical="s"
							paddingHorizontal="xl"
							fontSize={theme.fontSize.xs}
							style={{ color: pallette.rgb.black(0.6), textAlign: "center" }}>
							{userInfo?.bio}
						</Text>
					)}
					<Button
						variant="primary"
						label="Edit Profile"
						containerStyle={{
							width: 120,
							minHeight: 32,
							borderRadius: 50,
							marginTop: userInfo?.bio !== null ? theme.spacing.none : theme.spacing.s,
						}}
						textStyle={{ fontSize: theme.fontSize.md }}
						onPress={() => navigation.navigate("ProfileUpdate")}
					/>
				</Box>
				<Box marginHorizontal="l" margin="xl">
					{SetttingsMenu.map((menu, index) => {
						const Icon = menu.icon;
						return (
							<TouchableOpacity
								onPress={() => {
									if (menu.isLogout) {
										setShowLogoutModal(true);
									}
								}}
								key={index}
								activeOpacity={0.8}>
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
			<Logout
				visible={showLogoutModal}
				onDismiss={() => {
					setShowLogoutModal(false);
				}}
				onLogout={() => {
					removeToken();
					navigation.navigate("AuthScreen");
				}}
			/>
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

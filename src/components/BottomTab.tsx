import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faSearch, faBell, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme, { Box, pallette } from "../utils/theme";
import { generateBoxShadowStyle } from "../utils";
import { BottomStackScreens, RootStackScreens, StackNavigationProps } from "../navigation/types";
import { useAuth } from "../utils/store";

type Screens = keyof RootStackScreens | keyof BottomStackScreens;

const BottomTab: React.FC<StackNavigationProps<RootStackScreens, "BottomStack"> & BottomTabBarProps> = (props) => {
	const userId = useAuth((store) => store.user?.id);
	const { bottom } = useSafeAreaInsets();
	const { index } = props.state;

	const onNavigate = (route: Screens) => {
		if (!userId && route === "Settings") {
			Alert.alert("EP", "Please login to continue.", [
				{
					text: "Login now",
					onPress: () => props.navigation.navigate("AuthScreen"),
				},
				{
					text: "Cancel",
				},
			]);
			return;
		}

		props.navigation.navigate(route);
	};

	return (
		<Box style={styles.container}>
			<Box
				flexDirection="row"
				alignItems="center"
				minHeight={55}
				paddingHorizontal="m"
				justifyContent="space-around"
				style={{ marginBottom: bottom }}>
				<Box flexDirection="row" flex={0.5} justifyContent="space-around">
					<TouchableOpacity style={styles.tab} onPress={() => onNavigate("Home")}>
						<FontAwesomeIcon icon={faHome} color={index === 0 ? theme.colors.primary : theme.colors.darkGray} size={20} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab} onPress={() => onNavigate("Search")}>
						<FontAwesomeIcon icon={faSearch} color={index === 1 ? theme.colors.primary : theme.colors.darkGray} size={20} />
					</TouchableOpacity>
				</Box>
				<TouchableOpacity onPress={() => onNavigate("AddEvent")} style={styles.add}>
					<FontAwesomeIcon icon={faPlus} color="#FFFFFF" />
				</TouchableOpacity>
				<Box flexDirection="row" flex={0.5} justifyContent="space-around">
					<TouchableOpacity style={styles.tab} onPress={() => onNavigate("Notifications")}>
						<FontAwesomeIcon icon={faBell} color={index === 2 ? theme.colors.primary : theme.colors.darkGray} size={20} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab} onPress={() => onNavigate("Settings")}>
						<FontAwesomeIcon icon={faUser} color={index === 3 ? theme.colors.primary : theme.colors.darkGray} size={20} />
					</TouchableOpacity>
				</Box>
			</Box>
		</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: pallette.hex.secondary,
		...generateBoxShadowStyle(0, -2, pallette.rgb.black(0.1), 1, 10, 4, pallette.rgb.black(0.1)),
	},
	tab: {
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	add: {
		width: 50,
		height: 50,
		backgroundColor: theme.colors.primary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		marginTop: -50,
		...generateBoxShadowStyle(0, 4, pallette.rgb.black(0.1), 1, 10, 4, pallette.rgb.black(0.1)),
	},
});

export default BottomTab;

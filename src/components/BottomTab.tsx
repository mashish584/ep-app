import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faSearch, faBell, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme, { Box, pallette } from "../utils/theme";
import { generateBoxShadowStyle } from "../utils";
import { BottomStackScreens, StackNavigationProps } from "../navigation/types";

type TabBarProps = BottomTabBarProps & StackNavigationProps<BottomStackScreens, "Home">;
interface BottomTabs extends TabBarProps {}

const BottomTab = (props: BottomTabs) => {
	const { bottom } = useSafeAreaInsets();

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
					<TouchableOpacity style={styles.tab} onPress={() => props.navigation.navigate("Home")}>
						<FontAwesomeIcon icon={faHome} color={theme.colors.darkGray} size={20} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab}>
						<FontAwesomeIcon icon={faSearch} color={theme.colors.darkGray} size={20} />
					</TouchableOpacity>
				</Box>
				<TouchableOpacity style={styles.add}>
					<FontAwesomeIcon icon={faPlus} color="#FFFFFF" />
				</TouchableOpacity>
				<Box flexDirection="row" flex={0.5} justifyContent="space-around">
					<TouchableOpacity style={styles.tab}>
						<FontAwesomeIcon icon={faBell} color={theme.colors.darkGray} size={20} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab} onPress={() => props.navigation.navigate("Settings")}>
						<FontAwesomeIcon icon={faUser} color={theme.colors.darkGray} size={20} />
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

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faSearch, faBell, faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme, { Box, pallette } from "../utils/theme";
import { generateBoxShadowStyle } from "../utils";

const BottomTab = (props: BottomTabBarProps) => {
	const { bottom } = useSafeAreaInsets();

	return (
		<Box style={styles.container}>
			<Box
				flexDirection="row"
				alignItems="center"
				minHeight={65}
				paddingHorizontal="m"
				justifyContent="space-around"
				style={{ marginBottom: bottom }}>
				<TouchableOpacity>
					<FontAwesomeIcon icon={faHome} />
				</TouchableOpacity>
				<TouchableOpacity>
					<FontAwesomeIcon icon={faSearch} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.add}>
					<FontAwesomeIcon icon={faPlus} color="#FFFFFF" />
				</TouchableOpacity>
				<TouchableOpacity>
					<FontAwesomeIcon icon={faBell} />
				</TouchableOpacity>
				<TouchableOpacity>
					<FontAwesomeIcon icon={faUser} />
				</TouchableOpacity>
			</Box>
		</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: pallette.hex.secondary,
		...generateBoxShadowStyle(0, -2, pallette.rgb.black(0.1), 1, 10, 4, pallette.rgb.black(0.1)),
	},
	add: {
		width: 50,
		height: 50,
		backgroundColor: theme.colors.primary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
		marginTop: -60,
		...generateBoxShadowStyle(0, 4, pallette.rgb.black(0.1), 1, 10, 4, pallette.rgb.black(0.1)),
	},
});

export default BottomTab;

import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme, { Box, pallette } from "../utils/theme";

interface Header {
	onBack?: () => void;
}

const Header: React.FC<Header> = ({ onBack }) => {
	const { top } = useSafeAreaInsets();
	return (
		<Box
			width={"100%"}
			minHeight={60}
			left={theme.spacing.l}
			top={top}
			borderColor="secondary"
			position="absolute"
			justifyContent="center"
			zIndex={2}>
			<RectButton onPress={onBack} style={styles.backButton}>
				<FontAwesomeIcon icon={faAngleLeft} size={20} />
			</RectButton>
		</Box>
	);
};

const styles = StyleSheet.create({
	backButton: {
		width: 30,
		height: 30,
		backgroundColor: pallette.hex.secondary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: theme.borderRadii.s,
	},
});

export default Header;

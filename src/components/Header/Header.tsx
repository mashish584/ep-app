import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import theme, { Box, pallette, Text } from "../../utils/theme";

interface Header {
	onBack?: () => void;
	backButtonStyle?: ViewStyle;
	headerTitle?: string;
	position?: "relative" | "absolute";
}

const Header: React.FC<Header> = ({ onBack, headerTitle, ...props }) => {
	const { top } = useSafeAreaInsets();
	return (
		<Box
			width={"100%"}
			minHeight={60}
			flexDirection="row"
			paddingHorizontal="l"
			borderColor="secondary"
			position={props.position || "absolute"}
			justifyContent={headerTitle ? "space-between" : "flex-start"}
			alignItems="center"
			style={{ marginTop: top }}
			zIndex={2}>
			<RectButton onPress={onBack} style={[styles.backButton, props.backButtonStyle]}>
				<FontAwesomeIcon icon={faAngleLeft} size={20} />
			</RectButton>
			{headerTitle ? (
				<Text variant="bold" fontSize={theme.fontSize.normal}>
					{headerTitle}
				</Text>
			) : null}
			<Box width={30} />
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

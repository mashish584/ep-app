import React from "react";
import { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../utils/theme";

interface BottomSheetTheme {
	height?: number;
	style?: ViewStyle;
}

const BottomSheetTheme: React.FC<BottomSheetTheme> = ({ children, height, ...props }) => {
	const insets = useSafeAreaInsets();
	return (
		<Box
			minHeight={height}
			backgroundColor="secondary"
			borderRadius="s"
			paddingHorizontal="l"
			paddingVertical="xl"
			style={{ ...props.style, marginBottom: Math.max(insets.bottom, 16) }}>
			{children}
		</Box>
	);
};

export default BottomSheetTheme;

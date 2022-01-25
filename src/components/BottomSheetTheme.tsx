import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "../utils/theme";

interface BottomSheetTheme {
	height?: number;
}

const BottomSheetTheme: React.FC<BottomSheetTheme> = ({ children, height }) => {
	const insets = useSafeAreaInsets();
	return (
		<Box height={height} backgroundColor="secondary" borderRadius="s" padding="l" style={{ marginBottom: Math.max(insets.bottom, 16) }}>
			{children}
		</Box>
	);
};

export default BottomSheetTheme;

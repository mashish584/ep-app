import { ViewStyle, Animated } from "react-native";

export type BottomSheetProps = {
	children: (fn: () => void) => void;
	onDismiss: () => void;
	visible: boolean;
	containerStyle?: ViewStyle;
	stripStyle?: ViewStyle;
	disableGesture?: boolean;
};

export type BottomSheetState = { panY: Animated.Value };

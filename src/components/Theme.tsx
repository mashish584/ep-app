import React, { ReactNode } from "react";
import { View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Theme {
	children: ReactNode;
}

const Theme = ({ children }: Theme) => {
	const insets = useSafeAreaInsets();

	return <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>{children}</View>;
};

export default Theme;

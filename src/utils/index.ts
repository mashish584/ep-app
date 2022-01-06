import { Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export const generateBoxShadowStyle = (
	xOffset: number,
	yOffset: number,
	shadowColorIos: string,
	shadowOpacity: number,
	shadowRadius: number,
	elevation: number,
	shadowColorAndroid: string,
) => {
	if (isIOS) {
		return {
			shadowColor: shadowColorIos,
			shadowOffset: { width: xOffset, height: yOffset },
			shadowOpacity,
			shadowRadius,
		};
	} else if (isAndroid) {
		return {
			elevation,
			shadowColor: shadowColorAndroid,
		};
	}
};

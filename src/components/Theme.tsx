import React, { ReactNode } from "react";
import { ImageBackground, ImageStyle, View, ViewStyle, ImageSourcePropType, StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ThemeProps {
	children: ReactNode;
	avoidTopNotch?: boolean;
}

type NoImageSourceProps = ThemeProps & { isImageContainer?: false; viewContainerStyle?: ViewStyle | ViewStyle[] };
type ImageSourceProps = ThemeProps & { isImageContainer: true; source: ImageSourcePropType; imageContainerStyle?: ImageStyle | ImageStyle[] };

function Theme(props: NoImageSourceProps): JSX.Element;
function Theme(props: ImageSourceProps): JSX.Element;
function Theme(
	props: ThemeProps & {
		isImageContainer?: boolean;
		source?: ImageSourcePropType;
		viewContainerStyle?: ViewStyle | ViewStyle[];
		imageContainerStyle?: ImageStyle | ImageStyle[];
	},
): JSX.Element {
	const { top, bottom } = useSafeAreaInsets();

	const source = props.source as ImageSourcePropType;

	const safeAreaStyle = { paddingTop: props.avoidTopNotch ? 0 : Math.max(top, 16), paddingBottom: Math.max(bottom, 16) };

	return props.isImageContainer ? (
		<ImageBackground source={source} style={[styles.container, props.imageContainerStyle, safeAreaStyle]}>
			{props.children}
		</ImageBackground>
	) : (
		<View style={[styles.container, props.viewContainerStyle, safeAreaStyle]}>{props.children}</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Theme;

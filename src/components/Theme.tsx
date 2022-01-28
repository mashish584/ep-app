import React, { ReactNode } from "react";
import { ImageBackground, ImageStyle, View, ViewStyle, ImageSourcePropType, StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import UI from "../containers/UI";
import { pallette } from "../utils/theme";

interface ThemeProps {
	children: ReactNode;
	avoidTopNotch?: boolean;
	avoidHomBar?: boolean;
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

	const safeAreaStyle = { paddingTop: props.avoidTopNotch ? 0 : Math.max(top, 16), paddingBottom: props.avoidHomBar ? 0 : Math.max(bottom, 16) };

	return props.isImageContainer ? (
		<ImageBackground source={source} style={[styles.container, props.imageContainerStyle, safeAreaStyle]}>
			{props.children}
			<UI />
		</ImageBackground>
	) : (
		<View style={[styles.container, props.viewContainerStyle, safeAreaStyle]}>
			{props.children}
			<UI />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: pallette.hex.secondary,
	},
});

export default Theme;

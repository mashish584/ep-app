import { ViewStyle } from "react-native";
import { generateBoxShadowStyle } from "../../utils";
import theme, { pallette } from "../../utils/theme";

export const cardStyle: ViewStyle = {
	minHeight: 85,
	flexDirection: "row",
	paddingHorizontal: theme.spacing.l,
	alignItems: "center",
	backgroundColor: theme.colors.secondary,
	borderRadius: theme.spacing.m,
	marginBottom: theme.spacing.m,
	width: "100%",
	...generateBoxShadowStyle(0, 0, pallette.rgb.black(0.1), 1, 14, 4, pallette.rgb.black(0.1)),
};

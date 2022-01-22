import { ResponsiveValue } from "@shopify/restyle";
import { SvgProps } from "react-native-svg";
import { Theme } from "../../utils/theme";

type colorType = ResponsiveValue<keyof Theme["colors"], Theme>;

export interface SVG extends SvgProps {
	fill: colorType;
	fillOpacity: number;
}

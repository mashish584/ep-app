import * as React from "react";
import Svg, { Path } from "react-native-svg";
import theme from "../../utils/theme";
import { SVG } from "./types";

const Wallet = ({ fill = "primary", fillOpacity = 1, ...props }: SVG) => (
	<Svg width={37} height={36} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M34.267 4v4.56A4.058 4.058 0 0 1 36.133 12v12c0 1.48-.765 2.74-1.866 3.44V32c0 2.2-1.68 4-3.734 4H4.4C2.328 36 .667 34.2.667 32V4c0-2.2 1.661-4 3.733-4h26.133c2.054 0 3.734 1.8 3.734 4ZM32.4 24V12H19.334v12h13.067ZM4.399 32V4h26.134v4h-11.2c-2.054 0-3.734 1.8-3.734 4v12c0 2.2 1.68 4 3.734 4h11.2v4H4.399Zm17.734-14c0-1.656 1.253-3 2.8-3 1.546 0 2.8 1.344 2.8 3 0 1.658-1.254 3-2.8 3-1.547 0-2.8-1.342-2.8-3Z"
			fill={theme.colors[fill]}
			fillOpacity={fillOpacity}
		/>
	</Svg>
);

export default Wallet;

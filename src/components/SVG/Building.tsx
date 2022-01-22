import * as React from "react";
import Svg, { Path } from "react-native-svg";

import theme from "../../utils/theme";
import { SVG } from "./types";

const Building = ({ fill = "primary", fillOpacity = 1, ...props }: SVG) => (
	<Svg width={34} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17 0v6.667h16.667V30H.333V0H17ZM3.667 26.667H7v-3.334H3.667v3.334ZM7 20H3.667v-3.333H7V20Zm-3.333-6.667H7V10H3.667v3.333ZM7 6.667H3.667V3.333H7v3.334Zm3.333 20h3.334v-3.334h-3.334v3.334ZM13.667 20h-3.334v-3.333h3.334V20Zm-3.334-6.667h3.334V10h-3.334v3.333Zm3.334-6.666h-3.334V3.333h3.334v3.334Zm3.333 20h13.333V10H17v3.333h3.333v3.334H17V20h3.333v3.333H17v3.334Zm10-13.334h-3.333v3.334H27v-3.334ZM23.667 20H27v3.333h-3.333V20Z"
			fill={theme.colors[fill]}
			fillOpacity={fillOpacity}
		/>
	</Svg>
);

export default Building;

import * as React from "react";
import Svg, { Path } from "react-native-svg";

import theme from "../../utils/theme";
import { SVG } from "./types";

const Power = ({ fill = "primary", fillOpacity = 1, ...props }: SVG) => (
	<Svg width={27} height={29} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<Path d="M15.188 0h-3.376v16.875h3.376V0Z" fill={theme.colors[fill]} fillOpacity={fillOpacity} />
		<Path
			d="m21.195 4.117-2.447 2.447c2.92 1.772 4.877 4.961 4.877 8.623 0 5.586-4.54 10.125-10.125 10.125-5.586 0-10.125-4.54-10.125-10.125 0-3.662 1.957-6.851 4.86-8.64l-2.43-2.43A13.434 13.434 0 0 0 0 15.187c0 7.459 6.041 13.5 13.5 13.5S27 22.646 27 15.187c0-4.59-2.295-8.64-5.805-11.07Z"
			fill={theme.colors[fill]}
			fillOpacity={fillOpacity}
		/>
	</Svg>
);

export default Power;

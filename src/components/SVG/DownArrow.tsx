import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const DownArrow: React.FC<SvgProps> = ({ width, height, ...props }) => (
	<Svg width={14} height={21} viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<Path d="M2 2L6.84615 7.65384L12.5 2" stroke="white" strokeWidth={3} strokeLinecap="round" />
		<Path d="M2 12.6538L6.84615 18.3077L12.5 12.6538" stroke="white" strokeWidth={3} strokeLinecap="round" />
	</Svg>
);

export default DownArrow;

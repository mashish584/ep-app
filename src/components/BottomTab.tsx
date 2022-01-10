import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Box, Text } from "../utils/theme";

const BottomTab = ({ props }: BottomTabBarProps) => {
	console.log({ props });
	return (
		<Box>
			<Text>asda</Text>
		</Box>
	);
};

export default BottomTab;

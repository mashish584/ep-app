import React from "react";
import { TextStyle } from "react-native";
import { ResponsiveValue } from "@shopify/restyle";

import { Text, Theme, Box } from "../utils/theme";

type variantType = ResponsiveValue<keyof Theme["textVariants"], Theme>;
type colorType = ResponsiveValue<keyof Theme["colors"], Theme>;

export type Config = {
	color?: colorType;
	variant?: variantType;
	style?: TextStyle;
	onPress?: () => void;
};

interface Texter {
	config: Record<string, Config>;
	children: string;
	variant?: variantType;
	style?: TextStyle;
	color?: colorType;
}

const Texter = ({ children, config, ...props }: Texter) => {
	if (!Object.keys(config)?.length) {
		return <Text {...props}>{children}</Text>;
	}

	const renderText = (text: string) => {
		const textCollection = text.split(" ");
		const jsx: JSX.Element[] = [];

		textCollection.map((text, index) => {
			const isKeysInConfig = Object.keys(config).includes(text);

			if (isKeysInConfig) {
				const innerProps = config[text];

				jsx.push(
					<Text key={index} {...{ ...props, ...innerProps }}>
						{text}{" "}
					</Text>,
				);
			} else {
				jsx.push(
					<Text key={index} {...props}>
						{text}{" "}
					</Text>,
				);
			}
		});

		return jsx;
	};

	return children ? (
		<Box flexDirection="row" alignItems="center">
			{renderText(children)}
		</Box>
	) : null;
};

export default Texter;

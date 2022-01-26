import React from "react";
import theme, { Box, pallette, Text } from "../../utils/theme";

interface Modalheader {
	title: string;
	description?: string;
}

const ModalHeader: React.FC<Modalheader> = ({ title, description }) => {
	return (
		<Box mb="s">
			<Text variant="bold" fontSize={theme.fontSize.normal}>
				{title}
			</Text>
			{description && (
				<Text variant="metaText14" marginVertical="s" style={{ color: pallette.rgb.black(0.6) }}>
					{description}
				</Text>
			)}
		</Box>
	);
};

export default ModalHeader;

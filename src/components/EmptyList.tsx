import React from "react";

import { Text } from "../utils/theme";

interface EmptyList {
	message: string;
}

const EmptyList: React.FC<EmptyList> = ({ message }) => {
	return (
		<Text variant="metaText16" textAlign="center" marginTop="l" style={{ width: "100%" }}>
			{message}
		</Text>
	);
};

export default EmptyList;

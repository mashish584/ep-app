import React from "react";
import { Box, pallette } from "../../utils/theme";

const CardSkelton = () => {
	return <Box width={"100%"} minHeight={85} borderRadius="s" mb="s" style={{ backgroundColor: pallette.rgb.gray(0.3) }} />;
};

export default CardSkelton;

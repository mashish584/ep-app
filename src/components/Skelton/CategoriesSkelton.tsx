import React from "react";
import { Box, pallette, Spacing } from "../../utils/theme";

interface CategoriesSkelton {
	ml?: Spacing;
}

const CategoriesSkelton = ({ ml }: CategoriesSkelton) => {
	return <Box width={90} height={25} borderRadius="s" marginRight={"m"} marginLeft={ml} style={{ backgroundColor: pallette.rgb.gray(0.3) }} />;
};

export default CategoriesSkelton;

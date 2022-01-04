import { createTheme, createBox, createText } from "@shopify/restyle";

const fontFamily = "Helvetica";

export const pallette = {
	hex: {
		primary: "#FC6868",
		secondary: "#FFFFFF",
		gray: "#C4C4C4",
		black: "#262728",
	},
	rgb: {
		primary: (alpha: number) => `rgba(252, 104, 104, ${alpha})`,
		secondary: (alpha: number) => `rgba(255, 255, 255, ${alpha})`,
		gray: (alpha: number) => `rgba(196, 196, 196, ${alpha})`,
		black: (alpha: number) => `rgba(0,0,0,${alpha})`,
		light_black: (alpha: number) => `rgba(32,39,40,${alpha})`,
	},
};

const fonts = {
	primary_regular: `${fontFamily}`,
	primary_bold: `${fontFamily}-Bold`,
	primary_light: `${fontFamily}-light`,
};

const theme = createTheme({
	colors: {
		primary: "#FC6868",
		seondary: "#FFFFFF",
		gray: "#C4C4C4",
		black: "#262728",
	},
	spacing: {
		sh: 20,
	},
	breakpoints: {},
	borderRadii: {},
	textVariants: {
		title: {
			fontFamily: fonts.primary_bold,
			fontSize: 24,
		},
		description: {
			fontFamily: fonts.primary_regular,
			fontSize: 18,
		},
		metaText12: {
			fontFamily: fonts.primary_regular,
			fontSize: 14,
		},
		metaText14: {
			fontFamily: fonts.primary_regular,
			fontSize: 14,
		},
		metaText16: {
			fontFamily: fonts.primary_regular,
			fontSize: 16,
		},
	},
});

const Text = createText<Theme>();
const Box = createBox<Theme>();

if (Text.defaultProps?.allowFontScaling) {
	Text.defaultProps.allowFontScaling = false;
}

export type Theme = typeof theme;
export { Text, Box };
export default theme;

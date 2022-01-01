import { createTheme, createBox, createText } from "@shopify/restyle";

const fontFamily = "Helvetic";

const pallette = {
	hex: {
		primary: "#FC6868",
		seondary: "#FFFFFF",
		gray: "#C4C4C4",
		black: "#262728",
	},
	rgb: {
		primary: (alpha: string) => `rgba(252, 104, 104, ${alpha})`,
		secondary: (alpha: string) => `rgba(255, 255, 255, ${alpha})`,
		gray: (alpha: string) => `rgba(196, 196, 196, ${alpha})`,
		black: (alpha: string) => `rgba(38,39,40,${alpha})`,
	},
};

const fonts = {
	primary_regular: `${fontFamily}-regular`,
	primary_bold: `${fontFamily}-bold`,
	primary_light: `${fontFamily}-light`,
};

const theme = createTheme({
	colors: {
		...pallette.hex,
	},
	spacing: {},
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
export default Theme;

import { createTheme, createBox, createText, ResponsiveValue } from "@shopify/restyle";

const fontFamily = "Helvetica";

export const pallette = {
	hex: {
		primary: "#FC6868",
		secondary: "#FFFFFF",
		gray: "#C4C4C4",
		black: "#262728",
		darkGray: "#A7A4A4",
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
		...pallette.hex,
	},
	spacing: {
		xl: 30,
		l: 20,
		m: 15,
		s: 10,
		xs: 5,
		xxs: 3,
		none: 0,
	},
	breakpoints: {},
	borderRadii: {
		s: 3,
		m: 10,
		l: 25,
		xl: 75,
	},
	textVariants: {
		title: {
			fontFamily: fonts.primary_bold,
			fontSize: 24,
		},
		description: {
			fontFamily: fonts.primary_regular,
			fontSize: 18,
		},
		metaText11: {
			fontFamily: fonts.primary_regular,
			fontSize: 11,
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
		light: {
			fontFamily: fonts.primary_light,
		},
		bold: {
			fontFamily: fonts.primary_bold,
		},
		button: {
			fontFamily: fonts.primary_bold,
			fontSize: 20,
		},
	},
	fontSize: {
		xxs: 9,
		xs: 11,
		sm: 12,
		md: 14,
		lg: 24,
		normal: 18,
		regular: 16,
	},
});

export type Theme = typeof theme;
export type Spacing = ResponsiveValue<keyof Theme["spacing"], Theme>;
const Text = createText<Theme>();
const Box = createBox<Theme>();

// Card
// type CardType = VariantProps<Theme, "cardVariants"> & React.ComponentProps<typeof Box>;
// const CardBox = createRestyleComponent<CardType, Theme>([createVariant({ themeKey: "cardVariants" })], Box);

if (Text.defaultProps?.allowFontScaling) {
	Text.defaultProps.allowFontScaling = false;
}

export { Text, Box, theme };
export default theme;

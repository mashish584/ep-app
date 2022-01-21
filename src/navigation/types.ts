import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export interface StackNavigationProps<ParamList extends ParamListBase, RouteName extends keyof ParamList = string> {
	navigation: StackNavigationProp<ParamList, RouteName>;
	route: RouteProp<ParamList, RouteName>;
}

export type RootStackScreens = {
	Onboarding: undefined;
	AuthScreen: undefined;
	BottomStack: undefined;
	EventDetail: any;
	Profile: undefined;
};

export type BottomStackScreens = {
	Home: undefined;
	Search: undefined;
	Notifications: undefined;
	Settings: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<RootStackScreens & BottomStackScreens>;

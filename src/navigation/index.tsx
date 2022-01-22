import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TabBar from "../components/BottomTab";

import Home from "../screens/Home";
import Auth from "../screens/Auth";
import Onboarding from "../screens/Onboarding";
import EventDetail from "../screens/EventDetail";
import Profile from "../screens/Profile";

import { BottomStackScreens, RootStackScreens } from "./types";

const BottomTab = createBottomTabNavigator<BottomStackScreens>();

const BottamTabScreen = () => {
	return (
		<BottomTab.Navigator
			tabBar={(props) => <TabBar {...props} />}
			initialRouteName="Settings"
			screenOptions={{
				headerShown: false,
			}}>
			<BottomTab.Screen name="Home" component={Home} />
			<BottomTab.Screen name="Search" component={Home} />
			<BottomTab.Screen name="Notifications" component={Home} />
			<BottomTab.Screen name="Settings" component={Profile} />
		</BottomTab.Navigator>
	);
};

const RootStack = createStackNavigator<RootStackScreens>();

const RootStackSCreen = () => {
	return (
		<RootStack.Navigator initialRouteName="Onboarding">
			<RootStack.Screen name="AuthScreen" component={Auth} options={{ headerShown: false }} />
			<RootStack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
			<RootStack.Screen name="BottomStack" component={BottamTabScreen} options={{ headerShown: false }} />
			<RootStack.Screen name="EventDetail" component={EventDetail} options={{ headerShown: false }} />
		</RootStack.Navigator>
	);
};

export default () => {
	return (
		<NavigationContainer>
			<RootStackSCreen />
		</NavigationContainer>
	);
};

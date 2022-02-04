import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Auth from "../screens/Auth";
import Onboarding from "../screens/Onboarding";
import EventDetail from "../screens/EventDetail";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import AttendeesList from "../screens/AttendeesList";
import TransactionsList from "../screens/TransactionsList";
import MyEventsList from "../screens/MyEventsList";

import TabBar from "../components/BottomTab";

import { navigationRef } from "../utils/navigationUtil";
import { BottomStackScreens, RootStackScreens } from "./types";

const BottomTab = createBottomTabNavigator<BottomStackScreens>();

const BottamTabScreen = () => {
	return (
		<BottomTab.Navigator
			tabBar={(props) => <TabBar {...props} />}
			initialRouteName="Home"
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
			<RootStack.Screen name="ProfileUpdate" component={EditProfile} options={{ headerShown: false }} />
			<RootStack.Screen name="AttendeesList" component={AttendeesList} options={{ headerShown: false }} />
			<RootStack.Screen name="TransactionsList" component={TransactionsList} options={{ headerShown: false }} />
			<RootStack.Screen name="MyEventsList" component={MyEventsList} options={{ headerShown: false }} />
		</RootStack.Navigator>
	);
};

export default () => {
	return (
		<NavigationContainer ref={navigationRef}>
			<RootStackSCreen />
		</NavigationContainer>
	);
};

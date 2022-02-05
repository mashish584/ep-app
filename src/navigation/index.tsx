import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import Home from "../screens/Home";
import Auth from "../screens/Auth";
import Onboarding from "../screens/Onboarding";
import EventDetail from "../screens/EventDetail";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";
import AttendeesList from "../screens/AttendeesList";
import TransactionsList from "../screens/TransactionsList";
import MyEventsList from "../screens/MyEventsList";
import NotificationsList from "../screens/NotificationsList";
import Search from "../screens/Search";
import SignUp from "../screens/SignUp";
import AddEvent from "../screens/AddEvent";

import TabBar from "../components/BottomTab";

import { navigationRef } from "../utils/navigationUtil";
import { BottomStackScreens, RootStackScreens } from "./types";

const BottomTab = createBottomTabNavigator<BottomStackScreens>();

const defaultOptions: StackNavigationOptions = {
	headerShown: false,
};

const BottamTabScreen = () => {
	return (
		<BottomTab.Navigator
			tabBar={(props) => <TabBar {...props} />}
			initialRouteName="Home"
			screenOptions={{
				headerShown: false,
			}}>
			<BottomTab.Screen name="Home" component={Home} />
			<BottomTab.Screen name="Search" component={Search} />
			<BottomTab.Screen name="Notifications" component={NotificationsList} />
			<BottomTab.Screen name="Settings" component={Profile} />
		</BottomTab.Navigator>
	);
};

const RootStack = createStackNavigator<RootStackScreens>();

const RootStackSCreen = () => {
	return (
		<RootStack.Navigator initialRouteName="Onboarding">
			<RootStack.Screen name="AuthScreen" component={Auth} options={defaultOptions} />
			<RootStack.Screen name="SignupScreen" component={SignUp} options={defaultOptions} />
			<RootStack.Screen name="Onboarding" component={Onboarding} options={defaultOptions} />
			<RootStack.Screen name="BottomStack" component={BottamTabScreen} options={defaultOptions} />
			<RootStack.Screen name="EventDetail" component={EventDetail} options={defaultOptions} />
			<RootStack.Screen name="ProfileUpdate" component={EditProfile} options={defaultOptions} />
			<RootStack.Screen name="AttendeesList" component={AttendeesList} options={defaultOptions} />
			<RootStack.Screen name="TransactionsList" component={TransactionsList} options={defaultOptions} />
			<RootStack.Screen name="MyEventsList" component={MyEventsList} options={defaultOptions} />
			<RootStack.Screen name="Search" component={Search} options={defaultOptions} />
			<RootStack.Screen name="NotificationsList" component={NotificationsList} options={defaultOptions} />
			<RootStack.Screen name="AddEvent" component={AddEvent} options={defaultOptions} />
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

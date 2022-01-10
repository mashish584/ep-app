import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabBar from "../components/BottomTab";
import Home from "../screens/Home";

const BottomTab = createBottomTabNavigator();

const BottamTabScreen = () => {
	return (
		<BottomTab.Navigator
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}>
			<BottomTab.Screen name="Home" component={Home} />
			<BottomTab.Screen name="Search" component={Home} />
			<BottomTab.Screen name="Notifications" component={Home} />
			<BottomTab.Screen name="Settings" component={Home} />
		</BottomTab.Navigator>
	);
};

const RootStack = createNativeStackNavigator();

const RootStackSCreen = () => {
	return (
		<RootStack.Navigator>
			<RootStack.Screen name="BottomStack" component={BottamTabScreen} options={{ headerShown: false }} />
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

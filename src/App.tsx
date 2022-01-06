/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";

import theme from "./utils/theme";
import { client } from "./config/apollo";
import EventCard from "./components/EventCard";

const App = () => {
	return (
		<SafeAreaProvider>
			<ThemeProvider {...{ theme }}>
				<ApolloProvider client={client}>
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
						<EventCard width={220} height={167} />
					</View>
				</ApolloProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export default App;

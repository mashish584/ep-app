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
import { Text, View } from "react-native";
import { ApolloProvider } from "@apollo/client";

import { client } from "./src/config/apollo";

const App = () => {
	return (
		<ApolloProvider client={client}>
			<View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
				<Text>EP APP</Text>
			</View>
		</ApolloProvider>
	);
};

export default App;

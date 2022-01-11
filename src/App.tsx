/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from "react";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";

import theme from "./utils/theme";
import { client } from "./config/apollo";

import Test from "./containers/Test";
import Button from "./components/Button";

const App = () => {
	const [index, setIndex] = useState(10);

	return (
		<SafeAreaProvider>
			<ThemeProvider {...{ theme }}>
				<ApolloProvider client={client}>
					<Test scrollIndex={index} />

					<Button variant="primary" label="update" onPress={() => setIndex(140)} />
				</ApolloProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export default App;

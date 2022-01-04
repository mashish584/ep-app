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
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";

import theme from "./utils/theme";
import { client } from "./config/apollo";
import Onboarding from "./screens/Onboarding";
import Theme from "./components/Theme";

const App = () => {
	return (
		<SafeAreaProvider>
			<ThemeProvider {...{ theme }}>
				<ApolloProvider client={client}>
					<Theme>
						<Onboarding />
					</Theme>
				</ApolloProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export default App;

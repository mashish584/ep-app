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
import { StripeProvider } from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";
import { STRIPE_PUBLIC_KEY } from "@env";

import theme from "./utils/theme";
import { client } from "./config/apollo";

import Navigation from "./navigation";
import { UIProvider } from "./context/UIContext";

const App = () => {
	return (
		<SafeAreaProvider>
			<ThemeProvider {...{ theme }}>
				<StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
					<ApolloProvider client={client}>
						<UIProvider>
							<Navigation />
						</UIProvider>
					</ApolloProvider>
				</StripeProvider>
				<Toast />
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export default App;

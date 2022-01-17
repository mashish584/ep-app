import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				events: {
					keyArgs: false,
					merge(existing, incoming) {
						console.log({ existing, incoming });
						const data = existing || { count: 0, events: [] };
						const previousEvents = [...data.events];
						let newEvents;

						if (incoming.events?.length) {
							newEvents = incoming.events;
						}

						return {
							...data,
							count: incoming.count,
							events: newEvents ? [...previousEvents, ...newEvents] : previousEvents,
						};
					},
				},
			},
		},
	},
});

const getToken = async () => {
	let token = null;
	const authState = await AsyncStorage.getItem("auth");

	if (authState) {
		const data = JSON.parse(authState);
		token = data?.state?.token;
	}
	return token || "";
};

const authLink = setContext(async (_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = await getToken();
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

export const client = new ApolloClient({
	cache,
	link: authLink.concat(
		createUploadLink({
			uri: API_URL,
		}),
	),
	credentials: "same-origin",
});

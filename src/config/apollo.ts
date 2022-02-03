import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { displayToast } from "../context/UIContext";

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
				fetchAttendees: {
					keyArgs: false,
					merge(existing, incoming) {
						const data = existing || { count: 0, users: [] };
						const previousUsers = [...data.users];
						let newUsers;

						if (incoming.users?.length) {
							newUsers = incoming.users;
						}

						return {
							...data,
							count: incoming.count,
							users: newUsers ? [...previousUsers, ...newUsers] : previousUsers,
						};
					},
				},
				fetchTransactions: {
					keyArgs: false,
					merge(existing, incoming) {
						const data = existing || { count: 0, transactions: [] };
						const previousTransactions = [...data.transactions];
						let newTransactions;

						if (incoming.transactions?.length) {
							newTransactions = incoming.transactions;
						}

						return {
							...data,
							count: incoming.count,
							transactions: newTransactions ? [...previousTransactions, ...newTransactions] : previousTransactions,
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

const interceptor = new ApolloLink((operation, forward) => {
	operation.setContext(async ({ headers = {} }) => {
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

	return forward(operation).map((response) => {
		/**
		 * Check for errros
		 */
		if (response.errors?.length) {
			const error = response.errors[0];
			if (displayToast) displayToast("error", error.message);
		}
		return response;
	});
});
export const client = new ApolloClient({
	cache,
	link: interceptor.concat(
		createUploadLink({
			uri: API_URL,
		}),
	),
	credentials: "same-origin",
});

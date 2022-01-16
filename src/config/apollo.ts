import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
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

export const client = new ApolloClient({
	cache,
	link: createUploadLink({
		uri: API_URL,
	}),
	credentials: "same-origin",
});

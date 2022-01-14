import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { API_URL } from "@env";

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: createUploadLink({
		uri: API_URL,
	}),
	credentials: "same-origin",
});

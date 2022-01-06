import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: createUploadLink({
		uri: "https://example.com",
	}),
	credentials: "same-origin",
});

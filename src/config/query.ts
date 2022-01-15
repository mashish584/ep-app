import { gql } from "@apollo/client";

export const FETCH_UPCOMING_EVENTS = gql`
	query upcomingEvents($query: String!) {
		events(query: $query) {
			events {
				id
				title
				eventTimestamp
				price
				owner {
					username
					email
				}
				medias {
					link
					thumbnail
				}
			}
		}
	}
`;

export const FETCH_EVENTS = gql`
	query events($query: String!, $skip: Int!, $take: Int!) {
		events(query: $query, skip: $skip, take: $take) {
			count
			events {
				id
				title
				description
				eventTimestamp
				price
				owner {
					username
					email
				}
				medias {
					link
					thumbnail
				}
			}
		}
	}
`;

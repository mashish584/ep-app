import { gql } from "@apollo/client";

export const FETCH_UPCOMING_EVENTS = gql`
	query upcomingEvents($query: String!) {
		events(query: $query) {
			count
			events {
				id
				title
				description
				category
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
				location {
					lat
					lng
					address
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
				category
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
				location {
					lat
					lng
					address
				}
			}
		}
	}
`;

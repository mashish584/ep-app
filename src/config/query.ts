import { gql } from "@apollo/client";

/*==========================
 * -------- Event ---------*
 ==========================*/

export const FETCH_UPCOMING_EVENTS = gql`
	query userBookedEvents($query: String!, $skip: Int!, $take: Int!) {
		userBookedEvents(query: $query, skip: $skip, take: $take) {
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

export const FETCH_USER_EVENTS = gql`
	query userEvents($query: String!, $skip: Int!, $take: Int!) {
		userEvents(query: $query, skip: $skip, take: $take) {
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

export const FETCH_EVENT_DETAIL = gql`
	query eventDetail($slug: String!) {
		eventDetail(slug: $slug) {
			id
			title
			description
			eventTimestamp
			price
			category
			eventTimestamp
			location {
				lat
				lng
				address
			}
			transactions {
				id
				user {
					id
					profile
				}
			}
			owner {
				id
				username
				email
			}
			medias {
				link
			}
		}
	}
`;

export const FETCH_ATTENDEES = gql`
	query fetchAttendees($query: String!, $skip: Int!, $take: Int!) {
		fetchAttendees(query: $query, skip: $skip, take: $take) {
			count
			users {
				id
				fullname
				email
				profile
			}
		}
	}
`;

export const FETCH_TRANSACTIONS = gql`
	query fetchTransactions($query: String!, $skip: Int!, $take: Int!) {
		fetchTransactions(query: $query, skip: $skip, take: $take) {
			count
			transactions {
				id
				amount
				user {
					id
					profile
				}
				event {
					title
					owner {
						id
					}
				}
				createdAt
			}
		}
	}
`;

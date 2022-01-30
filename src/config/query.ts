import { gql } from "@apollo/client";

/*==========================
 * -------- Event ---------*
 ==========================*/

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
	query fetchAttendees($query: String!) {
		fetchAttendees(query: $query) {
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

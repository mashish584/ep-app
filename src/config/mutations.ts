import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
	mutation userLogin($id: String!, $password: String!) {
		userLogin(id: $id, password: $password) {
			token
			user {
				id
				username
				fullname
				bio
				profile
				email
				isActive
				stripe_customer_id
			}
		}
	}
`;

export const BOOK_EVENT = gql`
	mutation bookEvent($eventId: String!) {
		bookEvent(event: $eventId) {
			paymentIntent
			ephemeralKey
		}
	}
`;

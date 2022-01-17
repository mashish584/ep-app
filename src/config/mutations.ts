import { gql } from "@apollo/client";

`input UserInput {
	username: String!
  }`;

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
			eventId
			paymentId
			paymentIntent
			ephemeralKey
		}
	}
`;

export const CONFIRM_BOOK_EVENT = gql`
	mutation confirmBooking($event: String!, $paymentId: String!) {
		confirmBooking(data: { event: $event, paymentId: $paymentId }) {
			message
		}
	}
`;

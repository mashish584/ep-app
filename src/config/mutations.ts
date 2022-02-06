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

export const SIGNUP_MUTATION = gql`
	mutation createUser($email: String!, $username: String!, $password: String!) {
		createUser(data: { email: $email, username: $username, password: $password }) {
			message
		}
	}
`;

export const PROFILE_UPDATE_MUTATION = gql`
	mutation updateProfile($username: String, $fullname: String, $email: String, $password: String, $bio: String, $location: String) {
		updateProfile(data: { username: $username, fullname: $fullname, email: $email, password: $password, bio: $bio, location: $location }) {
			username
			fullname
			email
			bio
			profile
			location {
				address
			}
			isActive
			stripe_customer_id
		}
	}
`;

export const PROFILE_UPLOAD_MUTATION = gql`
	mutation updateProfile($profile: Upload) {
		updateProfile(data: { profile: $profile }) {
			username
			fullname
			email
			bio
			profile
			location {
				address
			}
			isActive
			stripe_customer_id
		}
	}
`;

export const ADD_EVENT_MUTATION = gql`
	mutation createEvent($title: String!, $description: String!, $eventTimestamp: String!, $category: [String]!, $location: String!, $price: String!) {
		createEvent(
			data: { title: $title, description: $description, eventTimestamp: $eventTimestamp, category: $category, location: $location, price: $price }
		) {
			id
		}
	}
`;

export const UPLOAD_MEDIA_MUTATION = gql`
	mutation uploadEventMedia($file: Upload!, $event: Int!) {
		uploadEventMedia(file: $file, eventId: $event) {
			id
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

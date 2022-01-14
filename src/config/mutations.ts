import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
	mutation userLogin($id: String!, $password: String!) {
		userLogin(id: $id, password: $password) {
			token
			user {
				id
			}
		}
	}
`;

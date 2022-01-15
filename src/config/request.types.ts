import { EventInfo } from "./schema.types";

/*=================================
 * ------ Auth Mutatations ------ *
=================================*/
export type UserLoginVariables = {
	id: string;
	password: string;
};

export type UserLoginResponse = {
	userLogin: {
		token: string;
	};
};

/*=================================
 * ------ Events Query ------ *
=================================*/

export type EventQuery = {
	search?: string;
	category?: string;
	upcoming?: boolean;
	featured?: boolean;
};

export type FetchEventRequestVariables = {
	query?: string;
	skip?: number;
	take?: number;
};

export type FetchEventResponse = {
	events: {
		count: number;
		events: EventInfo[];
	};
};

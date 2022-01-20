import { EventInfo, UserInfo } from "./schema.types";

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
		user: UserInfo;
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

export type FetchEventDetailRequestVariables = {
	slug: string;
};

export type FetchEventDetailResponse = {
	eventDetail: EventInfo;
};

export type BookEventRequestVariables = {
	eventId: string;
};

export type BookEventResponse = {
	bookEvent: {
		eventId: string;
		paymentId: string;
		paymentIntent: string;
		ephemeralKey: string;
	};
};

export type ConfirmBookingRequestVariable = {
	event: string;
	paymentId: string;
};

export type ConfirmBookingResponse = {
	confirmBooking: {
		message: string;
	};
};

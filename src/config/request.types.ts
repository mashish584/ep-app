import { UpdateProfileForm } from "../form.interface";
import { EventInfo, UserInfo, TransactionInfo } from "./schema.types";

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
 * ------ Profiel Mutations ------ *
=================================*/

export type ProfileUpdateVariables = UpdateProfileForm;
export type ProfileUploadVariables = { profile: any };

export type ProfileUpdateResponse = {
	updateProfile: UserInfo;
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

export type FetchUserEventsResponse = {
	userEvents: {
		count: number;
		events: EventInfo[];
	};
};

export type FetchUserBookedEventsResponse = {
	userBookedEvents: {
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

export type FetchAttendeesRequestVariables = {
	query?: string;
	skip?: number;
	take?: number;
};

export type FetchAttendeesResponse = {
	fetchAttendees: {
		count: number;
		users: UserInfo[];
	};
};

/**
 * Transactions Query
 */

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

export type FetchTransactionsVariables = {
	query?: string;
	skip?: number;
	take?: number;
};

export type FetchTransactionsResponse = {
	fetchTransactions: {
		count: number;
		transactions: TransactionInfo[];
	};
};

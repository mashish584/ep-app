export type LocationInfo = {
	lat: number;
	lng: number;
	postal: string;
	address: string;
};

export interface MediaInfo {
	id: number;
	link: string;
	thumbnail: string;
	eventId: number;
	createdAt: string;
	updatedAt: string;
}

export interface UserInfo {
	id: number;
	username: string;
	fullname: string;
	bio: string;
	location: LocationInfo;
	email: string;
	isActive: boolean;
	stripe_customer_id: string;
	createdAt: string;
	updatedAt: string;
}
export interface EventInfo {
	id: string;
	title: string;
	description: string;
	category: string[];
	location: LocationInfo;
	eventTimestamp: string;
	isActive: boolean;
	price: string;
	medias: MediaInfo[];
	owner: UserInfo;
	createdAt: string;
	updatedAt: string;
}

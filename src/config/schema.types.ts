export type LocationInfo = {
	lat: string;
	lng: string;
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
	email: string;
	isActive: boolean;
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

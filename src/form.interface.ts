export interface SignInForm {
	email: string;
	password: string;
}

export interface UpdateProfileForm {
	username: string;
	fullname: string;
	email: string;
	password?: string;
	bio: string;
	location: string;
}

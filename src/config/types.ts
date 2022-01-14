export type UserLoginVariables = {
	id: string;
	password: string;
};

export type UserLoginResponse = {
	userLogin: {
		token: string;
	};
};

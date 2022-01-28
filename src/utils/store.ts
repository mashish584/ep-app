import create, { GetState, SetState, StoreApi } from "zustand";
import { persist, StoreApiWithPersist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "../config/schema.types";

interface AuthState {
	token: string;
	user: UserInfo;
	setToken: (token: string) => void;
	setUser: (user: UserInfo) => void;
	removeToken: () => void;
}

export const useAuth = create<AuthState, SetState<AuthState>, GetState<AuthState>, StoreApiWithPersist<AuthState>>(
	persist(
		(set) => ({
			token: "",
			user: {} as UserInfo,
			setToken: (token: string) => set({ token }),
			setUser: (user: UserInfo) => set({ user }),
			removeToken: () => set({ token: "", user: {} as UserInfo }),
		}),
		{
			name: "auth",
			getStorage: () => AsyncStorage,
		},
	),
);

interface UIState {
	showProfileUpdatePrompt: boolean;
	setProfileUpdatePrompt: (value: boolean) => void;
}

export const useUI = create<UIState, SetState<UIState>, GetState<UIState>, StoreApi<UIState>>((set) => ({
	showProfileUpdatePrompt: false,
	setProfileUpdatePrompt: (value) => set({ showProfileUpdatePrompt: value }),
}));

import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo } from "../config/schema.types";

export const useAuth = create(
	persist(
		(set) => ({
			token: null,
			user: null,
			setToken: (token: string) => set({ token }),
			setUser: (user: UserInfo) => set({ user }),
			removeToken: () => set({ token: null, user: null }),
		}),
		{
			name: "auth",
			getStorage: () => AsyncStorage,
		},
	),
);

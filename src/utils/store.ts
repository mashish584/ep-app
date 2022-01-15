import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = create(
	persist(
		(set) => ({
			token: null,
			setToken: (token: string) => set({ token }),
			removeToken: () => set({ token: null }),
		}),
		{
			name: "auth",
			getStorage: () => AsyncStorage,
		},
	),
);

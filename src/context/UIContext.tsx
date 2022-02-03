import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ProfileUpdatePrompt from "../components/Modals/ProfilleUpdatePrompt";
import { ProfileInfo } from "../components/Modals";

import { usePayment } from "../hook/useCheckout";
import { useAuth } from "../utils/store";
import { navigate } from "../utils/navigationUtil";
import { UserInfo } from "../config/schema.types";

export interface UIContextInterface {
	showProfileUpdatePrompt: boolean;
	setProfileUpdatePrompt: (value: boolean) => void;
	onEventJoin: (eventId: string) => void;
	showToast: (type: "error" | "success", message) => void;
}

export const UIContext = React.createContext<UIContextInterface>({} as UIContextInterface);
export let displayToast: ((type: "error" | "success", message) => void) | null = null;

export const UIProvider: React.FC = ({ children }) => {
	const { top } = useSafeAreaInsets();
	const userId = useAuth((state) => state.user?.id);
	const userAddress = useAuth((state) => state.user?.location?.address);

	const [showProfileUpdatePrompt, setProfileUpdatePrompt] = useState(false);
	const [profileInfo, setprofileInfo] = useState<{ visible: boolean; data: UserInfo }>({
		visible: false,
		data: {} as UserInfo,
	});

	const { fetchPaymentSheetParam } = usePayment();

	const onEventJoin = async (eventId) => {
		if (!userId) {
			navigate("AuthScreen", {});
			return;
		}

		if (!userAddress) {
			setProfileUpdatePrompt(true);
			return;
		}

		await fetchPaymentSheetParam({ variables: { eventId } });
	};

	const showToast = (type: "error" | "success", message) => {
		Toast.show({
			type: type,
			text1: type === "error" ? "Error" : "Success",
			text2: message,
			topOffset: top,
		});
	};

	useEffect(() => {
		displayToast = showToast;
	}, []);

	return (
		<UIContext.Provider value={{ showProfileUpdatePrompt, setProfileUpdatePrompt, onEventJoin, showToast }}>
			{children}
			<ProfileUpdatePrompt
				visible={showProfileUpdatePrompt}
				onConfirm={() => {
					navigate("ProfileUpdate", {});
				}}
				onDismiss={() => {
					setProfileUpdatePrompt(false);
				}}
			/>
			<ProfileInfo
				userInfo={profileInfo.data}
				visible={profileInfo.visible}
				onDismiss={() => {
					setprofileInfo({ visible: false, data: {} as UserInfo });
				}}
			/>
		</UIContext.Provider>
	);
};

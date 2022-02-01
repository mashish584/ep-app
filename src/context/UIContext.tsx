import React, { useState } from "react";

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
}

export const UIContext = React.createContext<UIContextInterface>({} as UIContextInterface);

export const UIProvider: React.FC = ({ children }) => {
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

		await fetchPaymentSheetParam({ variables: { event: eventId } });
	};

	return (
		<UIContext.Provider value={{ showProfileUpdatePrompt, setProfileUpdatePrompt, onEventJoin }}>
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

import React, { useState } from "react";

import ProfileUpdatePrompt from "../components/Modals/ProfilleUpdatePrompt";
import { usePayment } from "../hook/useCheckout";
import { useAuth } from "../utils/store";
import { navigate } from "../utils/navigationUtil";

export interface UIContextInterface {
	showProfileUpdatePrompt: boolean;
	setProfileUpdatePrompt: (value: boolean) => void;
	onEventJoin: (eventId: string) => void;
}

export const UIContext = React.createContext<UIContextInterface>({} as UIContextInterface);

export const UIProvider: React.FC = ({ children }) => {
	const userInfo = useAuth((state) => state.user);
	const [showProfileUpdatePrompt, setProfileUpdatePrompt] = useState(false);
	const { fetchPaymentSheetParam } = usePayment();

	const onEventJoin = async (eventId) => {
		if (!userInfo.id) {
			navigate("AuthScreen", {});
			return;
		}

		if (!userInfo?.location?.address) {
			setProfileUpdatePrompt(true);
			return;
		}

		await fetchPaymentSheetParam({ variables: { eventId } });
	};

	return (
		<UIContext.Provider value={{ showProfileUpdatePrompt, setProfileUpdatePrompt, onEventJoin }}>
			<ProfileUpdatePrompt
				visible={showProfileUpdatePrompt}
				onConfirm={() => {
					navigation.push("ProfileUpdate");
				}}
				onDismiss={() => {
					setProfileUpdatePrompt(false);
				}}
			/>
			{children}
		</UIContext.Provider>
	);
};

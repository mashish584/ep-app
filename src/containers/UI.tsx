import React from "react";
import { useNavigation } from "@react-navigation/native";

import ProfileUpdatePrompt from "../components/Modals/ProfilleUpdatePrompt";

import { ScreenNavigationProp } from "../navigation/types";
import { useUI } from "../utils/store";

const UI = () => {
	const navigation = useNavigation<ScreenNavigationProp>();
	const { showProfileUpdatePrompt, setProfileUpdatePrompt } = useUI((store) => store);

	return (
		<>
			<ProfileUpdatePrompt
				visible={showProfileUpdatePrompt}
				onConfirm={() => {
					navigation.push("ProfileUpdate");
				}}
				onDismiss={() => {
					setProfileUpdatePrompt(false);
				}}
			/>
		</>
	);
};

export default UI;

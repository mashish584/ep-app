import React from "react";

import BottomSheet from "../BottomSheet";
import { Box } from "../../utils/theme";
import { BottomSheetTheme, ModalFooter, ModalHeader, ModalProps } from ".";

interface ProfileUpdatePrompt extends ModalProps {
	visible: boolean;
	onConfirm: () => void;
}

const ProfileUpdatePrompt = ({ visible, onDismiss, ...props }: ProfileUpdatePrompt) => {
	return (
		<BottomSheet visible={visible} disableGesture={true} containerStyle={{ backgroundColor: "transparent" }} onDismiss={onDismiss}>
			{(onDismiss) => {
				return (
					<BottomSheetTheme height={300} style={{ justifyContent: "space-between" }}>
						<Box>
							<ModalHeader title="Profile Update" description="Please complete your profile details to continue." />
						</Box>

						<ModalFooter
							acceptButtonLabel="Update Profile"
							onAccept={() => {
								onDismiss();
								props.onConfirm();
							}}
						/>
					</BottomSheetTheme>
				);
			}}
		</BottomSheet>
	);
};

export default ProfileUpdatePrompt;

import React from "react";
import BottomSheet from "../BottomSheet";
import { BottomSheetTheme, ModalFooter, ModalHeader, ModalProps } from ".";

interface Logout extends ModalProps {
	onLogout: () => void;
}

const Logout: React.FC<Logout> = ({ visible, onDismiss, ...props }) => {
	return (
		<BottomSheet visible={visible} onDismiss={onDismiss} disableGesture={true} containerStyle={{ backgroundColor: "transparent" }}>
			{(onDismiss) => {
				return (
					<BottomSheetTheme height={200} style={{ justifyContent: "space-between" }}>
						<ModalHeader title="Logout Confirmation" description="Are you sure you want to logout?" />
						<ModalFooter
							acceptButtonLabel="Logout"
							onAccept={() => {
								onDismiss();
								props.onLogout();
							}}
						/>
					</BottomSheetTheme>
				);
			}}
		</BottomSheet>
	);
};

export default Logout;

import React, { useState } from "react";

import BottomSheet from "../BottomSheet";
import { BottomSheetProps } from "../BottomSheet/types";
import TextInput from "../Form/TextInput";
import { Box } from "../../utils/theme";

import BottomSheetTheme from "./BottomSheetTheme";
import { ModalFooter, ModalHeader } from ".";

type ModalProps = Pick<BottomSheetProps, "visible" | "onDismiss">;

interface PasswordConfirmation extends ModalProps {
	onConfirm: (password: string, onSuccess: () => void) => void;
}

const PasswordConfirmation: React.FC<PasswordConfirmation> = ({ visible, onDismiss, ...props }) => {
	const [password, setPassword] = useState({
		value: "",
		error: "",
	});

	const onConfirm = (dismiss) => {
		if (!password.value) {
			setPassword((prev) => ({
				...prev,
				error: "Please enter password.",
			}));
			return;
		}

		props.onConfirm(password.value, () => {
			//reset form data
			setPassword({
				value: "",
				error: "",
			});
			dismiss();
		});
	};

	return (
		<BottomSheet visible={visible} disableGesture={true} containerStyle={{ backgroundColor: "transparent" }} onDismiss={onDismiss}>
			{(onDismiss) => {
				return (
					<BottomSheetTheme height={300} style={{ justifyContent: "space-between" }}>
						<Box>
							<ModalHeader title="Password Confirmation" description="Please confirm your password to confirm the changes:" />
							<TextInput
								type="password"
								label="Password"
								onChangeText={(text) =>
									setPassword({
										value: text,
										error: "",
									})
								}
								errorMessage={password?.error}
								value={password.value}
							/>
						</Box>

						<ModalFooter acceptButtonLabel="Confirm" onAccept={() => onConfirm(onDismiss)} />
					</BottomSheetTheme>
				);
			}}
		</BottomSheet>
	);
};

export default PasswordConfirmation;

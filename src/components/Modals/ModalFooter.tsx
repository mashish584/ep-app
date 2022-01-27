import React from "react";
import theme, { Box } from "../../utils/theme";
import Button from "../Button";

interface ModalFooter {
	showCancelButton?: boolean;
	acceptButtonLabel: string;
	cancelButtonLabel?: string;
	onAccept: () => void;
	onCancel?: () => void;
}

const ModalFooter: React.FC<ModalFooter> = ({ acceptButtonLabel, onAccept, ...props }) => {
	return (
		<Box>
			<Button label={acceptButtonLabel} variant="primary" containerStyle={{ width: "100%" }} onPress={onAccept} />
			{props.showCancelButton && props.onCancel && (
				<Button
					label={props.cancelButtonLabel}
					variant="transparent"
					containerStyle={{ width: "100%", marginTop: theme.spacing.s }}
					textStyle={{ color: theme.colors.primary }}
					onPress={props.onCancel}
				/>
			)}
		</Box>
	);
};

export default ModalFooter;

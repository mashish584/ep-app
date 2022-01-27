import { BottomSheetProps } from "../BottomSheet/types";

export { default as ModalHeader } from "./ModalHeader";
export { default as ModalFooter } from "./ModalFooter";
export { default as BottomSheetTheme } from "./BottomSheetTheme";
export { default as PasswordConfirmation } from "./PasswordConfirmation";

export type ModalProps = Pick<BottomSheetProps, "visible" | "onDismiss">;

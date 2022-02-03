import React, { useMemo } from "react";
import { Image } from "react-native";

import Texter from "../Texter";

import { UserInfo } from "../../config/schema.types";
import { defaultAvatar } from "../../utils/preconfig";
import theme, { Box, pallette, Text } from "../../utils/theme";
import { getNameConfig } from "../Maps/util";

import InfoModal from "./InfoModal";

import { ModalProps } from ".";

interface ProfileModal extends ModalProps {
	userInfo: UserInfo;
}

const ProfileModal: React.FC<ProfileModal> = ({ visible, onDismiss, userInfo }) => {
	const getConfig = useMemo(() => getNameConfig(userInfo?.fullname), [userInfo?.fullname]);

	return (
		<InfoModal visible={visible} onDismiss={onDismiss}>
			<Box justifyContent="center" alignItems="center" flex={1} paddingHorizontal="l">
				<Box width={100} height={100} mb="m">
					<Image source={{ uri: userInfo?.profile || defaultAvatar }} style={{ width: "100%", height: "100%", borderRadius: 50 }} />
				</Box>

				{userInfo?.fullname && (
					<Texter variant="bold" style={{ fontSize: theme.fontSize.lg, color: pallette.rgb.black(0.86) }} config={getConfig}>
						{userInfo?.fullname}
					</Texter>
				)}
				<Text variant="metaText14" marginVertical="xs" style={{ color: pallette.rgb.black(0.76) }}>
					{userInfo?.email}
				</Text>
				{userInfo?.location?.address && (
					<Text variant="metaText14" marginVertical="xs" textDecorationLine="underline" style={{ color: pallette.rgb.primary(0.76) }}>
						{userInfo?.location?.address}
					</Text>
				)}
				{userInfo?.bio && (
					<Text variant="metaText14" marginVertical="s" textAlign="center" style={{ color: pallette.rgb.black(0.7) }}>
						{userInfo?.bio}
					</Text>
				)}
			</Box>
		</InfoModal>
	);
};

export default ProfileModal;

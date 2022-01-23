import React from "react";
import { ScrollView } from "react-native";

import Button from "../components/Button";
import TextInput from "../components/Form/TextInput";
import Header from "../components/Header";
import AutoPlaces from "../components/Maps/AutoPlaces/AutoPlaces";
import Curve from "../components/SVG/Curve";
import Theme from "../components/Theme";

import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import theme, { Box } from "../utils/theme";

const EditProfile: React.FC<StackNavigationProps<RootStackScreens, "ProfileUpdate">> = ({ navigation }) => {
	return (
		<Theme avoidTopNotch={true}>
			<Box position="absolute" bottom={0}>
				<Curve />
			</Box>
			<Header headerTitle="Edit Profile" position="relative" onBack={() => navigation.goBack()} />
			<ScrollView style={{ paddingTop: theme.spacing.xl }}>
				<Box marginHorizontal="l">
					<TextInput type="input" label="Email" onChangeText={() => {}} errorMessage={""} />
					<TextInput type="input" label="Full Name" onChangeText={() => {}} errorMessage={""} />
					<TextInput type="input" label="Username" onChangeText={() => {}} errorMessage={""} />
					<AutoPlaces label="Address" defaultAddress="" onAddressChange={(address) => {}} />
					<TextInput type="textarea" label="Bio" style={{ minHeight: 100 }} onChangeText={() => {}} errorMessage={""} />
				</Box>
			</ScrollView>
			<Box marginHorizontal="l">
				<Button label="Update" variant="primary" containerStyle={{ width: "100%" }} onPress={() => {}} />
			</Box>
		</Theme>
	);
};

export default EditProfile;

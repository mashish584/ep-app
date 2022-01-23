import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";

import Button from "../components/Button";
import TextInput from "../components/Form/TextInput";
import Header from "../components/Header";
import AutoPlaces from "../components/Maps/AutoPlaces/AutoPlaces";
import Curve from "../components/SVG/Curve";
import Theme from "../components/Theme";
import { PROFILE_UPDATE_MUTATION } from "../config/mutations";
import { ProfileUpdateResponse, ProfileUpdateVariables } from "../config/request.types";
import { UpdateProfileForm } from "../form.interface";

import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import { ProfileInlineError } from "../types";
import theme, { Box, Text } from "../utils/theme";
import { validateProfileForm } from "../utils/validation";

const initialValues = {
	username: "",
	fullname: "",
	email: "",
	password: "",
	bio: "",
	location: "",
};

const EditProfile: React.FC<StackNavigationProps<RootStackScreens, "ProfileUpdate">> = ({ navigation }) => {
	const initialFormValues: UpdateProfileForm = useRef({ ...initialValues }).current;
	const [errors, setErrors] = useState<ProfileInlineError | null>(null);

	const [onProfileUpdate, { loading }] = useMutation<ProfileUpdateResponse, ProfileUpdateVariables>(PROFILE_UPDATE_MUTATION, {
		onCompleted: (data) => {},
		onError: (error) => {},
	});

	console.log({ onProfileUpdate });

	const onSubmit = async (values: UpdateProfileForm) => {
		try {
			await validateProfileForm(values);
		} catch (errors: any) {
			if (errors?.inner) {
				const err = {} as ProfileInlineError;
				errors.inner.forEach(({ path, message }) => {
					err[path] = message;
				});

				if (Object.keys(err).length) {
					setErrors(err);
				}
			}
		}
	};

	return (
		<Theme avoidTopNotch={true}>
			<Box position="absolute" bottom={0}>
				<Curve />
			</Box>
			<Header headerTitle="Edit Profile" position="relative" onBack={() => navigation.goBack()} />
			<Formik initialValues={initialFormValues} onSubmit={onSubmit}>
				{({ handleChange, handleSubmit, setFieldValue }) => {
					return (
						<>
							<ScrollView style={{ paddingTop: theme.spacing.xl }}>
								<Box marginHorizontal="l">
									<TextInput type="input" label="Email" onChangeText={handleChange("email")} errorMessage={errors?.email} />
									<TextInput type="input" label="Full Name" onChangeText={handleChange("fullname")} errorMessage={errors?.fullname} />
									<TextInput type="input" label="Username" onChangeText={handleChange("username")} errorMessage={errors?.username} />
									<AutoPlaces
										label="Address"
										defaultAddress=""
										onAddressChange={(address) => setFieldValue("location", JSON.stringify(address))}
										error={
											errors?.location ? (
												<Text variant="metaText12" color="primary">
													{errors.location}
												</Text>
											) : null
										}
									/>
									<TextInput type="textarea" label="Bio" style={{ minHeight: 100 }} onChangeText={handleChange("bio")} errorMessage={errors?.bio} />
								</Box>
							</ScrollView>
							<Box marginHorizontal="l">
								<Button label="Update" variant="primary" containerStyle={{ width: "100%" }} onPress={handleSubmit} disabled={loading} />
							</Box>
						</>
					);
				}}
			</Formik>
		</Theme>
	);
};

export default EditProfile;

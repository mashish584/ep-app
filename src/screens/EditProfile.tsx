import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";

import Button from "../components/Button";
import TextInput from "../components/Form/TextInput";
import Header from "../components/Header";
import AutoPlaces from "../components/Maps/AutoPlaces/AutoPlaces";
import { AddressInfo } from "../components/Maps/AutoPlaces/interface";
import Curve from "../components/SVG/Curve";
import Theme from "../components/Theme";
import BottomSheet from "../components/BottomSheet";
import BottomSheetTheme from "../components/BottomSheetTheme";

import { PROFILE_UPDATE_MUTATION } from "../config/mutations";
import { ProfileUpdateResponse, ProfileUpdateVariables } from "../config/request.types";
import { UpdateProfileForm } from "../form.interface";

import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import { ProfileInlineError } from "../types";
import theme, { Box, Text } from "../utils/theme";
import { validateProfileForm } from "../utils/validation";
import { useAuth } from "../utils/store";

const initialValues = {
	username: "",
	fullname: "",
	email: "",
	password: "",
	bio: "",
	location: "",
};

const EditProfile: React.FC<StackNavigationProps<RootStackScreens, "ProfileUpdate">> = ({ navigation }) => {
	const addressInfo = useRef<AddressInfo | null>(null);
	const formValues = useRef<UpdateProfileForm | null>(null); // used only if email or username is changed
	const initialFormValues: UpdateProfileForm = useRef({ ...initialValues }).current;
	const updateFormValues = useRef<((values: SetStateAction<UpdateProfileForm>, shouldValidate?: boolean | undefined) => void) | null>(null);

	const [userInfo, updateUserInfo] = useAuth((state) => [state.user, state.setUser]);
	const [errors, setErrors] = useState<ProfileInlineError | null>(null);
	const [showPasswordModal, setShowPasswordModal] = useState(false);

	const [onProfileUpdate, { loading }] = useMutation<ProfileUpdateResponse, ProfileUpdateVariables>(PROFILE_UPDATE_MUTATION, {
		onCompleted: (data) => {
			if (data.updateProfile) {
				updateUserInfo({ ...userInfo, ...data.updateProfile });
			}
		},
		onError: (error) => {
			console.log({ error });
		},
	});

	const onSubmit = async (values: UpdateProfileForm) => {
		try {
			const data = { ...values };
			await validateProfileForm(data);

			//filter out the not-updated values
			for (let key in data) {
				if (key !== "location" && (data[key] === userInfo[key] || (!data[key]?.trim() && !userInfo[key]))) {
					delete data[key];
				}
			}

			if (addressInfo) {
				data.location = JSON.stringify(addressInfo.current);
			} else {
				delete data.location;
			}

			//if data object contains email or username key show password modal for verification
			if (Object.keys(data).includes("email") || Object.keys(data).includes("username")) {
				formValues.current = data;
				setShowPasswordModal(true);
				return;
			}

			await onProfileUpdate({ variables: { ...data } });
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

	useEffect(() => {
		if (updateFormValues.current) {
			updateFormValues.current({
				email: userInfo.email,
				fullname: userInfo.fullname || "",
				username: userInfo.username,
				location: userInfo?.location?.address || "",
				bio: userInfo.bio || "",
			});
		}
	}, []);

	console.log({ formValues });

	return (
		<Theme avoidTopNotch={true}>
			<Box position="absolute" bottom={0}>
				<Curve />
			</Box>
			<Header headerTitle="Edit Profile" position="relative" onBack={() => navigation.goBack()} />
			<Formik initialValues={initialFormValues} onSubmit={onSubmit}>
				{({ handleChange, handleSubmit, setFieldValue, setValues, values }) => {
					updateFormValues.current = setValues;
					return (
						<>
							<ScrollView style={{ paddingTop: theme.spacing.xl }}>
								<Box marginHorizontal="l">
									<TextInput type="input" label="Email" onChangeText={handleChange("email")} errorMessage={errors?.email} value={values.email} />
									<TextInput
										type="input"
										label="Full Name"
										onChangeText={handleChange("fullname")}
										errorMessage={errors?.fullname}
										value={values.fullname}
									/>
									<TextInput
										type="input"
										label="Username"
										onChangeText={handleChange("username")}
										errorMessage={errors?.username}
										value={values.username}
									/>
									<AutoPlaces
										label="Address"
										defaultAddress={values.location as string}
										onAddressChange={(address) => {
											addressInfo.current = address;
											setFieldValue("location", address.address);
										}}
										error={
											errors?.location ? (
												<Text variant="metaText12" color="primary">
													{errors.location}
												</Text>
											) : null
										}
									/>
									<TextInput type="textarea" label="Bio" onChangeText={handleChange("bio")} errorMessage={errors?.bio} value={values.bio} />
								</Box>
							</ScrollView>
							<Box marginHorizontal="l">
								<Button label="Update" variant="primary" containerStyle={{ width: "100%" }} onPress={handleSubmit} disabled={loading} />
							</Box>
						</>
					);
				}}
			</Formik>
			<BottomSheet
				visible={showPasswordModal}
				disableGesture={true}
				containerStyle={{ backgroundColor: "transparent" }}
				onDismiss={() => {
					setShowPasswordModal(false);
				}}>
				{(onDismiss) => {
					return (
						<BottomSheetTheme height={Dimensions.get("window").height * 0.3}>
							<Text>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
								Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam
								porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
							</Text>
						</BottomSheetTheme>
					);
				}}
			</BottomSheet>
		</Theme>
	);
};

export default EditProfile;

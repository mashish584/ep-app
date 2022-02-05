import React, { useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Header } from "../components/Header";
import Curve from "../components/SVG/Curve";
import Theme from "../components/Theme";
import { AddressInfo } from "../components/Maps/AutoPlaces/interface";
import TextInput from "../components/Form/TextInput";
import AutoPlaces from "../components/Maps/AutoPlaces/AutoPlaces";
import Switch from "../components/Switch";
import Category from "../components/Category";
import Button from "../components/Button";

import theme, { Box, Text } from "../utils/theme";
import { EventCategories } from "../utils/preconfig";
import { openGallery } from "../utils/media";
import { validateEventForm } from "../utils/validation";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";

import { AddEventForm } from "../form.interface";
import { AddEventInlineError } from "../types";

const initalValues = {
	title: "",
	description: "",
	location: "",
	categories: [],
	price: 0,
	eventDate: "",
	eventTime: "",
	uploadFiles: [],
};

const AddEvent: React.FC<StackNavigationProps<RootStackScreens, "AddEvent">> = ({ navigation }) => {
	const addressInfo = useRef<AddressInfo | null>(null);
	const initialFormValues: AddEventForm = useRef({ ...initalValues }).current;

	const [errors, setErrors] = useState<AddEventInlineError | null>(null);
	const [isPaidEvent, setIsPaidEvent] = useState(false);

	const handleCategoryUpdate = (selectedCategories, category, setFieldValue) => {
		let categories = [...selectedCategories];
		const categoryIndex = categories.indexOf(category);

		if (categoryIndex === -1) {
			categories.push(EventCategories[category]);
		} else {
			categories.splice(categoryIndex, 1);
		}

		setFieldValue("categories", categories);
	};

	const handleImageUpload = async (setFieldValue) => {
		const response = await openGallery({ maxFiles: 4, multiple: true });
		if (response?.length) {
			setFieldValue("uploadFiles", response);
		}
	};

	const handleEventAdd = async (values: AddEventForm) => {
		try {
			const data = { ...values };
			await validateEventForm(data);
		} catch (errors: any) {
			if (errors?.inner) {
				const err = {} as AddEventInlineError;
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
			<Formik initialValues={initialFormValues} onSubmit={handleEventAdd}>
				{({ values, handleChange, handleSubmit, setFieldValue }) => {
					return (
						<>
							<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
								<Box marginHorizontal="l" marginTop="s">
									<TextInput type="input" label="Title" onChangeText={handleChange("title")} errorMessage={errors?.title} value={values.title} />
									<AutoPlaces
										label="Location"
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
								</Box>
								<Box marginTop="s">
									<Text variant="light" fontSize={theme.fontSize.sm} ml="l">
										Category
									</Text>
									{EventCategories.length > 0 && (
										<ScrollView horizontal={true} style={{ paddingVertical: theme.spacing.s }} showsHorizontalScrollIndicator={false}>
											{EventCategories.map((category, index) => {
												return (
													<Category
														key={index}
														name={category}
														selected={false}
														ml={index === 0 ? "l" : "none"}
														mr={"xs"}
														onPress={(category) => handleCategoryUpdate(values.categories, category, setFieldValue)}
													/>
												);
											})}
										</ScrollView>
									)}
									{errors?.categories && (
										<Text variant="metaText12" color="primary" marginTop="xs" ml="l">
											{errors?.categories}
										</Text>
									)}
								</Box>

								<Box marginHorizontal="l">
									<TextInput
										type="textarea"
										label="Bio"
										onChangeText={handleChange("bio")}
										errorMessage={errors?.description}
										value={values.description}
									/>
								</Box>
								<Box marginTop="s" minHeight={100}>
									<Text variant="light" marginLeft="l" fontSize={theme.fontSize.sm} mb="xs">
										Upload Images
									</Text>
									<ScrollView horizontal showsVerticalScrollIndicator={false}>
										<TouchableOpacity onPress={() => handleImageUpload(setFieldValue)}>
											<Box
												width={70}
												height={70}
												borderWidth={1}
												ml="l"
												alignItems="center"
												justifyContent="center"
												borderRadius="s"
												borderColor="gray">
												<FontAwesomeIcon icon={faPlus} color={theme.colors.gray} />
											</Box>
										</TouchableOpacity>
										{values.uploadFiles.map((file) => {
											return (
												<Box width={70} height={70} backgroundColor="gray" borderRadius="s" overflow="hidden" ml="s">
													<Image source={file} style={{ width: "100%", height: "100%" }} />
												</Box>
											);
										})}
									</ScrollView>
									{errors?.uploadFiles && (
										<Text variant="metaText12" color="primary" marginTop="xs" marginLeft="l">
											{errors?.uploadFiles}
										</Text>
									)}
								</Box>
								<Box marginHorizontal="l" style={{ marginBottom: theme.spacing.l * 2 }}>
									<Box marginTop="s" flexDirection="row" justifyContent="space-between">
										<Box flexDirection="row" alignItems="center">
											<Text variant="light" fontSize={theme.fontSize.sm} mr="xl">
												Is paid event ?
											</Text>
											<Switch isSwitchOn={isPaidEvent} onChange={() => setIsPaidEvent((value) => !value)} />
										</Box>
									</Box>
									{isPaidEvent && (
										<TextInput
											type="number"
											label=""
											onChangeText={handleChange("categories")}
											value={values?.price?.toString()}
											keyboardType="number-pad"
											errorMessage={errors?.price}
										/>
									)}
								</Box>
							</ScrollView>
							<Box marginHorizontal="l">
								<Button label="Add Event" variant="primary" containerStyle={{ width: "100%" }} onPress={handleSubmit} />
							</Box>
						</>
					);
				}}
			</Formik>
		</Theme>
	);
};

export default AddEvent;

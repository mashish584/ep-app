import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLazyQuery, useMutation } from "@apollo/client";

import { Header } from "../components/Header";
import Curve from "../components/SVG/Curve";
import Theme from "../components/Theme";
import { AddressInfo } from "../components/Maps/AutoPlaces/interface";
import TextInput from "../components/Form/TextInput";
import AutoPlaces from "../components/Maps/AutoPlaces/AutoPlaces";
import Switch from "../components/Switch";
import Category from "../components/Category";
import Button from "../components/Button";
import DateInput from "../components/Form/DateInput";

import theme, { Box, Text } from "../utils/theme";
import { EventCategories } from "../utils/preconfig";
import { generateRNFile, openGallery } from "../utils/media";
import { validateEventForm } from "../utils/validation";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";

import { formatTimeStamp, formatToIso } from "../utils";
import { AddEventForm } from "../form.interface";
import { AddEventInlineError } from "../types";

import { ADD_EVENT_MUTATION, UPLOAD_MEDIA_MUTATION } from "../config/mutations";
import {
	AddEventRequestVariables,
	AddEventResponse,
	FetchEventDetailRequestVariables,
	FetchEventDetailResponse,
	UploadEventMediaRequestVariables,
	UploadEventMediasResponse,
} from "../config/request.types";
import { displayToast } from "../context/UIContext";
import { FETCH_EVENT_DETAIL } from "../config/query";

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

const AddEvent: React.FC<StackNavigationProps<RootStackScreens, "AddEvent">> = ({ navigation, route }) => {
	const eventSlug = route.params?.slug;
	const addressInfo = useRef<AddressInfo | null>(null);
	const initialFormValues: AddEventForm = useRef({ ...initalValues }).current;
	const setFormValues = useRef<((values: React.SetStateAction<AddEventForm>, shouldValidate?: boolean | undefined) => void) | null>(null);

	const [errors, setErrors] = useState<AddEventInlineError | null>(null);
	const [isPaidEvent, setIsPaidEvent] = useState(false);
	const [loading, setLoading] = useState(false);

	const [addEvent] = useMutation<AddEventResponse, AddEventRequestVariables>(ADD_EVENT_MUTATION);
	const [addEventMedia] = useMutation<UploadEventMediasResponse, UploadEventMediaRequestVariables>(UPLOAD_MEDIA_MUTATION);
	const [fetchEventDetail] = useLazyQuery<FetchEventDetailResponse, FetchEventDetailRequestVariables>(FETCH_EVENT_DETAIL);

	const handleCategoryUpdate = (selectedCategories, category, setFieldValue) => {
		let categories = [...selectedCategories];
		const categoryIndex = categories.indexOf(category);

		if (categoryIndex === -1) {
			categories.push(category);
		} else {
			categories.splice(categoryIndex, 1);
		}

		setFieldValue("categories", categories);
	};

	const handleImageUpload = async (values, setFieldValue) => {
		if (values.length === 4) {
			if (displayToast) displayToast("error", "Max 4 imanges can be uploaded.");
			return;
		}

		const response = await openGallery({ maxFiles: 4 - values.length, multiple: true });
		if (response?.length) {
			const files = [...values, ...response];
			setFieldValue("uploadFiles", files);
		}
	};

	const handleEventAdd = async (values: AddEventForm) => {
		try {
			const data = { ...values };
			await validateEventForm(data, isPaidEvent);

			if (addressInfo.current) {
				data.location = JSON.stringify(addressInfo.current);
			}

			const [date, time] = [formatTimeStamp(data.eventDate, "YYYY-MM-DD"), formatTimeStamp(data.eventTime, "HH:mm")];
			const eventTimestamp = formatToIso(`${date} ${time}`, "YYYY-MM-DD HH:mm");
			setLoading(true);
			const { data: eventResponse } = await addEvent({
				variables: {
					title: data.title,
					description: data.description,
					location: data.location,
					eventTimestamp: eventTimestamp,
					category: data.categories,
					price: Number(data.price).toFixed(2),
				},
			});

			const { uploadFiles } = data;

			if (eventResponse?.createEvent) {
				const eventId = eventResponse.createEvent.id;
				await Promise.all(
					uploadFiles.map((file) => addEventMedia({ variables: { file: generateRNFile(file.uri, file.name), event: parseInt(eventId) } })),
				);
				if (displayToast) displayToast("success", "Event created successfully.");
				setLoading(false);
				navigation.goBack();
			}
		} catch (errors: any) {
			setLoading(false);
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

	const handleDateChange = (type: "date" | "time", setFieldValue) => (timestamp: Date) => {
		const key = type === "date" ? "eventDate" : "eventTime";
		setFieldValue(key, timestamp);
	};

	useEffect(() => {
		if (eventSlug) {
			(async () => {
				const response = await fetchEventDetail({ variables: { slug: eventSlug } });
				console.log({ response });
				const eventDetail: any = { ...response.data?.eventDetail };
				if (eventDetail) {
					const timestamp = eventDetail?.eventTimestamp ? new Date(parseInt(eventDetail?.eventTimestamp)) : "";
					const [eventDate, eventTime] = [timestamp, timestamp];
					const location = eventDetail?.location?.address;
					const uploadFiles = eventDetail?.medias;
					const categories = eventDetail?.category;

					//delete unnecessary keys
					for (let key in eventDetail) {
						if (!Object.keys(initialFormValues).includes(key)) {
							delete eventDetail[key];
						}
					}

					const data = { ...eventDetail, eventDate, eventTime, location, uploadFiles, categories };
					if (setFormValues.current) setFormValues.current(data);
				}
			})();
		}
	}, [eventSlug]);

	return (
		<Theme avoidTopNotch={true}>
			<Box position="absolute" bottom={0}>
				<Curve />
			</Box>
			<Header headerTitle="Add Event" position="relative" onBack={() => navigation.goBack()} />
			<Formik initialValues={initialFormValues} onSubmit={handleEventAdd}>
				{({ values, handleChange, handleSubmit, setFieldValue, setValues }) => {
					setFormValues.current = setValues;
					return (
						<>
							<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
								<Box marginHorizontal="l" marginTop="s" position="relative" zIndex={1}>
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
												const isSelected = values.categories.includes(category);
												return (
													<Category
														key={index}
														name={category}
														selected={isSelected}
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
									<DateInput
										type="date"
										label="Event Date"
										value={values.eventDate ? formatTimeStamp(values.eventDate, "DD MMM, YYYY") : ""}
										onChange={handleDateChange("date", setFieldValue)}
										errorMessage={errors?.eventDate}
									/>
									<DateInput
										type="time"
										label="Event Time"
										value={values.eventTime ? formatTimeStamp(values.eventTime, "HH:mm A") : ""}
										onChange={handleDateChange("time", setFieldValue)}
										errorMessage={errors?.eventTime}
									/>
									<TextInput
										type="textarea"
										label="Bio"
										onChangeText={handleChange("description")}
										errorMessage={errors?.description}
										value={values.description}
									/>
								</Box>
								<Box marginTop="s" minHeight={100}>
									<Text variant="light" marginLeft="l" fontSize={theme.fontSize.sm} mb="xs">
										Upload Images
									</Text>
									<ScrollView
										horizontal
										showsHorizontalScrollIndicator={false}
										contentContainerStyle={{ flexGrow: 1, paddingRight: theme.spacing.l, marginTop: theme.spacing.xs }}>
										<TouchableOpacity onPress={() => handleImageUpload(values.uploadFiles, setFieldValue)}>
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
											const source = file.link ? { uri: file.link } : file;
											return (
												<Box width={70} height={70} backgroundColor="gray" borderRadius="s" overflow="hidden" ml="s">
													<Image source={source} style={{ width: "100%", height: "100%" }} />
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
											onChangeText={handleChange("price")}
											value={values?.price?.toString()}
											keyboardType="number-pad"
											errorMessage={errors?.price}
										/>
									)}
								</Box>
							</ScrollView>
							<Box marginHorizontal="l">
								<Button
									label="Add Event"
									variant="primary"
									disabled={loading}
									loading={loading}
									containerStyle={{ width: "100%" }}
									onPress={handleSubmit}
								/>
							</Box>
						</>
					);
				}}
			</Formik>
		</Theme>
	);
};

export default AddEvent;

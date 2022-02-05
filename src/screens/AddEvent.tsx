import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";
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

	const [errors] = useState<AddEventInlineError | null>(null);

	return (
		<Theme avoidTopNotch={true}>
			<Box position="absolute" bottom={0}>
				<Curve />
			</Box>
			<Header headerTitle="Edit Profile" position="relative" onBack={() => navigation.goBack()} />
			<Formik initialValues={initialFormValues} onSubmit={() => {}}>
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
											{EventCategories.map((category, index) => (
												<Category key={index} name={category} selected={false} ml={index === 0 ? "l" : "none"} mr={"xs"} onPress={() => {}} />
											))}
										</ScrollView>
									)}
								</Box>
								<Box marginHorizontal="l" marginBottom="xl">
									<TextInput
										type="textarea"
										label="Bio"
										onChangeText={handleChange("bio")}
										errorMessage={errors?.description}
										value={values.description}
									/>
									<Box marginTop="s" minHeight={100}>
										<Text variant="light" fontSize={theme.fontSize.sm} mb="xs">
											Upload Images
										</Text>
										<Box width={70} height={70} borderWidth={1} alignItems="center" justifyContent="center" borderRadius="s" borderColor="gray">
											<FontAwesomeIcon icon={faPlus} color={theme.colors.gray} />
										</Box>
									</Box>
									<TextInput
										type="number"
										label="Price"
										onChangeText={handleChange("categories")}
										errorMessage={errors?.categories}
										value={""}
										keyboardType="number-pad"
									/>
									<Box marginTop="s" flexDirection="row" alignItems="center">
										<Text variant="light" fontSize={theme.fontSize.sm} mr="xl">
											Paid
										</Text>
										<Switch isSwitchOn={false} onChange={() => {}} />
									</Box>
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

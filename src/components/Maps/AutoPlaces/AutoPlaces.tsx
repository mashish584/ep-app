import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import debounce from "lodash.debounce";
import uuid from "react-native-uuid";

import { inputContainerStyle, inputStyle, labelStyle } from "../../Form/TextInput";
import theme, { pallette } from "../../../utils/theme";
import { geoCode, getPlaces } from "../util";
import { generateBoxShadowStyle } from "../../../utils";
import { AddressInfo, Place } from "./interface";

type Ref = TextInput;

interface SearchAddress {
	label: string;
	defaultAddress: string;
	onAddressChange: (addressInfo: AddressInfo) => void;
	error?: ReactNode;
}

let token = uuid.v4();

const AutoPlaces = React.forwardRef<Ref, SearchAddress>((props, ref) => {
	const [address, setAddress] = useState(props.defaultAddress);
	const [places, setPlaces] = useState<Place[]>([]);

	const onChange = async (text) => {
		const places = await getPlaces(text, token);
		if (places.status === "OK") {
			setPlaces(places.predictions);
		}
	};

	const onLocationSelect = async (place: Place) => {
		try {
			token = uuid.v4();
			const locationInfo = await geoCode(`place_id=${place.place_id}`);
			if (locationInfo.status === "OK" && locationInfo.results.length) {
				let postalCode;
				const {
					geometry: { location },
					address_components,
					formatted_address,
				} = locationInfo.results[0];

				address_components.map((component) => {
					if (component.types.includes("postal_code")) {
						postalCode = component.short_name || component.long_name;
					}
				});
				const addressInfo = {
					address: formatted_address,
					postcode: postalCode || "2000",
					...location,
				};

				setPlaces([]);
				props.onAddressChange(addressInfo);
			}
		} catch (err) {
			console.log({ err });
		}
	};

	const debounceChangeHandler = useMemo(() => debounce(onChange, 500), []);

	useEffect(() => {
		if (props.defaultAddress) setAddress(props.defaultAddress);
	}, [props.defaultAddress]);

	return (
		<View style={{ width: "100%", marginTop: theme.spacing.s, position: "relative", zIndex: 1 }}>
			{props.label ? <Text style={labelStyle}>{props.label}</Text> : null}
			<View style={inputContainerStyle}>
				<TextInput
					ref={ref}
					onChangeText={(text) => {
						setAddress(text);
						debounceChangeHandler(text);
					}}
					allowFontScaling={false}
					style={inputStyle}
					value={address}
				/>
			</View>
			{props.error}
			{places.length ? (
				<View style={styles.autoPlaceContainer}>
					<ScrollView showsVerticalScrollIndicator={false}>
						{places.map((place, index) => {
							return (
								<TouchableOpacity
									onPress={() => onLocationSelect(place)}
									style={[styles.result, places.length - 1 === index && { borderBottomWidth: 0 }]}>
									<Text>{place.description}</Text>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
			) : null}
		</View>
	);
});

const styles = StyleSheet.create({
	autoPlaceContainer: {
		maxHeight: 160,
		position: "absolute",
		width: "100%",
		top: "100%",
		borderRadius: theme.borderRadii.s,
		backgroundColor: theme.colors.secondary,
		paddingVertical: theme.spacing.m,
		...generateBoxShadowStyle(0, 0, pallette.rgb.black(1), 0.1, 10, 4, pallette.rgb.black(0.2)),
	},
	result: {
		paddingVertical: theme.spacing.s,
		paddingHorizontal: theme.spacing.m,
		borderBottomWidth: 1,
		borderBottomColor: pallette.rgb.gray(0.4),
		minHeight: 50,
		justifyContent: "center",
	},
});

export default AutoPlaces;

import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Circle = ({ onPress }) => {
	return (
		<View style={[StyleSheet.absoluteFillObject, styles.container]}>
			<View style={[styles.circle]}>
				<TouchableOpacity onPress={onPress}>
					<View style={[styles.button]}>
						<FontAwesomeIcon icon={faArrowRight} />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const CurveSlide = () => {
	const onPress = () => {};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Circle onPress={onPress} />
		</View>
	);
};

export default CurveSlide;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		paddingTop: 100,
		padding: 8,
		paddingBottom: 50,
	},
	paragraph: {
		margin: 12,
		fontSize: 24,
		// fontWeight: 'bold',
		textAlign: "center",
		fontFamily: "Menlo",
		color: "white",
	},
	button: {
		height: 100,
		width: 100,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	circle: {
		backgroundColor: "turquoise",
		width: 100,
		height: 100,
		borderRadius: 50,
	},
});

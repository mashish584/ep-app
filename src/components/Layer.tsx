import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { pallette } from "../utils/theme";

interface Layer {
	containerStyles?: ViewStyle;
	alpha: number;
}

const Layer: React.FC<Layer> = ({ alpha, containerStyles }) => {
	return <View style={[{ ...StyleSheet.absoluteFillObject, backgroundColor: pallette.rgb.black(alpha || 1) }, containerStyles]} />;
};

export default Layer;

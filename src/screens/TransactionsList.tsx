import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import TransactionCard from "../components/Cards/TransactionCard";
import Header from "../components/Header";
import Theme from "../components/Theme";

import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import theme, { Box, pallette, Text } from "../utils/theme";

const TransactionsList: React.FC<StackNavigationProps<RootStackScreens, "TransactionsList">> = ({ navigation }) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<Theme avoidTopNotch={true}>
			<Header headerTitle="Transactions" position="relative" onBack={() => navigation.goBack()} />

			<Box minHeight={40} flexDirection="row" borderRadius="s" overflow="hidden" margin="l">
				<TouchableOpacity onPress={() => setActiveTab(0)} style={[styles.tabBtn, activeTab === 0 && styles.activeTab]}>
					<Text variant="bold" fontSize={theme.fontSize.regular} color={activeTab === 0 ? "secondary" : "black"}>
						Paid
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setActiveTab(1)} style={[styles.tabBtn, activeTab === 1 && styles.activeTab]}>
					<Text fontSize={theme.fontSize.regular} color={activeTab === 1 ? "secondary" : "black"}>
						Received
					</Text>
				</TouchableOpacity>
			</Box>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: theme.spacing.l, paddingHorizontal: theme.spacing.l }}>
				{new Array(10).fill(1).map((_, index) => {
					return <TransactionCard key={index} />;
				})}
			</ScrollView>
		</Theme>
	);
};

const styles = StyleSheet.create({
	tabBtn: {
		flex: 0.5,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: pallette.hex.gray,
		backgroundColor: "transparent",
	},
	activeTab: {
		backgroundColor: pallette.hex.primary,
		borderColor: pallette.hex.primary,
	},
});

export default TransactionsList;

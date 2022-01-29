import React from "react";
import { ScrollView } from "react-native";
import Header from "../components/Header";
import Theme from "../components/Theme";
import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import theme from "../utils/theme";

const TransactionsList: React.FC<StackNavigationProps<RootStackScreens, "TransactionsList">> = ({ navigation }) => {
	return (
		<Theme avoidTopNotch={true}>
			<Header headerTitle="Transactions" position="relative" onBack={() => navigation.goBack()} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: theme.spacing.l, paddingVertical: theme.spacing.l }}></ScrollView>
		</Theme>
	);
};

export default TransactionsList;

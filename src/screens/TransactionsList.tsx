import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";

import TransactionCard from "../components/Cards/TransactionCard";
import Header from "../components/Header";
import Theme from "../components/Theme";
import { FETCH_TRANSACTIONS } from "../config/query";
import { FetchTransactionsResponse, FetchTransactionsVariables } from "../config/request.types";

import { RootStackScreens, StackNavigationProps } from "../navigation/types";
import { useAuth } from "../utils/store";
import theme, { Box, pallette, Text } from "../utils/theme";

// eslint-disable-next-line no-unused-vars
enum QUERY {
	// eslint-disable-next-line no-unused-vars
	PAYEE = "payee",
	// eslint-disable-next-line no-unused-vars
	RECEIVER = "receiver",
}

const TransactionsList: React.FC<StackNavigationProps<RootStackScreens, "TransactionsList">> = ({ navigation }) => {
	const userId = useAuth((store) => store.user.id);
	const [activeTab, setActiveTab] = useState(0);

	const transactionFilter = useRef({
		key: QUERY.PAYEE,
		pagination: {
			skip: 0,
			take: 10,
		},
	});

	const { data, fetchMore, refetch } = useQuery<FetchTransactionsResponse, FetchTransactionsVariables>(FETCH_TRANSACTIONS, {
		variables: { query: JSON.stringify({ [transactionFilter.current.key]: userId }), ...transactionFilter.current.pagination },
	});

	const fetchMoreTransactions = () => {
		//return if fetched all transactions
		if (data?.fetchTransactions.count === data?.fetchTransactions.transactions.length) return;

		let { skip } = transactionFilter.current.pagination;
		skip += 10;
		transactionFilter.current.pagination.skip = skip;

		fetchMore<FetchTransactionsResponse, FetchTransactionsVariables>({
			variables: { query: JSON.stringify({ [transactionFilter.current.key]: userId }), ...transactionFilter.current.pagination },
		});
	};

	return (
		<Theme avoidTopNotch={true}>
			<Header headerTitle="Transactions" position="relative" onBack={() => navigation.goBack()} />
			<Box minHeight={40} flexDirection="row" borderRadius="s" overflow="hidden" margin="l">
				<TouchableOpacity
					onPress={() => {
						transactionFilter.current.key = QUERY.PAYEE;
						transactionFilter.current.pagination.skip = 0;
						transactionFilter.current.pagination.take = 10;
						refetch({ query: JSON.stringify({ [transactionFilter.current.key]: userId }), ...transactionFilter.current.pagination });
						setActiveTab(0);
					}}
					style={[styles.tabBtn, activeTab === 0 && styles.activeTab]}>
					<Text variant="bold" fontSize={theme.fontSize.regular} color={activeTab === 0 ? "secondary" : "black"}>
						Paid
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						transactionFilter.current.key = QUERY.RECEIVER;
						transactionFilter.current.pagination.skip = 0;
						transactionFilter.current.pagination.take = 10;
						refetch({ query: JSON.stringify({ [transactionFilter.current.key]: userId }), ...transactionFilter.current.pagination });
						setActiveTab(1);
					}}
					style={[styles.tabBtn, activeTab === 1 && styles.activeTab]}>
					<Text fontSize={theme.fontSize.regular} color={activeTab === 1 ? "secondary" : "black"}>
						Received
					</Text>
				</TouchableOpacity>
			</Box>
			<FlatList
				data={data?.fetchTransactions.transactions}
				keyExtractor={(item, index) => `${item.id}_${index}`}
				contentContainerStyle={{ padding: theme.spacing.l, flexGrow: 1 }}
				renderItem={({ item, index }) => (
					<TransactionCard key={index} profile={item.event.owner.profile} title={item.event.title} date={item.createdAt} amount={item.amount} />
				)}
				showsVerticalScrollIndicator={false}
				onEndReached={fetchMoreTransactions}
				onEndReachedThreshold={0.5}
			/>
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

import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");
const data = [...Array(200).keys()].map((i, index) => ({
	key: index,
	job: index + 1,
}));

const ITEM_SIZE = 52;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const Test = ({ scrollIndex }) => {
	const ref = useRef<FlatList>(null);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		setIndex(scrollIndex);
	}, [scrollIndex]);

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 100 }}>
			<FlatList
				ref={ref}
				initialScrollIndex={index}
				// Do something when animation ended
				onMomentumScrollEnd={(ev) => {
					const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
					console.log({ index });
					setIndex(index);
				}}
				getItemLayout={(data, index) => ({ length: ITEM_SIZE, offset: ITEM_SIZE * index, index })}
				contentContainerStyle={{ flexGrow: 0, paddingHorizontal: ITEM_SPACING }}
				showsHorizontalScrollIndicator={false}
				data={data}
				keyExtractor={(item) => `${item.key}`}
				horizontal={true}
				snapToInterval={ITEM_SIZE}
				decelerationRate={"fast"}
				style={{}}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={{ width: ITEM_SIZE, height: ITEM_SIZE, borderWidth: 1, justifyContent: "center", alignItems: "center" }}
						onPress={() => {}}>
						<Text>{item.key}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default Test;

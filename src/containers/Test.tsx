import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions, Animated } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");
const data = [...Array(200).keys()].map((i, index) => ({
	key: index,
	job: index + 1,
}));

const ITEM_SIZE = 55;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

interface Test {
	scrollIndex: number;
}

const Test = ({ scrollIndex }: Test) => {
	const ref = useRef<FlatList>(null);
	const scrollX = useRef(new Animated.Value(0)).current;
	const [fIndex, setIndex] = useState(0);

	useEffect(() => {
		setIndex(scrollIndex);
	}, [scrollIndex]);

	return (
		<View style={{ flex: 0.5, alignItems: "center", justifyContent: "center", paddingTop: 100, backgroundColor: "#222" }}>
			<Animated.FlatList
				ref={ref}
				initialScrollIndex={fIndex}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
					useNativeDriver: true,
				})}
				onMomentumScrollEnd={(ev) => {
					const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
					setIndex(index);
				}}
				getItemLayout={(data, index) => ({ length: ITEM_SIZE, offset: ITEM_SIZE * index, index })}
				style={{ flexGrow: 0 }}
				contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
				showsHorizontalScrollIndicator={false}
				data={data}
				keyExtractor={(item) => `${item.key}`}
				horizontal={true}
				bounces={false}
				snapToInterval={ITEM_SIZE}
				decelerationRate={"fast"}
				renderItem={({ item, index }) => {
					const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE, (index + 2) * ITEM_SIZE];

					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0.5, 0.8, 1, 0.8, 0.5],
					});

					const scale = scrollX.interpolate({
						inputRange,
						outputRange: [1, 1, 1.6, 1, 1],
					});

					return (
						<View style={{ width: ITEM_SIZE, height: ITEM_SIZE, justifyContent: "center", alignItems: "center" }}>
							<Animated.Text
								style={{
									opacity,
									color: index === fIndex ? "#FFF" : "#F5F5F5",
									transform: [{ scale }],
								}}>
								{item.key}
							</Animated.Text>
						</View>
					);
				}}
			/>
		</View>
	);
};

export default Test;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Dimensions, Animated, StyleSheet, StatusBar, TextInput, TouchableOpacity, FlatList } from "react-native";

import theme from "../../utils/theme";

const { width, height } = Dimensions.get("window");

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38; //current size of item after removing container padding
const ITEM_SPACING = (width - ITEM_SIZE) / 2; //keep selected index in center

const Test = () => {
	const ref = useRef<FlatList>(null);
	const scrollX = useRef(new Animated.Value(0)).current;
	const inputRef = useRef<TextInput>(null);
	const timerAnimation = React.useRef(new Animated.Value(height)).current;
	const textInputAnimation = React.useRef(new Animated.Value(timers[0])).current; //animation textInput value with listeners
	const buttonAnimation = React.useRef(new Animated.Value(0)).current;

	const [duration, setDuration] = useState(timers[0]);

	const triggerAnimation = useCallback(() => {
		textInputAnimation.setValue(duration);
		Animated.sequence([
			Animated.timing(buttonAnimation, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.timing(timerAnimation, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}),
			Animated.parallel([
				Animated.timing(textInputAnimation, {
					toValue: 0,
					duration: duration * 1000,
					useNativeDriver: true,
				}),
				Animated.timing(timerAnimation, {
					toValue: height,
					duration: duration * 1000,
					useNativeDriver: true,
				}),
			]),
			Animated.delay(400),
		]).start(() => {
			textInputAnimation.setValue(duration);
			buttonAnimation.setValue(0);
		});
	}, [duration]);

	useEffect(() => {
		const listener = textInputAnimation.addListener(({ value }) => {
			inputRef?.current?.setNativeProps({
				text: Math.ceil(value).toString(),
			});
		});

		return () => {
			textInputAnimation.removeListener(listener);
			textInputAnimation.removeAllListeners();
		};
	});

	const opacity = buttonAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0],
	});

	const translateY = buttonAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 200],
	});

	const textOpacity = buttonAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
	});

	return (
		<View style={{ flex: 1, backgroundColor: "#222" }}>
			<StatusBar hidden />
			<Animated.View
				style={[
					StyleSheet.absoluteFillObject,
					{
						opacity,
						justifyContent: "flex-end",
						alignItems: "center",
						paddingBottom: 100,
						transform: [
							{
								translateY,
							},
						],
					},
				]}>
				<TouchableOpacity onPress={triggerAnimation}>
					<View style={{ width: 80, height: 80, borderRadius: 80, backgroundColor: theme.colors.primary }} />
				</TouchableOpacity>
			</Animated.View>
			<Animated.View
				style={[
					StyleSheet.absoluteFillObject,
					{
						backgroundColor: theme.colors.primary,
						transform: [
							{
								translateY: timerAnimation,
							},
						],
					},
				]}
			/>
			<View
				style={{
					position: "absolute",
					top: height / 3,
					left: 0,
					right: 0,
					flex: 1,
				}}>
				<Animated.View
					style={{
						position: "absolute",
						alignItems: "center",
						width: ITEM_SIZE,
						alignSelf: "center",
						opacity: textOpacity,
					}}>
					<TextInput ref={inputRef} style={[styles.text]} defaultValue={duration.toString()} />
				</Animated.View>
				<Animated.FlatList
					ref={ref}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
						useNativeDriver: true,
					})}
					onMomentumScrollEnd={(ev) => {
						const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
						setDuration(timers[index]);
					}}
					style={{ flexGrow: 0, opacity }}
					contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
					showsHorizontalScrollIndicator={false}
					data={timers}
					keyExtractor={(item) => `${item}`}
					horizontal={true}
					bounces={false}
					snapToInterval={ITEM_SIZE}
					decelerationRate={"fast"}
					renderItem={({ item, index }) => {
						const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE];

						const opacity = scrollX.interpolate({
							inputRange,
							outputRange: [0.5, 1, 0.5],
						});

						const scale = scrollX.interpolate({
							inputRange,
							outputRange: [0.7, 1, 0.7],
						});

						return (
							<View
								style={{
									width: ITEM_SIZE,
									height: ITEM_SIZE,
									alignItems: "center",
								}}>
								<Animated.Text
									style={{
										...styles.text,
										opacity,
										color: theme.colors.secondary,
										transform: [{ scale }],
									}}>
									{item}
								</Animated.Text>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: ITEM_SIZE * 0.8,
		fontFamily: "Menlo",
		color: theme.colors.secondary,
		fontWeight: "900",
	},
});

export default Test;

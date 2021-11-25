import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon, Pressable } from 'native-base';
import { data } from '../../components/icon';

const Details = () => {
  const width = Dimensions.get('window').width;
  const item = data[0];
  const ref: any = useRef();
  const itemSelectedIdIndex = data.findIndex((i) => i.id === item.id);
  const mountedAnimation = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(itemSelectedIdIndex)).current;
  const animatedIndex = useRef(new Animated.Value(itemSelectedIdIndex)).current;

  const animation: any = (toValue: number, delay?: number) => {
    Animated.timing(mountedAnimation, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    });
  };
  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedIndex, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true,
      }),
      animation(1, 50),
    ]).start();
  });
  const size = 35 + 20 * 2;
  const translateX = animatedIndex.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size],
  });
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          flex: 0.15,
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginVertical: 20,
          transform: [{ translateX }],
        }}
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                padding: 20,
              }}
              onPress={() => {
                activeIndex.setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true,
                });
              }}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <View
        style={{
          flex: 0.85,
          marginTop: 12,
        }}
      >
        <Animated.FlatList
          ref={ref}
          horizontal
          data={data}
          renderItem={({ item }) => {
            return (
              <ScrollView
                style={{
                  width: width - 10 * 2,
                  margin: 10,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: 16,
                }}
              >
                <Text>{item.title}</Text>
              </ScrollView>
            );
          }}
          keyExtractor={(item, index) => item.title + index.toString()}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
            activeIndex.setValue(newIndex);
          }}
          initialScrollIndex={itemSelectedIdIndex}
          pagingEnabled
          nestedScrollEnabled
        />
      </View>
    </View>
  );
};

export default Details;
const styles = StyleSheet.create({});

import React from "react";
import { Box, Text, Pressable } from "native-base";
import { ScrollView, Image } from "react-native";
import { formatNumber } from "../../helper/formatNumberHelper";
import { useNavigation } from "@react-navigation/core";
import { SCREEN_NAME } from "../../screensContants/contants";

const FlashSale = () => {
  const navigation = useNavigation();
  const data = [
    {
      title: "Giày Nike Air Shadow",
      priceOld: 3000000,
      priceNew: 2000000,
      url: "https://cdn.kickscrew.com/media/catalog/product/cache/dd3ae58018643bb67b4bf8f0a77873b1/C/I/CI0919-101_ta.jpg",
    },
    {
      title: "Giày Nike Air Shadow",
      priceOld: 3000000,
      priceNew: 2000000,
      url: "https://cdn.kickscrew.com/media/catalog/product/cache/dd3ae58018643bb67b4bf8f0a77873b1/C/I/CI0919-101_ta.jpg",
    },

    {
      title: "Giày Nike Air Shadow Red",
      priceOld: 200000,
      priceNew: 100000,
      url: "https://img.ssensemedia.com/images/b_white,g_center,f_auto,q_auto:best/212011F128178_5/nike-air-force-1-shadow-sneakers.jpg",
    },

    {
      title: "Slipon Authenic",
      priceOld: 460000,
      priceNew: 450000,
      url: "https://img.ssensemedia.com/images/b_white,g_center,f_auto,q_auto:best/211739M237010_1/vans-black-and-white-og-classic-slip-on-sneakers.jpg",
    },
  ];
  return (
    <Box flex={1} backgroundColor="black" p={4}>
      <Box m={2}>
        <Text color="white" fontWeight="bold">
          Today Deal
        </Text>
      </Box>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {data.map((item) => {
          return (
            <Pressable
              backgroundColor="white"
              m={2}
              borderRadius={8}
              _pressed={{ opacity: 0.5 }}
              onPress={() => {
                navigation.navigate(SCREEN_NAME.TODAY_DEAL_SCREEN);
              }}
            >
              <Image
                source={{ uri: item.url }}
                style={{
                  aspectRatio: 2 / 1,
                  height: 60,
                }}
                resizeMode="contain"
              />
              <Box p={2}>
                <Text mt={1.5} fontWeight="bold" fontSize={12}>
                  {item.title}
                </Text>

                <Text mt={1.5} fontWeight="bold">
                  {formatNumber(item.priceOld)}
                </Text>

                <Text mt={1.5} color="gray.300">
                  {formatNumber(item.priceNew)}
                </Text>
              </Box>
            </Pressable>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default FlashSale;

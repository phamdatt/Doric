import React from "react";
import { View, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import { Box, Text, useTheme, Pressable } from "native-base";

const ProductTopTrending = () => {
  const data = [
    {
      title: "Váy & Đầm",
    },
    {
      title: "Giày",
    },
    {
      title: "Áo",
    },
    {
      title: "Denim",
    },
    {
      title: "Nước hoa",
    },
    {
      title: "Đồ lót",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Box flex={1} px={3}>
        <Text mt={4} fontSize={13} fontWeight="bold">
          Mua theo thể loại
        </Text>
      </Box>
      <Box flex={1}>
        <Box width="100%">
          <Box
            flexDirection="row"
            flex={1}
            flexWrap="wrap"
            justifyContent="center"
            py={2}
          >
            {data.map((item) => {
              return (
                <Box
                  width="46%"
                  backgroundColor="black"
                  justifyContent="center"
                  alignItems="center"
                  px={4}
                  py={3}
                  m={1.5}
                  key={item.title}
                >
                  <Text fontSize={18} fontWeight="700" color="white">
                    {item.title}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </View>
  );
};

export default ProductTopTrending;

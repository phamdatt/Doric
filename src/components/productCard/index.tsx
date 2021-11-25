import React from "react";
import { Box, Text } from "native-base";
import { Image } from "react-native";
import { formatNumber } from "../../helper/formatNumberHelper";

export interface Props {
  productName: string;
  productImage: any;
  productPrice: number;
  discount: number;
  description: string;
}
const ProductCard = (props: Props) => {
  return (
    <Box flex={1}>
      <Image
        source={{ uri: props.productImage?.imageThumnail }}
        style={{
          aspectRatio: 1,
          width: "100%",
          height: "auto",
        }}
        resizeMode="contain"
      />
      <Box>
        <Text mt={1.5} fontSize={14} numberOfLines={1}>
          {props.productName}
        </Text>
        <Text mt={1.5} fontWeight="bold">
          {formatNumber(props.productPrice)}d
        </Text>
      </Box>
    </Box>
  );
};

export default ProductCard;

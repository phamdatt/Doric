import React from "react";
import { Pressable, Text, Box } from "native-base";
import { Image } from "react-native";
import { SCREEN_NAME } from "../../screensContants/contants";
import { useNavigation } from "@react-navigation/native";
import { formatNumber } from "../../helper/formatNumberHelper";

export interface PropsGlobalInterface {
  productId: string;
  propductName: string;
  productImage?: any;
  productPrice: number;
  productPercent: number;
  productUrl?: string;
  productFrom?: string;
  productDescription: string;
  productCatId: number;
}
function ProductCardMini(props: PropsGlobalInterface) {
  const navigation: any = useNavigation();
  return (
    <Pressable
      flexGrow={1}
      _pressed={{
        opacity: 0.5,
      }}
      borderRadius="md"
      backgroundColor="white"
      position="relative"
      borderColor="black"
      borderWidth={1}
      onPress={() => {
        navigation.navigate(SCREEN_NAME.PRODUCT_DETAIL_SCREEN, {
          productId: props.productId,
          catId: props.productCatId,
        });
      }}
    >
      <Image
        source={{ uri: props.productImage[0].imageThumnail }}
        style={{ aspectRatio: 2 / 1, width: "100%", height: "auto" }}
        resizeMode="contain"
      />
      {props.productPercent > 0 && (
        <Box
          position="absolute"
          top={0}
          left={0}
          backgroundColor="red.600"
          px={1}
          py={1}
          borderTopLeftRadius="md"
          borderBottomRightRadius="md"
        >
          <Text color="white" fontSize="xs">
            -{props.productPercent}%
          </Text>
        </Box>
      )}
      <Box p={2}>
        <Text noOfLines={2} fontSize="xs" fontWeight="700">
          {props.propductName}
        </Text>

        {props.productPrice > 0 && (
          <Text
            color="orange.400"
            fontSize="md"
            fontWeight="500"
            noOfLines={1}
            mt={1.5}
          >
            {formatNumber(props.productPrice)}
            {/* {props.productPrice} */}
          </Text>
        )}

        <Text noOfLines={1} color="gray.500" mt={1.5} fontSize={10}>
          {props.productDescription}
        </Text>
      </Box>
    </Pressable>
  );
}
export default ProductCardMini;

import React from "react";
import { Box, Text, useTheme, Pressable } from "native-base";
import { Image } from "react-native";
import { ThemeType } from "../../theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { formatNumber } from "../../helper/formatNumberHelper";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../../screensContants/contants";

export interface PropsData {
  cartItem: any;
}
const CartProduct = (props: PropsData) => {
  const navigation: any = useNavigation();
  const { cartItem } = props;
  const theme = useTheme<ThemeType>();
  return (
    <Box flex={1}>
      {cartItem?.itemList.map((item: any) => {
        return (
          <Box flexDirection="row" width="100%" py={4}>
            <Pressable
              flex={0.3}
              height={100}
              borderRadius={12}
              alignItems="center"
              mr={4}
              borderStyle="dashed"
              borderWidth={0.5}
              mt={1}
              justifyContent="center"
              _pressed={{ opacity: 0.5 }}
              onPress={() => {
                navigation.navigate(SCREEN_NAME.PRODUCT_DETAIL_SCREEN, {
                  productId: item._id,
                });
              }}
            >
              <Image
                source={{
                  uri: item.image[0].imageThumnail,
                }}
                resizeMode="cover"
                style={{ height: 60, width: 60 }}
              />
            </Pressable>
            <Box flex={0.7}>
              <Box flexDirection="row">
                <Text
                  fontSize={theme.fontSizes.md}
                  fontFamily={theme.fonts.FadoBold}
                  fontWeight="bold"
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
                <Pressable ml="auto" mr={4} mt={1} _pressed={{ opacity: 0.5 }}>
                  <FontAwesome5 name="times" size={14} />
                </Pressable>
              </Box>
              {/*Description*/}
              <Box mt={2}>
                <Text
                  color={theme.colors.gray[500]}
                  fontSize={theme.fontSizes.xs}
                >
                  Size:M
                </Text>
              </Box>
              <Box mt={2}>
                <Text
                  color={theme.colors.gray[500]}
                  fontSize={theme.fontSizes.xs}
                >
                  Color:Black
                </Text>
              </Box>
              <Box mt={2} flexDirection="row">
                <Box>
                  <Text
                    fontSize={theme.fontSizes.md}
                    fontFamily={theme.fonts.FadoBold}
                    fontWeight="bold"
                  >
                    {formatNumber(item.price)}
                  </Text>
                </Box>
                <Box ml="auto" flexDirection="row" mr={3}>
                  <Pressable
                    p={1}
                    borderRadius={60}
                    borderWidth={1}
                    _pressed={{ opacity: 0.5 }}
                  >
                    <FontAwesome5 name="minus" size={10} />
                  </Pressable>
                  <Box px={2}>
                    <Text>1</Text>
                  </Box>
                  <Pressable
                    p={1}
                    borderRadius={60}
                    borderWidth={1}
                    _pressed={{ opacity: 0.5 }}
                  >
                    <FontAwesome5 name="plus" size={10} />
                  </Pressable>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default CartProduct;

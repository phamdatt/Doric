import React from "react";
import { Box, Text, Pressable, useTheme, ScrollView } from "native-base";
import { Image } from 'react-native';
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";
import { ThemeType } from "@/theme";
import Header from "@/components/header";
import { addOrder } from "@/service/api/order/addOrder";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "@/screensContants/contants";
const CheckoutScreen = () => {
  const navigation: any = useNavigation();
  const theme = useTheme<ThemeType>();
  const onSumit = () => {
    addOrder({
      email: 'tiendatt3009@gmail.com',
      address: '22 tktq',
      phone: '0333727182',
      productId: '6176e19175325267b1d973a4',
      orderStatus: 1,
      totalPrice: 222,
      name: 'Pham Tien Dat'
    }).then((resp) => {
      navigation.navigate(SCREEN_NAME.ORDER_DETAIL, {
        orderId: resp.data.payload.orderId
      })
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <Box flex={1} backgroundColor="white">
      <Header leftCol={true} headerTitle="Thanh toán" rightCol={false} menuIcon={true} />
      <ScrollView>
        <Box px={4} flex={1}>
          <Box flexDirection="row" width="100%" py={4} >
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

              }}
            >
              <Image
                source={{
                  uri: '',
                }}
                resizeMode="contain"
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
                    fontSize={theme.fontSizes.xs}
                    fontFamily={theme.fonts.Oswald}
                    fontWeight="bold"
                  >
                  </Text>
                  <Text
                    fontSize={theme.fontSizes.sm}
                    fontFamily={theme.fonts.Oswald}
                    fontWeight="bold"
                  >
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
        </Box>
        <Pressable onPress={onSumit} backgroundColor="black" flex={1}>
          <Text>Submit</Text>
        </Pressable>
      </ScrollView>
    </Box>
  );
};

export default CheckoutScreen;

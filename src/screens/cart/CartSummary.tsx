import React from "react";
import { Box, Text, Divider, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../../screensContants/contants";

const CartSummary = () => {
  const navigation: any = useNavigation();
  const onCheckout = () => {
    navigation.navigate(SCREEN_NAME.CHEKCOUT_SCREEN);
  };
  return (
    <Box
      px={4}
      py={2}
      position="absolute"
      left={0}
      bottom={0}
      right={0}
      backgroundColor="white"
    >
      <Box>
        <Box flexDirection="row" py={2}>
          <Box>
            <Text fontWeight="bold">Tổng tiền</Text>
          </Box>
          <Box ml="auto">
            <Text fontWeight="bold">999</Text>
          </Box>
        </Box>
        <Divider />
      </Box>
      <Pressable
        p={4}
        backgroundColor="black"
        mt={2}
        borderRadius={60}
        alignItems="center"
        _pressed={{ opacity: 0.5 }}
        onPress={() => {
          onCheckout();
        }}
      >
        <Text color="white" fontWeight="bold">
          Thanh toán
        </Text>
      </Pressable>
    </Box>
  );
};

export default CartSummary;

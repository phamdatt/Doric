import React, { useMemo } from "react";
import { Box, Text, Divider, Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../../screensContants/contants";
import { formatNumber } from "@/helper/formatNumberHelper";

const CartSummary = (props: any) => {
  const { data } = props;
  const navigation: any = useNavigation();
  const onCheckout = () => {
    navigation.navigate(SCREEN_NAME.CHEKCOUT_SCREEN);
  };
  const totalPirce = useMemo(() => {
    return data?.reduce((total, item) => {
      return total + item.totalPrice;
    }, 0);
  }, []);
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
            <Text fontWeight="bold">Giảm giá</Text>
          </Box>
          <Box ml="auto">
            <Text fontWeight="bold">0</Text>
          </Box>
        </Box>
        <Divider />
      </Box>
      <Box>
        <Box flexDirection="row" py={2}>
          <Box>
            <Text fontWeight="bold">Tổng tiền</Text>
          </Box>
          <Box ml="auto">
            <Text fontWeight="bold">{formatNumber(totalPirce)}</Text>
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
    </Box >
  );
};

export default CartSummary;

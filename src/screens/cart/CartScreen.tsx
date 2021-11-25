import React, { useEffect, useContext, useState } from "react";
import { ScrollView } from "react-native";
import CartDiscountSection from "./CartDiscount";
import { Box, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ThemeType } from "../../theme";
import CartProduct from "./CartProduct";
import CartSummary from "./CartSummary";
import Header from "../../components/header";
import { FullscreenLoadingContext } from "../../context/loadingScreen";
import { getCart } from "../../service/api/card/getCart";
import CartEmpty from "./CartEmpty";
import isEmpty from "lodash";
import { backgroundColor } from "styled-system";

const CartScreen = () => {
  const theme = useTheme<ThemeType>();
  const navigation: any = useNavigation();
  const { setIsShowFullscreenLoading } = useContext(FullscreenLoadingContext);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setIsShowFullscreenLoading(true);
    getCart()
      .then((resp) => {
        setData(resp.data.payload);
      })
      .catch((err) => {})
      .finally(() => {
        setIsShowFullscreenLoading(false);
      });
  }, []);
  return (
    <Box style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        leftCol={true}
        headerTitle="Giỏ hàng"
        rightCol={false}
        menuIcon={true}
      />
      {data.length <= 0 ? (
        <CartEmpty />
      ) : (
        <Box flex={1} backgroundColor="white">
          <ScrollView>
            <Box flex={1} px={4}>
              {data.map((item) => (
                <CartProduct cartItem={item} key={item._id} />
              ))}
            </Box>
            <CartDiscountSection />
          </ScrollView>
          <CartSummary />
        </Box>
      )}
    </Box>
  );
};

export default CartScreen;

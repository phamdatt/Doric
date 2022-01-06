import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CartDiscountSection from "./CartDiscount";
import { Box } from "native-base";
import CartProduct from "./CartProduct";
import CartSummary from "./CartSummary";
import Header from "../../components/header";
import { getCart } from "../../service/api/card/getCart";
import CartEmpty from "./CartEmpty";
import { ActivityIndicator } from "react-native";

const CartScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    getCart()
      .then((resp) => {
        setData(resp.data.payload);
      })
      .catch((err) => { })
      .finally(() => {
        setIsLoading(false);
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
      {
        isLoading ? <Box>
          <ActivityIndicator size="small" color="black" />
        </Box> : <>
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
              <CartSummary data={data} />
            </Box>
          )}
        </>
      }
    </Box>
  );
};

export default CartScreen;

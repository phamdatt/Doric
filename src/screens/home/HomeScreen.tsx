import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SCREEN_NAME } from "../../screensContants/contants";
import ProductBanner from "./ProductBanner";
import ProductTopTrending from "./ProductTopTrending";
import Header from "../../components/header";
import ProductAllSection from "./ProductAllSection";
import { FullscreenLoadingContext } from "../../context/loadingScreen";
import FlashSale from "./FlashSale";
import { Box } from "native-base";
import { getAllProduct } from "../../service/api/product/getAllProduct";

const HomeScreen = () => {
  
  const [data, setData] = useState<any[]>([]);
  const { setIsShowFullscreenLoading } = useContext(FullscreenLoadingContext);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.navigate(SCREEN_NAME.PRODUCT_LIST_FAVORITE_SCREEN)
  }, [])
  useEffect(() => {
    getAllProduct()
      .then((resp) => {
        setData(resp.data.payload);
      })
      .catch((error) => {
        console.warn(error)
      })
      .finally(() => { });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        headerTitle="Doric Holic"
        leftCol={false}
        rightCol={true}
        menuIcon={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductBanner />
        <ProductTopTrending />
        <FlashSale />
        <ProductAllSection data={data} />
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

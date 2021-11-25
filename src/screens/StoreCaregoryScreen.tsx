import React, { useMemo, useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { Text, Box, useTheme } from "native-base";
import Header from "../components/header";
import { useNavigation } from "@react-navigation/native";
import ProductCardMini from "../components/productCardMini";
import { ThemeType } from "../theme";
import { getCategoryBySlugAndCatId } from "../service/api/allCategory";
import { useRoute } from "@react-navigation/native";
import { FullscreenLoadingContext } from "../context/loadingScreen";
import { getProductByCatId } from "../service/api/product/getProductByCatId";
import { assetImages } from "../config";

export interface RouteParamsInterface {
  slug: string;
  catId: number;
}
const StoreCaregory = () => {
  const theme = useTheme<ThemeType>();
  const route = useRoute();
  const routeParams = (route.params as RouteParamsInterface) ?? {};

  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const { setIsShowFullscreenLoading } = useContext(FullscreenLoadingContext);
  const styles = useMemo(() => {
    return createStyle(theme);
  }, []);

  const navigation: any = useNavigation();
  useEffect(() => {
    setIsShowFullscreenLoading(true);
    getCategoryBySlugAndCatId({
      slug: routeParams.slug,
      catId: routeParams.catId,
    })
      .then((resp) => {
        setDataCategory(resp.data.payload);
      })
      .catch((error) => { })
      .finally(() => {
        getProductByCatId({
          catId: routeParams.catId,
        })
          .then((resp) => {
            setDataProduct(resp.data.payload ?? []);
          })
          .catch(() => { })
          .finally(() => { });
        setIsShowFullscreenLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {
        dataProduct.length <= 0 ?
          <Box justifyContent="center" flex={1}>
            <Image source={assetImages.character} resizeMode="contain" style={{ height: 200, width: Dimensions.get('window').width }} />
            <Text textAlign="center">Hiện tại không tìm thấy dữ liệu sản phẩm này</Text>
          </Box>
          : <Box flex={1}>

            <Header
              headerTitle="Sản phẩm theo loại"
              leftCol={true}
              rightCol={true}
              menuIcon={true}
            />

            <Box>
              {dataCategory.map((item) => {
                return (
                  <Box key={item.name} py={3} px={4} backgroundColor="gray.200">
                    <Text>{item.name}</Text>
                  </Box>
                );
              })}
            </Box>
            <FlatList
              data={dataProduct}
              contentContainerStyle={{
                marginTop: 10,
              }}
              renderItem={({ item }) => {
                return (
                  <Box width="50%" p={1} key={item._id}>
                    <ProductCardMini
                      productId={item._id}
                      propductName={item.name}
                      productImage={item.image}
                      productPercent={item.disCount}
                      productPrice={item.price}
                      productDescription={item.description}
                      productCatId={item.catId}
                    />
                  </Box>
                );
              }}
              keyExtractor={(item) => item.name}
              numColumns={2}
            />
          </Box >
      }
    </View >
  );
};

export default StoreCaregory;

function createStyle(theme: ThemeType) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    tabBox: {
      backgroundColor: theme.colors.white,
      shadowColor: theme.colors.gray[300],
      shadowOffset: { height: 2, width: 0 },
      shadowOpacity: 2,
      shadowRadius: 1,
    },
    tabBarItem: {
      flexDirection: "row",
    },
    tabBarItemBtn: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginLeft: 14,
    },
    tabBarItemBtnActive: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginLeft: 14,
      borderBottomColor: theme.colors.gray[600],
      borderBottomWidth: 3,
    },
    tabBarItemTitle: {
      color: theme.colors.gray[400],
      fontWeight: "bold",
      textAlign: "center",
    },
    tabBarItemTitleActive: {
      color: theme.colors.black[400],
      fontWeight: "bold",
      textAlign: "center",
    },
  });
}

import React, { useMemo, useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet, Image, Dimensions } from "react-native";
import { Text, Box, useTheme } from "native-base";
import Header from "../components/header";
import { useNavigation } from "@react-navigation/native";
import ProductCardMini from "../components/productCardMini";
import { ThemeType } from "../theme";
import { useRoute } from "@react-navigation/native";
import { FullscreenLoadingContext } from "../context/loadingScreen";
import { assetImages } from "../config";
import { getTodayDeal } from "@/service/api/other/getTodayDeal";

export interface RouteParamsInterface {
  slug: string;
  catId: number;
}
const TodayDealScreen = () => {
  const theme = useTheme<ThemeType>();
  const route = useRoute();
  const [dataProduct, setDataProduct] = useState<any[]>([]);
  const { setIsShowFullscreenLoading } = useContext(FullscreenLoadingContext);

  const styles = useMemo(() => {
    return createStyle(theme);
  }, []);

  const navigation: any = useNavigation();
  useEffect(() => {
    setIsShowFullscreenLoading(true);
    getTodayDeal()
      .then((resp) => {
        setDataProduct(resp.data?.payload ?? []);
      })
      .catch(() => { })
      .finally(() => {
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
              headerTitle="Today Deal"
              leftCol={true}
              rightCol={true}
              menuIcon={true}
            />
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

export default TodayDealScreen;

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

import React, { useState, useMemo } from "react";
import { Box, Pressable, useTheme } from "native-base";
import { Header } from "react-native/Libraries/NewAppScreen";
import ProductCardMini from '@/components/productCardMini';
import { FlatList, StyleSheet } from 'react-native';
import { ThemeType } from '@/theme/index'
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "@/screensContants/contants";
const data = [
  {
    id: 1,
    productName: 'Quan tay',
    productPrice: 250000,
    description: 'Quần tây nam đẹp gía tốt',
    discount: 25,
    productImage: 'https://img.ssensemedia.com/images/b_white,g_center,f_auto,q_auto:best/212011F128178_5/nike-air-force-1-shadow-sneakers.jpg',
    catId: 5,
    productFrom: '',
    productDescription: '',
    productUrl: '',
  },
  {
    id: 2,
    productName: 'Quan tay',
    productPrice: 250000,
    description: 'Quần tây nam đẹp gía tốt',
    discount: 25,
    productImage: 'https://img.ssensemedia.com/images/b_white,g_center,f_auto,q_auto:best/212011F128178_5/nike-air-force-1-shadow-sneakers.jpg',
    catId: 5,
    productFrom: '',
    productDescription: '',
    productUrl: '',
  },
  {
    id: 3,
    productName: 'Quan tay',
    productPrice: 250000,
    description: 'Quần tây nam đẹp gía tốt',
    discount: 25,
    productImage: 'https://img.ssensemedia.com/images/b_white,g_center,f_auto,q_auto:best/212011F128178_5/nike-air-force-1-shadow-sneakers.jpg',
    catId: 5,
    productFrom: '',
    productDescription: '',
    productUrl: '',
  },
  {
    id: 4,
    productName: 'Quan tay',
    productPrice: 250000,
    description: 'Quần tây nam đẹp gía tốt',
    discount: 25,
    productImage: 'https://img.ssensemedia.com/images/b_white,g_center,f_auto,q_auto:best/212011F128178_5/nike-air-force-1-shadow-sneakers.jpg',
    catId: 5,
    productFrom: '',
    productDescription: '',
    productUrl: '',
  }
]
const TodayDealScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme<ThemeType>();
  const styles = useMemo(() => {
    return createStyle(theme);
  }, []);

  const [value, setValue] = useState<any>("");
  const renderItem = ({ item, index }: { item: any, index: number }) => {
    return (
      <Pressable
        width="50%"
        style={index % 2 === 0 ? styles.itemColEven : styles.itemColOdd}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.PRODUCT_DETAIL_SCREEN, {
            productId: item.id,
            catId: item.catId,
          })
        }}
        _pressed={{ opacity: 0.5 }}
      >
        <ProductCardMini
          productCatId={item.catId}
          productId={item.id}
          productImage={item.productImage}
          productDescription={item.productDescription}
          productPrice={item.productPrice}
          productFrom={item.productFrom}
          propductName={item.productName}
          productPercent={item.discount}
          productUrl={item.productUrl}
        />
      </Pressable>
    )
  }
  return (
    <Box flex={1}>
      <Header leftCol={true} headerTitle="Giảm giá hôm nay" menuIcon={false} rightCol={true} />
      <Box width="100%" flexDirection="row">
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </Box>
    </Box>
  );
};

export default TodayDealScreen;
export function createStyle(theme: ThemeType) {
  return StyleSheet.create({
    itemColOdd: {
      // cột lẽ
      borderRightWidth: 1,
      borderRightColor: theme.colors.gray[200],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray[200],
      padding: 16,
      width: "50%",
    },
    itemColEven: {
      // cột chẳn
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray[200],
      padding: 16,
      width: "50%",
    },
  })
}
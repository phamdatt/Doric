import React, { useMemo } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useTheme, Pressable, Box } from "native-base";
import { ThemeType } from "../../theme";
import ProductCard from "../../components/productCard";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../../screensContants/contants";

const ProductAllSection = (props: any) => {
  const { data } = props;
  const theme = useTheme<ThemeType>();
  const navigation = useNavigation();
  const styles = useMemo(() => {
    return createStyles(theme);
  }, []);
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <Pressable
        width="50%"
        style={index % 2 === 0 ? styles.itemColOdd : styles.itemColEven}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.PRODUCT_DETAIL_SCREEN, {
            productId: item._id,
            catId: item.catId,
          });
        }}
        _pressed={{ opacity: 0.2 }}
      >
        <ProductCard
          productName={item.name}
          productImage={item.image[0]}
          description={item.description}
          discount={item.discount}
          productPrice={item.price}

        />
      </Pressable>
    );
  };

  return (
    <Box style={{ flex: 1 }}>
      <Box flex={1}>
        <Box width="100%" flexDirection="row">
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={2}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductAllSection;
export function createStyles(theme: ThemeType) {
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
  });
}

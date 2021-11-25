import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { assetImages } from "../../config";
import { Text, Button, useTheme } from "native-base";
import { ThemeType } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../../screensContants/contants";

function CartEmpty() {
  const navigation: any = useNavigation();
  return (
    <View style={styles.screen}>
      <Image
        source={assetImages.cartEmpty}
        accessibilityIgnoresInvertColors={true}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.noticeTitle}>
        Hiện tại giỏ hàng của bạn chưa có sản phẩm nào
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.footerRightBtnBox}>
          <Button
            mt={3}
            style={styles.footerBtn}
            onPress={() => {
              navigation.navigate("Home");
            }}
            _pressed={{ opacity: 0.5 }}
          >
            <Text style={styles.footerRightBtnTitle}>Tiếp mục mua sắm</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

export default CartEmpty;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
  image: {
    width: 320,
    height: 180,
    marginBottom: 6,
  },
  noticeTitle: {
    textAlign: "center",
    lineHeight: 18,
  },
  footerRightBtnBox: {
    marginTop: 8,
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 0,
  },
  footerLeftBtnTitle: {
    lineHeight: 21,
  },
  footerRightBtnTitle: {
    lineHeight: 21,
    color: "white",
  },
  footerBtn: {
    borderRadius: 60,
    backgroundColor: "black",
  },
});

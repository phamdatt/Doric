import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeNavigator from "@/navigation/HomeNavigator";
import ProfileScreen from "@/screens/user/ProfileScreen";
import { SCREEN_NAME } from "@/screensContants/contants";
import CategoryMenu from "@/screens/CategoryMenu";
import ChangePasswordScreen from "@/screens/user/ChangePasswordScreen";
import CartScreen from "@/screens/cart/CartScreen";
import AddressBook from "@/screens/user/AddressBook";
import LoginScreen from "@/screens/user/LoginScreen";
import RegisterScreen from "@/screens/user/RegisterScreen";
import StoreCaregory from "@/screens/StoreCaregoryScreen";
import ChangeLanguageScreen from "@/screens/user/ChangeLanguageScreen";
import ProductDetailScreen from "@/screens/home/ProductDetailScreen";
import { FullscreenLoadingContext } from "@/context/loadingScreen";
import { Spinner } from "native-base";
import { StyleSheet } from "react-native";
import Details from "@/screens/test/Details";
import Test from "@/screens/test/Test";
import TestAnimated1 from "@/screens/test/TestAnimated1";
import CheckoutScreen from "@/screens/checkout/CheckoutScreen";
import TodayDealScreen from "@/screens/TodayDealScreen";
import { Modal, Text } from 'native-base';
import ProductListFavoriteScreen from '@/screens/favorite/ProductListFavoriteScreen';
import { Host } from 'react-native-portalize';
import OrderDetail from "@/screens/user/OrderDetailScreen";

const MainStack = createStackNavigator();

function RootNavigator() {
  const [isShowFullscreenLoading, setIsShowFullscreenLoading] =
    useState<boolean>(false);
  return (
    <Host>
      <NavigationContainer>
        <FullscreenLoadingContext.Provider
          value={{
            isShowFullscreenLoading,
            setIsShowFullscreenLoading,
          }}
        >
          <MainStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <MainStack.Screen
              name={SCREEN_NAME.HOME_NAVIGATOR}
              component={HomeNavigator}
            />
            <MainStack.Screen
              name={SCREEN_NAME.PROFILE_SCREEN}
              component={ProfileScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.CATEGORYMENU_SCREEN}
              component={CategoryMenu}
            />
            <MainStack.Screen name="Test" component={Test} />
            <MainStack.Screen name="TestAnimated1" component={TestAnimated1} />
            <MainStack.Screen
              name={SCREEN_NAME.CHANGEPASSWORD_SCREEN}
              component={ChangePasswordScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.CART_SCREEN}
              component={CartScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.ADDRESSBOOK_SCREEN}
              component={AddressBook}
            />

            <MainStack.Screen
              name={SCREEN_NAME.STORECATEGORY_SCREEN}
              component={StoreCaregory}
            />
            <MainStack.Screen
              name={SCREEN_NAME.LOGINSCREEN}
              component={LoginScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.REGISTERSCREEN}
              component={RegisterScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.CHANGELANGUAGE_SCREEN}
              component={ChangeLanguageScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.PRODUCT_DETAIL_SCREEN}
              component={ProductDetailScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.CHEKCOUT_SCREEN}
              component={CheckoutScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.TODAY_DEAL_SCREEN}
              component={TodayDealScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.PRODUCT_LIST_FAVORITE_SCREEN}
              component={ProductListFavoriteScreen}
            />
            <MainStack.Screen
              name={SCREEN_NAME.ORDER_DETAIL}
              component={OrderDetail}
            />
            <MainStack.Screen name="Detail" component={Details} />
          </MainStack.Navigator>
        </FullscreenLoadingContext.Provider>
        {isShowFullscreenLoading && (
          <Modal style={styles.fullLoadingBox} isOpen={isShowFullscreenLoading}>
            <Modal.Content p={2}>
              <Modal.Header alignItems='center'>
                <Text fontSize={16}>Đang load dữ liệu</Text>
              </Modal.Header>
              <Spinner size="lg" color="black" />
            </Modal.Content>
          </Modal>
        )}
      </NavigationContainer>
    </Host>
  );
}
export default RootNavigator;
const styles = StyleSheet.create({
  fullLoadingBox: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 50,
    elevation: 20,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { Box, Text, useTheme, Pressable, Menu } from "native-base";
import { ThemeType } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAME } from "../../screensContants/contants";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faEllipsisV, faHeart, faHome, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';

interface PropsInterface {
  headerTitle: string;
  leftCol: boolean;
  rightCol?: boolean;
  menuIcon: boolean;
}

const Header = (props: PropsInterface) => {
  const menuData = [
    {
      title: "Trang chủ",
      screen: "Home",
      icon: faHome,
    },
    {
      title: "Giỏ hàng",
      screen: SCREEN_NAME.CART_SCREEN,
      icon: faShoppingBag,
    },
    {
      title: "Cá nhân",
      screen: "User",
      icon: faUser,
    },
    {
      title: 'Danh sách yêu thích',
      screen: SCREEN_NAME.PRODUCT_LIST_FAVORITE_SCREEN,
      icon: faHeart,
    },
  ];
  const navigation: any = useNavigation();
  const theme = useTheme<ThemeType>();
  const renderItem = menuData.map((menuItem) => {
    return (
      <Menu.Item key={menuItem.title}>
        <Pressable
          style={{ flexDirection: "row" }}
          _pressed={{ opacity: 0.5 }}
          onPress={() => {
            navigation.navigate(menuItem.screen);
          }}

        >
          <FontAwesomeIcon
            icon={menuItem.icon}
            size={14}
            style={{ marginRight: 10 }}
          />
          <Text fontSize={theme.fontSizes.sm}>{menuItem.title}</Text>
        </Pressable>
      </Menu.Item>
    );
  });
  return (
    <Box safeAreaTop>
      <Box
        style={{
          height: 58,
          borderBottomColor: theme.colors.gray[200],
          borderBottomWidth: 0.5,
          backgroundColor: theme.colors.white,
          justifyContent: "center",
        }}
      >
        <Box flexDirection="row" px={4}>
          {props.leftCol && (
            <Pressable
              flex={0.2}
              _pressed={{ opacity: 0.3 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                size={18}
                color={theme.colors.gray[500]}
              />
            </Pressable>
          )}
          <Box flex={1.5}>
            <Text style={{ marginLeft: 8 }} fontWeight="bold">
              {props.headerTitle}
            </Text>
          </Box>
          {props.rightCol && (
            <Box flex={1.3} alignItems="flex-end">
              <Pressable
                _pressed={{ opacity: 0.5 }}
                onPress={() => {
                  navigation.navigate(SCREEN_NAME.CART_SCREEN);
                }}
              >
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  size={18}
                  color={theme.colors.gray[500]}
                />
              </Pressable>
            </Box>
          )}
          {props.menuIcon && (
            <Menu
              style={{ marginTop: 2, width: 190 }}
              closeOnSelect={true}
              onOpen={() => { }}
              onClose={() => { }}
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    {...triggerProps}
                    style={{ marginLeft: 15 }}
                    _pressed={{ opacity: 0.5 }}
                    p={1}
                  >
                    <FontAwesomeIcon icon={faEllipsisV} size={16} />
                  </Pressable>
                );
              }}
            >
              {renderItem}
            </Menu>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

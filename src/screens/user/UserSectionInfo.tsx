import React, { useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Heading, useTheme, Pressable, Text } from 'native-base';
import { SCREEN_NAME } from '../../screensContants/contants';
import { ThemeType } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { assetImages } from '../../config';

const UserSectionInfo = () => {
  const theme = useTheme<ThemeType>();
  const navigation = useNavigation();
  const styles = useMemo(() => {
    return createStyle(theme);
  }, []);
  const ItemUserList = [
    {
      title: 'Thông tin tài khoản',
      params: SCREEN_NAME.PROFILE_SCREEN,
      url: assetImages.user,
    },
    {
      title: 'Thay đổi mật khẩu',
      params: SCREEN_NAME.CHANGEPASSWORD_SCREEN,
      url: assetImages.keys,
    },
    {
      title: 'Sổ địa chỉ',
      params: SCREEN_NAME.ADDRESSBOOK_SCREEN,
      url: assetImages.addressIcon,
    },
  ];

  return (
    <View style={styles.menuSection}>
      <Heading size="md" style={styles.menuSectionTitle}>
        User
      </Heading>

      {ItemUserList.map((menuItem, idx) => (
        <Pressable
          key={idx}
          onPress={() => {
            navigation.navigate(menuItem.params);
          }}
          _pressed={{
            backgroundColor: theme.colors.gray[100],
          }}
        >
          <View style={styles.menuItem}>
            <View style={styles.menuItemIconBox}>
              <Image source={menuItem.url} style={{ height: 30, width: 30 }} resizeMode="cover" />
            </View>

            <View style={styles.menuItemTitleCol}>
              <Text>{menuItem.title}</Text>
            </View>

            <FontAwesome5
              style={styles.menuItemRightIcon}
              icon="chevron-right"
              size={theme.fontSizes.sm}
              color={theme.colors.gray[400]}
            />
            <FontAwesome5
              style={styles.menuItemRightIcon}
              name="chevron-right"
              size={theme.fontSizes.sm}
              color={theme.colors.gray[400]}
            />
          </View>
        </Pressable>
      ))}

      <Pressable
        _pressed={{
          backgroundColor: theme.colors.gray[100],
        }}
      >
        <View style={styles.menuItem}>
          <View style={styles.menuItemIconBox}>
            <Image source={assetImages.logout} style={{ height: 40, width: 40 }} resizeMode="contain" />
          </View>

          <View style={styles.menuItemTitleCol}>
            <Text>Đăng Xuất</Text>
          </View>

          <FontAwesome5
            style={styles.menuItemRightIcon}
            name="chevron-right"
            size={theme.fontSizes.sm}
            color={theme.colors.gray[400]}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default UserSectionInfo;
function createStyle(theme: ThemeType) {
  return StyleSheet.create({
    menuSection: {
      paddingHorizontal: 16,
      marginTop: 60,
    },
    menuSectionTitle: {
      marginBottom: 8,
      fontWeight: '700',
      color: theme.colors.gray[800],
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomColor: theme.colors.gray[100],
      borderBottomWidth: 1,
    },
    menuItemIconBox: {

      width: 36,
      height: 36,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    menuItemTitleCol: {
      marginRight: 16,
    },
    menuItemRightIcon: {
      marginLeft: 'auto',
    },
  });
}

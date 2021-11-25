import React, { useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Heading, useTheme, Pressable, Text } from 'native-base';
import { SCREEN_NAME } from '../../screensContants/contants';
import { ThemeType } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { assetImages } from '../../config';

const SettingApp = () => {
  const theme = useTheme<ThemeType>();
  const navigation = useNavigation();
  const styles = useMemo(() => {
    return createStyle(theme);
  }, []);

  return (
    <View style={styles.menuSection}>
      <Heading size="md" style={styles.menuSectionTitle}>
        Setting
      </Heading>

      <Pressable
        _pressed={{
          backgroundColor: theme.colors.gray[100],
        }}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.CHANGELANGUAGE_SCREEN);
        }}
      >
        <View style={styles.menuItem}>
          <View style={styles.menuItemIconBox}>
            <Image source={assetImages.changeLanguage} style={{ height: 40, width: 40 }} resizeMode="contain" />
          </View>

          <View style={styles.menuItemTitleCol}>
            <Text>Thay đổi ngôn ngữ</Text>
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

export default SettingApp;
function createStyle(theme: ThemeType) {
  return StyleSheet.create({
    menuSection: {
      paddingHorizontal: 16,
      marginTop: 20,
    },
    menuSectionTitle: {
      marginBottom: 8,
      fontWeight: '700',
      color: theme.colors.gray[800],
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
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
